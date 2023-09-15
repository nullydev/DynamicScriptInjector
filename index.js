const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// ✔️ Path example: http://localhost:3000/?src=https://cdn.jsdelivr.net/npm/eruda
// ❌ Path example: http://localhost:3000/?src=https://cdn.jsdelivr.net/npm/eruda
app.get('/:type?', handleRequestAndRespond);

async function handleRequestAndRespond(req, res) {
    try {
        if (!req.query.src) {
            console.error('Error 404');
            app.use('/error', express.static('error'));
            res.status(404).sendFile(__dirname + "/error/error.html");
            return;
        }

        const response = await axios.get(req.query.src);

        if (!isObjectEmpty(response.headers['content-type'])) {
            console.log(response.headers['content-type']);
            res.setHeader('Content-Type', response.headers['content-type']);
        }

        if (!isObjectEmpty(req.query.dt) && req.query.dt == 1) {
            res.send(response.data.replace('\\f113', "url(https://cdn.discordapp.com/emojis/1150109708338864218.webp?size=24&quality=lossless)"));
        } else {
            res.send(response.data);
        }
    } catch (error) {
        console.error(error);
        let statusCode = 500;
        if (error.response) {
            statusCode = error.response.status;
        } else if (error.code === 'ECONNREFUSED') {
            statusCode = 503;
        }

        app.use('/error', express.static('error'));
        app.use('/assets', express.static('assets'));
        res.status(statusCode).sendFile(__dirname + "/error/error.html");
    }
}

function isObjectEmpty(obj) {
    if (obj == null) return true;
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;
    return true;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});