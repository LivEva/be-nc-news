const { fetchTopics, fetchArticleById, fetchAllArticles }
 = require('../models/models')
 const endpoints = require('../endpoints.json')



function getTopics(request, response, next){

fetchTopics().then((topics) => {

response.status(200).send({topics})

}).catch((err) => {

    next(err);
})
}



function getAllEndpoints(request, response, next){
 
response.status(200).send({endpoints})

}




function getArticleById(request, response, next){

    const { article_id } = request.params;


fetchArticleById(article_id).then((article) => {

response.status(200).send({ article })

}).catch((err) => {

    next(err);

  });
}; 










function getAllArticles(request, response, next) {

  const { sort_by, order, topic } = request.query;


  fetchAllArticles(sort_by, order, topic).then((articles) => {

    response.status(200).send({ articles })

  }).catch((err) => {

    next(err);

  });
};









module.exports = { getTopics, getAllEndpoints, getArticleById, getAllArticles }


