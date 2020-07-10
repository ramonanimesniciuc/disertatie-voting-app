module.exports = (sequelize, Sequelize) => {
    const Collaborations = sequelize.define("collaborations", {
        status:{
            type:Sequelize.STRING
        }
    });

    return Collaborations;
};
