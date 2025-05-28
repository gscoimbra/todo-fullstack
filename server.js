const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API online!');
});

// Listar tarefas
app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(result.rows);
});

// Adicionar tarefa
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (description) VALUES ($1) RETURNING *',
    [description]
  );
  res.json(result.rows[0]);
});

// Marcar/desmarcar como feito
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *',
    [done, id]
  );
  res.json(result.rows[0]);
});

// Deletar tarefa
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.sendStatus(204);
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
