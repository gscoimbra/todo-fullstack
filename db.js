// SEM HOSPEDAGEM(RODANDO LOCALMENTE NO MEU PGADMIN):
// require('dotenv').config();
// const { Pool } = require('pg');
// const pool = new Pool();
// module.exports = pool;

// HOSPEDANDO NO RENDER:
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Render exige SSL!
});

module.exports = pool;