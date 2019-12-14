#!/bin/bash
docker build --rm -t spark-python-example-2 .
docker run --rm --name spark-python-example-2 --network hadoop --ip 172.25.0.242 spark-python-example-2
