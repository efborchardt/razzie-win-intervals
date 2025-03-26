import { Express } from 'express';
import request from 'supertest';
import { initializeApp } from '../../src/app';
import sequelize from '../../src/infrastructure/database';

describe('API - Movies Integration test', () => {
  const csvTestFilePath = "./data/movielist-test.csv";
  
  let app: Express;

  beforeAll(async () => {
    app = await initializeApp(csvTestFilePath);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('GET /api/movies - should return all movies - 200', async () => {
    const res = await request(app).get('/api/movies');
    
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(5);
    expect(res.body[0]).toEqual({
      title: "Title 1",
      studios: "Studio 1",
      year: 1980,
      winner: true,
      producers: [
        "Producer 1",
        "Producer 2",
        "Producer 3"
      ]
    });
  });
});