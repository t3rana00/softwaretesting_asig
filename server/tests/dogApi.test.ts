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

test('Test 1: Positive test - API returns dog image with success true', async () => {
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
  expect(response.body.data.imageUrl).toBe("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg");
  expect(response.body.data.status).toBe("success");
  expect(mockFetch).toHaveBeenCalledOnce();
});

test('Test 2: Negative test - API returns 500 error when fetch fails', async () => {
  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: false,
    status: 500,
  });

  global.fetch = mockFetch;

  const response = await request(app)
    .get('/api/dogs/random');

  expect(response.status).toBe(500);
  expect(response.body.success).toBe(false);
  expect(response.body.error).toContain('Dog API returned status 500');
});

test('Test 3: Negative test - API returns 500 with custom error message', async () => {
  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "failed"
    }),
  });

  global.fetch = mockFetch;

  const response = await request(app)
    .get('/api/dogs/random');

  expect(response.status).toBe(500);
  expect(response.body.success).toBe(false);
  expect(response.body.error).toContain('Failed to fetch dog image from API');
});
