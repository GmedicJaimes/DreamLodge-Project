import { Router } from "express";

const mainRouter: Router = Router();

mainRouter.get('/', (req, res) =>{
    res.send('Primer prueba del mainRouter')
});

export default mainRouter