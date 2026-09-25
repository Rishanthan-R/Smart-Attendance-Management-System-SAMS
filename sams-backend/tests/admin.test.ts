import request from 'supertest';
import app from '../src/index';

describe('Admin Endpoints', () => {
    it('should deny access without token', async () => {
        const res = await request(app).get('/api/admin/dashboard');
        expect(res.statusCode).toEqual(401); // Unauthorized
    });
});