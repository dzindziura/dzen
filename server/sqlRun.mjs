import fs from "fs";
import mysql from "mysql2";

let connection;
connection = mysql.createConnection({
    port: '8889',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comments_db'
});

connection.connect(async function (err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
    await runSQLFile('sql/create/db.sql');
    await runSQLFile('sql/create/users.sql');
    await runSQLFile('sql/create/comments.sql');
    await runSQLFile('sql/create/createUser.sql');
    await runSQLFile('sql/create/addComments.sql');
});

const runSQLFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', function (err, data) {
            if (err) {
                console.error(`Error reading SQL file ${fileName}: ` + err.stack);
                reject(err);
            }
            connection.query(data, function (error, results, fields) {
                if (error) {
                    console.error(`Error executing SQL file ${fileName}: ` + error.stack);
                    reject(error);
                }
                console.log(`SQL file ${fileName} executed successfully`);
                resolve();
            });
        });
    });
};