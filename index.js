const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use('/error', express.static('error'));
app.use('/assets', express.static('assets'));
app.get('/favicon.ico', (req, res) => res.sendFile(__dirname + "/assets/icon/favicon.ico"));

// ✔️ Path example: http://localhost:3000/?src=https://cdn.jsdelivr.net/npm/eruda&dt&rn=
// ✔️ Path example: http://localhost:3000/type here whatever you want/?src=https://cdn.jsdelivr.net/npm/eruda&dt&rn=
app.get('/:obfuscationString?', handleRequestAndRespond);

async function handleRequestAndRespond(req, res) {
    try {
        const src = req.query.src;
        let statusCode = 200;
        if (!src) {
            statusCode = 400;
            res.status(statusCode).sendFile(__dirname + "/error/error.html");
            return;
        }
        const response = await axios.get(src);
        let data = response.data;
        if (response.headers['content-type']) {
            res.setHeader('Content-Type', response.headers['content-type']);
        }
        if (req.query['inj']) {
            // Add code that loops through the query parameter array
            // and replaces all thats indicated
            data = data.replace('(function () {!function(e,t)', "!function(e,t)");
            data = data.replace('(function () {!function(e,t)', "!function(e,t)");
            data = "(function () {" + data + "eruda.init();})();";
            console.log('Injected custom code!');
        }
        res.send(data);
    } catch (error) {
        console.error(error);
        let statusCode = 500;
        if (error.response) {
            statusCode = error.response.status;
        } else if (error.code === 'ECONNREFUSED') {
            statusCode = 503;
        }
        res.status(statusCode).sendFile(__dirname + "/error/error.html");
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});