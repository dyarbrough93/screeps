/*
 * Script for a ranged combat creeps
 */

module.exports = function(creep) {
    
    var num_attack_parts = 0, num_dead_attack_parts = 0;
    
    for (var part_name in creep.body) {
        
        var body_part = creep.body[part_name];
        
        if (body_part.type === Game.RANGED_ATTACK) {
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
        var enemy_creep = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    
        if (enemy_creep) {
            
            if (creep.pos.inRangeTo(enemy_creep, 1)) {
                var enemy_direction = creep.pos.getDirectionTo(enemy_creep.pos.x, enemy_creep.pos.y);
                console.log(enemy_direction);
                creep.move(require('getOppositeDirection')(enemy_direction));
                creep.rangedAttack(enemy_creep);
            }
            else {
                creep.moveTo(enemy_creep);
                creep.rangedAttack(enemy_creep);
            }
        }
        else {
            var closest_healer = creep.pos.findNearest(Game.MY_CREEPS, {
                filter: function(_creep) {
                    return _creep.memory.role === 'healer';
                }
            });
            
            if (closest_healer) 
                creep.moveTo(closest_healer);
            else {
                var closest_combat_unit = creep.pos.findNearest(Game.MY_CREEPS, {
                    filter: function(_creep) {
                        return _creep.memory.category === 'combat';
                    }
                });
                
                if (closest_combat_unit) 
                    creep.moveTo(closest_combat_unit);
                
                else
                    creep.moveTo(creep.pos.findNearest(Game.MY_SPAWNS));
            }
        }
    }
};
