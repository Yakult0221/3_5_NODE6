const express = require('express');
const app = express();
const connection = require('./const');


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/Register', (req, res)=>{
  const ln = req.body.ln;
  const fn = req.body.fn;
  const age = req.body.age;
  const add = req.body.add;

  res.send(`Registration complete for ${fn} ${ln}, age ${age}, address: ${add}`);
});

connection.connect((error) => {
  if (error) {
    console.error('Database connection failed:', error.message);
    return;
  }

  console.log('Connected to MySQL');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});