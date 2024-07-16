const db = require('../db/connection');


function fetchTopics() {
  
    return db.query('SELECT * FROM topics;')

}

function fetchArticleById(article_id) {
return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then(({ rows }) => {

if(rows.length === 0){
    return Promise.reject({
        status: 404,
        msg: `No Article Found under article_id ${article_id}`
    })
}
return rows[0];

});
};



module.exports = { fetchTopics, fetchArticleById }