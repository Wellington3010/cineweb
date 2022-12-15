const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();

app.use(express.static(`${__dirname}/cineweb/dist/${nomeApp}`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/cineweb/dist/${nomeApp}/browser/index.html`));
});

app.listen(process.env.PORT || 8080);