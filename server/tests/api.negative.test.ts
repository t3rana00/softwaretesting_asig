import { expect, test } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

test('Test 2: Negative API test - GET /api/dogs/invalid returns 404 error', async () => {
  const response = await request(app)
    .get('/api/dogs/invalid');

  expect(response.status).toBe(404);
  
  expect(response).toBeDefined();
  
  expect(response.status).not.toBe(200);
  expect(response.status).toBe(404);
});
