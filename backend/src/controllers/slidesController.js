const Slide = require("../models/Slide")

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
         console.log("Recebido no req.body:", req.body); 
        const new_slide = await Slide.create(req.body);

        res.status(200).json(new_slide);
    }
    catch (err) {
        console.error("Erro ao criar slide:", err);
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
