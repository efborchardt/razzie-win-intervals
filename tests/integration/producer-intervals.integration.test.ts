import { Express } from 'express';
import request from 'supertest';
import { initializeApp } from '../../src/app';
import sequelize from '../../src/infrastructure/database';

describe('API - Producers Integration test', () => {
  const csvTestFilePath = "./data/movielist.csv";
  const expectedResponse = {
    min: [
      {
        producer: "Joel Silver",
        interval: 1,
        previousWin: 1990,
        followingWin: 1991
      }
    ],
    max: [
      {
        producer: "Matthew Vaughn",
        interval: 13,
        previousWin: 2002,
        followingWin: 2015
      }
    ]
  };

  let app: Express;

  beforeAll(async () => {
    app = await initializeApp(csvTestFilePath);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('GET /api/producers-intervals - should return correct min/max intervals - 200', async () => {
    const res = await request(app).get('/api/producers-intervals');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');
    expect(Array.isArray(res.body.min)).toBeTruthy();
    expect(Array.isArray(res.body.max)).toBeTruthy();
    expect(res.body.min.length).toBe(1);
    expect(res.body.max.length).toBe(1);
    assertMinMaxIntervalResponse(res.body.min[0], expectedResponse.min[0]);
    assertMinMaxIntervalResponse(res.body.max[0], expectedResponse.max[0]);
  });
});

function assertMinMaxIntervalResponse(entry: any, expectedEntry: { producer: string; interval: number; previousWin: number; followingWin: number; }) {
  expect(entry).toHaveProperty('producer');
  expect(entry.producer).toBe(expectedEntry.producer);

  expect(entry).toHaveProperty('interval');
  expect(entry.interval).toBe(expectedEntry.interval);

  expect(entry).toHaveProperty('previousWin');
  expect(entry.previousWin).toBe(expectedEntry.previousWin);

  expect(entry).toHaveProperty('followingWin');
  expect(entry.followingWin).toBe(expectedEntry.followingWin);
}
