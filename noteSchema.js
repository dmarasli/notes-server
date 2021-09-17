var mongoose = require("mongoose")
var Schema = mongoose.Schema

var note = new Schema({

    title:String,
    date:String,
    note:String

})

//creating a data object that is actually a note schema
const Data = mongoose.model("data", note)


//this allows us to access the note schema from the server.js file
//so using the export keyword allows us to send this to server.js
module.exports = Data