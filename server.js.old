const express = require('express');
const app = express();
const appName = 'cineweb';

const outputPath = `${__dirname}/dist/${appName}`;
// Serve only the static files form the dist directory
app.use(express.static(outputPath));

app.get('/*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`);
});

app.listen(process.env.PORT);
