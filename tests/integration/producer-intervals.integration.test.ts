import { Express } from 'express';
import request from 'supertest';
import { initializeApp } from '../../src/app';
import sequelize from '../../src/infrastructure/database';

describe('API - Producers Integration test', () => {
  const csvTestFilePath = "./data/movielist-test.csv";

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

    res.body.min.forEach((entry: any) => {
      expect(entry).toHaveProperty('producer');
      expect(entry).toHaveProperty('interval');
      expect(entry).toHaveProperty('previousWin');
      expect(entry).toHaveProperty('followingWin');
      expect(typeof entry.interval).toBe('number');
      expect(entry.interval).toBeGreaterThanOrEqual(1);
    });

    res.body.max.forEach((entry: any) => {
      expect(entry).toHaveProperty('producer');
      expect(entry).toHaveProperty('interval');
      expect(entry).toHaveProperty('previousWin');
      expect(entry).toHaveProperty('followingWin');
      expect(typeof entry.interval).toBe('number');
      expect(entry.interval).toBeGreaterThanOrEqual(res.body.min[0].interval);
    });
  });
});