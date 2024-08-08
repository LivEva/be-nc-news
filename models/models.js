const db = require('../db/connection');



function fetchTopics() {
  
    return db.query('SELECT * FROM topics;').then(({rows}) => {

        return rows;

    })

};




function fetchArticleById(article_id) {

    let sqlString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, 

    COUNT (comments.article_id) AS comment_count 

    FROM articles

    LEFT JOIN comments ON articles.article_id = comments.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id`


return db.query(sqlString, [article_id]).then(({ rows }) => {


if(rows.length === 0){
    return Promise.reject({
        status: 404,
        msg: `Article_id not found`
    })
}

return rows[0];

});
};



function fetchAllArticles(sort_by = 'created_at', order = 'desc', topic){


  const validSort_byColumns = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'article_img_url', 'comment_count']

  

  if(!validSort_byColumns.includes(sort_by)){

    return Promise.reject({status: 400, msg: "Invalid sort_by input"})

  }

  const orderIsValid = ['asc', 'desc']

if(!orderIsValid.includes(order)){

    return Promise.reject({status: 400, msg: "Invalid order input"})

}

let sqlString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 

COUNT (comments.article_id) AS comment_count 

FROM articles

LEFT JOIN comments ON comments.article_id = articles.article_id`

if(topic){

    sqlString += ` WHERE articles.topic = $1 GROUP BY articles.article_id 
    ORDER BY ${sort_by} ${order};`

    return db.query(sqlString, [topic]).then(({ rows }) => {

        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found'})
        }

        return rows;

    })

}

sqlString += ` GROUP BY articles.article_id 
ORDER BY ${sort_by} ${order};`

return db.query(sqlString).then(({ rows }) => {

    return rows;


})

}



function fetchCommentsById(article_id){

    const commentsQuery = db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at desc;`, [article_id])
   

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



         function fetchUsers(){

            return db.query(`SELECT * FROM users;`).then(({ rows }) => {

                return rows;
            })


         }














module.exports = { fetchTopics, fetchArticleById, fetchAllArticles, fetchCommentsById, addCommentToArticle, updateAnArticle, deleteAComment, fetchUsers }