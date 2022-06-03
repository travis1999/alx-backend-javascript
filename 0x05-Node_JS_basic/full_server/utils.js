const fs = require('fs');

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


function getAllStudents(file) {
    rows = file.split("\n");
    columns = rows[0].split(",");

    data = rows.slice(1, rows.length);
    let all_students = [];

    data.forEach(element => {
        let obj = {};
        if (element !== "") {
            for( [prop, value] of zip(columns, element.split(','))){
                obj[prop] = value;
            }
            all_students.push(obj);
        }
    });

    return all_students;
}


function getAllMajors(all_students) {
    let fields = new Set();

    all_students.forEach((dt) => {
        fields.add(dt.field);
    });

    return Array.from(fields);
}

function getStudentsByMajor(major, students) {
    return students.filter((st) => { return st.field === major; })
                   .map( (v) => { return v.firstname; });
}

function parse_file(file) {
    let all_students = getAllStudents(file);
    let majors = getAllMajors(all_students);

    let result = {};

    majors.forEach(major => {
        result[major] = getStudentsByMajor(major, all_students);
    });

    return result;
}


export function readDatabase(file) {
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