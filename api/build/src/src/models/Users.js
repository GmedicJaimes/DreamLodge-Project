"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// interface User extends Document {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   password: string;
//   createdAt: Date;
// }
// const userSchema = new Schema<User>({
//   firstName: {type: String, required: true},
//   lastName: {type: String, required: true},
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
// export default model<User>('User', userSchema);
