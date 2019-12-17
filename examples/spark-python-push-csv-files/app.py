from pyspark import SparkContext, SparkFiles
from pyspark.sql import SparkSession
import os

sc = SparkContext(master='local', appName='Upload CSV files', )
ss = SparkSession(sc)

files = os.listdir("/app/files")
for file in files:
    path = "file:///app/files/" + file
    sc.textFile(path).saveAsTextFile("hdfs://namenode:9000/csvfiles/" + file)

sc.stop()