
let config = require('config');
let bcrypt = require('bcrypt');
let saltRounds = 10;
let jwt = require('jsonwebtoken');


module.exports.hash = (password, callback) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            callback(err, hash);
        });
    });
};



module.exports.checkHashPassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, res) {
        callback(err, res);
    });
};

module.exports.jwtToken = (payload, userType) => {
    let secret = userType == "user" ? config.userSecret : config.vendorSecret
    let token = jwt.sign(payload, secret, {
        expiresIn: "1 days" // expires in 24 hours
    });
    return token;
};
