const mongoose = require("mongoose");

const slideShema = new mongoose.Schema({
    name: string,
    editorContent: {
        html: { type: string },
        css: { type: string },
        js: { type: string },
    },
    transitionTime: number,
    expirationDate: string
});

module.exports = mongoose.model('Slide', slideShema, 'slideShema');