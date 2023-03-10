const express = require('express');
const mysql = require('mysql2');
const bp = require('body-parser')
const cors = require('cors');
const app = express()
require('dotenv').config();

const PORT = process.env.port;
const HOST = process.env.host;
app.use(bp.json())
app.use(cors())
app.use(bp.urlencoded({ extended: false }))


let connection;

connection = mysql.createConnection({
    host: HOST,
    user: process.env.user_mysql,
    password: process.env.pass_mysql,
    database: 'comments_db'
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

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
        message: 'Comment saved successfully',
      });
    });
});

app.post('/comments', (req, res) => {
    const comment = {
      user_id: req.body.user_id,
      id_replies: req.body.id_replies,
      replies: 1,
      content: req.body.content,
      created_at: new Date()
    };
    connection.query('INSERT INTO comments SET ?', comment, function (error, results, fields) {
      if (error) {
        console.error('Error saving comment: ' + error.stack);
        res.status(500).send('Error saving comment');
        return;
      }
      res.json({comment_id: results.insertId, ...comment});
    });
});

app.get('/getAllComments', (req, res) => {
    connection.query('SELECT * FROM comments RIGHT JOIN users ON users.user_id = comments.user_id', (error, results, fields) => {
        if (error) throw error;
        console.log(results)
        res.json(results)
      });
})

app.listen(PORT, () => {
    console.log(`Server is running: http://${HOST}:${PORT}`)
})