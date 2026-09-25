import request from 'supertest';
import app from '../src/index';

describe('Student Endpoints', () => {
    it('should deny access without token', async () => {
        const res = await request(app).get('/api/student/dashboard');
        expect(res.statusCode).toEqual(401);
    });
});