import sys
from pyspark.sql import SparkSession

spark = SparkSession \
    .builder \
    .appName("Python Spark SQL basic example") \
    .config("spark.some.config.option", "some-value") \
    .getOrCreate()

df = spark.read.json("./src/python/people.json")
# Displays the content of the DataFrame to stdout
#df.show()

dataToSendBack = df.toJSON()
print(dataToSendBack)
sys.stdout.flush()