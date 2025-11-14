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
