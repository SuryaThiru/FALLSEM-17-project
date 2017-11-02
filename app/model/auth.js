/*
    used for authorising user during login
 */

const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host,
    ssl: true
});
client.connect();

async function authTeacher(username, password) {
    let cmd = 'select password from teacher where emp_id=($1)';
    let { rows: result } = await client.query(cmd, [username]);

    return result[0];
}

async function authGuardian(username, password) {
    let cmd = 'select password from guardian where register_id=($1)';
    let { rows: result } = await client.query(cmd, [username]);

    return result[0];
}

module.exports = {
    authTeacher: authTeacher,
    authGuardian: authGuardian
};

// auth(97398, 'codi').then(res => console.log(res));