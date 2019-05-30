'use strict'
let crud = require('../models/user');
let schema = require('../schema/user');

let upadteUserData = (req, res) => {

    if (req.body.password) {
        return res.status(400).json({ success: false, message: 'password can not be changed' });
    }
    crud.updateOne({ _id: req.decoded.id }, { $set: req.body },{}, schema, (err, updated) => {
        if (err) {
            return err;
        }
        else if (updated.n > 0 && updated.nModified > 0) {
            return res.status(200).json({ success: true, message: 'updated successfully' });
        }
        else {
            return res.status(201).json({ success: true, message: ' already update ' });
        }
    })
}

module.exports = [
    upadteUserData
]