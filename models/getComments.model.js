
const db = require('../db/connection');
const { fetchArticleById } = require('../models/models')





function fetchCommentsById(article_id){

    const commentsQuery = db.query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])

const articleQuery = fetchArticleById(article_id)

const promiseArray = [commentsQuery, articleQuery]


    return Promise.all(promiseArray).then((mystery) => {


        const result = mystery[0]

        //console.log(result.rows)
        
        return result.rows;



    })

   



    //We need to access the comments object and identify the ones that have the article_id matching the one that is given in the request and return back to the client which ones they are that match.

    //need to use getArticleById to check first that the article_id exists 

    //when we have a parametric check we need to always do a 400 test and a 404 test. 

}

module.exports = fetchCommentsById