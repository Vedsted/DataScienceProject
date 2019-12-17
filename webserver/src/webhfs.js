const WebHDFS = require("webhdfs")
var request = require("request")


let url = "http://192.168.43.61";

let port = 9870; //change here if you are using different port

let dir_path = "dataframes/street.csv";

let path = "/webhdfs/v1/" + dir_path + "?op=LISTSTATUS";

let full_url = url + ':' + port + path;


let hdfs = WebHDFS.createClient({


    host: "192.168.43.61",

    port: 9870, //change here if you are using different port

    path: "webhdfs/v1/"

});

request(full_url, function (error, response, body) {

    if (!error && response.statusCode == 200) {

        //console.log(".. response body..", body);

        let jsonStr = JSON.parse(body);

        let filestatus = jsonStr.FileStatuses.FileStatus;

        let objLength = Object.entries(filestatus).length;

        console.log("..Number of files in the folder: ", objLength);

        for(let i = 0; i < objLength; i++){
            let suffix = filestatus[i].pathSuffix;
            if(!suffix.startsWith("_")){
                readFile(dir_path + "/" + suffix)
            }
        }

    } else {

        console.log("..error occured!..");

    }

});

function readFile(hdfs_file_name) {


    let remoteFileStream = hdfs.createReadStream(hdfs_file_name);

    remoteFileStream.on("error", function onError(err) { //handles error while read

        // Do something with the error

        console.log("...error: ", err);

    });

    let dataStream = [];

    remoteFileStream.on("data", function onChunk(chunk) { //on read success

        // Do something with the data chunk 

        dataStream.push(chunk);

        // console.log('..chunk..',chunk);

    });

    remoteFileStream.on("finish", function onFinish() { //on read finish

        console.log('..on finish..');

        console.log('..file data..', dataStream.toString().split('\n')[0]);

    });

}