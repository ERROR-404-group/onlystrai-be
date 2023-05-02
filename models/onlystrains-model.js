const mongoose = require('mongoose');
const { Schema } = mongoose; 

const OnlystrainSchema = new Schema({
  name: {type: String, required: true},
  thc: {type: Number, required: true},
  cbg: {type: Number, required: true},
  effects: {type: Object, required: true},
  flavors: {type: Object, required: true},
  image: {type: String, required: true},
  email: {type: String, required: true}
});

const OnlyStrain = mongoose.model('OnlyStrain', OnlystrainSchema);

module.exports = OnlyStrain