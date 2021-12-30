/*

A simple .ini parser that returns JSON data.
ftde0, 2021.

*/


const fs = require("fs")

module.exports = function(filename) {
    let tr = {};

    let ini = fs.readFileSync(filename).toString();
    ini.split("\n").forEach(property => {
        if(property.startsWith("#")) return;

        let name = property.split(":")[0]
        let value = property.split(":");
        value.shift();
        value = value.join(":");

        tr[name] = value;
    })

    return tr;
}