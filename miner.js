/*
 * Script for a miner creep
 *
 * Actions:
 *      - moves to a nearby source, harvests from it, and drops it for runners to pick up
 */
module.exports = function(creep) {
    
    var nearest_source = creep.pos.findNearest(Game.SOURCES_ACTIVE);
    creep.moveTo(nearest_source);
    creep.harvest(nearest_source);
}
