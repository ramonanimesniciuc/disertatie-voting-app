const db = require("../models");
const Sponsors = db.sponsors;
const Themes = db.themes;
exports.getThemes = (req,res,next)=>{
    Themes.findAll().then((themes)=>{
        res.status(200).json({
            data:themes
        })
    })
}

