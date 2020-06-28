const { authJwt } = require("../middlewares");
const controller = require("../controllers/backoffice.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/users/:search',controller.searchUser, [authJwt.verifyToken, authJwt.isAdmin])
    app.get("/usersAgeChart", controller.usersAgeChart);
    app.get("/categoriesChartData",controller.categoriesChartData);
    app.get("/updateUserToAdmin/:id",controller.updateUserRole,[authJwt.verifyToken, authJwt.isAdmin]);
    app.get("/deleteUser/:id",controller.deleteUser,[authJwt.verifyToken, authJwt.isAdmin])
    app.get("/commentsToday",controller.getCommentsNoToday,[authJwt.verifyToken,authJwt.isAdmin])
    app.post("/rewards",controller.addReward,[authJwt.verifyToken,authJwt.isAdmin])
    app.get("/rewardsData",controller.rewardsData,authJwt.verifyToken)
    app.get('/newsponsors',controller.getNewSponsors,authJwt.verifyToken)
    app.get('/sponsorswithoutapproval',controller.getSponsorsWithoutApproval,authJwt.verifyToken)
    app.get('/approveSponsor/:id',controller.approveSponsor,authJwt.verifyToken)
};
