const fetchTopics
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

module.exports = { getTopics, getAllEndpoints }


