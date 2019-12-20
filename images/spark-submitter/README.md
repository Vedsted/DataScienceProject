# Spark Job Submitter
Image for submiting a given pyspark job to the Yarn cluster.

## Use
The image executes a given python script located in `/app/app.py`.
To use the image, volume your application into the `/app` folder with the app entrypoint named `app.py`.

## Docker Run Example
A few examples of how to run the Spark Submitter via shell. Remember that volumes are with full qualified path.
```
docker run -v /path/to/app/folder:/app -n vedsted/spark_submitter
```
```
docker run --rm --name sparkjob -v /path/to/app/folder:/app --network hadoop --ip 172.25.0.241 vedsted/spark_submitter
```

## Docker Compose Example
The spark Submitter can also be run via Docker Compose.
```
version: "3.5"

services:
  sparkjob:
    image: spark_submitter
    volumes:
      - ./myApp.py:/app/app.py
      - ./otherfiles:/app/files

networks:
  default:
    external:
      name: hadoop
```

## Build Image
```
docker build --rm -t vedsted/spark_submitter .
```

## Push Image to Docker Hub
```
docker push vedsted/spark_submitter
```