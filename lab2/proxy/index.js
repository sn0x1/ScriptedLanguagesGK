// const express = require('express');
// const axios = require('axios');

// const app = express();

// const API_URL = process.env.API_URL || 'http://localhost:3000';
// const PROXY_PORT = process.env.PROXY_PORT || 3001;

// const proxyMiddleware = async (req, res) => {
//     try {
//         const response = await axios({
//             url: API_URL + req.originalUrl,
//             method: req.method,
//             params: req.query,
//             headers: {
//                 'user-agent': req.get('user-agent'),
//                 accept: req.get('accept')
//             },
//             timeout: 5000
//         });

//         res.set(response.headers);
//         res.status(response.status).send(response.data);
//     } catch (err) {
//         if (err.response) {
//             res.status(err.response.status).send(err.response.data);
//         } else {
//             res.status(500).send('Error connecting to API');
//         }
//     }
// };

// app.use('/', proxyMiddleware);

// app.listen(PROXY_PORT, () => {
//     console.log(`Proxy running at http://localhost:${PROXY_PORT} -> ${API_URL}`);
// });

const express = require('express');
const config = require('./config');
const proxyRoutes = require('./proxyRoutes');

const app = express();

app.use('/', proxyRoutes);

const PORT = config.get('proxyPort');

app.listen(PORT, () => {
    console.log(`Proxy running at http://localhost:${PORT}`);
    console.log(`Forwarding to API: ${config.get('apiUrl')}`);
});
