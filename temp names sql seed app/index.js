const fs = require('fs');
const readline = require('readline');




async function readNames() {
const fileStream = fs.createReadStream('names');
let output = "";

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});



for await(const line of rl) {
    
output += `INSERT INTO celebrities (name, img_src) VALUES ("${line}", "${line.replaceAll(' ', '').replaceAll(',', '').replaceAll('.','').toLowerCase()}");` + '\n';
}

return output;
}

readNames().then(result => {
    fs.writeFile('names.output', result, err => {
        if (err) throw err;
    })
});






