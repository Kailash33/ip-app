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
        data: {
            ...detector.detect(req.headers['user-agent']),
            ip: {
                client_ip: getIP(req)
            }
        }
    })
})

IpRoutes.get('/ip', (req, res, next) => {

    return res.status(200).json({
        status: true,
        message: 'OK',
        data: {
            ip_address: getIP(req),
            public_ip: req.socket.remoteAddress,
            date: new Date().toString(),
            client_ip: {
                soscketIp: req.socket.remoteAddress,
                forwardedIp: req.headers['x-forwarded-for']
            }
        }
    })
});

const getIP = (req) => {
    const ipString = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const [ip] = ipString.split(':').reverse();
    return ip == '1' ? '127.0.0.1' : ip;
}

module.exports = {
    IpRoutes
}