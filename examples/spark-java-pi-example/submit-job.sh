#!/bin/bash
# The script submits the java program to the YARN cluster
/spark/bin/spark-submit --class org.apache.spark.examples.SparkPi \
    --master yarn \
    --deploy-mode cluster \
    /spark/examples/jars/spark-examples*.jar \
    10