// Importe o Modelo para buscar os slides
const Slide = require('../models/Slide');
// Importe o nosso "sinalizador"
const emitter = require('../services/eventEmitter');

exports.eventsHandler = (req, res, next) => {
    // 1. Definir os headers essenciais do SSE
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Envia os headers imediatamente

    // 2. Definir a função que envia os dados para *este* cliente
    //    Esta função será chamada sempre que o sinal 'slidesUpdated' for emitido
    const onSlidesUpdated = async () => {
        try {
            // Busca TODOS os slides válidos no banco
            // (Poderia ser a sua função 'getSlidesAtivos()' se a tiver)
            const slides = await Slide.find({}); // TODO: Adicione a sua lógica de filtro aqui

            // Envia o evento 'slidesUpdated' para o totem
            res.write('event: slidesUpdated\n');
            res.write(`data: ${JSON.stringify(slides)}\n\n`);
        } catch (err) {
            console.error("Erro ao enviar evento SSE:", err);
        }
    };

    // 3. "Ligar" esta função ao nosso sinalizador
    emitter.on('slidesUpdated', onSlidesUpdated);

    // 4. Lidar com o fecho da conexão (MUITO IMPORTANTE)
    //    Se o totem fechar o navegador, temos de "desligar" o 'listener'
    req.on('close', () => {
        emitter.off('slidesUpdated', onSlidesUpdated);
        res.end();
    });

    // 5. Enviar a lista inicial
    //    Como o PDF diz: "Sempre que um novo cliente ... estabelece conexão ... recebe todo o conjunto"
    onSlidesUpdated();
};