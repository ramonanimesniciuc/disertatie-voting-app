const { authJwt } = require("../middlewares");
const controller = require("../controllers/rewards.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/rewards", controller.getRewards,authJwt.verifyToken);
    app.get("/rewardsUser/:id",controller.getRewardsUser,authJwt.verifyToken);
    app.post("/buyVoucher",controller.buyVoucher,authJwt.verifyToken);
    app.post("/vouchers",controller.addReward,authJwt.verifyToken);
    app.get("/userpoints/:id",controller.getUserPoints,authJwt.verifyToken);
};
