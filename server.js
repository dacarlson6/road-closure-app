require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

//use CORS to handle cross-origin requests
app.use(cors());

console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'roadclosures',
  password: process.env.DB_PASSWORD,
  port: 5432
});
//const port = process.env.PORT || 3000;


//API endpoint
app.get('/roadclosures', async (req, res) => {
  try {
    const query = 'SELECT * FROM road_closure_data.closures'; // Ensure this is exactly correct
    console.log('Executing query:', query); // Log the query being executed
    const result = await pool.query(query);
    console.log('Query success:', result.rows); // Log the results
    res.json(result.rows);
  } catch (err) {
    console.error('Query error', err);
    res.status(500).send('Internal Server Error: ' + err.message); // Provide more error details
  }
});


//define the port to run the server on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});