import { healthService } from '../src/services/health.service';

describe('Health Service', () => {
    it('should return ok status', () => {
        const healthStatus = healthService();
        expect(healthStatus).toEqual({ status: 'ok' });
    });
});
