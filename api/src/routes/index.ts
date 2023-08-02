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

import { Router } from "express";
import { Request, Response, NextFunction } from "express"; // Importamos Request y Response para poder tipar correctamente los controladores

const mainRouter: Router = Router();

// Importamos los archivos de las rutas secundarias
import userRoutes from "./usersRoutes";
import commentRoutes from "./commentsRoutes";
import postRoutes from "./postRoutes";
import reviewsRoutes from "./reviewsRoutes";

// Definimos el tipo MiddlewareFunction para los controladores
type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

// Middleware para imprimir el nombre de la ruta en cada solicitud
const logRoute: MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Requested route: ${req.originalUrl}`);
  next();
};

// Agregamos el middleware de logRoute a todas las rutas principales
mainRouter.use(logRoute);

mainRouter.use('/users', userRoutes);
mainRouter.use('/comments', commentRoutes);
mainRouter.use('/posts', postRoutes);
mainRouter.use('/reviews', reviewsRoutes);

export default mainRouter;
