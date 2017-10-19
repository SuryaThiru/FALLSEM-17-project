/*
    fetches performance report of a student
 */

const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host
});
client.connect();

async function getStudentInfo(regid, empid) {
    let cmd = 'select register_id, f_name, l_name from student where register_id=($1)';
    let {rows: info} = await client.query(cmd, [regid]);

    let qargs = getRequiredColumnFields();
    cmd = 'select ' + qargs + ' from marks where register_id=($1) and emp_id=($2)';
    let {rows: marks} = await client.query(cmd, [regid, empid]);

    result = {
        info: info[0],
        marks: marks[0]
    };

    return result;
}

function getRequiredColumnFields() {
    // prepare the required column names
    let fields = ['quarterly', 'halfyearly', 'annual', 'internal', 'curiousity', 'dedication', 'punctuality',
        'behaviour', 'enthusiasm'];

    return fields.join(', ');
}

module.exports = getStudentInfo;