/*
 * Get the opposite direction of a given direction
 */
 
module.exports = function(direction) {
    
    if (direction === undefined || direction === null)
        throw new TypeError("Undefined / null parameter");
        
    switch(direction) {
        case Game.TOP:
            return Game.BOTTOM;
        case Game.TOP_RIGHT:
            return Game.BOTTOM_LEFT;
        case Game.RIGHT:
            return Game.LEFT;
        case Game.BOTTOM_RIGHT:
            return Game.TOP_LEFT;
        case Game.BOTTOM:
            return Game.TOP;
        case Game.BOTTOM_LEFT:
            return Game.TOP_RIGHT;
        case Game.LEFT:
            return Game.RIGHT;
        case Game.TOP_LEFT:
            return Game.BOTTOM_RIGHT;
        default:
            //throw new TypeError("Unrecognized direction: " + direction);
            //console.log("direction: " + direction);
            //break;
            
    }
};
