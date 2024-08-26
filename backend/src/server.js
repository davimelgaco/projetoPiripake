const app = require('./app');
const mongoose = require('mongoose');

// Conexão com o MongoDB (substitua pela sua URL do MongoDB)
mongoose.connect('mongodb://localhost:27017/projetoPiripake')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

