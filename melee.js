/*
 * Script for a melee combat creep
 */

module.exports = function(creep) {
    
    var _ = require('lodash');
    
    var num_attack_parts = 0, num_dead_attack_parts = 0;
    for (var part_name in creep.body) {
        var body_part = creep.body[part_name];
        if (body_part.type === Game.ATTACK) {
            num_attack_parts++;
            if (body_part.hits === 0) {
                num_dead_attack_parts++;
            }
        }
    }
    
    if (num_attack_parts === num_dead_attack_parts) {
        
        var nearest_healer = creep.pos.findNearest(Game.MY_CREEPS, {
            filter: function(_creep) {
                return _creep.memory.role === 'healer';
            }
        });
        
        if (nearest_healer) 
            creep.moveTo(nearest_healer);
        else 
            creep.moveTo(creep.pos.findNearest(Game.MY_SPAWNS));
        
    }
    
    else {
        var closest_enemy_creep = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    
        if (closest_enemy_creep) {
            //console.log("moving to closest enemy");
            creep.moveTo(closest_enemy_creep);
            creep.attack(closest_enemy_creep);
        }
        else {
            
            var closest_healer = creep.pos.findNearest(Game.MY_CREEPS, {
                filter: function(_creep) {
                    return _creep.memory.role === 'healer';
                }
            });
            if (closest_healer) {
                //console.log("moving to closest healer");
                creep.moveTo(closest_healer);
            }
                
            else {
                
                var closest_combat_unit = creep.pos.findNearest(Game.MY_CREEPS, {
                    filter: function(_creep) {
                        return _creep.memory.category === 'combat' && _creep.name !== creep.name;
                    }
                });
                // console.log(closest_combat_unit);
                if (closest_combat_unit) {
                    //console.log("moving to closest combat unit");
                    creep.moveTo(closest_combat_unit);
                }
                else {
                    // console.log("moving to closest spawn");
                    creep.moveTo(creep.pos.findNearest(Game.MY_SPAWNS));
                }
            }
        }
    }
};
