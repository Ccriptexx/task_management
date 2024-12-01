import {Request, Response} from 'express';
import {healthService} from '../../services/health.service';

export const healthController = (_req: Request, res: Response) => {
    const data = healthService();
    res.json(data);
};
