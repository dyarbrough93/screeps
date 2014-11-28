module.exports = {

    /*
     * Determines which role type to spawn based the current
     * number of each type of unit and the desired unit ratio
     * @param {string} category The category of units to check
     * @returns {string} The role type to spawn
     */
    spawn_role: function(category) {
        
        var ratio_arr = [];
        var counts_arr = [];
        
        for (var i in Memory.units[category]) {
            ratio_arr.push(Memory.units[category][i].ratio);
        }
        
        for (var j in Memory.units[category]) {
            counts_arr.push(Memory.units[category][j].count);
        }
        
        var smallest_mult = Math.pow(2, 53), sm_idx = 0;
        for (var k = 0; k < counts_arr.length; k++) {
            var c = counts_arr[k], r = ratio_arr[k];
            if ((c % r !== 0 && c !== 0) || (c === 0 && r !== 0)) {
                return this.i_to_obj_prop(k, Memory.units[category]).role_name;
            }
            if (c / r < smallest_mult) {
                smallest_mult = c / r;
                sm_idx = k;
            }
        }
        
        return this.i_to_obj_prop(sm_idx, Memory.units[category]).role_name;
    },
    
    /*
     * Retrieves a property of an object by index
     * @param i The index
     * @param obj The object
     * @returns The object's property at index i, null
     */
    i_to_obj_prop: function(i, obj) {
        
        if (typeof i !== 'number' || typeof obj !== 'object') 
            throw new TypeError("Invalid parameter.");
        
        var j = 0;
        for (var prop in obj) {
            if (j === i) 
                return obj[prop];
            
            j++;
        }
        
        throw new RangeError("Invalid index.");
    }
};
