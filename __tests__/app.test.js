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

  })



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

})