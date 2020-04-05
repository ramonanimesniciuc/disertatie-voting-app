const db = require("../models");
const Categories = db.categories;
const Projects = db.project;
const User = db.user;
const UserRole = db.user_role;
const Sequelize =require('sequelize');
exports.categoriesChartData = (req,res,next)=>{
    let data={
        categories:[],
        projects:[]
    };
    Categories.findAll()
        .then((categories)=>{
            for(let i=0;i<categories.length;i++){
                data.categories[i]=categories[i].title;
                Projects.findAll({where:{CategoryId:categories[i].id}})
                    .then((projects)=>{
                        data.projects[i]=projects.length;
                    });
            }
            setTimeout(()=>{res.status(200).json(data);},3000);
        })
}

exports.usersAgeChart =  (req , res , next)=>{
    let under30=0;
    let between30and60=0;
    let over60=0;
    Projects.findAll()
        .then((projects)=>{
            projects.forEach((project)=>{
                User.findOne({where:{id:project.userId}})
                    .then((user)=>{
                        if(user){
                            console.log(new Date().getFullYear() - new Date(user.birthdate).getFullYear());
                            if(new Date().getFullYear() - new Date(user.birthdate).getFullYear() > 18 && new Date().getFullYear() - new Date(user.birthdate).getFullYear() <30){
                                under30++;
                            }else if(new Date().getFullYear() - new Date(user.birthdate).getFullYear()>=30 && new Date().getFullYear() - new Date(user.birthdate).getFullYear() < 60){
                                between30and60++;
                            }else{
                                over60++;
                            }
                        }
                    })
            })
            setTimeout(()=>{
                res.status(200).json({under30: under30,between30and60:between30and60,over60:over60});
            },3000);
        })
}
const Op = Sequelize.Op;
exports.searchUser = (req,res,next)=>{
    let data=[];
    User.findOne({
        where: {
            [Op.or]:{ last_name: { [Op.like]: '%' + req.params.search + '%' }, first_name: { [Op.like]: '%' + req.params.search + '%'}}
        }
    }).then((user)=>{
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                data: user,
                roles: authorities,
            });
        });
        })
    .catch(err=>{
        return next(err);
    })
}

exports.updateUserRole = (req,res,next)=>{
    UserRole.update({roleId:3},{where:{userId:req.params.id}})
        .then(()=>{
            res.status(203).json({message:'Userul are drepturi de admin!'})
        })
        .catch((Err)=>{
            next(Err);
        })
}

exports.deleteUser = (req,res,next)=>{
    User.destroy({where:{
            id:req.params.id
        }})
        .then((success)=>{
            res.status(200).json({message:'Utilizatorul a fost sters!'})
        })
}


