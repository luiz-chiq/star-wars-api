const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(express.json());
app.use(routes);

app.listen(3004, () => {
  console.log(`Servidor rodando na porta 3004`);
});