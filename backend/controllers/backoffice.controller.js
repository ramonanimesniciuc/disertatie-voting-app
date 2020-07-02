const db = require("../models");
const sequelize = require('sequelize');
const Categories = db.categories;
const Projects = db.project;
const User = db.user;
const UserRole = db.user_roles;
const Comment = db.comments;
const Rewards = db.rewards;
const Sponsors = db.sponsors;
const Themes = db.themes;
const RewardsUsers =  db.rewards_user;
const Sequelize =require('sequelize');
const nodemailer = require("nodemailer");
let testAccount = nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "eb07011c847aca",
        pass: "e71a74985abe71"
    }
});
exports.getNewSponsors = (req,res,next)=>{
    Sponsors.findAll({where:{status:'NOK'}}).then((sponsors)=>{
        res.status(200).json({data:sponsors});
    })
}

exports.approveSponsor = (req,res,next)=>{
    Sponsors.update({status: 'OK'},{where:{id:req.params.id}}).then((sponsors)=>{
        res.status(204).json({message: 'Sponsor aprobat!'});
    })
}

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
        if(user){
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    data: user,
                    roles: authorities,
                });
            });
        }
        })
    .catch(err=>{
        return next(err);
    })
}

exports.getSponsorsWithoutApproval = (req,res,next)=>{
    Sponsors.findAll({where:{status: 'NOK'},include:[{model:Rewards},{model:Themes}]}).then((sponsors)=>{
        res.status(200).json({data: sponsors});
    })
}

exports.updateUserRole = (req,res,next)=>{
    // UserRole.findOne({where:{userId:req.params.id}}).then((user)=>{
    //     user.update({roled:3}).then((sucess)=>{
    //         res.status(203).json({message:'Userul are drepturi de admin'})
    //     })
    //         .catch((err)=>{
    //             res.status(500).json({message:err});
    //         })
    // })
    UserRole.update({roleId:3},{where:{userId:req.params.id}})
        .then(()=>{
            res.status(203).json({message:'Userul are drepturi de admin!'})
        })
        .catch((Err)=>{
            next(Err);
        })
}

exports.deleteUser = (req,res,next)=>{
    User.findOne({where:{id:req.params.id}}).then((user)=>{
        transporter.sendMail({
            from: '"DSU.VOT" <dsu.vot@gov.ro>', // sender address
            to: user.email, // list of receivers
            subject: "Contul tau pe DSU.VOT a fost sters.", // Subject line
            text: "Stergere cont DSU.VOT", // plain text body
            html: "<h4>Buna ziua,</h4>\n" +
                "<p>&nbsp;</p>\n" +
                "<p>In urma unei evaluari contul dvs a fost sters pentru comportament neadecvat in cadrul platformei.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p>Pentru orice nelamurire sau reclamatii va rugam sa ne contactati la : dsu.vot@gov.ro.</p>", // html body
        }).then((success)=>{
            User.destroy({where:{
                    id:req.params.id
                }})
                .then((succes)=>{
                    res.status(200).json({message:'Utilizatorul a fost sters!'})
                })
        })
    })

}

exports.getCommentsNoToday = (req,res,next)=>{
    const today= new Date();
    console.log(today);
    Comment.findAll({ where: sequelize.where( sequelize.fn('date', sequelize.col('createdAt')), '<', today)}).then((comments)=>{
   res.status(200).json({comments:comments});

})
}

exports.addReward = (req,res,next)=>{
Rewards.create(req.body).then((succes)=>{
    res.status(201).json({message:'Recompense adaugata cu success!'});
}).catch((err)=>next(err));
}

exports.rewardsData = (req,res,next)=>{
    let users = [];
    let reward = [];
    let totalPoints = 0;
    RewardsUsers.findAll().then((rewards)=>{
        for(let i=0;i< rewards.length ;i++) {
            if (users[rewards[i].userId]) {
                users[rewards[i].userId]++;
            } else {
                users[rewards[i].userId] = 1;
            }
            if (reward[rewards[i].rewardId]) {
                reward[rewards[i].rewardId]++;
            } else {
                reward[rewards[i].rewardId] = 1;
            }
            Rewards.findOne({where:{id:rewards[i].rewardId}}).then((r)=>{
                totalPoints +=r.points;
            })
        }
        users = Array.from(users, item => item || 0);
        reward = Array.from(reward, x => x ||0);
        console.log(users.indexOf(Math.max(...users)));
        console.log(reward);
        User.findOne({where:{id:users.indexOf(Math.max(...users))}}).then((user)=>{
            Rewards.findOne({where:{id:reward.indexOf(Math.max(...reward))}}).then((re)=>{
                res.status(200).json({user:user.last_name + ' ' + user.first_name,reward:re.title,totalPointsSpent:totalPoints});
            })
        })

    })
}


