module.exports = {
    
    /*
     * Assigns a runner to a dropped energy source
     * @param runner The creep to assign
     */
    assign_runner: function(runner) {
    
        for (var source in Memory.sources) {
            var sauce = Memory.sources[source];
            if (!sauce.assigned_runner) {
                sauce.assigned_runner = true;
                var _pos = this.pos_str_to_obj(source);
                runner.memory.tgt_pos = _pos;
                break;
            }
        }
    },
    
    /*
     * Converts a string in the format 'x_y' to an
     * object in the format pos: {x: , y: }
     * @param {string} pos_str The string to convert
     * @returns {object} pos object
     */
    pos_str_to_obj: function(pos_str) {
        if (!pos_str || !(/^\d{1,2}_\d{1,2}$/.test(pos_str)))
            throw new TypeError("Invalid parameter.");
        
        var x_reg = /^\d{1,2}/;
        var y_reg = /\d{1,2}$/;
        
        return {
            x: pos_str.match(x_reg)[0],
            y: pos_str.match(y_reg)[0]
        };
    }
};
