#!/bin/bash
docker build --rm -t spark-python-example-1 .
docker run --rm --name spark-python-example-1 --network hadoop --ip 172.25.0.241 spark-python-example-1
