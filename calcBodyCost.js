/*
 * Calculates the cost of an array of body parts
 *
 * @param {Object} parts
 * @returns The cost, -1 on error
 */
 
module.exports = function(parts) {
    
    if (typeof parts !== 'object' || parts === null) {
        console.log("Parts is either null or not an object.");
        return -1;
    }
        
    if (parts.length === 0) 
        return 0;
        
    var sum = 0;
    for (var i in parts) {

        var part = parts[i];
        
        switch (part) {
            case Game.MOVE:
                sum += 50;
                break;
            case Game.WORK:
                sum += 20;
                break;
            case Game.CARRY:
                sum += 50;
                break;
            case Game.ATTACK:
                sum += 100;
                break;
            case Game.RANGED_ATTACK:
                sum += 150;
                break;
            case Game.HEAL:
                sum += 200;
                break;
            case Game.TOUGH:
                sum += 5;
                break;
            default:
                console.log("Object other than body part in array.");
                return -1;
        }
    }
    
    return sum;
}
