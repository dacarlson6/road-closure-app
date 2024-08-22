require("dotenv").config(); 

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());

// Set up your PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const PORT = process.env.PORT || 8000;

// Endpoint to retrieve road closures
app.get('/roadclosures', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM road_closure_data.closures');
    res.json(result.rows);
  } catch (err) {
    console.error("Error on executing query", err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Road Closure App API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


