import { RequestHandler } from 'express';
import { healthController } from '../controllers';
import {
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTasks
} from '../controllers';
import {Action, HttpMethod} from "./roter.enum";

export type Route = {
    method: HttpMethod;
    path: string;
    handler: RequestHandler | RequestHandler[];
    type?: 'public' | 'private';
    action?: Action;
    label?: string;
};

export const routes: Route[] = [
    {
        method: HttpMethod.GET,
        path: '/health',
        handler: healthController,
        type: 'public',
        action: Action.VIEW,
    },
    {
        method: HttpMethod.POST,
        path: '/tasks',
        handler: createTask,
        type: 'public',
        action: Action.CREATE,
    },
    {
        method: HttpMethod.GET,
        path: '/tasks',
        handler: getTasks,
        type: 'public',
        action: Action.READ,
    },
    {
        method: HttpMethod.PUT,
        path: '/tasks/:id',
        handler: updateTaskStatus,
        type: 'public',
        action: Action.UPDATE,
    },
    {
        method: HttpMethod.DELETE,
        path: '/tasks',
        handler: deleteTasks,
        type: 'public',
        action: Action.DELETE,
    },
];
