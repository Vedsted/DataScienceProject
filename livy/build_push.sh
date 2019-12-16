#!/bin/bash
docker build --rm -t vedsted/livy .

echo "Please input your dockerhub username in order to push the image"
read USERNAME

docker push $USERNAME/livy