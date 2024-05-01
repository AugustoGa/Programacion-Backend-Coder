const bcrypt = require('bcrypt');
const UserService = require('../services/users.service');

const userService = new UserService()

const createHash = password => {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncrypted = bcrypt.hashSync(password, salt);
    return passwordEncrypted;
};

const useValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};


module.exports = { createHash, useValidPassword };