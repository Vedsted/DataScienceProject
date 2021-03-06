from pyspark import SparkContext, SparkFiles
from pyspark.sql import SparkSession
import os

sc = SparkContext(master='local', appName='Upload CSV files', )
ss = SparkSession(sc)

dirpath = "/app/files/street/"
files = os.listdir(dirpath)
for file in files:
    path = "file://" + dirpath + file
    sc.textFile(path).saveAsTextFile("hdfs://namenode:9000/csvfiles/street/" + file)


sc.stop()