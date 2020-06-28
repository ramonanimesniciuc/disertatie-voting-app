const { authJwt } = require("../middlewares");
const controller = require("../controllers/sponsors.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/sponsors-themes", controller.getThemes);
};
