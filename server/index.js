const express = require('express');
const mysql = require('mysql2');
const bp = require('body-parser')
const cors = require('cors')
const fs = require('fs');
const app = express()

const PORT = 4000;
const HOST = 'localhost';

app.use(bp.json())
app.use(cors())
app.use(bp.urlencoded({ extended: false }))


let connection;

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comments_db'
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

const runSQLFile = (fileName) => {
    fs.readFile(fileName, 'utf-8', function (err, data) {
        if (err) {
            console.error(`Error reading SQL file ${fileName}: ` + err.stack);
            return;
        }
        connection.query(data, function (error, results, fields) {
            if (error) {
                console.error(`Error executing SQL file ${fileName}: ` + error.stack);
                return;
            }
            console.log(`SQL file ${fileName} executed successfully`);
        });
    });
};

runSQLFile('sql/create/db.sql');
runSQLFile('sql/create/users.sql');
runSQLFile('sql/create/comments.sql');

app.post('/createUser', (req, res) => {
    console.log('asdasda')
    const user = {
      name: req.body.name,
      email: req.body.email
    };
    
    connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
      if (error) {
        console.error('Error saving comment: ' + error.stack);
        res.status(500).send('Error saving comment');
        return;
      }
      res.json({
        message: 'Comment saved successfully'
      });
    });
});

app.post('/comments', (req, res) => {
    const comment = {
      user_id: req.body.user_id,
      replies: req.body.replies,
      content: req.body.content,
      created_at: new Date()
    };
    
    connection.query('INSERT INTO comments SET ?', comment, function (error, results, fields) {
      if (error) {
        console.error('Error saving comment: ' + error.stack);
        res.status(500).send('Error saving comment');
        return;
      }
      res.json({
        message: 'Comment saved successfully'
      });
    });
});

app.get('/getAllComments', (req, res) => {
    connection.query('SELECT * FROM comments JOIN users ON comments.user_id = users.id', (error, results, fields) => {
        if (error) throw error;
        res.json(results)
      });
})

app.listen(PORT, () => {
    console.log(`Server is running: http://${HOST}:${PORT}`)
})