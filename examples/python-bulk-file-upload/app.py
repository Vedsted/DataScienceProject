from pyspark import SparkContext, SparkFiles
from pyspark.sql import SparkSession

path = "file:///app/files/"#2019-10-avon-and-somerset-street.csv"

sc = SparkContext(master='local', appName='Upload Street Files')
ss = SparkSession(sc)

#text = sc.textFile(path).collect()
#print(text)

df = ss.read.option("header", "true").csv(path)
df.printSchema()
print("Number of rows: " + str(df.count()))

df.write.csv("hdfs://namenode:9000/csv/street.csv")

df_load = ss.read.csv("hdfs://namenode:9000/csv/street.csv")
df_load.printSchema()
print("Number of rows: " + str(df_load.count()))
