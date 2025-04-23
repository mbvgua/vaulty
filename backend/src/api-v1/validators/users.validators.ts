import Joi from 'joi'

export const registerSchema = Joi.object({
    username:Joi.string()
        .required()
        .alphanum()
        .lowercase()
        .trim()
        .min(3)
        .max(20)
        .messages({
            'string.base':'Username must be a string',
            'any.required':'Username is required',
            'string.alphanum':'Username can only contain letters(a-z) and digits(0-9)',
            'string.lowercase':'Username can only be in lowercase letters',
            'string.trim':'Username cannot contain any whitespace before or after it',
            'string.min':'Username should have a minimum length of {#length} characters',
            'string.max':'Username shoulf have a maximum length of {#length} characters'
        }),
    email:Joi.string()
        .required()
        .email({
            minDomainSegments:2,
            tlds:{
                allow:['com','net','ke']
            }
        })
        .messages({
            'string.base':'Email must be a string',
            'any.required':'Email is required',
            'string.email':'Email can only have two domains, e.g example.com whose tlds can either be ".com", ".net" or ".ke"'
        }),
    phoneNumber:Joi.string()
        .required()
        .max(10)
        .messages({
            'string.base':'Phone number must be a string',
            'any.required':'Phone number is required',
            'string.max':'Phone number must have a maximum of {#length} digits'
        }),
    password:Joi.string()
        .required()
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
        )
        .messages({
            'string.base':'Password should be of type text',
            'any.required':'Password is required',
            'string.pattern.base':'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
        })
})

export const loginEmailSchema = Joi.object({
    emailOrUsername:Joi.string()
    .required()
    .email({
        minDomainSegments:2,
        tlds:{
            allow:['com','net','ke']
        }
    })
    .messages({
        'string.base':'Email must be a string',
        'any.required':'Email is required',
        'string.email':'Email can only have two domains, e.g example.com whose tlds can either be ".com", ".net" or ".ke"'
    }),
    password:Joi.string()
        .required()
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
        )
        .messages({
            'string.base':'Password should be of type text',
            'any.required':'Password is required',
            'string.pattern.base':'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
        })
})
export const loginUsernameSchema = Joi.object({
    emailOrUsername:Joi.string()
        .required()
        .alphanum()
        .lowercase()
        .trim()
        .min(3)
        .max(20)
        .messages({
            'string.base':'Username must be a string',
            'any.required':'Username is required',
            'string.alphanum':'Username can only contain letters(a-z) and digits(0-9)',
            'string.lowercase':'Username can only be in lowercase letters',
            'string.trim':'Username cannot contain any whitespace before or after it',
            'string.min':'Username should have a minimum length of {#length} characters',
            'string.max':'Username shoulf have a maximum length of {#length} characters'
        }),
    password:Joi.string()
        .required()
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
        )
        .messages({
            'string.base':'Password should be of type text',
            'any.required':'Password is required',
            'string.pattern.base':'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
        })
})

export const emailSchema = Joi.object({
    email:Joi.string()
        .required()
        .email({
            minDomainSegments:2,
            tlds:{
                allow:['com','net','ke']
            }
        })
        .messages({
            'string.base':'Email must be a string',
            'any.required':'Email is required',
            'string.email':'Email can only have two domains, e.g example.com whose tlds can either be ".com", ".net" or ".ke"'
        })
})

export const updateUserSchema = Joi.object({
    username:Joi.string()
    .alphanum()
    .lowercase()
    .trim()
    .min(3)
    .max(20)
    .messages({
        'string.base':'Username must be a string',
        'string.alphanum':'Username can only contain letters(a-z) and digits(0-9)',
        'string.lowercase':'Username can only be in lowercase letters',
        'string.trim':'Username cannot contain any whitespace before or after it',
        'string.min':'Username should have a minimum length of {#length} characters',
        'string.max':'Username shoulf have a maximum length of {#length} characters'
    }),
    email:Joi.string()
        .email({
            minDomainSegments:2,
            tlds:{
                allow:['com','net','ke']
            }
        })
        .messages({
            'string.base':'Email must be a string',
            'string.email':'Email can only have two domains, e.g example.com whose tlds can either be ".com", ".net" or ".ke"'
        }),
    phoneNumber:Joi.string()
        .max(10)
        .messages({
            'string.base':'Phone number must be a string',
            'string.max':'Phone number must have a maximum of {#length} digits'
        }),
    password:Joi.string()
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
        )
        .messages({
            'string.base':'Password should be of type text',
            'string.pattern.base':'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
        }),
    gender:Joi.string()
    .required()
    .messages({
        'string.base':'Gender should be of type text',
        'any.required':'Gender is required, kindly choose between male,female or other.'
    }),
    dob:Joi.date()
        .min('1-1-1738')
        .max('now')
        .messages({
            'any.required':'A valid date is required',
            'date.min':'Date cannot be prior to 1-1-1738',
            'date.max':'Date cannot be later than {#now}'
        }),
    profilePic:Joi.string()
        .required()
        .messages({
            'any.required':'A profile picture is required'
        })

})


export const userDetailsSchema = Joi.object({
    gender:Joi.string()
    .required()
    .messages({
        'string.base':'Gender should be of type text',
        'any.required':'Gender is required, kindly choose between male,female or other.'
    }),
    dob:Joi.date()
        .min('1-1-1738')
        .max('now')
        .messages({
            'any.required':'A valid date is required',
            'date.min':'Date cannot be prior to 1-1-1738',
            'date.max':'Date cannot be later than {#now}'
        }),
    profilePic:Joi.string()
        .required()
        .messages({
            'any.required':'A profile picture is required'
        })
})