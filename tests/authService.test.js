import supertest from 'supertest';
import app from '../server.js';
import { faker } from '@faker-js/faker';

const request = supertest(app);

describe('Auth Routes', () => {
  describe('POST /auth/register', () => {
    let dynamicEmail, dynamicName;

    beforeEach(() => {
      dynamicEmail = faker.internet.email();
      dynamicName = faker.internet.displayName();
    });

    it('should register a new user successfully', async () => {
      const response = await request.post('/auth/register').send({
        name: dynamicName,
        email: dynamicEmail,
        password: 'Password@123'
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('email', dynamicEmail);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return error when user already exists', async () => {
      await request.post('/auth/register').send({
        name: dynamicName,
        email: dynamicEmail,
        password: 'Password@123'
      });

      const response = await request.post('/auth/register').send({
        name: dynamicName,
        email: dynamicEmail,
        password: 'Password@123'
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already registered');
    });
  });

  describe('POST /auth/login', () => {
    let dynamicEmail, dynamicName;
    let token;

    beforeEach(async () => {
      dynamicEmail = faker.internet.email();
      dynamicName = faker.internet.displayName();

      const registerResponse = await request.post('/auth/register').send({
        name: dynamicName,
        email: dynamicEmail,
        password: 'Password@123'
      });

      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body.message).toBe('User created');

      const loginResponse = await request.post('/auth/login').send({
        email: dynamicEmail,
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
        email: dynamicEmail,
        password: 'wrongpassword'
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid login credentials');
    });
  });

  describe('GET /auth/profile', () => {
    let dynamicEmail, dynamicName;
    let token;

    beforeEach(async () => {
      dynamicEmail = faker.internet.email();
      dynamicName = faker.internet.displayName();

      const registerResponse = await request.post('/auth/register').send({
        name: dynamicName,
        email: dynamicEmail,
        password: 'Password@123'
      });

      const loginResponse = await request.post('/auth/login').send({
        email: dynamicEmail,
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
      expect(response.body.user).toHaveProperty('email', dynamicEmail);
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
