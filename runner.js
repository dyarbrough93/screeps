/*
 * Script for a runner creep
 *
 */
 
module.exports = function(creep) {
    
    if (creep.energy < creep.energyCapacity) {
        
        var tgt_pos = creep.memory.target_pos;
        if (tgt_pos) {
            if (creep.pos.isNearTo(tgt_pos)) {
                var tgt_energy = creep.pos.findNearest(Game.DROPPED_ENERGY);
                creep.pickup(tgt_energy);
                creep.memory.tgt_pos = null;
                return;
            } 
            else {
                creep.moveTo(tgt_pos);
                return;
            }
        }
        
        var dropped_energy = creep.room.find(Game.DROPPED_ENERGY);
        var largest_dropped_energy = 0, energy_target = null;
        for (var i in dropped_energy) {
            if (dropped_energy[i].energy > largest_dropped_energy) {
                largest_dropped_energy = dropped_energy[i].energy;
                energy_target = dropped_energy[i];
            }
        }
        
        if (energy_target) {
            creep.memory.target_pos = {
                x: energy_target.pos.x,
                y: energy_target.pos.y
            };
            creep.moveTo(energy_target);
            creep.pickup(energy_target);
        }
        else {
            var nearest_miner = creep.pos.findNearest(Game.MY_CREEPS, {
                filter: function(_creep) {
                    return _creep.memory.role === 'miner';
                }
            });
            
            if (nearest_miner) 
                creep.moveTo(nearest_miner);
            else
                creep.moveTo(creep.pos.findNearest(Game.MY_SPAWNS));
        }
    }
    else {
        var nearest_spawn = creep.pos.findNearest(Game.MY_SPAWNS);
        
        creep.moveTo(nearest_spawn);
        creep.transferEnergy(nearest_spawn);
    }
};