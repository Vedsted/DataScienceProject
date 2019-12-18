import sys
import os
from pyspark.sql import SparkSession

spark = SparkSession \
    .builder \
    .master("local")\
    .appName("Python Spark SQL basic example") \
    .getOrCreate()


path = os.path.join(os.getcwd(), "src", "python", "people.json")
print(path)
df = spark.read.json(path)
#Displays the content of the DataFrame to stdout
df.show()

dataToSendBack = df.toJSON()

spark.stop()
print(dataToSendBack)
sys.stdout.flush()

