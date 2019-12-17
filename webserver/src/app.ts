import express = require('express');
import {spawn} from "child_process" ;

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
    

    const pythonProcess = spawn('python',["./src/python/test.py"]);


    pythonProcess.stdout.on('data', (data:Buffer) => {
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