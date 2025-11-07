const mongoose = require('../config/connection');

const slide_shema = new mongoose.Schema({
    titulo: String,
    duracao: Number,
    conteudo: String,
    data_expiracao: Date
});

const Slide = mongoose.model('Slide', slide_shema, 'users');

module.exports = Slide;