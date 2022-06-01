const Joi = require("joi");


const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };


function registerUserSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req,res, next, schema);
}

function updateUserSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
    });

    validateRequest(req,res, next, schema);
}


function validateRequest(req,res, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        console.log("error", error.details);
        res.status(400).send(error.details.reduce((result, item) => {
            console.log("item.path", item);
            result[item.path[0]] = item.message;
            return result;
        },{}));
        return;
    } else {
        req.body = value;
        next();
    }
}

module.exports = {registerUserSchema, updateUserSchema}