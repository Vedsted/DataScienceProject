import express = require('express');
import { spawn } from "child_process";
import * as request from "request-promise-native";
// Create a new express application instance
const app: express.Application = express();

app.get('/', async function (req, res) {


    request.post("http://192.168.43.61:8047/query.json", {
        json: {
            queryType: "SQL",
           // query: "SELECT * FROM dfs.`dataframes/street.csv`",
            query: "SELECT * FROM dfs.`dataframes/street.csv` WHERE Crime_type='Drugs'",
            autoLimit: "10000"
        }
    }, (error, result, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${result.statusCode}`)
        console.log(body)
        console.log(body)
        res.send(body);
    })
  

});

app.get('/python', function (req, res) {


    const pythonProcess = spawn('python', ["./src/python/test.py"]);


    pythonProcess.stdout.once('data', (data: Buffer) => {
        // Do something with the data returned from python script
        console.log(data.toString());
        console.log(data);

        res.write("<html>")
        res.write(data);
        res.write("</html>")
        res.end();
    });


});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});