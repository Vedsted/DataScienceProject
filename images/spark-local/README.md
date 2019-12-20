# Spark Job Local
Image for executing a given pyspark job locally.

## Use
The image executes a given python script located in `/app/app.py`.
To use the image, volume your application into the `/app` folder with the app entrypoint named `app.py`.

## Docker Run Example
A few examples of how to run a Spark Local container via shell. Remember that volumes are with full qualified path.
```
docker run -v /path/to/app/folder:/app -n vedsted/spark_local
```
```
docker run --rm --name sparkjob -v /path/to/app/folder:/app --network hadoop --ip 172.25.0.241 vedsted/spark_local
```

## Docker Compose Example
The spark Local can also be run via Docker Compose.
```
version: "3.5"

services:
  sparkjob:
    image: spark_local
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
docker build --rm -t vedsted/spark_local .
```

## Push Image to Docker Hub
```
docker push vedsted/spark_local
```