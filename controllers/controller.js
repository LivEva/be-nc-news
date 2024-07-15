const fetchTopics
 = require('../models/models')

exports.getTopics = (request, response, next) => {
fetchTopics().then((topics) => {
response.status(200).send({topics})
}).catch((err) => {
    console.log(err, "this is the error.")
    next(err);
})
}


