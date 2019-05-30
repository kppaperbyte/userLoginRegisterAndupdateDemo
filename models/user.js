
module.exports.create = function (data, schema, callBack) {
    schema.create(data, function (error, data) {
        if (error) {
            callBack(error, null)
        } else {
            callBack(null, data)
        }
    });
};

module.exports.find = function (data, schema, callBack) {
    schema.find(data, function (error, data) {
        if (error)
            callBack(error, null)
        else
            callBack(null, data)
    });
};



module.exports.findOne = function (condition, schema, callBack) {
    schema.findOne(condition, function (error, data) {
        if (error)
            callBack(error, null)
        else
            callBack(null, data)
    });
};




module.exports.updateOne = function (condition, data, options, schema, callBack) {
    schema.updateOne(condition, data, options, function (error, data) {
        if (error) {
            callBack(error, null)
        } else {
            callBack(null, data)
        }
    });
};

