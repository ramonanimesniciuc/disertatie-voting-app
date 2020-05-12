const db = require("../models");
const Rewards = db.rewards;
const RewardsUser= db.rewards_user;
const User = db.user;
exports.getRewards = (req,res,next)=>{
    Rewards.findAll().then((rewards)=>{
        res.status(200).json({
            data:rewards
        })
    })
}

exports.getRewardsUser =  (req , res , next)=>{
    const rewardsData=[];
RewardsUser.findAll({where:{userId:req.params.id}}).then((rewards)=>{
    for(let i=0;i<rewards.length;i++){
        User.findOne({where:{id:rewards[i].userId}}).then((user)=>{
            Rewards.findOne({where:{id:rewards[i].rewardId}}).then((reward)=>{
                rewardsData.push({reward:reward,userData:user});
            });

        })
    }
   setTimeout(()=>{
       res.status(200).json({data:rewardsData});
   },1500);
})
}

exports.buyVoucher = (req,res,next)=>{
    console.log(req.body);
    RewardsUser.create({userId: parseInt(req.body.userId),rewardId: req.body.rewardId,createdAt:new Date(),updatedAt: new Date()}).then((success)=>{
        User.update({points:req.body.pointsRemainig},{where:{id:parseInt(req.body.userId)}}).then((user)=>{
            console.log(user);
            res.status(201).json({message:'Voucher cumparat!'});
        })
    }).catch((err)=>next(err))
}

exports.addReward = (req,res,next)=>{
    Rewards.create(req.body).then((success)=>{
        res.status(201).json({message:'Success'});
    })
}

exports.getUserPoints = (req,res,next)=>{
    User.findOne({where:{id: req.params.id}}).then((user)=>{
        res.status(200).json({points:user.points});
    })
}
