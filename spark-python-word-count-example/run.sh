#!/bin/bash
docker build --rm -t spark-python-example .
docker run --rm --name spark-python-example --network hadoop --ip 172.25.0.240 spark-python-example
