# Spark Job Executor
Image for executing a given pyspark job.

## Use
The image executes a given python script located in `/app/app.py`.
To use the image, volume your application into the `/app` folder with the app entrypoint named `app.py`.

## Docker Run Example
A few examples of how to run the Spark executor via shell. Remember that volumes are with full qualified path.
```
docker run -v /path/to/app/folder:/app -n vedsted/spark_executor
```
```
docker run --rm --name sparkjob -v /path/to/app/folder:/app --network hadoop --ip 172.25.0.241 vedsted/spark_executor
```

## Docker Compose Example
The spark executor can also be run via Docker Compose.
```
version: "3.5"

services:
  sparkjob:
    image: spark_executor
    volumes:
      - ./myApp.py:/app/app.py
      - ./otherfiles:/app/files

networks:
  default:
    external:
      name: hadoop
```

## Providing arguments to spark jobs
In some cases you may want to provide arguments to a spark job e.g arguments for spark-submit or a python program. This is possible by overriding the default submit-job.sh file in the `docker-compose.yml` file. Spark-submit arguments can be provided by overriding the `submit-job.sh` from the spark-base image. To override the `submit-job.sh` do the following:

1. Create the `docker-compose.yml` file in a new folder as usual.
1. Create a new `submit-job.sh` file (same directory as `docker-compose.yml`) with the specific arguments you need e.g.
```
#!/bin/bash
# Submits the python script to the YARN cluster
/spark/bin/spark-submit \
    --master yarn \
    --deploy-mode cluster \
    /app/app.py $BKM_IN --outputFile $BKM_OUT --k $BKM_K --n $BKM_N --m $BKM_M
```
1. Make the `submit-job.sh` file executable
```
chmod +x submit-job.sh
```
1. Edit the content of the `docker-compose.yml` file to volume the new `submit-job.sh` and set the environment variables which will be passed to the python program. An example is shown below.
```
services:
  sparkjob:
    image: vedsted/spark_executor
    volumes:
      - ./Bkm.py:/app/app.py # Volume the python program
      - ./submit-job.sh:/app/submit-job.sh # Volume the custom script
    environment:
      - BKM_IN=hdfs://namenode:9000/csvfiles/*.csv # The input file
      - BKM_OUT=hdfs://namenode:9000/dataframes/clustering-testoutput.csv # The name of the output file
      - BKM_M=1 # Least divisible cluster size
      - BKM_N=20 # Number of observations to use in the provided input file
      - BKM_K=5 # Number of clusters
networks:
  default:
    external:
      name: hadoop
```
1. Run `docker-compose up`.

## Build Image
```
docker build --rm -t vedsted/spark_executor .
```

## Push Image to Docker Hub
```
docker push vedsted/spark_executor
```