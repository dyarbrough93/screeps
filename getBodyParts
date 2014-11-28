/*
 * Get the array of body parts associated with a particular creep role
 *
 * @param {string} role
 * @returns array of body parts
 */
 
module.exports = function(role) {
    switch (role) {
        case 'healer':
            return [Game.MOVE, Game.MOVE, Game.HEAL]; 
        case 'melee':
            return [Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE];
        case 'ranged':
            return [Game.RANGED_ATTACK, Game.MOVE, Game.TOUGH];
        case 'runner':
            return [Game.MOVE, Game.CARRY];
        case 'miner':
            return [Game.MOVE, Game.WORK, Game.WORK];
        case 'builder':
            return [Game.MOVE, Game.WORK, Game.WORK];
        default:
            console.log('The parameter worker role "' + role + '" does not exist.');
            return null;
    } 
}
