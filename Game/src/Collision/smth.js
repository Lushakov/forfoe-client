import compare from './detection.js'


let result = {};

const check = (shem, world) => {
    let m, s;                                           //master's name, slave's name 

    for (m in shem) {                                   
        if (!shem[m]) saveListFalse(world[m])
        else {
            for (let i = 0; i < shem[m].length; i++) {
                s = shem[m][i];

                (m == s)
                ? bustMasterMaster(world, m, s)        //check masters with each other
                : bustMasterSlave(world, m, s)         //check masters with slaves
            }
        }
    }

    return result
}

const saveListFalse = (list) => {
    if (list.lenght)
        for (let i = 0; i < list.length; i++)
            save(list[i], i);
}


const bustMasterSlave = (world, a, b) => {
    let mlist = world[a];                               // list of master
    let slist = world[b];                               // list of slave
    let m, s;                                           // index of master, index of slave

    for (m = 0; m < mlist.length; m++) {
        for (s = 0; s < slist.length; s++) {

            let master = mlist[m]
            let slave = slist[s]

            compare(master, slave)
            ? save(master, m, slave, s)
            : save(master, m)
        }
    }
}

const bustMasterMaster = (world, a, b) => {
    let mlist = world[a];                               // list of master
    let slist = world[b];                               // list of slave
    let m, s;                                           // index of master, index of slave

    for (m = 0; m < mlist.length; m++) {
        for (s = m + 1; s < slist.lenght; s++) {

            let master = mlist[m];
            let slave = slist[s];

            compare(master, slave) 
            ? save(master, m, slave, s)
            : save(master, m)
        }
    }
}

const save = (master, m, slave, s) => {
    let name = master.class;

    if (result[name] == undefined)                 //result: {'Class': [{master: Object, m: Number, list: [Object, ...]}, ...], ...}
        result[name] = [];

    if (result[name][m] == undefined)
        result[name].push({ master: master, list: [] });  // не очень чётко

    if (slave) {
        result[name][m].list.push(slave);          // note: optimization possible (add containers for slave types)
        slave._n = s;
    }
}
    
export default check;

