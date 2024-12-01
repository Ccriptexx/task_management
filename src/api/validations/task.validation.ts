import Joi from 'joi';

export const createTaskValidation = (data: any) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		user_id: Joi.number().integer().required(),
	});
	return schema.validate(data);
};

export const updateTaskStatusValidation = (data: any) => {
	const schema = Joi.object({
		status: Joi.string().valid('pending', 'in-progress', 'done').required(),
	});
	return schema.validate(data);
};

export const deleteTasksValidation = (data: any) => {
	const schema = Joi.object({
		ids: Joi.array().items(Joi.number().integer().required()).required(),
	});
	return schema.validate(data);
};