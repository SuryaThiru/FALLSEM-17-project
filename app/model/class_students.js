/*
    fetch info of students in a class
 */

const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host
});
client.connect();

async function getStudents(class_number) {
    let cmd = 'select register_id, f_name, l_name from student where class_number=($1)';

    let {rows: result} = await client.query(cmd, [class_number]);

    return result;
}

async function getSubjectOverall(class_number, empID) {
    let cmd = 'select * from marks, student' +
        ' where marks.register_id=student.register_id ' +
        'and class_number=($1) and emp_id=($2)';

    let {rows: result} = await client.query(cmd, [class_number, empID]);

    return result;
}

async function getSubjectStats(class_number, empID) {
    // get highest and average mark in each subject
    // prepare the required column names
    let fields = ['quarterly', 'halfyearly', 'annual', 'internal', 'curiousity', 'dedication', 'enthusiasm'];
    qargs = fields.map((val, ind) => {
       let str = `max(${val}), avg(${val})`
       if (ind !== fields.length - 1)
           str += ',';

       return str;
    });
    qargs = qargs.join(' ');

    let cmd = 'select ' + qargs + ' from marks, student' +
        ' where marks.register_id=student.register_id ' +
        'and class_number=($1) and emp_id=($2)';
    console.log(cmd);
    let {rows: result} = await client.query(cmd, [class_number, empID]);

    return result;
}

getSubjectStats(801, 40150).then(res => console.log(res))

module.exports = {
    getStudents: getStudents,
    getSubjectOverall: getSubjectOverall
};