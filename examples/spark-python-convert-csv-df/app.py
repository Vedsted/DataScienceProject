from pyspark import SparkContext
from pyspark.sql import SparkSession

sc = SparkContext(appName="Convert CSV's to Dataframe")
ss = SparkSession(sc)


# Convert street files
filesPath = "hdfs://namenode:9000/csvfiles/street/*.csv"
df = ss.read.csv(filesPath)
df.printSchema()
print("Number of rows: " + str(df.count()))

dfPath = "hdfs://namenode:9000/dataframes/street.csv"
df.write.csv(dfPath)


# Convert outcome files
filesPath = "hdfs://namenode:9000/csvfiles/outcomes/*.csv"
df = ss.read.csv(filesPath)
df.printSchema()
print("Number of rows: " + str(df.count()))

dfPath = "hdfs://namenode:9000/dataframes/outcomes.csv"
df.write.csv(dfPath)

ss.stop()