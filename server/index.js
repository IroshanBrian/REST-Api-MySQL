const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'react'
});

connection.connect(err => {
     if (err) throw err;
     console.log('Connected to MySQL database');
});
app.use(bodyParser.json());
app.get('/api/data', (req, res) => {
     connection.query('SELECT * FROM user', (error, results) => {
          if (error) throw error;
          res.json(results);
     });
});

app.post('/api/data', (req, res) => {
     const { name, age, email } = req.body;
     const query = 'INSERT INTO user (name, age, email) VALUES (?, ?, ?)';
     connection.query(query, [name, age, email], (error, results) => {
          if (error) throw error;
          res.json({ id: results.insertId, name, age, email });
     });
});

// Update route
app.put('/api/data/:id', (req, res) => {
     const { id } = req.params;
     const { name, age, email } = req.body;
     if (!name || !age || !email) {
          return res.status(400).json({ error: 'All fields are required' });
     }

     const query = 'UPDATE user SET name = ?, age = ?, email = ? WHERE id = ?';
     connection.query(query, [name, age, email, id], (error) => {
          if (error) throw error;
          res.json({ message: 'Record updated successfully' });
     });
});

// Delete route
app.delete('/api/data/:id', (req, res) => {
     const { id } = req.params;

     const query = 'DELETE FROM user WHERE id = ?';
     connection.query(query, [id], (error) => {
          if (error) throw error;
          res.json({ message: 'Record deleted successfully' });
     });
});

app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});
