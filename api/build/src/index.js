"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//initialization
const app = (0, express_1.default)();
//settings
app.set("port", 4000);
//middlewares
//routes
//staticFiles
//startingServer
app.listen(app.get("port"), () => {
    console.log("server listen on port 4000");
});
