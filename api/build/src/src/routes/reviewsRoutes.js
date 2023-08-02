"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_1 = require("../controllers/reviews");
const reviewsRouter = (0, express_1.Router)();
reviewsRouter.get("/", reviews_1.getReviews);
exports.default = reviewsRouter;
