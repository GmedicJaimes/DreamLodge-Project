"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coments_1 = require("../controllers/coments");
const commentsRouter = (0, express_1.Router)();
commentsRouter.get("/", coments_1.getComments);
exports.default = commentsRouter;
