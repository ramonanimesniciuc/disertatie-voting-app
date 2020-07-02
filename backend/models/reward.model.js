module.exports = (sequelize, Sequelize) => {
    const Rewards = sequelize.define("rewards", {
        title:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        createdAt:{
            type:Sequelize.DATE
        },
        points:{
            type:Sequelize.INTEGER
        },
        expiresAt:{
            type: Sequelize.DATE
        },
        codes:{
            type: Sequelize.STRING
        }
    });

    return Rewards;
};
