import { Response } from 'express';
import { AxiosError } from 'axios';

export class ErrorHandler {
    static handleAxiosError(error: AxiosError, res: Response): Response {
        if (error.response) {
            console.error('Ошибка от API: ', error.response.data);
            return res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            console.error('Ошибка сети или запроса: ', error.request);
            return res.status(500).json({ error: 'API не ответило на запрос' });
        } else {
            console.error('Ошибка настройки запроса: ', error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}
