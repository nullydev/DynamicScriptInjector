const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const ERROR_FILE_PATH = __dirname + "/error/error.html";
const DEFAULT_STATUS_CODE = 500;
const SERVICE_UNAVAILABLE_CODE = 503;
const BAD_REQUEST_CODE = 400;

app.use('/error', express.static('error'));
app.use('/assets', express.static('assets'));
app.get('/favicon.ico', (req, res) => res.sendFile(ERROR_FILE_PATH));
app.get('/:obfuscationString?', handleRequestAndRespond);

async function handleRequestAndRespond(req, res) {
    try {
        const { src, o, n } = req.query;
        const hasOld = o !== undefined;
        const hasNew = n !== undefined;

        if (!src || (hasOld !== hasNew) || (hasOld && hasNew && req.query['o'].length !== req.query['n'].length)) {
            res.status(BAD_REQUEST_CODE).sendFile(ERROR_FILE_PATH);
            return;
        }

        const response = await axios.get(src);
        let data = response.data;

        if (hasOld && hasNew) {
            if (Array.isArray(hasOld) && Array.isArray(hasNew) && hasOld.length === hasNew.length) {
                for (let i = 0; i < hasOld.length; i++) {
                    const regex = hasOld[i] instanceof RegExp ? hasOld[i] : new RegExp(hasOld[i], 'g');
                    data = data.replace(regex, hasNew[i]);
                }
            } else if (typeof hasOld === 'string' && typeof hasNew === 'string') {
                const regex = hasOld instanceof RegExp ? hasOld : new RegExp(hasOld, 'g');
                data = data.replace(regex, hasNew);
            }
        }

        response.headers['content-type'] && res.setHeader('Content-Type', response.headers['content-type']);
        res.send(data);
    } catch (error) {
        console.error(error);
        let statusCode = DEFAULT_STATUS_CODE;
        if (error.response) {
            statusCode = error.response.status;
        } else if (error.code === 'ECONNREFUSED') {
            statusCode = SERVICE_UNAVAILABLE_CODE;
        }
        res.status(statusCode).sendFile(ERROR_FILE_PATH);
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});