const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
app.get('/', async (req, res) => {
  try {
    const externalUrl = req.query.src; // Get the URL from the query parameter
    const response = await axios.get(externalUrl); // Fetch the external JavaScript file

    // Set the response content type to JavaScript
    res.setHeader('Content-Type', 'application/javascript');
    
    // Send the fetched JavaScript content as the response
    res.send(response.data.replace('\\f113', "url(https://cdn.discordapp.com/emojis/1150109708338864218.webp?size=24&quality=lossless)"));
  } catch (error) {
    console.error(error);
    const page = `
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300" />
    <div id="main">
        <div class="fof">
            <h1>Error 404</h1>
        </div>
    </div>
    <style>
    * {
        transition: all 0.6s;
    }

    html {
        height: 100%;
    }

    body {
        font-family: "Lato", sans-serif;
        color: #888;
        margin: 0;
    }

    #main {
        display: table;
        width: 100%;
        height: 100vh;
        text-align: center;
    }

    .fof {
        display: table-cell;
        vertical-align: middle;
    }

    .fof h1 {
        font-size: 50px;
        display: inline-block;
        padding-right: 12px;
        animation: type 0.5s alternate infinite;
    }

    @keyframes type {
        from {
            box-shadow: inset -3px 0px 0px #888;
        }

        to {
            box-shadow: inset -3px 0px 0px transparent;
        }
    }
    </style>`; 
    res.status(404).send(page);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});