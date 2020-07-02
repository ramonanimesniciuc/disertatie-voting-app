const db = require("../models");
const Rewards = db.rewards;
const RewardsUser= db.rewards_user;
const User = db.user;

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
exports.getRewards = (req,res,next)=>{
    Rewards.findAll().then((rewards)=>{
        const vouchersToSend =[];
        rewards.forEach((reward)=>{
            if(reward.codes!=='' && reward.codes.split(';').length > 0){
              const newReward ={
                  id: reward.id,
                  title: reward.title,
                  points: reward.points,
                  description: reward.description,
                  sponsorId: reward.sponsorId,
                  vouchersLeft: reward.codes.split(';').length
              }
                vouchersToSend.push(newReward);
            }
        })
        setTimeout(()=>{
            res.status(200).json({
                data:vouchersToSend
            })
        },1200)

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
    RewardsUser.create({userId: parseInt(req.body.userId),rewardId: req.body.rewardId,createdAt:new Date(),updatedAt: new Date()})
        .then((success)=>{
        User.update({points:req.body.pointsRemainig},{where:{id:parseInt(req.body.userId)}})
            .then((user)=>{
            Rewards.findOne({where:{id:req.body.rewardId}}).then((voucher)=>{
                let reward = voucher.codes.split(';')[0];
                console.log(reward);
                transporter.sendMail({
                    from: '"DSU.VOT" <nimesniciucramona15@stud.ase.ro>', // sender address
                    to: 'ramorra30@gmail.com', // list of receivers
                    subject: "Voucherul achizionat prin DSU.VOT.", // Subject line
                    text: "Ati cumparat cu puncte un voucher.", // plain text body
                    html: "<h4>Buna ziua,</h4>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>Mai jos gasiti codul pe care il puteti folosi pentru a beneficia de voucherul achizionat.</p>\n" +
                        "<p>&nbsp;</p>\n" +
                        "<p>Codul : " + reward + "</p>\n" +
                        "<p>Pentru orice nelamurire sau reclamatii va rugam sa ne contactati la : dsu.vot@gov.ro.</p>", // html body
                }).then((success)=>{
                    const newCodes = voucher.codes.replace(reward + ';','');
                    Rewards.update({codes: newCodes},{where:{id: req.body.rewardId}}).then(()=>{
                        res.status(200).json({message:'Voucher achizionat.Verifica emailul!'})
                    })

                })
                    .catch((err)=>{
                        res.status(501).json({message:err})
                    })
            })
                .catch((err)=>{
                    console.log(err);
                })


        })
            .catch((err)=>{
                console.log(err)
            })
    }).catch((err)=>{console.log(err)})
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

exports.getVouchersBySponsor = (req,res,next)=>{
    Rewards.findAll({where:{sponsorId: req.params.id}}).then((rewards)=>{
        res.status(200).json({data:rewards});
    })
}
