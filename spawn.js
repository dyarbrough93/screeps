/*
 * Spawns a creep with the indicated role at the indicated location
 *
 * @param {string} role
 * @param {Spawn} spawn
 * @returns The new creep upon success, null upon failure
 */

module.exports = function(category, role, spawn) {
    
    if (!role || !spawn || !category) 
        throw new TypeError("Invalid parameters.");
    
    var body_parts = require('getBodyParts')(role);
    
    if (body_parts === null)
        return null;
        
    var creep = null;
    if (require('calcBodyCost')(body_parts) <= spawn.energy) 
        creep = spawn.createCreep(body_parts, role + Game.time, {role: role, category: category});
    
    if (typeof creep === 'number') {
        return null;
    }
    
    if (creep !== null)
        Memory.units[category][role].count++;
    
    return creep;
};
