"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const users_1 = require("../../info/usuarios/users");
const getUsers = (req, res) => {
    res.json(users_1.users);
};
exports.getUsers = getUsers;
