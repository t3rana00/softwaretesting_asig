import { vi, expect, test } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

test('Test 1: returns the correct image URL and status', async () => {
  const mockResponse = {
    message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
    status: "success"
  };

  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  global.fetch = mockFetch;

  const response = await getRandomDogImage();

  expect(response.imageUrl).toBe("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg");
  expect(response.status).toBe("success");
  expect(mockFetch).toHaveBeenCalledOnce();
});

test('Test 2: throws error when API returns 500', async () => {
  const mockFetch = vi.fn().mockResolvedValueOnce({
    ok: false,
    status: 500,
  });

  global.fetch = mockFetch;

  try {
    await getRandomDogImage();
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain('Dog API returned status 500');
  }
});