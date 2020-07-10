const { authJwt } = require("../middlewares");
const controller = require("../controllers/projects.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/projects" , controller.getAllProjects);

    app.get(
        "/projects/:id",controller.getProjectById
    );

    app.get('/mostvoted',controller.mostVoted);
    app.get('/recentnumbers',controller.recentNumbers);
    app.post('/projects',controller.addProject,[authJwt.verifyToken]);
    app.get('/pendingprojects',controller.pendingProjects);
    app.get('/projectUser/:id',controller.getProjectUser);
    app.get('/deleteProject/:id',controller.deleteProject,[authJwt.verifyToken,authJwt.isAdmin]);
    app.get('/approveProject/:id',controller.approveProject,[authJwt.verifyToken,authJwt.isAdmin]);
    app.get('/check-vote/:projectId/:userId',controller.checkVote);
    app.post('/projects/:id/votes',controller.addVoteToProject);
    app.post('/comments',controller.addComment);
    app.get('/filterprojects/:id',controller.getFilteredProjects);
    app.get('/projectsbysponsor/:id',controller.getAllProjectsBySponsor);
    app.get('/project-approved-by-sponsor/:id',controller.approveProjectBySponsor);
    app.post('/collaborations',controller.addCollaboration,authJwt.verifyToken);
    app.get('/collaboration/:projectId/:userId',controller.checkCollaboration,authJwt.verifyToken)
    //
    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.isModerator],
    //     controller.moderatorBoard
    // );
    //
    // app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );
};
