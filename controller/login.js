'use strict'
let crud = require('../models/user');
let schema = require('../schema/user');
let utility = require('../utility/utility');
let jwt = require('jsonwebtoken');
let config=require('config');



let findUser = (req, res, next) => {
    req.data = {};
    let condition = { email: req.body.email }
    crud.findOne(condition, schema, (err, user) => {
        if (err) {
            return res.status(400).json({ error: true, success: false, message: 'error occured in findUser', error: err });
        }
        if (!user) {
            return res.status(203).json({ success: false, message: 'user not register with the system', user: req.body.email });
        }
        else {
            req.data.user = user;
            next();
        }
    })
};


let checkpasword = (req, res, next) => {
    let user = req.data.user;
    utility.checkHashPassword(req.body.password, user.password, function (err, isPasswordMatch) {
        if (isPasswordMatch) {
            const payload = {
                id: user._id,
                email: user.email,
            };
            var token = jwt.sign(payload, config.userSecret, {
                expiresIn: config.tokenValidity.days // expires in 24 hours
            });
            user.token = token;
            let userdata = {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
            return res.status(200).json({
                success: true,
                message: 'you are logged in',
                token: token,
                user: userdata
            });
        }
        else {
            return res.status(203).json({ success: false, message: 'password  not matched' });
        }
    });
};

module.exports = [
    findUser,
    checkpasword
]
