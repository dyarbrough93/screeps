/*
 * Script for a healer creep
 *
 * Actions:
 *      - 
 */
 
module.exports = function(creep) {
    
    var lowest_health_guard = null;
    var current_known_lowest_health = 10000;
    
    for (var creep_name in Game.creeps) {
        var _creep = Game.creeps[creep_name];
        if (_creep.memory.category === 'combat' && _creep.hits < current_known_lowest_health && _creep.hits < _creep.hitsMax) {
            current_known_lowest_health = creep.hits;
            lowest_health_guard = _creep;
        }
    }
    
    if (lowest_health_guard !== null) {
        creep.moveTo(lowest_health_guard);
        creep.heal(lowest_health_guard);
    }
    else {
        var nearest_guard = creep.pos.findNearest(Game.MY_CREEPS, {
            filter: function(_creep) {
                return _creep.memory.category === 'combat';
            }
        });
        if (nearest_guard)
            creep.moveTo(nearest_guard);
        else 
            creep.moveTo(creep.pos.findNearest(Game.MY_SPAWNS));
    }
}
