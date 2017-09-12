
// THE FILE WAS USED FOR GENERATING PASSWORDS

const url = 'postgres://wlujyglz:qbk6O5ReFPgBwzcWyl7ybRb6S7difYEh@pellefant.db.elephantsql.com:5432/wlujyglz';

const pg = require('pg');
const bcrypt = require('bcrypt');

const client = new pg.Client(url);
client.connect();

// var query = client.query('select * from student;');
// query.on('row', (row) => {console.log(row)});

var getTeachers = 'select * from teacher;';
var addPassword = 'update teacher set password=($1) where emp_id=($2)';

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