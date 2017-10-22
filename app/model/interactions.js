/*
    fetches and posts all interactions between class teachers and guardians
 */

const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host
});
client.connect();

async function addInteraction(reg_id, postText, timestamp, postByTeacher) {
    let emp_id = await getEmpIDOfClassTeacher(reg_id);

    // add interactions
    cmd = 'insert into interact_with values(($1), ($2), ($3), ($4), ($5))';
    let vals = [reg_id, emp_id, timestamp, postText, postByTeacher];

    let out = await client.query(cmd, vals);
    return true; // return success
}

// let d = new Date();
// addInteraction(2701, 'Sup! dudes', d.toUTCString(), true);

async function getInteraction(reg_id) {
    let emp_id = await getEmpIDOfClassTeacher(reg_id);

    // get interactions
    let cmd = 'select * from interact_with where register_id=($1) and emp_id=($2) order by timestamp';
    let vals = [reg_id, emp_id];

    let {rows} = await client.query(cmd, vals);
    return rows;
}

async function getEmpIDOfClassTeacher(reg_id) {
    let cmd = 'select class_teacher from class where class_number=' +
        '(select class_number from student where register_id=($1))';
    let {rows} = await client.query(cmd, [reg_id]);
    let emp_id = rows[0]['class_teacher'];

    return emp_id;
}

getInteraction(7715).then(res => console.log(res))

module.exports = {
    addInteraction: addInteraction,
    getInteraction: getInteraction
};
