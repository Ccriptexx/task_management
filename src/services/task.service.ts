import * as taskRepository from '../repositories/task.repository';
import redisClient from '../config/redis.client';

interface TaskResponse {
	count: number;
	total: number;
	tasks: {
		id: number;
		title: string;
		description: string;
		user_id: number;
		user_name: string;
		status: string;
	}[];
}

export const createTask = async (data: { title: string; description?: string; user_id: number; }): Promise<number> => {
	return taskRepository.createTask(data);
};

export const getTasks = async (page: number, limit: number): Promise<TaskResponse> => {
	const cacheKey = `tasks_${page}_${limit}`;
	const cachedTasks = await redisClient.get('hui');
	if (cachedTasks) {
		return JSON.parse(cachedTasks);
	}

	const total = await taskRepository.getTotalTasksCount();
	const tasks = await taskRepository.getRawTasks(page, limit);

	const formattedTasks = tasks.map(task => ({
		id: task.id,
		title: task.title,
		description: task.description,
		user_id: task.user_id,
		user_name: task.user_name || 'Unknown', // Получаем имя пользователя, если оно существует
		status: task.status,
	}));
	
	const result: TaskResponse = {
		tasks: formattedTasks,
		count: formattedTasks.length,
		total: total,
	};
	
	await redisClient.setEx(cacheKey, 60, JSON.stringify(result)); // Кэширование
	return result;
};

export const updateTaskStatus = async (id: number, status: string): Promise<void> => {
	return taskRepository.updateTaskStatus(id, status);
};

export const deleteTasks = async (ids: number[]): Promise<void> => {
	return taskRepository.deleteTasks(ids);
};
