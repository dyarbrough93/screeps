/*
 * Initialize various objects in memory
 */
 
module.exports = function() {
    
    Memory.units = {
        combat: {
            melee: {
                ratio: 2,
                count: 0,
                role_name: 'melee'
            },
            healer: {
                ratio: 1,
                count: 0,
                role_name: 'healer'
            },
            ranged: {
                ratio: 1,
                count: 0,
                role_name: 'ranged' 
            }
            
        },
        
        _harvest: {
            miner: {
                ratio: 1,
                count: 0,
                role_name: 'miner'
            },
            runner: {
                ratio: 1,
                count: 0,
                role_name: 'runner'
            }
        },
        
        construction: {
            builder: {
                ratio: 1,
                count: 0,
                role_name: 'builder'
            }
        }
    };
    
    Memory.sources = {};
};
