const { fetchCommentsById, addCommentToArticle } = require('../models/getComments.model')
const { checkUsernameIsValid } = require('../db/seeds/utils')
const usernames = require('../db/data/test-data/users')




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

module.exports = { getCommentsById, addCommentOnArticle }





// function addCommentOnArticle(request, response, next){

//     const { article_id } = request.params
//     const { username, body } = request.body

//   if(!username || !body){
//     return response.status(400).send({ msg: "username and body need an input"})
//   }
    
//     addCommentToArticle(article_id).then((comments) => {

//         response.status(202).send({comments})
    
//     }).catch((err) => {
//         next(err);
//     });
// };