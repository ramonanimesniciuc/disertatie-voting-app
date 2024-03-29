module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        first_name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                len:[3,40]
            }
        },
        last_name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                len:[3,40]
            }
        },
        points:{
          type: Sequelize.INTEGER
        },
        username:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                len:[3,40]
            }
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                len:[3,40]
            }
        },
        isDSU:{
            type:Sequelize.BOOLEAN
        },
        phone:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                len:[3,40]
            }
        },
        birthdate:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
    });

    return User;
};
