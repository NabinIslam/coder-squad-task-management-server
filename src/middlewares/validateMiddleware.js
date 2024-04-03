const { errorResponse } = require('../controllers/responseController');

const validate = schema => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);

    req.body = parseBody;

    next();
  } catch (err) {
    console.log(err);

    const message = err.errors[0].message;

    return errorResponse(res, {
      statusCode: 400,
      message: message,
    });
  }
};

module.exports = validate;
