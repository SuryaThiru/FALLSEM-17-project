const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host
});
client.connect();

async function getStudents(class_number) {
    let cmd = 'select register_id, f_name, l_name    from student where class_number=($1)';

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


module.exports = {
    getStudents: getStudents,
    getSubjectOverall: getSubjectOverall
};