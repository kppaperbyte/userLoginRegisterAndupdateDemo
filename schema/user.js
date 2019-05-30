let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = new Schema({
    name: { type: String, lowercase: true },
    phoneNo: Number,
    email: { type: String, lowercase: true },
    password: String,
   
});

userSchema.plugin(AutoIncrement, { inc_field: 'id', id: "userId" });
module.exports = mongoose.model('user', userSchema);