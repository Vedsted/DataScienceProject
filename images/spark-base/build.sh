#!/bin/bash
docker build --rm -t csbc92/spark-base .

echo "Please input your dockerhub username in order to push the image"
read USERNAME

docker push $USERNAME/spark-base