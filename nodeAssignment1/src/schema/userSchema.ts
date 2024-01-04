import Joi from "joi";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constant/pagination";

const signUpSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have at least 8 characters",
      "string.pattern.base":
        "Password should contain at least one letter, one number, and may include special characters",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have at least 8 characters",
      "string.pattern.base":
        "Password should contain at least one letter, one number, and may include special characters",
    }),
});

const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required().messages({
    "any.required": "Refresh Token is required",
    "string.empty": "Refresh Token cannot be empty",
  }),
});

const getUserSchema = Joi.object({
  page: Joi.number().integer().min(1).default(DEFAULT_PAGE),

  size: Joi.number().integer().min(1).max(40).default(DEFAULT_PAGE_SIZE),

  search: Joi.string().default(""),
});

export { signUpSchema, loginSchema, refreshTokenSchema, getUserSchema };
