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


module.exports = getStudents;