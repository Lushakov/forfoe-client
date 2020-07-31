
const compare = (master, slave) => {

    if (master.type == 'round' && slave.type == 'round') return round(master, slave)
    if (master.type == 'round' && slave.type == 'rect') return roundRect(master, slave)
    if (master.type == 'round' && slave.type == 'rect') return rect(master, slave)
        //................//
        //................//
        //................//
}

const round = (master, slave) => {
    var ab = Math.abs(master.x - slave.x);
    var ac = Math.abs(master.y - slave.y);
    var bc = Math.sqrt(Math.pow(ab, 2) + Math.pow(ac, 2));
    if (bc <= master.radius + slave.radius) return true
    else return false;
}

export default compare;
