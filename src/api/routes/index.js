const {Router} = require('express');
const {createPayment} = require('../handler/handler')

const router = Router();

router.post('/createorder', createPayment);

router.get('/success', (req, res)=> res.send("succes"));

router.get('/failure', (req, res)=>res.send("failure"));

router.get('/pending', (req, res)=>res.send("pending"));

// router.post('/webhook', listenWebHook);

module.exports = router;