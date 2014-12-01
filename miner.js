/*
 * Script for a miner creep
 *
 * Actions:
 *      - moves to a nearby source, harvests from it, and drops it for runners to pick up
 */
module.exports = {
    
    mine: function(creep) {
        
        var source_coords;
        if (!creep.memory.assigned_source) 
            source_coords = this.assign_source(creep);
        else
            source_coords = creep.memory.assigned_source;
        
        if (!source_coords) return;
        
        if (!Game.creeps[creep.memory.little_sister]) {
            creep.memory.little_sister = null;
            // queue up a little sister
        }
        
        creep.moveTo(source_coords);
        
        if (creep.pos.isNearTo(source_coords)) {
            var source = creep.pos.findNearest(Game.SOURCES_ACTIVE);
            creep.harvest(source);
        }
    },
    
    /*
     * Assigns a source to this miner
     * @param creep 
     * @return null on failure
     */
    assign_source: function(creep) {
        
        var sources = creep.room.find(Game.SOURCES);
        
        // sort by distance
        sources.sort(function (src_a, src_b) {
            return creep.pos.findPathTo(src_a.pos).length - 
                   creep.pos.findPathTo(src_b.pos).length;
        });
        
        for (var i = 0; i < sources.length; i++) {
            var pos_str = sources[i].pos.x + '_' + sources[i].pos.y;
            
            if (!Memory.sources[pos_str]) 
                Memory.sources[pos_str] = {};
                
            if (!Game.creeps[Memory.sources[pos_str].big_daddy])
                Memory.sources[pos_str].big_daddy = null;
            
            if (!Memory.sources[pos_str].big_daddy) {
                Memory.sources[pos_str].big_daddy = creep.name;
                var coords = {
                    x: sources[i].pos.x,
                    y: sources[i].pos.y
                };
                creep.memory.assigned_source = coords;
                return coords;
            }
        }
        
        return null;
    }
};
