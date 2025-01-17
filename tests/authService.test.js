const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const { faker } = require('@faker-js/faker');

describe('Auth Routes', () => {
  describe('POST /auth/register', () => {
    let dynamicUsername;

    beforeEach(() => {
      dynamicUsername = faker.internet.username();
    });

    it('should register a new user successfully', async () => {
      const response = await request.post('/auth/register').send({
        username: dynamicUsername,
        password: 'Password@123'
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('username', dynamicUsername);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return error when user already exists', async () => {
      await request.post('/auth/register').send({
        username: dynamicUsername,
        password: 'Password@123'
      });

      const response = await request.post('/auth/register').send({
        username: dynamicUsername,
        password: 'Password@123'
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already registered');
    });
  });

  describe('POST /auth/login', () => {
    let dynamicUsername;
    let token;

    beforeEach(async () => {
      dynamicUsername = faker.internet.username();

      const registerResponse = await request.post('/auth/register').send({
        username: dynamicUsername,
        password: 'Password@123'
      });

      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body.message).toBe('User created');

      const loginResponse = await request.post('/auth/login').send({
        username: dynamicUsername,
        password: 'Password@123'
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.token).toBeDefined();

      token = loginResponse.body.token;
    });

    it('should return a valid token when logging in with correct credentials', async () => {
      expect(token).toBeDefined();
    });

    it('should return error when logging in with incorrect credentials', async () => {
      const response = await request.post('/auth/login').send({
        username: dynamicUsername,
        password: 'wrongpassword'
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid password');
    });
  });

  describe('GET /auth/profile', () => {
    let dynamicUsername;
    let token;

    beforeEach(async () => {
      dynamicUsername = faker.internet.username();

      const registerResponse = await request.post('/auth/register').send({
        username: dynamicUsername,
        password: 'Password@123'
      });

      const loginResponse = await request.post('/auth/login').send({
        username: dynamicUsername,
        password: 'Password@123'
      });

      token = loginResponse.body.token;
    });

    it('should return user profile with valid token', async () => {
      const response = await request
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('username', dynamicUsername);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return error when token is missing', async () => {
      const response = await request.get('/auth/profile');

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Token required');
    });

    it('should return error when token is invalid', async () => {
      const response = await request
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalidToken');

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Invalid token');
    });
  });
});
