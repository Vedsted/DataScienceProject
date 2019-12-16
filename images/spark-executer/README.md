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

## Build Image
```
docker build --rm -t vedsted/spark_executor .
```

## Push Image to Docker Hub
```
docker push vedsted/spark_executor
```