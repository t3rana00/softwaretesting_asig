import { vi, expect, test } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

test('Test 3: returns success with mocked dog image data', async () => {
  const mockDogData = {
    imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
    status: "success"
  };

  vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce(mockDogData);

  const mockReq = {};
  const mockRes = {
    json: vi.fn().mockReturnThis(),
  };

  await getDogImage(mockReq as any, mockRes as any);

  expect(mockRes.json).toHaveBeenCalledOnce();
  expect(mockRes.json).toHaveBeenCalledWith({
    success: true,
    data: mockDogData
  });
});
