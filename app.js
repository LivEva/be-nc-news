const {articleData, commentData, topicData, userData} = require('../be-nc-news/db/data/test-data')
const { getTopics, getAllEndpoints } = require('./controllers/controller.js');
const express = require("express")
const app = express();

app.get('/api/topics', getTopics)


app.get('/api', getAllEndpoints)










//ERROR HANDLERS

app.use((err, request, response, next) => {
    if(err.code === '22P02'){
        response.status(400).send({ msg: "400 - Bad request" })
    }else{
        next(err);
    }
});


//this is for all undeclared enpoints. 
app.all("*",(request, response, next) => {
   response.status(404).send({ msg: "404 - request not found" })
});

app.use((err, request, response, next) => {
    console.log("HELLO FROM CODE 500!")
    response.status(500).send({message: "Internal Server Error"})
});









//app.use(err, request, response, next)

module.exports = app