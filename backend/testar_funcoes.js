// Ficheiro: testarFuncoes.js

const mongoose = require('mongoose');
// Importe o seu ficheiro de modelo (ajuste o caminho se necessário)
const SlideModel = require('./model/slide'); 
// Importe o seu ficheiro de funções (ajuste o caminho se necessário)
const slideController = require('./model/crud'); 

// Esta é a URL que o Docker Compose fornece ao seu backend
// Usamos 'mongo' como host, não 'localhost'
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:root@mongo:27017/';

// Função principal assíncrona para correr os testes
async function executarTestes() {
  try {
    // --- 1. CONECTAR ---
    console.log('A tentar conectar-se ao MongoDB...');
    await mongoose.connect(MONGO_URL, {
      dbName: 'servidor_propaganda' // Especifique a BD
    });
    console.log('✅ Conexão com o MongoDB estabelecida!');

    // --- 2. TESTE DE CRIAÇÃO (Missão 3) ---
    console.log('\n--- Teste 1: criarSlide ---');
    const dadosSlideTeste = {
      titulo: "Slide de Teste Automático",
      duracao: 15,
      conteudo: "<h2>Este é um slide de teste</h2>",
      data_expiracao: new Date("2099-01-01T00:00:00.000Z") // Uma data no futuro
    };
    
    const novoSlide = await slideController.criarSlide(dadosSlideTeste);
    console.log('Slide criado com sucesso:', novoSlide.titulo);

    // --- 3. TESTE DE LEITURA (Missão 4) ---
    console.log('\n--- Teste 2: getSlidesAtivos ---');
    const slidesAtivos = await slideController.getSlidesAtivos();
    
    console.log(`Encontrados ${slidesAtivos.length} slides ativos.`);
    console.log('Títulos:', slidesAtivos.map(s => s.titulo));

    // Verificar se o nosso slide de teste está na lista
    const encontrou = slidesAtivos.some(s => s.titulo === "Slide de Teste Automático");
    if (encontrou) {
      console.log('✅ SUCESSO: O slide de teste foi encontrado!');
    } else {
      console.error('❌ FALHA: O slide de teste não foi encontrado nos slides ativos.');
    }

  } catch (err) {
    console.error('\n❌ ERRO GERAL NO TESTE:', err.message);
  } finally {
    // --- 4. DESCONECTAR ---
    // Fecha a ligação para que o script termine
    console.log('\nFechando conexão...');
    await mongoose.connection.close();
  }
}

// Executa a função de teste
executarTestes();