const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'ba0nutknmiv5vd9kqvzn-mysql.services.clever-cloud.com',      //localhost
  user: 'ul9ibqevfzk0bdvg',    //ul9ibqevfzk0bdvg seu_usuario
  password: 'npJllcBxitjzYg3V1JST',   //npJllcBxitjzYg3V1JST
  database: 'ba0nutknmiv5vd9kqvzn', //ba0nutknmiv5vd9kqvzn
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0, 
  port: 3306
});

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS agora');
    console.log('Conectado ao MySQL em:', rows[0].agora);
  } catch (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } finally {
    await pool.end();
  }
}

module.exports = { pool, testConnection };

// usar clever cloud