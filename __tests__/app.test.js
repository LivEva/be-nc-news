const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');
const {articleData, commentData, topicData, userData} = require('../db/data/test-data/index');
const endpoints = require('../endpoints.json');
const comments = require('../db/data/test-data/comments');


beforeEach(() => {
   return seed({ topicData, userData, articleData, commentData })
})
afterAll(() => {
    if(db.end){
        return db.end()
    }
})

//TOPICS///////////////////////

describe("TOPICS", () => {

  describe('GET /api/topics', () => {
      
  
    test('responds with 200 status code and object containing expected keys with expected data type values', () => {

      return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {

        const topics = response.body.topics.rows

        expect(topics.length).toBe(3)
      topics.forEach((topic) => {
          expect(typeof topic.slug).toBe('string')
          expect(typeof topic.description).toBe('string')
        })
      })
    });
   
    test("Returns 404 status message when passed a valid but non existent request name", () => {
     
      return request(app)
      .get('/api/not-an-endpoint')
      .expect(404)
      .then(({body}) => {
       expect(body.msg).toBe("404 - request not found")
      })
    })
  });

  describe("/api - All available endpoints", () => {

    test("Returns 200 status code and description of all available endpoints", () => {
      return request(app)
      .get('/api')
      .expect(200)
      .then(({body}) => {
      expect(body.endpoints).toEqual(endpoints)
      })
    })
  });


});

//ARTICLES////////////////////

describe("ARTICLES", () => {

  describe("/api/articles/:article_id", () => {


    test("Returns 200 status code and the correct article when given valid article ID", () => {
      return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((response) => {

      const article = response.body.article
      expect(article).toMatchObject( {
        
          article_id: 1,
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: '2020-07-09T20:11:00.000Z',
          votes: 100,
          article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700' 
        })
      })
    });


    test("Returns the 400 status code when given an invalid article ID", () => {
      return request(app)
      .get('/api/articles/number-one')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request')
      })
    })
  });


  test("Returns a 404 status code when given an valid article ID but does not exist ", () => {
    return request(app)
    .get('/api/articles/20')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("No article found under article_id 20")
    })
  });


  test('Returns articles object with expected properties with correct datatypes', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then((response) => {

      const articles = response.body.articles;
    
      expect(articles.length).toBe(13)

      articles.forEach((article) => {
        expect(typeof article.article_id).toBe('number');
        expect(typeof article.title).toBe('string');
        expect(typeof article.topic).toBe('string');
        expect(typeof article.author).toBe('string');
        expect(typeof article.created_at).toBe('string');
        expect(typeof article.votes).toBe('number');
        expect(typeof article.article_img_url).toBe('string');
      })
    })
  });


  test("Returns the list of articles in descending order, showing the most recent date at the top of the list.", () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then((response) => {

      const firstArticle = response.body.articles[0]

      expect(firstArticle).toMatchObject( {
        article_id: 3,
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: '2020-11-03T09:12:00.000Z',
        votes: 0,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
      })
    })
  });


  test("Returns 200 status code and object with added property of comment_count.", () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({body}) => {

    const articles = body.articles;

    articles.forEach((article) => {
  expect(article).toHaveProperty('comment_count')
      })
    })
  });


  test("Returns 404 status message when passed a valid but non existent request name", () => {
     
    return request(app)
    .get('/api/not-an-endpoint')
    .expect(404)
    .then(({body}) => {
     expect(body.msg).toBe("404 - request not found")
    })
  });

})



//COMMENTS ///////////////////


describe("/api/articles/:article_id/comments'", () => {


  test("GET: Returns 200 status code and all the comments with the expected keys and value data types belonging to the article_id that is given.", () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then((response) => {

      const comments = response.body.comments

      expect(comments.length).toBe(11)

      comments.forEach((comment) => {

        expect(typeof comment.comment_id).toBe('number')
        expect(typeof comment.body).toBe('string')
        expect(typeof comment.article_id).toBe('number')
        expect(typeof comment.author).toBe('string')
        expect(typeof comment.votes).toBe('number')
        expect(typeof comment.created_at).toBe('string')
      })
    })
  });




  test("GET: Returns 200 status code and every array object that belongs to that article_id request", () => {
    return request(app)
    .get('/api/articles/3/comments')
    .expect(200)
    .then((response) => {

      const comments = response.body.comments

      expect(comments.length).toBe(2)

      expect(comments).toMatchObject(   [
        {
          comment_id: 10,
          body: 'git push origin master',
          article_id: 3,
          author: 'icellusedkars',
          votes: 0,
          created_at: '2020-06-20T07:24:00.000Z'
        },
        {
          comment_id: 11,
          body: 'Ambidextrous marsupial',
          article_id: 3,
          author: 'icellusedkars',
          votes: 0,
          created_at: '2020-09-19T23:10:00.000Z'
        }
      ])
    })
  });




  test("GET: Returns a 400 status code when given an invalid article_id request", () => {

    return request(app)
    .get('/api/articles/number-one/comments')
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad Request')
    })
  });




  test("GET: Returns a 404 status code when given a valid article_id but it does not exist.", () => {
    return request(app)
    .get('/api/articles/40/comments')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('No article found under article_id 40')
    })
  });
});




describe("POST", () => {



  
  test("POST: Returns 201 status code and sends back a new comment to the given article_id", () => {

    const newComment = { 
      username: 'butter_bridge', 
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!" }

    return request(app)
    .post('/api/articles/4/comments')
    .send(newComment)
    .expect(201)
    .then((response) => {

      const comment = response.body.comment;

      expect(comment).toEqual({

          article_id: 4,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          comment_id: 19,
          created_at: expect.any(String),
          author: 'butter_bridge',
          votes: expect.any(Number),
       
      })
    })
  });




  test("POST: Returns a 400 status code when the username or body does not have an input", () => {
    return request(app)
    .post('/api/articles/4/comments')
    .send({
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
    })
    .expect(400)
    .then(({ body }) => {

      expect(body.msg).toBe("Bad Request")
    })
  });




  test("POST: Returns 400 status code when the article_id provided is not valid", () => {

    return request(app)
    .post('/api/articles/number-four/comments')
    .send({
      username: 'butter_bridge', 
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!" 
    })
    .expect(400)
    .then(({ body }) => {

      expect(body.msg).toBe('Bad Request')
    })
  });




  test("POST: Returns 404 message when the article_id provided is valid but does not exist", () => {

    return request(app)
    .post('/api/articles/200/comments')
    .send({
      username: 'butter_bridge', 
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!" 
    })
    .expect(404)
    .then(({ body }) => {

      expect(body.msg).toBe('No article found under article_id 200')
    })
  });





  test("POST: Ignores any additional properties that are not required.", () => {

    return request(app)
    .post('/api/articles/4/comments')
    .send({
      username: 'butter_bridge',
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      nickname: "Mr Butter"
    })
    .expect(201)
    .then((response) => {

      const comment = response.body.comment;

      expect(comment).toEqual({

        article_id: 4,
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        comment_id: 19,
        created_at: expect.any(String),
        author: 'butter_bridge',
        votes: expect.any(Number),
     
      })
    })
  });


  test("Returns a 404 status message when passed a username that is not valid", () => {

    return request(app)
    .post('/api/articles/4/comments')
    .send({
      username: 'luna_lovegood',
      body: "I hope the Nargles don't steal my shoes",
    })
    .expect(404)
    .then(({ body }) => {

      expect(body.msg).toBe('username does not exist')
    })
  });



})

//create a test to check that the username is a string data type

//the user should be able to update the votes
//passing 




