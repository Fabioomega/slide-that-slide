const Slide = require("../models/Slide")
const emitter = require('../services/eventEmitter');

exports.listSlides = async (req, res, next) => {
    try {
        const slides = await Slide.find({});

        res.status(200).json(slides);
    }
    catch (err) {
        next(err)
    }
}


exports.createSlides = async (req, res, next) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({
                message: "O corpo da requisição deve ser um ARRAY de slides."
            });
        }

        await Slide.deleteMany({});
        const new_slides = await Slide.insertMany(req.body);

        emitter.emit('slidesUpdated');
        res.status(200).json(new_slides);
    }
    catch (err) {
        console.error("Erro ao substituir slide:", err);
        next(err)
    }
}

exports.createTestSlide = async (req, res, next) => {
    try {
        // 1. Defina os dados de exemplo como um OBJETO
        //    que corresponde ao seu schema
        const dadosDoSlideExemplo = {
            name: 'Slide de Teste TCC',
            editorContent: {
                css: '',
                html: '<h1>hello world from test slide</h1>',
                js: ''
            },
            transitionTime: 10,
            expirationDate: null // null porque é opcional
        };

        // 2. Passe esse objeto para o Slide.create()
        const novoSlide = await Slide.create(dadosDoSlideExemplo);

        // 3. Retorne o slide criado (Status 201 = 'Created')
        console.log('Slide de teste criado!', novoSlide);
        res.status(201).json(novoSlide);
    }
    catch (err) {
        // Se algo falhar (ex: o schema mudou)
        next(err);
    }
};
