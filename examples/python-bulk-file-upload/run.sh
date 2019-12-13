#!/bin/bash
docker build --rm -t bde/spark-app .
docker run --rm --name my-spark-app -v $PWD/../filesCopy:/app/files -e ENABLE_INIT_DAEMON=false --network hadoop --ip 172.25.0.240 bde/spark-app
