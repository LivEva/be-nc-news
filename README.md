# Northcoders News API

About this repo

This repo is the backend of a project that is a similar concept to websites such as Reddit. It allows users to search for articles, comment on articles and vote for articles.

This repo uses PSQL and Express.js to run the database and server.

VIEW THE PROJECT

https://be-nc-news-lhaf.onrender.com

INSTRUCTIONS ON LOCAL USE

Required versions of software on local machine:

- Node.js v21.7.3 (or later)
- Postgres v14 (or later)

- To clone this repo on your local machine use the following link:

https://github.com/LivEva/be-nc-news

- To download the depencies run the follwoing command in the terminal:

npm install

- This repo uses two databases, please set up the following 3 files:

1. file name: .env.development

PGDATABASE=[ insert database name ]

2. file name: .env.test

PGDATABASE=[ insert database name followed by '.test']

3. file name: .env.production

DATABASE_URL=[ insert URI connection string ]

It is important that you add these files to .gitignored.

RUNNING TESTS

To set up the databases on your local machine to allow for testing please do the following:

1. Setup local database:

npm run setup-dbs

2. Seed the database:

npm run seed

3. To test the files:

npm test [insert file name]

The test suite on this repo is app.test.js you can run the tests by inputting the following command in the terminal:

npm test app.test.js

INFORMATION ON THE PROJECT

Clients using this site will be able to search and find news articles. This backend repo has multiple endpoints that have been trialled and tested for success but also to handle cases where the client may provide search requests for information that does not exist or provide invalid information.

Here are the list of endpoints available in this repo and the information they can send to the user:

'/api'

- Returns information on all available endpoints and descriptions of how they should be interacted with.

'/api/articles'

Returns a list of all the articles on the database.
The information they contain are:

- author name
- title
- body (containing main information of the article)
- topic
- date created
- number of votes
- an image
- number of comments the article has
- article_id

- Returns a list of articles sorted in a partcular way, when given any of the above as a sort_by query e.g '/api/article/?sort-by=title'. This would return a list of articles sorted by title with the default order of descending.

'/api/articles/:article_id'

- Returns the specific article when provided with a valid article_id. (GET)
- Allows users to update an article's information by adding a vote to the article when given a valid article_id.(PATCH)
- If they provide an article_id that does not exist or is an invalid request, appropriate error messages will be shown to the client to inform them of the issue.

'/api/topics'

- Returns a list of all topics.
- If they provide an invalid endpoint, appropriate error messages will be shown to the client to inform them of the issue.

'/api/articles?topic=:topicName'

- users can search for specific topic names as long as the topic name exists in the database.
- If they provide a topic name that does not exist or an invalid endpoint, appropriate error messages will be shown to the client to inform them of the issue.

'/api/articles/:article_id/comments'

- Returns a list of all the comments on an article when given a valid article_id.
- Allows a user to add a comment to a specific article when given a valid article_id.
- If they provide an invalid endpoint of an article_id that doesnt exist, appropriate error messages will be shown to the client to inform them of the issue.

/api/comments/:comment_id'

- Allows a user to delete their comment on an article when given a valid comment_id.

'/api/users'

- Returns a list of all the users.
- Returns a user when given a valid username.

This repo contains a test suite containing all thorough testing for these endpoints and assures the appropriate information is sent back to the user. It can successfuly complete all the GET, POST, PATCH and DELETE methods with the intended results.

ERROR HANDLERS

A number of error handlers have also been created and tested to successfully take into account the different errors that could occur from a client's request.

These include:

- 404 error messages both with generic and specific messages if the request cannot be found.
- 400 error messages for invalid requests.
- 500 error message should the instance occur that there is a system issue.

ACKNOWLEDGEMENTS

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by Northcoders.
