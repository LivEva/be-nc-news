
const db = require('../db/connection');
const { fetchArticleById } = require('../models/models')


function fetchCommentsById(article_id){

    const commentsQuery = db.query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
   

const articleQuery = fetchArticleById(article_id)


const promiseArray = [commentsQuery, articleQuery]

    return Promise.all(promiseArray).then((result) => {


        const finalResult = result[0]
     
      
        return finalResult.rows;
    
      
    });
};




function addCommentToArticle(article_id, username, body){

    const postQuery = 'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;'

    
        return fetchArticleById(article_id)

.then(() => {

    return db.query(postQuery, [article_id, username, body])

})
        
            .then(({ rows }) => {

                return rows[0]

            })
    };




    function updateAnArticle(article_id, inc_votes){
        

        if(isNaN(inc_votes)){
            return Promise.reject({status: 400, msg: "Bad Request"})
        }

        return fetchArticleById(article_id).then(() => {

            return db.query(`UPDATE articles SET votes = votes+$1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id]).then((result) => {


                return result.rows[0]
          
              
          
                  })
             })
        
         };



         function deleteAComment(comment_id){


            if(isNaN(comment_id)){
                return Promise.reject({status: 400, msg: "Bad Request"})
            }

            return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [comment_id]).then(({rows}) => {

                if(rows.length === 0){
                    return Promise.reject({status: 404, msg: "Not Found"})
                }

           

            })


         }


 



    



module.exports = { fetchCommentsById, addCommentToArticle, updateAnArticle, deleteAComment }