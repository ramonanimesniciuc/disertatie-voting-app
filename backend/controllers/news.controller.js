const db = require("../models");
const News = db.news;
exports.getNews = (req,res,next)=>{
    News.findAll().then((news)=>{
        res.status(200).json({
            data:news
        })
    })
}

exports.addNews =  (req , res , next)=>{
    News.create(req.body).then((news)=>{
        res.status(200).json({
            message:'Stirea a fost adaugata cu success!'
        })
    }).catch(err=>{
        return next(err);
    })
}
