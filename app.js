const express = require('express');
const app = express();
const conn = require('./conn');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/Register', (req, res) => {
  const { ln, fn, age, add } = req.body;

  const insert = `
    INSERT INTO tbl_students (last_name, first_name, age, address)
    VALUES (?, ?, ?, ?)
  `;

  const values = [ln, fn, age, add];

  conn.query(insert, values, (err) => {
    if (err) {
      console.error('Insert failed:', err.message);
      return res.status(500).send('Failed to insert data.');
    }

    res.send(`
      <script>
        alert('Data inserted successfully');
        location.href = '/';
      </script>
    `);
  });
});

conn.connect((error) => {
  if (error) {
    console.error('Database connection failed:', error.message);
    return;
  }

  console.log('Connected to MySQL');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
