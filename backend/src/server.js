const app = require('./app');
const mongoose = require('mongoose');

// URL de conexão com o MongoDB
const mongoURI = 'mongodb://mongo:27017/projetoPiripake'; // Nome do serviço MongoDB no docker-compose.yml

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
