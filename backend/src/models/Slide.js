const mongoose = require("mongoose");

const slideShema = new mongoose.Schema({
    name: String,
    editorContent: {
        html: { type: String },
        css: { type: String },
        js: { type: String },
    },
    transitionTime: Number,
    expirationDate: String
});

module.exports = mongoose.model('Slide', slideShema, 'slideShema');