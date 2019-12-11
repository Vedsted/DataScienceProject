docker build . -t pysparkaddfile:latest 
docker run --rm --ip 172.25.0.240 --hostname pyspark --network hadoop pysparkaddfile
