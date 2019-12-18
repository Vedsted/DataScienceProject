import express = require('express');
import { spawn } from "child_process";
import { RawQuerySpecification } from './RawQuerySpecification';
import { SqlBuilder } from './sqlBuilder';
import { DrillAdapter } from './drillAdapter';
import { GeoJsonConverter, convertToGeoJson } from './geoJsonConverter';
const bodyParser = require('body-parser');
// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json())

app.post('/raw', async function (req : express.Request, res : express.Response) {

    try{

        let request = new RawQuerySpecification(req.body);
        let sqlBuilder = new SqlBuilder();
        let sqlString = sqlBuilder.select(request.columns).from(request.filePath).where(request.params).limit(100).collect();
        console.log(sqlString);
        let drillAdapter = new DrillAdapter("192.168.43.61:8047");
        let result = await drillAdapter.performRequest(sqlString);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    }catch (error){
        res.statusCode = 400;
        res.send()
    }



});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});