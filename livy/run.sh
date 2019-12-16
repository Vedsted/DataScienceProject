#!/bin/bash
docker build -t livy-image .
docker run --rm -ti --name livy -p 8998:8998 --network hadoop --ip 172.25.0.240 livy-image
