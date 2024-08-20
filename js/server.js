const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Use CORS to handle cross-origin requests
app.use(cors());

// Set up your database connection here
const pool = new Pool({
  user: 'your_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432
});

// Sample API endpoint
app.get('/roadclosures', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_road_closure_table');
    res.json(result.rows);
  } catch (err) {
    console.error('Error on executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Define the port to run the server on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
