import express from 'express';
const path = require('path');
const app = express();
const stops = require('./route/stops');
const routes = require('./route/routes');

let port = process.env.PORT;
if (port == null || port == '') {
    port = String(8000);
}


app.use('/', express.static(path.resolve(__dirname, './../build')));

app.use('/stops', stops)
app.use('/routes', routes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../build/index.html'));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});