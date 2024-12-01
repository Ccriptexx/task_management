import { AppDataSource } from '../config/data.source';
import {Task} from '../db/models';


export const createTask = async (data: { title: string; description?: string; user_id: number; }): Promise<number> => {
	const taskRepository = AppDataSource.getRepository(Task);
	const task = taskRepository.create(data);
	await taskRepository.save(task);
	return task.id;
};

export const getRawTasks = async (page: number, limit: number): Promise<any[]> => {
		return await AppDataSource.query(`
		    SELECT
		        task.id,
		        task.title,
		        task.description,
		        task.user_id,
		        task.status,
		        "user".name AS user_name
		    FROM
		        task
		    LEFT JOIN
		        "user" ON "user".id = task.user_id
		    ORDER BY task.id
		    OFFSET $1 LIMIT $2
			`, [(page - 1) * limit, limit]);
		
};

export const getTotalTasksCount = async (): Promise<number> => {
	const taskRepository = AppDataSource.getRepository(Task);
	return await taskRepository.count();
};

export const updateTaskStatus = async (id: number, status: string): Promise<void> => {
	const taskRepository = AppDataSource.getRepository(Task);
	await taskRepository.update(id, { status });
};

export const deleteTasks = async (ids: number[]): Promise<void> => {
	const taskRepository = AppDataSource.getRepository(Task);
	await taskRepository.delete(ids);
};