#!/bin/bash
docker build -t vedsted/livy .
docker run --rm -d --name livy -p 8998:8998 --network hadoop --ip 172.25.0.240 vedsted/livy