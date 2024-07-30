# Northcoders News API

Instructions, after cloning this repo you will need to set up your own .env.test and .env.development files to include the database names following...

PGDATABASE=nc_news.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

Hosted version link: /////////////////

This repo is the backend of a project that is a similar concept to websites such as Reddit.

Clients using this site will be able to search and find news articles. This backend repo has multiple endpoints that have been trialled and tested for success but also to handle cases where the client may provide search requests for information that does not exist or provide invalid information.

Examples of information client's can access on this site:

- Documentation with descriptions of all the different endpoints available with instructions on how they should be interacted with.

- Articles that contain information such as:

* author name
* title
* body (containing main information of the article)
* topic
* date created
* number of votes
* an image
* number of comments the article has
* article_id

There are different ways a client can access specific articles.

- If the client provides a valid article_id in the api the article it belongs to will be successfully located. If they provide an article_id that does not exist or is an invalid request, appropriate error messages will be shown to the client to inform them of the issue.

- Clients are able to search for a list of all topics on the site as well as specific articles by topic. This repo can filter through the articles in the database and find all that match the topic name the client has provided in the query. If the client does not query a topic name the default will be a result of all the articles. Appropriate error messages will come up to inform the client if they have either provided a topic name that does not exist in the database or an invalid topic name.

- When accessing all the articles available, the order they are shown to the client will have a default of most recent topics at the top of the list. If the client provides an alternative order in the query api e.g they want the results to be sorted by the the number of votes, the articles will present to based off the 'votes' included with each article. The client can specify in the query if they want this to be in an ascending or descending order, the default is descending. The client will be receive this information successfully only if they provide a valid column name. If they do not, appropriate error messages will come up to inform them of the issue with the request.

- Articles on the site also have the addition of a comments section, the repo allows the client to successfully add a comment with 'POST' and the article will update after this has been submitted correctly. This means that the client provides a valid username and the body of the comment is not empty. Appropriate error messages will be shown to the client if the username they have provided is invalid or either of the username and body field has been left empty.

- Clients can also successfully delete any comments so long as they provide a valid comment_id. If they do not, an approproiate error message will be shown to inform them of the issue.

- Clients can search for users on the site which will provide them with the name, username and a avatar image.

- Clients can also add a vote to an article which will update accordingly whether they increment a vote or decrement a vote.

This repo contains test suite that has thoroughly tested the correct information is returned to the client depending on the type of api the site is provided. It can successfuly GET requests as well as POST and PATCH.

A number of error handlers have also been created and tested for successfully take into account the different errors that could occur from a client's request.

These include:

- 404 error messages both with generic and specific messages if the request cannot be found.
- 400 error messages for invalid requests.
- 500 error message should the instance occur that there is a system issue.

ADDITIONAL INFORMATION FOR THE SET-UP OF THIS REPO:

This repo can be cloned with this URL:

https://github.com/LivEva/be-nc-news.git

The dependencies needed for this repo are the following:

- jest
- express
- husky
- pg-format
- supertest
- pg
- dotenv

Please make sure all of these dependecies are installed correctly on your local machine using:

'npm run setup-dbs' and 'npm i' and 'run seed-prod'.

After this run in the terminal 'npm run seed'.

To run the test suite for this repo, jest will need to be successfully installed and the following command should be run in the terminal:

'npm test app.test.js'

Information about how to create the two .env files.

You will need to create your own env files:

- .env.test ( Inside file you will write PGDATABASE= (The name of the database on line 5 of this file) followed by a '\_test' .)

- .env.developement ( Inside file you will write PGDATABASE= (The name of the database on line 5 of this file))

The minimum version of Node.js to use for this repo is "1.0.0" .

postGres will need to be installed on your local machine. The version of postGres this repo runs on is 'v16'.
