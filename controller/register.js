'use strict'
let crud = require('../models/user');
let schema = require('../schema/user');
let utility = require('../utility/utility');



let findUser = (req, res, next) => {
    crud.findOne({ email: req.body.email }, schema, (err, response) => {
        if (err) {
            return res.status(400).json({ success: false, error: true, err, message: 'something went wrong in register' });
        }
        else if (response) {
            return res.status(200).json({ success: false, message: ' already registered', });
        }
        else {
            next();
        }
    })

}


let genareteHash = (req, res, next) => {
    utility.hash(req.body.password, (err, hash) => {
        if (err) {
            return res.status(400).json({ error: true, message: 'something went wrong genareteHash', err });
        }
        else {
            req.data = {};
            req.data.hash = hash;
            next();
        }
    })
}

let saveData = (req, res) => {
    let hash = req.data.hash;
    let data = {
        password: hash,
        email: req.body.email,
        name: req.body.name
    }
    crud.create(data, schema, (err, saved) => {
        if (err) {
            return err;
        }
        else {
            return res.status(200).json({ success: true, message: 'user registered successfully', saved });
        }
    })
}


module.exports = [
    findUser,
    genareteHash,
    saveData
]