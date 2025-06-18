import Joi from "joi";

export const registrationSchema = Joi.object({
  first_name: Joi.string()
    .required()
    .alphanum()
    .lowercase()
    .trim()
    .messages({
      "string.base": "Firstname must be a string",
      "any.required": "Firstname is required",
      "string.alphanum":
        "Firstname can only contain letters(a-z) and digits(0-9)",
      "string.lowercase": "Firstname can only be in lowercase letters",
      "string.trim":
        "Firstname cannot contain any whitespace before or after it",
    }),
  last_name: Joi.string()
    .required()
    .alphanum()
    .lowercase()
    .trim()
    .messages({
      "string.base": "Lastname must be a string",
      "any.required": "Lastname is required",
      "string.alphanum":
        "Lastname can only contain letters(a-z) and digits(0-9)",
      "string.lowercase": "Lastname can only be in lowercase letters",
      "string.trim":
        "Lastname cannot contain any whitespace before or after it",
    }),
  user_name: Joi.string()
    .required()
    .alphanum()
    .lowercase()
    .trim()
    .min(3)
    .max(20)
    .messages({
      "string.base": "Username must be a string",
      "any.required": "Username is required",
      "string.alphanum":
        "Username can only contain letters(a-z) and digits(0-9)",
      "string.lowercase": "Username can only be in lowercase letters",
      "string.trim":
        "Username cannot contain any whitespace before or after it",
      "string.min":
        "Username should have a minimum length of {#length} characters",
      "string.max":
        "Username shoulf have a maximum length of {#length} characters",
    }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "ke"],
      },
    })
    .messages({
      "string.base": "Email must be a string",
      "any.required": "Email is required",
      "string.email":
        'Email can only have two domains, e.g example.com whose tlds can either be ".com", ".net" or ".ke"',
    }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$",
      ),
    )
    .messages({
      "string.base": "Password should be of type text",
      "any.required": "Password is required",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    }),
});

