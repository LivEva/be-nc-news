const fetchCommentsById = require('../models/getComments.model')


function getCommentsById(request, response, next) {

    const { article_id } = request.params;

    fetchCommentsById(article_id).then((comments) => {

        response.status(200).send({ comments })

    }).catch((err) => {
        next(err);
    });
};

module.exports = getCommentsById
