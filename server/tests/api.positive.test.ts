import { vi, expect, test, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

beforeEach(() => {
  vi.clearAllMocks();
});

test('Test 1: Positive API test - GET /api/dogs/random returns dog image successfully', async () => {
  const mockDogData = {
    message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
    status: "success"
  };

  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockDogData),
  });

  global.fetch = mockFetch;

  const response = await request(app)
    .get('/api/dogs/random');

  expect(response.status).toBe(200);
  
  expect(response.body.success).toBe(true);
  
  expect(response.body.data).toBeDefined();
  
  expect(response.body.data.imageUrl).toBeDefined();
  
  expect(typeof response.body.data.imageUrl).toBe('string');
  expect(response.body.data.imageUrl).toBe("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg");
});
