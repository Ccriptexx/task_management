import { Request, Response } from 'express';
import * as taskService from '../../services/task.service';
import {
	createTaskValidation,
	updateTaskStatusValidation,
	deleteTasksValidation,
} from '../validations/task.validation';
import {addLog} from "@d2sutils/logging";

export const createTask = async (req: Request, res: Response) => {
	const { error } = createTaskValidation(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	
	try {
		const taskId = await taskService.createTask(req.body);
		res.status(201).json({ id: taskId });
	} catch (error) {
		addLog(`Failed to create task ${error}`);
		res.status(500).json({ error: 'Failed to create task' });
	}
};

export const getTasks = async (req: Request, res: Response) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const tasks = await taskService.getTasks(Number(page), Number(limit));
		res.json(tasks);
	} catch (error) {
		addLog(`Failed to create task ${error}`);
		res.status(500).json({ error: 'Failed to retrieve tasks' });
	}
};

export const updateTaskStatus = async (req: Request, res: Response) => {
	const { error } = updateTaskStatusValidation(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	
	try {
		const taskId = Number(req.params.id);
		await taskService.updateTaskStatus(taskId, req.body.status);
		res.sendStatus(204);
	} catch (error) {
		addLog(`Failed to create task ${error}`);
		res.status(500).json({ error: 'Failed to update task status' });
	}
};

export const deleteTasks = async (req: Request, res: Response) => {
	const { error } = deleteTasksValidation(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	
	try {
		await taskService.deleteTasks(req.body.ids);
		res.sendStatus(204);
	} catch (error) {
		addLog(`Failed to create task ${error}`);
		res.status(500).json({ error: 'Failed to delete tasks' });
	}
};
