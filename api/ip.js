const Express = require('express');
// const fetch = require('node-fetch');


const IpRoutes = Express.Router();

IpRoutes.get('/ip', (req, res, next) => {

    return res.status(200).json({
        status: true,
        message: 'OK',
        data: {
            ip_address: req.socket.remoteAddress,
            public_ip: '',
            date: new Date().toString()
        }
    })
});

module.exports = {
    IpRoutes
}