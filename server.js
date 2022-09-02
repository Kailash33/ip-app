const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('node:path');

const { IpRoutes } = require('./api/ip');

dotenv.config();

const app = express();

// use middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
    return res.sendFile(path.join(__dirname, '/web/index.html'));
})

app.use('/api', IpRoutes)

app.use((req, res) => res.status(404).json({ status: false, message: `${req.path} not found.` }))

// server listen
const listener = app.listen(process.env.PORT || 3500, () => console.log(`\nserver started on ${listener.address().port}`));