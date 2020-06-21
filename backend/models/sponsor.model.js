module.exports = (sequelize, Sequelize) => {
    const Sponsors = sequelize.define("sponsors", {
        name:{
            type:Sequelize.STRING
        },
        username:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        status:{
            type : Sequelize.STRING
        }
    });

    return Sponsors;
};
