const db = require('../db/connection');
const getArticleById = require('../controllers/controller')


function fetchTopics() {
  
    return db.query('SELECT * FROM topics;')

};

function fetchArticleById(article_id) {
return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then(({ rows }) => {


if(rows.length === 0){
    return Promise.reject({
        status: 404,
        msg: `No article found under article_id ${article_id}`
    })
}

return rows[0];

});
};



function fetchAllArticles(){
   
    return db.query( 
        `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;`).then(({ rows }) => {
        return rows;
    });
};








module.exports = { fetchTopics, fetchArticleById, fetchAllArticles }