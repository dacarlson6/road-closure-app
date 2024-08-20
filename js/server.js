const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

//use CORS to handle cross-origin requests
app.use(cors());

//set up database connection
const pool = new Pool({
  user: 'postgres',
  host: 'roadclosure-db.citijmpomrxh.us-east-1.rds.amazonaws.com',
  database: 'roadclosure-db',
  password: 'Water2019!',
  port: 5432
});

//API endpoint
app.get('/roadclosures', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_road_closure_table');
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
