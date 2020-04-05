const { authJwt } = require("../middlewares");
const controller = require("../controllers/news.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/news", controller.getNews);
    app.post("/news",controller.addNews,[authJwt.verifyToken,authJwt.isAdmin]);

};
