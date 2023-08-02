"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = void 0;
const dataComments_1 = require("../../info/comments/dataComments");
const getComments = (req, res) => {
    res.json(dataComments_1.comments);
};
exports.getComments = getComments;
