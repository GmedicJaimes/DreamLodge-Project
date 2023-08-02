"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Post', postSchema);
