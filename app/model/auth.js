const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host
});
client.connect();

async function auth(username, password) {
    let cmd = 'select password from teacher where emp_id=($1)';

    let { rows: result } = await client.query(cmd, [username]);

    return result;
}

module.exports = auth;

// auth(97398, 'codi').then(res => console.log(res));