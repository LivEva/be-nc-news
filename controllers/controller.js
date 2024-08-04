const { fetchTopics, fetchArticleById, fetchAllArticles, fetchCommentsById, addCommentToArticle, updateAnArticle, deleteAComment, fetchUsers }
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



function getCommentsById(request, response, next) {

  const { article_id } = request.params;

  fetchCommentsById(article_id).then((comments) => {

      response.status(200).send({ comments })

  }).catch((err) => {

      next(err);

  });
};




function addCommentOnArticle(request, response, next){

  const { article_id } = request.params;

  const { username, body } = request.body;

      addCommentToArticle(article_id, username, body).then((comment) => {

          response.status(201).send({comment})

      }).catch((err) => {

          next(err);

      })
};




function updateArticle(request, response, next){

  const { article_id } = request.params;

  const { inc_votes } = request.body;


  updateAnArticle(article_id, inc_votes).then((article) => {

      response.status(200).send({ article })


  }).catch((err) => {

      next(err)

  })
};



function deleteComment(request, response, next){

  const { comment_id } = request.params;


  deleteAComment(comment_id).then(() => {

      response.status(204).send();

  }).catch((err) => {

      next(err)

  })
};



function getUsers(request, response, next){

  fetchUsers().then((users) => {

      response.status(200).send({users})

  }).catch((err) => {

      next(err);

  })
}







module.exports = { getTopics, getAllEndpoints, getArticleById, getAllArticles, getCommentsById, addCommentOnArticle, updateArticle, deleteComment, getUsers }


