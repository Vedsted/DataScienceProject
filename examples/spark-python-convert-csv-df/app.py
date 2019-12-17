from pyspark import SparkContext
from pyspark.sql import SparkSession

sc = SparkContext(appName="Convert CSV's to Dataframe")
ss = SparkSession(sc)

filesPath = "hdfs://namenode:9000/csvfiles/*.csv"
df = ss.read.csv(filesPath)
df.printSchema()
print("Number of rows: " + str(df.count()))

dfPath = "hdfs://namenode:9000/dataframes/street.csv"
df.write.csv(dfPath)

ss.stop()