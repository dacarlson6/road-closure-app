const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

//use CORS to handle cross-origin requests
app.use(cors());

require('dotenv').config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
//const port = process.env.PORT || 3000;


//API endpoint
app.get('/roadclosures', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM road_closure_data');
    res.json(result.rows);
  } catch (err) {
    console.error('Error on executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

//define the port to run the server on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
