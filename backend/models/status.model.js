module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("statuses", {
        title:{
            type:Sequelize.STRING
        }
    });

    return Status;
};
