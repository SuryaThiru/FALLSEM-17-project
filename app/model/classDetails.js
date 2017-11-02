/*
    fetch info about classes of a teacher
 */

const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host,
    ssl: true
});
client.connect();

async function getClassList(empID) {
    let cmd = 'select class_number from taught_by where emp_id=($1)';

    let { rows: result } = await client.query(cmd, [empID]);

    return result;
}

async function getClassDetails(empID) {
    let result = {
        leadingClass: null,
        classList: []
    };
    let rows = await getClassList(empID);

    // get details of the teacher's leading class
    let cmd = 'select class_number from class where class_teacher=($1)';
    let {rows: returnedRows} = await client.query(cmd, [empID]);
    let leadingClass = returnedRows[0]['class_number'];

    for (let row of rows) {
        // get strength of each class
        let cmd = 'select count(*) from student where class_number=($1)';
        let cno = row['class_number'];
        let {rows} = await client.query(cmd, [cno])

        if (cno === leadingClass)
            result.leadingClass = {
                class_number: cno,
                class_strength:rows[0]['count']
            };

        result.classList.push({
            class_number: cno,
            class_strength: rows[0]['count']
        });
    }

    return result;
}


module.exports = getClassDetails;
