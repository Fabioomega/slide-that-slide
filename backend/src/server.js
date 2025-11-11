const { port } = require('./config/env');
const connectDB = require('./config/connection');
const app = require('./app');

async function start() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
  });
}

start();