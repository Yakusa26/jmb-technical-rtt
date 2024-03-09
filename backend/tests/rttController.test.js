const request = require('supertest');
const app = require('../server.js'); // Assure-toi que le chemin est correct

describe('Test du calcul de RTT', () => {
    it('Devrait calculer correctement les RTT pour 2020', async () => {
        const response = await request(app)
            .post('/api/calculer-rtt')
            .send({
                annee: 2020,
                joursTravailles: 218,
                congesPayes: 25
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.joursRTT).toEqual(10);
    });
});