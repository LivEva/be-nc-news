const { fetchCommentsById, addCommentToArticle, updateAnArticle, deleteAComment } = require('../models/getComments.model')
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








module.exports = { getCommentsById, addCommentOnArticle, updateArticle, deleteComment }




