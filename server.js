const express = require('express')
const mongoose = require('mongoose')
const { title } = require('process')
var app = express()
var Data = require("./noteSchema") // (.)dot means that look in the same file as this file

mongoose.connect('mongodb://localhost/newDB')

mongoose.connection.once("open", ()=> {

    console.log("Connected to DB!")

}).on("error", (error)=> {

    console.log("Failed to connect" + error)
})

/**to send something or a make a change in the data  we need to make a POST request*/

//create a note
//POST request

//request (req) object : the data that iphone is sending us(note schema with title, date and data)
//response (res) object : what we are sending back 
app.post("/create", (req, res)=>{
    
    //create a note object to hold the info that iphone sends us
    var note = new Data({
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")
    })

    //saves to database
    note.save().then(()=> {

        if (note.isNew == false){
            console.log("Saved data!")
            res.send("Saved data") // to tell iphone we have received the request and succesfully dsaved it
        }else{
            console.log("Failed to save data")
        }
    })

})

//http://192.168.50.241:8081/create
var server = app.listen("8081", "192.168.50.241", ()=> {
    console.log("Server is running!")
})


//delete a note
//POST request
app.post("/delete", (req, res) => {
    Data.findByIdAndRemove({
        _id: req.get("id")
    }, (err) => {
        console.log("Failed" + err)
    })

    res.send("Deleted!")
})

//update a note
//POST request
app.post('/update', (req, res) => {
    Data.findOneAndUpdate({},{
        _id: req.get("id")
    },{
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")

    }, (err) => {
        console.log("Failed to update" + err)
    })

    res.send("Updated!")





})


//fetch all the notes
//Get request : to get something from the server
app.get('/fetch', (req, res) => {
    //This will give every time in Data
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})