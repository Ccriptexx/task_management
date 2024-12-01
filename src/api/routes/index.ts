import express, { Request, Response } from 'express';
import { routes } from './routes';

const router = express.Router();

routes.forEach((route) => {
    router[route.method](route.path, ...(Array.isArray(route.handler) ? route.handler : [route.handler]));
});

/**
 * Fetches routes from a service
 * System routes
 */
router.get('/routes', (req: Request, res: Response) => {
    const routesInfo = routes.map((route) => {
        return {
            method: route.method,
            path: route.path,
            type: route?.type || undefined,
            action: route?.action || undefined
        };
    });
    res.json(routesInfo);
});

export default router;
