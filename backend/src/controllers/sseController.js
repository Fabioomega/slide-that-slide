const Slide = require('../models/Slide');
const emitter = require('../services/eventEmitter');

exports.eventsHandler = (req, res, next) => {
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const onSlidesUpdated = async () => {
        try {
            const slides = await Slide.find({}); 

            res.write('event: slidesUpdated\n');
            res.write(`data: ${JSON.stringify(slides)}\n\n`);
        } catch (err) {
            console.error("Erro ao enviar evento SSE:", err);
        }
    };

    emitter.on('slidesUpdated', onSlidesUpdated);

    req.on('close', () => {
        emitter.off('slidesUpdated', onSlidesUpdated);
        res.end();
    });

    onSlidesUpdated();
};