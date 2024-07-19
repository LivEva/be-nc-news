const db = require('../db/connection');
const getArticleById = require('../controllers/controller')
const { checkTopicIsValid } = require('../db/seeds/utils')
const topicsData = require('../db/data/test-data/topics');
const { articleData } = require('../db/data/test-data');


function fetchTopics() {
  
    return db.query('SELECT * FROM topics;')

};

function fetchArticleById(article_id) {
return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then(({ rows }) => {


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


    // if(!checkTopicIsValid(topicsData, topic)){
    //     return Promise.reject({ status: 404, msg: 'No article found by this topic' })
    // }

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








//     return db.query( 
//         `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 

//         COUNT (comments.article_id) AS comment_count 

//         FROM articles 

//         LEFT JOIN comments 

//         ON comments.article_id = articles.article_id 

//         GROUP BY articles.article_id 

//         ORDER BY ${sort_by} ${order};`).then(({ rows }) => {
//         return rows;
//     });
// };








module.exports = { fetchTopics, fetchArticleById, fetchAllArticles }