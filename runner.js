/*
 * Script for a runner creep
 */
 
module.exports = {
    
    run: function(creep) {
    
        var nearest_enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
        
        if (nearest_enemy && creep.pos.isNearTo(nearest_enemy)) {
            var enemy_dir = creep.pos.getDirectionTo(nearest_enemy);
            console.log(creep.move(require('getOppositeDirection')(enemy_dir)));
        }
        
        var big_daddy_name;
        if (!creep.memory.big_daddy) 
            big_daddy_name = this.assign_daddy(creep);
        else
            big_daddy_name = creep.memory.big_daddy;
        
        var big_daddy = Game.creeps[big_daddy_name];
        
        if (!big_daddy) { // big daddy dead
            
            for (var i in Game.creeps) {
                var _creep = Game.creeps[i];
                if (_creep.memory.role === 'miner' && !_creep.memory.little_sister) {
                    _creep.memory.little_sister = creep.name;
                    creep.memory.big_daddy = _creep.name;
                    return;
                }
            }
            
            creep.memory.big_daddy = null;
            creep.moveTo(creep.pos.findNearest(Game.MY_SPAWNS));
            
            // TODO: add new big daddy to spawn queue
            // ALSO TODO: make spawn queue.
            return;
        }
        
        if (creep.energy < creep.energyCapacity) {
            
            creep.moveTo(big_daddy.pos);
            
            if (creep.pos.isNearTo(big_daddy.pos)) {
                
                var _energy = creep.pos.findNearest(Game.DROPPED_ENERGY);
                creep.pickup(_energy);
                
            }
        }
        
        else {
            var nearest_spawn = creep.pos.findNearest(Game.MY_SPAWNS);
            creep.moveTo(nearest_spawn);
            creep.transferEnergy(nearest_spawn);
        }
    },
    
    /*
     * Assign runner creep to a miner creep
     * @param creep The creep to assign
     * @return The miner creep name, null upon failure
     */
    assign_daddy: function(creep) {
        
        for (var i in Game.creeps) {
            
            var _creep = Game.creeps[i];
            
            if (_creep.memory.role === 'miner' && 
                !_creep.memory.little_sister) {
            
                creep.memory.big_daddy = _creep.name;
                _creep.memory.little_sister = creep.name;
                return _creep.name;
            }
        }
        
        return null;
    }
};
