#!/bin/bash
docker build --rm -t spark-client .
docker run --rm --name my-spark-client --network hadoop --ip 172.25.0.240 -ti spark-client
