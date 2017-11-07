
// THE FILE WAS USED FOR GENERATING PASSWORDS
const bcrypt = require('bcrypt');
const {Client} = require('pg');

const host = require('./config.json').url;
const client = new Client({
    connectionString: host,
    ssl: true
});
client.connect();


// var val = client.query('select * from teacher where emp_id=97398;');
// val.then(res => console.log(res.rows));
// var getTeachers = 'select * from teacher;';
// var addPassword = 'update teacher set password=($1) where emp_id=($2)';

// old pg module
// var query = client.query(getTeachers);
// query.on('row', (row) => {
//     bcrypt.hash(row['f_name'].toLowerCase(), 5, function (err, hash) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             values = [hash, row['emp_id']];
//             console.log(values);
//             client.query(addPassword, values);
//         }
// })
// });

// var query = client.query(getTeachers);
// query.on('row', (row) => {
//     console.log(row);
// })

//
// var s = 'select password from teacher where emp_id=64978;'
// var query = client.query(s);
// query.on('row', (row) =>{
//     bcrypt.compare('boote', row['password'], (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(res);
//         }
// });
// })


// update passwd for guardian
let guardians = client.query('select * from guardian');
let setPasswd = 'update guardian set password=($1) where register_id=($2)';

guardians.then(res => {
        res.rows.forEach(row => {
            bcrypt.hash(String(row['register_id']), 5, function (err, hash) {
                if (err)
                    console.log(err);
                else {
                    vals = [hash, row['register_id']];
                    // client.query(setPasswd, vals);
                }

            });
        });
});
