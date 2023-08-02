"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = void 0;
const reviews_1 = require("../../info/resenas/reviews");
const getReviews = (req, res) => {
    res.json(reviews_1.reviewsData);
};
exports.getReviews = getReviews;
