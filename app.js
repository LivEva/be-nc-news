const {articleData, commentData, topicData, userData} = require('../be-nc-news/db/data/test-data')

const { getTopics, getAllEndpoints, getArticleById, getAllArticles } = require('./controllers/controller.js');

const { getCommentsById, addCommentOnArticle, updateArticle, deleteComment } = require('../be-nc-news/controllers/getComments.controller.js')

const express = require("express")

const app = express();

app.use(express.json());



app.get('/api/topics', getTopics)

app.get('/api', getAllEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.post('/api/articles/:article_id/comments', addCommentOnArticle)

app.patch('/api/articles/:article_id', updateArticle)

app.delete('/api/comments/:comment_id', deleteComment)



app.all("*",(request, response, next) => {
    response.status(404).send({ msg: "404 - request not found" })
 });










//ERROR HANDLERS

app.use((err, request, response, next) => {
    if(err.code === '22P02' || err.code === '23502'){
        response.status(400).send({ msg: "Bad Request" })
        
    }else if(err.code === '23503'){
        response.status(404).send({ msg: 'username does not exist' })
    }
    
    else{
        next(err);
    }
});


app.use((err, request, response, next) => {
    if(err.status && err.msg){
        response.status(err.status).send({ msg: err.msg })
    }else{
        next(err);
    }
});


//this is for all undeclared enpoints. 


app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send({message: "Internal Server Error"})
});









//app.use(err, request, response, next)

module.exports = app