var http = require("http");

const fs = require('fs');
const { route } = require("express/lib/application");


function min(a, b) {
    if (a < b) return a;
    return b;
}

function* zip(a, b) {
    for (let i=0; i < min(a.length, b.length); i++) 
    { 
        yield [a[i] , b[i]]; 
    } 
}


function parse_file(file) {
    rows = file.split("\n");
    columns = rows[0].split(",");

    data = rows.slice(1, rows.length);
    let all_data = [];

    data.forEach(element => {
        let obj = {};

        if (element !== "") {
            for( [prop, value] of zip(columns, element.split(','))){
                obj[prop] = value;
            }
            all_data.push(obj);
        }
    });

    let fields = new Set();

    all_data.forEach((dt) => {
        fields.add(dt.field);
    });


    let result = ""
    
    result += `Number of students ${all_data.length}\n`


    for (let item of fields.keys()) {
        let st = all_data.filter((i) => { return i.field === item; });
        let st_f = st.map( (v) => { return v.firstname; }).join(", ");

        result += `Number of students in ${item}: ${st.length}, List: ${st_f}\n`;
    }

    return result;
}

function countStudents(path) {
    let prom = new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, contents) => {
            if (err) {
                reject(err);
            } else {
                resolve(parse_file(contents));
            } 
        }
        );
    });

    return prom;
}

http.createServer((request, response) => {
    countStudents('./database.csv')
        .then((result) => {
            routes = {
                "/": "Hello Holberton School!",
                "/students": `This is the list of our students\n${result}`
            }
            response.write(routes[request.url]);
            response.end();
        })
        .catch((err) => {
            response.end();
            console.log(err);
        }
    );
}).listen(1245);