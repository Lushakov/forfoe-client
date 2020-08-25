import compare from './detection.js'

let result = {};

const checkCollision = (shem, world) => {
    for (let masterClassName in shem) {                         
        if (!shem[masterClassName]) saveListFalse(world[masterClassName])
        else 
        for (let i = 0; i < shem[masterClassName].length; i++) {

            let slaveClassName = shem[masterClassName][i];

            bust(world, masterClassName, slaveClassName)
        }
    }
    
    return result;
}

//saves masters without their own slaves in the 'shem'
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
            }
    //
    //sometimes an instance of the master class can be a slave for the master
    //
    //for example it could be for this type of 'shem': {Asteroid: ['Asteroid']}
    //
    else                                        //master-master
        for (m = 0; m < mlength; m++) 
            for (s = m + 1; s < slength; s++)
                save(mlist[m], m, slist[s], s)
}


const save = (master, m, slave, s) => {
    let name = master.getClassName();

    if (result[name] == undefined)                 //result: {'Class': [{master: Object, m: Number, list: [Object, ...]}, ...], ...}
        result[name] = [];

    if (result[name][m] == undefined)
        result[name].push({ master: master, list: [] });

    if (slave && compare(master, slave)) {
        result[name][m].list.push(slave);          // note: optimization possible (add containers for slave types)
        slave._n = s;
    } 
}
    
export default checkCollision;

