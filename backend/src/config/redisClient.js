const redis = require('redis');

// Cria um cliente Redis e conecta
const client = redis.createClient({
  host: 'redis', // Nome do serviço Redis no docker-compose.yml
  port: 6379
});

// Trata erros de conexão
client.on('error', (err) => {
  console.error('Redis error: ', err);
});

module.exports=client;