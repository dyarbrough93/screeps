var melee = require('melee');
var ranged = require('ranged');
var healer = require('healer');
var miner = require('miner');
var runner = require('runner');
var builder = require('builder');
var spawn = require('spawn');
var spawnRole = require('spawnRole');
var determinePriority = require('determinePriority');

if (!Memory.units) {
    require('initMemory')();
    //console.log()
}

for (var creep_name in Game.creeps) {
    
    var creep = Game.creeps[creep_name];
    
    switch (creep.memory.role) {
        case 'melee': 
            melee(creep);
            break;
        case 'ranged':
            ranged(creep);
            break;
        case 'healer':
            healer(creep);
            break;
        case 'miner':
            miner(creep);
            break;
        case 'runner':
            runner(creep);
            break;
        case 'builder':
            builder(creep);
            break;
        default:
            console.log("Unknown role.");
            break;
    }
}

var priority = determinePriority();

switch (priority) {
    
    case '_harvest':
        var role = spawnRole.spawn_role('_harvest');
        if (role !== null)
            spawn("_harvest", role, Game.spawns.Spawn1);
        break;
    case 'combat':
        var role = spawnRole.spawn_role('combat');
        if (role !== null)
            spawn("combat", role, Game.spawns.Spawn1);
        break;
    case 'construction':
        break;
}
