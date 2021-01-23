import express from 'express';

const app = express();
const request = require('request');
const path = require('path');
const serverFunction = require('./serverFunction');

let port = process.env.PORT;
if (port == null || port == '') {
    port = String(8000);
}


app.use('/', express.static(path.resolve(__dirname, './../build')));

app.get('/stops', (req, res) => {

    const options = {
        url: 'http://www.minsktrans.by/city/minsk/stops.txt',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    request(options, (err: any, response: any, body: any) => {
        if (err) {
            return res.status(500).send({message: err});
        }
        let dataRefactor = serverFunction.refactorStopPointsMapDataToArray(`${body}`)
        let validData = serverFunction.changeEmptyName(dataRefactor)
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        return res.send(JSON.stringify(validData));
    })
});

app.get('/routes', (req, res) => {

    const options = {
        url: 'http://www.minsktrans.by/city/minsk/routes.txt',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    request(options, (err: any, response: any, body: any) => {
        if (err) {
            return res.status(500).send({message: err});
        }
        const allRoutes = serverFunction.refactorRoutesToArray(`${body}`)
        const validRoutes = serverFunction.validRoutes(allRoutes)

        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
        res.set('Access-Control-Allow-Headers', 'Content-Type')

        return res.send(JSON.stringify(validRoutes));
    })
});



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../build/index.html'));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});