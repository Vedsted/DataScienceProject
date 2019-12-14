# Hadoop Docker Environment
The `docker-compose` file contains the whole Hadoop environment including:

* HDFS cluster
  * Namenode
  * Datanode1
  * Datanode2
  * Datanode3
* Yarn cluster
  * Resourcemanager
  * Nodemanager
* History server for logging results from programs run on the YARN cluster
* Network for communication
* Volumes for containers


Run the environment by issuing:

```
docker-compose up
```