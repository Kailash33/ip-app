const Express = require('express');

const DeviceDetector = require('node-device-detector');
const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: true,

});

const IpRoutes = Express.Router();

IpRoutes.get('/client-info', (req, res) => {
    return res.status(200).jsonp({
        status: true,
        message: 'OK',
        data: detector.detect(req.headers['user-agent'])
    })
})

IpRoutes.get('/ip', (req, res, next) => {

    const clientip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    return res.status(200).json({
        status: true,
        message: 'OK',
        data: {
            ip_address: clientip,
            public_ip: req.socket.remoteAddress,
            date: new Date().toString(),
            client_ip: {
                soscketIp: req.socket.remoteAddress,
                forwardedIp: req.headers['x-forwarded-for']
            }
        }
    })
});

module.exports = {
    IpRoutes
}