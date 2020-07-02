const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Sponsor = db.sponsors;
const Themes = db.themes;
const Vouchers = db.rewards;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone,
        last_name:req.body.last_name,
        first_name:req.body.first_name,
        birthdate: req.body.birthdate,
        createdAt: req.body.createdAt,
        points: 0

    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([3]).then(() => {
                    res.send({ message: "Sponsor inregistrat!Te rugam sa astepti aprobarea de catre DSU." });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.sponsorsignup = (req, res) => {
    // Save User to Database
    Sponsor.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        status: 'NOK',
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        roleId: 3
    })
        .then(user => {

                // sponsor  role = 3
            if(req.body.type==='theme'){
                Themes.create({
                    title: req.body.theme_title,
                    description: req.body.theme_description,
                    reward: req.body.reward,
                    sponsorId: user.id
                }).then((success)=>{
                    res.send({ message: "Sponsor was registered successfully!" });
                })
            }else{
                Vouchers.create({
                    title:req.body.theme_title,
                    description: req.body.theme_description,
                    points: req.body.reward,
                    createdAt: new Date(),
                    sponsorId: user.id,
                    codes: req.body.codes
                }).then((success)=>{
                    res.send({ message: "Sponsor was registered successfully!" });
                })
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                this.sponsorsignin(req, res);
            }else {

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                var token = jwt.sign({id: user.id}, config.secret, {
                    expiresIn: 86400 // 24 hours
                });

                var authorities = [];
                user.getRoles().then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                        authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    }
                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        roles: authorities,
                        accessToken: token,
                        points: user.points
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.sponsorsignin = (req, res) => {
    Sponsor.findOne({
        where: {
            username: req.body.username,
            status: 'OK'
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Sponsor Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: ['ROLE_SPONSOR'],
                name: user.name,
                accessToken: token,
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
