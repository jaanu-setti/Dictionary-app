const mongoose = require('mongoose');
const dictionaryschema = mongoose.Schema({
    name : {type : String}
})
const dictionary = mongoose.model('Words',dictionaryschema);
module.exports=dictionary;