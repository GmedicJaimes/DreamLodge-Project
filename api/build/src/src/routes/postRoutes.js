"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../controllers/post");
const PostsRouter = (0, express_1.Router)();
PostsRouter.get("/", post_1.getPosts);
exports.default = PostsRouter;
