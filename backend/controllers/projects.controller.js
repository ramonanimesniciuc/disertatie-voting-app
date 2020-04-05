const db = require("../models");
const Projects = db.project;
const Comments = db.comments;
const Categories = db.categories;
const User = db.user;
const UsersVotes=db.user_votes;
exports.getAllProjects = (req, res , next) => {
   Projects.findAll({include:[{model:Categories},{model:Comments},{model:User,attributes:['last_name','first_name']}],where:{statusId:2}})
       .then((projects)=>{
           res.status(200).json({data:projects});
       })
       .catch((err)=>{
           next(err);
       })
};

exports.getFilteredProjects = (req, res , next) => {
    Projects.findAll({include:[{model:Categories},{model:Comments},{model:User,attributes:['last_name','first_name']}],where:{categoryId:req.params.id}})
        .then((projects)=>{
            res.status(200).json({data:projects});
        })
        .catch((err)=>{
            next(err);
        })
};

exports.getProjectById= (req,res,next)=>{
    Projects.findOne({where: {id: req.params.id},include:[{model:Categories},{model:Comments},{model:User,attributes:['last_name','first_name']}]}).then((project)=>{
        res.status(200).json({
            data:project
        })
    }).catch(err=>{
        return next(err);
    })
}

exports.addVoteToProject = (req,res,next)=>{
    UsersVotes.findOne({where:{userId:req.body.userId,projectId:req.params.id}}).then((success)=>{
        res.status(500).json({message:'Ai votat deja acest proiect!'});
    })
        .catch((err)=>{
            UsersVotes.create({projectId:req.params.id,userId:req.body.UserId})
                .then((userVote)=>{
                    Projects.findOne({where:{id:req.params.id}}).then((project)=>{
                        if(project){
                            Projects.update({votes:req.body.votes}, { where: { id: req.params.id } }).then((success)=>{
                                res.status(203).json({message:'Ati votat proiectul!!'})
                            })
                        }
                    })
                        .catch((err)=>{return next(err)})
                })
                .catch((err)=>{
                    return next(err);
                })
        })
}

exports.pendingProjects = (req,res,next)=>{
    Projects.findAll({include:[{model:Categories},{model:Comments},{model:User,attributes:['last_name','first_name']}],where:{statusId:1}}).then((projects)=>{
        res.status(200).json({
            data:projects
        })
    }).catch(err=>{
        return next(err);
    })
}

exports.getProjectUser = (req,res,next)=>{
    User.findOne({where:{id:req.params.id}}).then((user)=>{
        if(user){
            res.status(200).json({user:user});
        }
    })
        .catch((er)=>{
            next(er);
        })
}

exports.addProject = (req , res ,next)=>{
    Projects.create({
        title:req.body.title,
        content:req.body.content,
        votes: req.body.votes,
        statusId:req.body.statusId,
        createdAt: req.body.createdAt,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        activeInvolvement: req.body.activeInvolvement,
        shortDescription: req.body.shortDescription
    }).then((success)=>{
        res.status(201).json({
            message:'Proiectul a fost adaugat cu success!'
        })
    }).catch(err=>{
        return next(err);
    })
}

exports.checkVote = (req,res,next)=>{
    UsersVotes.findOne({where:{userId:req.params.userId,projectId:req.params.projectId}}).then(
        (success)=>{
            if(success){
                res.status(200).json({hasVoted:true});
            }else{
                res.status(200).json({hasVoted:false});
            }
        },
        (err)=>{
            return next(err);
        }
    )
}

exports.approveProject = (req,res,next)=>{
    const projectId=req.params.id;
    Projects.update({statusId:2},{where:{id:projectId}})
        .then((success)=>{
            console.log(success);
            return res.status(200).send('Project approved!');
        })
        .catch((err)=>{
            return next(err);
        })
}

exports.mostVoted = (req,res,next)=>{
    Projects.findAll({order: [
            ['votes', 'DESC'],
        ]}).then((projects)=>{
        res.status(200).json({
            data:projects[0]
        })
    }).catch(err=>{
        return next(err);
    })
}

exports.recentNumbers = (req,res,next)=>{
    let usersNo=0;
    let votesNo=0;
    let projectsNo=0;
    let commentsNo=0;
    User.findAll()
        .then((users)=>{
            usersNo=users.length;
            UsersVotes.findAll()
                .then((votes)=>{
                    votesNo=votes.length;
                    Projects.findAll()
                        .then((projects)=>{
                            projectsNo=projects.length;
                            Comments.findAll()
                                .then((comments)=>{
                                    commentsNo=comments.length;
                                    res.status(200).json({
                                        votesNo:votesNo,
                                        projectsNo: projectsNo,
                                        usersNo:usersNo,
                                        commentsNo: commentsNo
                                    });
                                })
                        })
                })
        })
        .catch((err)=>{
            return next(err);
        })
}

exports.deleteProject = (req,res,next)=>{
    Projects.destroy({where:{
            id:req.params.id
        }})
        .then((success)=>{
            res.status(200).json({message:'Proiectul a fost sters!'})
        })
}


exports.addComment = (req,res,next)=>{
    Comments.create(req.body).then((success)=>{
        res.status(201).json({message:'Am adaugat comentariul!'})
    })
        .catch((err)=>{
            return next(err);
        })
}
