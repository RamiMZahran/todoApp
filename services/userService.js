const { User } = require('../models/user');

exports.register = async (email, password) => {
  try {
    const user = new User({ email, password });

    await user.save();
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
