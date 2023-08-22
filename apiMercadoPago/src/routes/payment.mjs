import { Router } from 'express';
import { createPayment, listenWebHook } from '../handlers/paymentHandlers.mjs'; // Asegúrate de usar la extensión .mjs

export const router = Router();

router.post('/createorder', createPayment);

router.get('/success', (req, res) => res.send("success"));

router.get('/failure', (req, res) => res.send("failure"));

router.get('/pending', (req, res) => res.send("pending"));

router.post('/webhook', listenWebHook);

export default router;
