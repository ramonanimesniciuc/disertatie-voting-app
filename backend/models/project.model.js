module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
        title:{
            type:Sequelize.STRING,
            validate:{
                len:[3,40]
            }
        },
        content:{
            type:Sequelize.STRING,
            validate:{
                len:[3,2000000000000000]
            }
        },
        votes:{
            type:Sequelize.INTEGER
        },
        activeInvolvement:{
            type:Sequelize.BOOLEAN
        },
        shortDescription:{
            type: Sequelize.STRING
        },
        createdAt:{
            type:Sequelize.DATE
        },
        hasSponsorTheme:{
            type: Sequelize.INTEGER
        },
        hasSponsorApproval:{
            type: Sequelize.STRING
        }
    });
    return Project;
};
