import compare from './detection.js'

let result = {};

const check = (shem, world) => {
    let m, s;                                           //master's name, slave's name 

    for (m in shem) {                         
        if (!shem[m]) saveListFalse(world[m])
        else 
        for (let i = 0; i < shem[m].length; i++) {
            s = shem[m][i];
            bust(world, m, s)
        }
    }
    return result
}

const saveListFalse = (mlist) => {
    let mlength = mlist.length,
        m;

    if (mlength != 0)
        for (m = 0; m < mlength; m++)
            save(mlist[m], m);
}

const bust = (world, a, b) => {
    let mlist = world[a],
        slist = world[b], 
        mlength = mlist.length,
        slength = slist.length,
        m,
        s;

    if (a != b)                                  //master-slave
        for (m = 0; m < mlength; m++) 
            for (s = 0; s < slength; s++){
                save(mlist[m], m, slist[s], s)
                //let master = mlist[m],
                //    slave = slist[s]
                //if (compare(master, slave)) save(master, m, slave, s)
            }
    else                                        //master-master
        for (m = 0; m < mlength; m++) 
            for (s = m + 1; s < slength; s++)
                save(mlist[m], m, slist[s], s)
}


const save = (master, m, slave, s) => {
    let name = master.class;

    if (result[name] == undefined)                 //result: {'Class': [{master: Object, m: Number, list: [Object, ...]}, ...], ...}
        result[name] = [];

    if (result[name][m] == undefined)
        result[name].push({ master: master, list: [] });  // не очень чётко

    if (slave && compare(master, slave)) {
        result[name][m].list.push(slave);          // note: optimization possible (add containers for slave types)
        slave._n = s;
    } 
}
    
export default check;

