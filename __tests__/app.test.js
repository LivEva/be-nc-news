const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');
const {articleData, commentData, topicData, userData} = require('../db/data/test-data/index');
const endpoints = require('../endpoints.json')


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
  })
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
      expect(body.msg).toBe("No Article Found under article_id 20")
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
