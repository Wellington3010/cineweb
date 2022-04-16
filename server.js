const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/cineweb'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/cineweb/'}),
);

app.listen(process.env.PORT || 8080);
