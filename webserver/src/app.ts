import express = require('express');
import { RawQuerySpecification } from './rawQuerySpecification';
import { SqlBuilder } from './sqlBuilder';
import { DrillAdapter } from './drillAdapter';
import { convertToGeoJson } from './geoJsonConverter';
import  cors from "cors";
const bodyParser = require('body-parser');
// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json())
app.use(cors());



app.post('/raw', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try{

        let request = new RawQuerySpecification(req.body);
        let sqlBuilder = new SqlBuilder();
        let sqlString = sqlBuilder.select(request.columns).from(request.filePath).where(request.params).limit(1000000).collect();
        console.log(sqlString);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest(sqlString);
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    }catch (error){
        res.statusCode = 400;
        res.send()
    }
});


app.post('/cluster/out-2019-all-months-k-100000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/out-2019-all-months-k-100000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});


app.post('/cluster/out-2019-01-k-5000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2019/cluster/out-2019-01-k-5000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/out-2019-01-k-10000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2019/cluster/out-2019-01-k-10000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/out-2019-01-k-50000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2019/cluster/out-2019-01-k-50000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/out-2019-01-k-100000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2019/cluster/out-2019-01-k-100000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/london/out-2019-01-k-100000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2019/cluster/out-2019-01-k-100000-m-3.csv` as t1 where t1.prediction NOT LIKE '' AND LSOA_name LIKE 'Camden%' OR LSOA_name LIKE 'City of London%' OR LSOA_name LIKE 'Hackney%' OR LSOA_name LIKE 'Hammersmith%' OR LSOA_name LIKE 'Haringey%' OR LSOA_name LIKE 'Islington%' OR LSOA_name LIKE 'Kensington and Chelsea%' OR LSOA_name LIKE 'Lambeth%' OR LSOA_name LIKE 'Lewisham%' OR LSOA_name LIKE 'Newham%' OR LSOA_name LIKE 'Southwark%' OR LSOA_name LIKE 'Tower Hamlets%' OR LSOA_name LIKE 'Wandsworth%' OR LSOA_name LIKE 'Westminster%' OR LSOA_name LIKE 'Barking and Dagenham%' OR LSOA_name LIKE 'Barnet%' OR LSOA_name LIKE 'Bexley%' OR LSOA_name LIKE 'Brent%' OR LSOA_name LIKE 'Bromley%' OR LSOA_name LIKE 'Croydon%' OR LSOA_name LIKE 'Ealing%' OR LSOA_name LIKE 'Enfield%' OR LSOA_name LIKE 'Greenwich%' OR LSOA_name LIKE 'Harrow%' OR LSOA_name LIKE 'Havering%' OR LSOA_name LIKE 'Hillingdon%' OR LSOA_name LIKE 'Hounslow%' OR LSOA_name LIKE 'Kingston upon Thames%' OR LSOA_name LIKE 'Merton%' OR LSOA_name LIKE 'Redbridge%' OR LSOA_name LIKE 'Richmond upon Thames%' OR LSOA_name LIKE 'Sutton%' OR LSOA_name LIKE 'Waltham Forest%' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-01-k-50000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-01-k-50000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-01-k-30000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-01-k-30000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-01-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-01-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});


app.post('/cluster/metropolitan-london-city/out-2018-02-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-02-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});


app.post('/cluster/metropolitan-london-city/out-2018-03-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-03-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-04-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-04-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-05-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-05-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-06-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-06-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-07-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-07-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-08-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-08-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-09-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-09-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-10-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-10-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-11-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-11-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-12-k-15000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-12-k-15000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/cluster/metropolitan-london-city/out-2018-01-k-5000-m-3', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select CenterLatitude as Latitude, CenterLongitude Longitude, COUNT(*) as ClusterSize from dfs.`/dataframes/street/2018/cluster/metropolitan-london-city/out-2018-01-k-5000-m-3.csv` as t1 where t1.prediction NOT LIKE '' group by t1.prediction, t1.CenterLatitude, t1.CenterLongitude");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});



app.post('/raw/2018/01/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-01'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/02/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-02'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/03/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-03'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/04/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-04'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/05/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-05'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/06/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-06'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/07/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-07'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/08/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-08'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/09/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-09'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/10/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-10'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/11/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-11'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2018/12/metropolitan-london-city', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2018/raw/metropolitan-london-city` where Month LIKE '2018-12'");
        console.log(result.rows.length);
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/2019-01', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2019/raw/2019-01`");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});

app.post('/raw/london/2019-01', async function (req : express.Request, res : express.Response) {
    console.log(req.body);

    try {
        let request = new RawQuerySpecification(req.body);
        let drillAdapter = new DrillAdapter("localhost:8047");
        let result = await drillAdapter.performRequest("select Latitude, Longitude, 1 as ClusterSize from dfs.`/dataframes/street/2019/raw/2019-01` where LSOA_name LIKE 'Camden%' OR LSOA_name LIKE 'City of London%' OR LSOA_name LIKE 'Hackney%' OR LSOA_name LIKE 'Hammersmith%' OR LSOA_name LIKE 'Haringey%' OR LSOA_name LIKE 'Islington%' OR LSOA_name LIKE 'Kensington and Chelsea%' OR LSOA_name LIKE 'Lambeth%' OR LSOA_name LIKE 'Lewisham%' OR LSOA_name LIKE 'Newham%' OR LSOA_name LIKE 'Southwark%' OR LSOA_name LIKE 'Tower Hamlets%' OR LSOA_name LIKE 'Wandsworth%' OR LSOA_name LIKE 'Westminster%' OR LSOA_name LIKE 'Barking and Dagenham%' OR LSOA_name LIKE 'Barnet%' OR LSOA_name LIKE 'Bexley%' OR LSOA_name LIKE 'Brent%' OR LSOA_name LIKE 'Bromley%' OR LSOA_name LIKE 'Croydon%' OR LSOA_name LIKE 'Ealing%' OR LSOA_name LIKE 'Enfield%' OR LSOA_name LIKE 'Greenwich%' OR LSOA_name LIKE 'Harrow%' OR LSOA_name LIKE 'Havering%' OR LSOA_name LIKE 'Hillingdon%' OR LSOA_name LIKE 'Hounslow%' OR LSOA_name LIKE 'Kingston upon Thames%' OR LSOA_name LIKE 'Merton%' OR LSOA_name LIKE 'Redbridge%' OR LSOA_name LIKE 'Richmond upon Thames%' OR LSOA_name LIKE 'Sutton%' OR LSOA_name LIKE 'Waltham Forest%'");
        console.log(result.rows.length)
        let geoJson = convertToGeoJson(result.rows)
        res.send(geoJson)
    } catch (error){
        res.statusCode = 400;
        res.send()
    }
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});