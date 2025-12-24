// const request = require('supertest');
// const app = require('./server');

// test('should return Hello World on /', async () => {
//   const response = await request(app).get('/');
//   expect(response.statusCode).toBe(200);
//   expect(response.text).toBe('Hello World');
// });

const request = require('supertest');
const app = require('./server');

test('should return Привіт, світ! on /', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe('Golota Kostia KI-221');
});
