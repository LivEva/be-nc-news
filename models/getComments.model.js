
const db = require('../db/connection');
const { fetchArticleById } = require('../models/models')


function fetchCommentsById(article_id){

    const commentsQuery = db.query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
    //this is our first query - the query request to the database retriving the comments that have the article_id matching the one given in the endpoint request.

const articleQuery = fetchArticleById(article_id)
//this is the second query, where we are finding out if the artcile exists in the first place. This is done by requiring over a seperate function that checks this specific thing and using it here on the article_id in question (made in the query above).

const promiseArray = [commentsQuery, articleQuery]
//this is a promise query where we have made an array holding BOTH of those queries above as a value. 
    return Promise.all(promiseArray).then((result) => {
//we use a promise.all on those two stored queries above to make sure that this only passes if both of those queries checks out. 

        const finalResult = result[0]
        //we spefify first that we want the certain result from the object. [0] is that section of the object. 
      
        return finalResult.rows;
    
        //we return back to the controller with the object found on rows. 
    });
};




function addCommentToArticle(article_id, username, body){

     if(!username || !body){
        return Promise.reject({ status: 400, msg: "username and body need an input" });
     }

    const postQuery = 'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;'

    
        return fetchArticleById(article_id)

        .then((article) => {

            if (!article) {

                return Promise.reject({ status: 404, message: `Not Found` })

            }

            return db.query(postQuery, [article_id, username, body])

            .then(({ rows }) => {


                return rows[0]
            })
        })
        
    }


    // if(!author || !body){
    //     return Promise.reject({ status: 400, msg: "Bad Request" });
    //  }

    // const postQuery = db.query('INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;', [article_id, author, body]);

    // const articleQuery = fetchArticleById(article_id);

    // console.log(articleQuery, "THIS IS THE RESULT FROM THE ARTICLE EXISTS CHECK ")

    // const promiseArray = [postQuery, articleQuery];

    //     return Promise.all(promiseArray).then((result) => {

    //         const response = result[0];

    //         console.log(response.rows, "THIS IS WHAT THE MODEL HAS CREATED")

    //         return response.rows;


    //     })
    


    



module.exports = { fetchCommentsById, addCommentToArticle }