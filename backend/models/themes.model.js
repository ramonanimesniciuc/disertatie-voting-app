module.exports = (sequelize, Sequelize) => {
    const Themes = sequelize.define("themes", {
        title:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        createdAt:{
            type:Sequelize.DATE
        },
        reward:{
            type:Sequelize.STRING
        }
    });

    return Themes;
};
