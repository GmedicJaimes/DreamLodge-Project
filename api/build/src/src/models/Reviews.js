"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Review', reviewSchema);
