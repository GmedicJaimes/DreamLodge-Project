"use strict";
/* import { Router } from "express";

const mainRouter: Router = Router();

const userRoutes = require("./usersRoutes")
const commentRoutes = require("./commentsRoutes")
const postRoutes = require("./postRoutes")
const reviewsRoutes = require("./reviewsRoutes")

mainRouter.use('/users', userRoutes )
mainRouter.use('/comments', commentRoutes )
mainRouter.use('/posts', postRoutes )
mainRouter.use('/reviews', reviewsRoutes )

export default mainRouter

 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainRouter = (0, express_1.Router)();
// Importamos los archivos de las rutas secundarias
const usersRoutes_1 = __importDefault(require("./usersRoutes"));
const commentsRoutes_1 = __importDefault(require("./commentsRoutes"));
const postRoutes_1 = __importDefault(require("./postRoutes"));
const reviewsRoutes_1 = __importDefault(require("./reviewsRoutes"));
// Middleware para imprimir el nombre de la ruta en cada solicitud
const logRoute = (req, res, next) => {
    console.log(`Requested route: ${req.originalUrl}`);
    next();
};
// Agregamos el middleware de logRoute a todas las rutas principales
mainRouter.use(logRoute);
mainRouter.use('/users', usersRoutes_1.default);
mainRouter.use('/comments', commentsRoutes_1.default);
mainRouter.use('/posts', postRoutes_1.default);
mainRouter.use('/reviews', reviewsRoutes_1.default);
exports.default = mainRouter;
