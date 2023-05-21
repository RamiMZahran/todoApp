const userService = require('../services/userService');
const { body, validationResult } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'register':
    case 'login': {
      return [
        body('email').isEmail(),
        body('password').isString().isLength({ min: 6 }),
      ];
    }
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ error: 'Invalid request body', details: errors.array() });
  }

  try {
    const { token, user } = await userService.register(
      req.body.email,
      req.body.password
    );
    return res.status(201).send({
      msg: 'User registered',
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Error registering user', details: err.stack });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ error: 'Invalid request body', details: errors.array() });
  }

  try {
    const { token, user } = await userService.login(
      req.body.email,
      req.body.password
    );
    return res.status(201).send({
      msg: 'User fetched',
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: err || 'Unauthorized' });
  }
};
