import request from 'supertest';
import app from '../src/index';

describe('Lecturer Endpoints', () => {
    it('should deny access without token', async () => {
        const res = await request(app).get('/api/lecturer/modules');
        expect(res.statusCode).toEqual(401);
    });
});