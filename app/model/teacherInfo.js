/*
    get teacher information
 */

const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host,
    ssl: true
});
client.connect();


async function getTeacherInfo(empID) {
    let cmd = 'select f_name, l_name from teacher where emp_id=($1)';

    let {rows: result} = await client.query(cmd, [empID]);

    return result[0];
}


module.exports = getTeacherInfo;