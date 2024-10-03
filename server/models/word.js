const mongoose = require('mongoose');
const dictionaryschema = mongoose.Schema({
    name : {type : String},
    data : Object
})
const dictionary = mongoose.model('Words',dictionaryschema);
module.exports=dictionary;