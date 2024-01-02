import Joi from "joi";

const taskSchema = Joi.object({
  value: Joi.string().required().messages({
    "any.required": "Task is required",
    "string.empty": "Task cannot be empty",
  }),
  completed: Joi.boolean().default(false).messages({
    "boolean.base": "Task status should be boolean",
  }),
});

const updateTaskStatusSchema = Joi.object({
  completed: Joi.boolean().default(false).messages({
    "boolean.base": "Task status should be boolean",
  }),
});

const getTaskQuerySchema = Joi.object({
  search: Joi.string().messages({
    "string.base": "Search field should be string",
  }),
  completed: Joi.boolean().messages({
    "boolean.base": "Completed field should be boolean",
  }),
});

const idSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Id is required",
    "string.empty": "Id cannot be empty",
  }),
});

export { taskSchema, updateTaskStatusSchema, getTaskQuerySchema, idSchema };
