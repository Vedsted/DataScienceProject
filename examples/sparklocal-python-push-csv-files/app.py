from pyspark import SparkContext, SparkFiles
from pyspark.sql import SparkSession
import os

sc = SparkContext(master='local', appName='Upload CSV files', )
ss = SparkSession(sc)

dirPath = "/app/files/street"
files = os.listdir(dirPath)
for file in files:
    path = "file://" + dirPath + file
    sc.textFile(path).saveAsTextFile("hdfs://namenode:9000/csvfiles/street/" + file)

dirPath = "/app/files/outcomes"
files = os.listdir(dirPath)
for file in files:
    path = "file://" + dirPath + file
    sc.textFile(path).saveAsTextFile("hdfs://namenode:9000/csvfiles/outcomes/" + file)

sc.stop()