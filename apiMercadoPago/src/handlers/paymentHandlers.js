const mercadopago = require('mercadopago')
 




const createPayment = async(req, res)=>{
    mercadopago.configure({
        access_token:"TEST-1217239966605378-080822-11c74257002c2927c70422faaaaf3e94-1446217996"
    });
    
    const result = await mercadopago.preferences.create({
        items:[
            {
                title: "Casita en Punta Cogote",
                unit_price: 1500,
                currency_id: "ARS",
                quantity: 1
            }
        ],
        back_urls: {
            success:"http://localhost:3001/success"
        },
        notification_url: " https://2107-2800-810-5ab-2d5-2887-feca-165c-6836.ngrok.io/webhook"
    })

    console.log(result)
    res.send(result.body)
};
const listenWebHook = async(req, res)=>{
    const payment = req.query;
    try {
        if(payment.type === "payment"){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)
        };
        res.status(204)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
    
};


module.exports={ createPayment, listenWebHook}