#!/bin/bash
docker build --rm -t spark-java-example .
docker run --rm --name spark-java-example --network hadoop --ip 172.25.0.240 spark-java-example
