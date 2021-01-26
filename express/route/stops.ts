import express from 'express';
const router = express.Router();
const request = require('request');
const serverFunction = require('../serverFunction');

router.use((req, res, next) => {
    console.log('Stops route: ', Date.now());
    next();
});

router.get('/', (req, res) => {

    const options = {
        url: 'http://www.minsktrans.by/city/minsk/stops.txt',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    request(options,async (err: any, response: any, body: any) => {
        try {
            const bodyResponce =await `${body}`;
            let dataRefactor = serverFunction.refactorStopPointsMapDataToArray(`${bodyResponce}`)
            let validData = serverFunction.changeEmptyName(dataRefactor)
            res.set('Access-Control-Allow-Origin', '*')
            res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
            res.set('Access-Control-Allow-Headers', 'Content-Type')
            console.log('dataFetchStops')
            return res.send(JSON.stringify(validData));
        } catch (e) {
            return res.status(500).send({message: err});
        }
    })
});

module.exports = router;