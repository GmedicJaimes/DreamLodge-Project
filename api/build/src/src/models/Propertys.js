"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const propertySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    rooms: { type: Number, required: true },
    technologies: { type: String, required: true },
    extraAmenities: { type: String, required: false },
    specialServices: { type: Boolean, required: false },
    views: { type: Number, required: true },
    price: { type: Number, required: true },
    comment: { type: String, required: false }
});
exports.default = (0, mongoose_1.model)('Property', propertySchema);
