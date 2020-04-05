const db = require("../models");
const Categories = db.categories;

exports.getCategories = (req,res,next)=>{
    Categories.findAll().then((categories)=>{
        res.status(200).json({
            data:categories
        })
    })
}
