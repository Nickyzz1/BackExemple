// const express = require('express');
// const app = express();
// const port = 3000;
// const cors = require('cors')

// app.use(cors({
//   origin: "*"
// }))

// const pessoas = [
//   { id: 1, nome: 'Ana', idade: 28 },
//   { id: 2, nome: 'Carlos', idade: 34 },
//   { id: 3, nome: 'Maria', idade: 25 },
// ];

// app.get('/pessoas', (req, res) => {
//   res.json(pessoas);
// });

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });

// arquivo: server.js
const express = require('express');
const { pool } = require('./config/mysql');

const mongoUri = 'mongodb+srv://usuario:senha@cluster0.mongodb.net/nome_do_banco?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//mysql
// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/mysql/balls', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT id, quantity from UserBalls');
//     res.json(rows);
//   } catch (err) {
//     console.error('Erro ao buscar pessoas no MySQL:', err);
//     res.status(500).json({ error: 'Erro interno ao buscar pessoas no MySQL' });
//   }
// });

app.get('/mongo/pessoas', async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db('nome_do_banco');
    const pessoas = await db.collection('pessoas').find().toArray();
    res.json(pessoas);
  } catch (err) {
    console.error('Erro ao buscar pessoas no MongoDB:', err);
    res.status(500).json({ error: 'Erro interno ao buscar pessoas no MongoDB' });
  } finally {
    await mongoClient.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
