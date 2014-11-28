/*
 * Determines what types of creeps we should currently focus on building
 */
 
module.exports = function() {
    
    var _ = require('lodash');
    
    var num_enemy_creeps = Game.spawns.Spawn1.room.find(Game.HOSTILE_CREEPS).length;
    var num_combat_creeps = _.filter(Game.creeps, {memory: {category: 'combat'}}).length;
    var num_harvester_creeps = _.filter(Game.creeps, {memory: {category: '_harvest'}}).length;
                             
    if (num_enemy_creeps > num_combat_creeps || num_harvester_creeps >= 4)
        return 'combat';
    else
        return '_harvest';
};
