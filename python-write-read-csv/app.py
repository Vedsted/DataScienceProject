from pyspark import SparkContext
from pyspark.sql import SparkSession

sparkContext = SparkContext(appName='addFiles')
sparkSession = SparkSession(sparkContext)

# Create data
data = [('First', 1), ('Second', 2), ('Third', 3), ('Fourth', 4), ('Fifth', 5)]
df = sparkSession.createDataFrame(data)

# Write into HDFS
df.write.csv('hdfs://namenode:9000/csv/test.csv')

df_load = sparkSession.read.csv('hdfs://namenode:9000/csv/test.csv')
df_load.show()