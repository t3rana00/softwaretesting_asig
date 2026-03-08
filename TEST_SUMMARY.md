# Dog API Unit Testing Documentation

## 1. Project Description

This project implements comprehensive unit tests for a full-stack Dog API application built using **React**, **Express**, and **TypeScript**. The backend follows a **service layer architecture** and provides a REST API endpoint to fetch random dog images from the Dog CEO API.

### Architecture Overview
The application is structured in three main layers:
- **Service Layer** (`dogService.ts`): Handles API calls to Dog CEO API
- **Controller Layer** (`dogController.ts`): Processes requests and manages responses
- **Route Layer** (`dogRoutes.ts`): Defines API endpoints and routes

### Tested Endpoint
```
GET /api/dogs/random
```

### Unit Tests Coverage
Unit tests were implemented for all three layers:
- ✅ Service layer (`dogService.test.ts`)
- ✅ Controller layer (`dogController.test.ts`)
- ✅ Route layer (`dogRoutes.test.ts`)
- ✅ Integration tests (`dogApi.test.ts`)

**Total Tests Created:** 8 unit tests covering both positive and negative scenarios

---

## 2. GitHub Repository Link

The complete project repository is available at:

🔗 **[https://github.com/t3rana00/softwaretesting_asig.git](https://github.com/t3rana00/softwaretesting_asig.git)**

---

## 3. Test Execution Result

All unit tests were executed successfully using **Vitest**:

```
 RUN  v4.0.18 F:/Nadeesha/OAMK/software testing/Assignment 4/dog-starter-template/server

 ✓ tests/dogService.test.ts (2 tests) 2ms
 ✓ tests/dogController.test.ts (1 test) 3ms
 ✓ tests/dogRoutes.test.ts (2 tests) 17ms
 ✓ tests/dogApi.test.ts (3 tests) 19ms

 Test Files  4 passed (4)
      Tests  8 passed (8)
   Start at  15:33:33
   Duration  302ms (transform 134ms, setup 0ms, import 383ms, tests 41ms, environment 0ms)
```

### Test Execution Summary
- ✅ **Total Test Files:** 4
- ✅ **Total Tests:** 8
- ✅ **Passed:** 8/8 (100%)
- ✅ **Failed:** 0
- ✅ **Execution Time:** 302ms

---

## 4. Test Summary

### Test 1: Positive Test for dogService
**File:** `server/tests/dogService.test.ts`

**Objective:** Verify successful API response handling

**Test Details:**
- Mocks the Dog API response with valid image data
- Verifies that `imageUrl` matches the mocked API response
- Confirms `status` property returns "success"
- Ensures `fetch()` is called exactly once
- Uses `toHaveBeenCalledOnce()` for verification

**Expected Result:** ✅ PASS

---

### Test 2: Negative Test for dogService
**File:** `server/tests/dogService.test.ts`

**Objective:** Simulate API failure and verify error handling

**Test Details:**
- Mocks failed API response with HTTP 500 status
- Sets `ok: false` in mock response
- Verifies that the service throws an error
- Confirms error message contains "Dog API returned status 500"
- Tests proper error handling and rejection

**Expected Result:** ✅ PASS

---

### Test 3: Positive Test for dogController
**File:** `server/tests/dogController.test.ts`

**Objective:** Verify controller properly formats and returns service data

**Test Details:**
- Mocks the `getRandomDogImage()` service function
- Creates mock request and response objects
- Verifies returned JSON contains `success: true`
- Confirms response includes mocked dog data
- Uses `toHaveBeenCalledOnce()` to verify response JSON method call

**Expected Result:** ✅ PASS

---

### Test 4: Positive Test for dogRoutes
**File:** `server/tests/dogRoutes.test.ts`

**Objective:** Verify successful HTTP request handling at route level

**Test Details:**
- Mocks the `getRandomDogImage()` service function
- Makes GET request to `/api/dogs/random` endpoint
- Verifies HTTP status code is **200**
- Confirms response JSON has `success: true`
- Validates correct image URL in response data
- Tests complete request-response cycle

**Expected Result:** ✅ PASS

---

### Test 5: Negative Test for dogRoutes
**File:** `server/tests/dogRoutes.test.ts`

**Objective:** Verify error handling at route level

**Test Details:**
- Mocks service to throw an error
- Makes GET request to `/api/dogs/random` endpoint
- Verifies HTTP status code is **500** (Internal Server Error)
- Confirms response JSON has `success: false`
- Validates error message is returned
- Tests error propagation from service to HTTP response

**Expected Result:** ✅ PASS

---

### Integration Tests (dogApi.test.ts)

**Test 1:** Full API flow with successful response
- ✅ Verifies end-to-end request processing
- ✅ Validates fetch is called once
- ✅ Confirms status 200 and success true

**Test 2:** API error handling with 500 response
- ✅ Verifies error response format
- ✅ Confirms status 500 and success false
- ✅ Validates error message structure

**Test 3:** Invalid API status handling
- ✅ Tests service validation logic
- ✅ Verifies response to invalid status
- ✅ Confirms proper error handling

---

## 5. Tools and Technologies Used

### Testing Framework & Libraries
- **Vitest** v4.0.18 - Fast unit test framework
- **Supertest** - API endpoint testing library
- **Vitest UI** - Visual test result interface

### Backend Technologies
- **Node.js** - Runtime environment
- **Express.js** v4.18.2 - Web framework
- **TypeScript** v5.3.3 - Type safety
- **TSX** v4.7.0 - TypeScript execution

### Additional Dependencies
- **CORS** v2.8.5 - Cross-Origin Resource Sharing
- **dotenv** v16.6.1 - Environment variable management

### External API
- **Dog CEO API** (https://dog.ceo/api/breeds/image/random)

---

## 6. Key Testing Techniques Used

### Mocking & Stubbing
- **Service Mocking:** Using `vi.spyOn()` to mock service functions
- **Fetch Mocking:** Mocking global fetch API for external API calls
- **Request/Response Mocking:** Creating mock Express request/response objects

### Assertion Methods
- `expect().toBe()` - Exact value matching
- `expect().toHaveBeenCalledOnce()` - Verify function call count
- `expect().toBeInstanceOf()` - Type verification
- `expect().toContain()` - String inclusion checks

### Test Patterns
- **Positive Testing:** Verify successful operations
- **Negative Testing:** Verify error handling
- **Integration Testing:** End-to-end flow verification
- **Isolation Testing:** Individual component testing

---

## 7. Project Structure

```
dog-starter-template/
├── server/
│   ├── controllers/
│   │   └── dogController.ts
│   ├── services/
│   │   └── dogService.ts
│   ├── routes/
│   │   └── dogRoutes.ts
│   ├── tests/
│   │   ├── dogService.test.ts (2 tests)
│   │   ├── dogController.test.ts (1 test)
│   │   ├── dogRoutes.test.ts (2 tests)
│   │   └── dogApi.test.ts (3 tests)
│   ├── index.ts
│   └── package.json
├── src/ (React frontend)
└── package.json
```

---

## 8. Running the Tests

### Prerequisites
```bash
cd server
npm install
```

### Run All Tests
```bash
npm run test:run
```

### Run Tests in Watch Mode
```bash
npm test
```

### View Test UI
```bash
npm run test:ui
```

---

## 9. Conclusion

Unit testing was successfully implemented for all three layers of the Dog API backend application:

### Testing Achievements
✅ **Service Layer:** Tested API integration and error handling  
✅ **Controller Layer:** Verified request processing and response formatting  
✅ **Route Layer:** Validated HTTP request/response handling  
✅ **Integration:** Tested complete request-response flow

### Quality Assurance
- **100% Test Pass Rate:** All 8 tests passed successfully
- **Mocking Strategy:** Proper isolation of components using mocks and stubs
- **Comprehensive Coverage:** Both success and error scenarios tested
- **Error Handling:** Verified proper error propagation and handling

### Best Practices Applied
- ✅ Unit test isolation using mocks
- ✅ Clear, descriptive test names
- ✅ Positive and negative test scenarios
- ✅ Proper setup and teardown with `beforeEach()`
- ✅ Meaningful assertions with clear expectations

### Deliverables
- 8 comprehensive unit tests
- Full test suite execution confirmed
- GitHub repository with complete code
- Complete documentation and test summary

**Status:** ✅ **PROJECT COMPLETE** - All unit tests implemented and passing successfully.

---

## 10. Author & Date

**Course:** Software Testing (Assignment 4)  
**Institution:** Oulu University of Applied Sciences (OAMK)  
**Semester:** Spring 2026  
**Date:** February 21, 2026

---

## 11. References

- [Dog CEO API Documentation](https://dog.ceo/dog-api/)
- [Vitest Documentation](https://vitest.dev/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
