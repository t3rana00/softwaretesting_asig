import { vi, expect, test, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import * as dogService from '../services/dogService';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

beforeEach(() => {
  vi.clearAllMocks();
});

test('Test 4: GET /api/dogs/random returns 200 with success and mocked image data', async () => {
  const mockDogData = {
    imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
    status: "success"
  };

  vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce(mockDogData);

  const response = await request(app)
    .get('/api/dogs/random');

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data.imageUrl).toBe("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg");
});

test('Test 5: GET /api/dogs/random returns 500 on internal server error', async () => {
  vi.spyOn(dogService, 'getRandomDogImage').mockRejectedValueOnce(
    new Error("Failed to fetch dog image: Network error")
  );

  const response = await request(app)
    .get('/api/dogs/random');

  expect(response.status).toBe(500);
  expect(response.body.success).toBe(false);
  expect(response.body.error).toContain("Failed to fetch dog image: Network error");
});
