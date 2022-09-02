const Express = require('express');
// const fetch = require('node-fetch');


const IpRoutes = Express.Router();

IpRoutes.get('/ip', (req, res, next) => {

    return res.status(200).json({
        status: true,
        message: 'OK',
        data: {
            ip_address: req.ip,
            public_ip: req.socket.remoteAddress,
            date: new Date().toString()
        }
    })
});

module.exports = {
    IpRoutes
}