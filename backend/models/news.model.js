module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        title:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        createdAt:{
            type:Sequelize.DATE
        },
        addedBy:{
            type:Sequelize.INTEGER
        }
    });

    return News;
};
