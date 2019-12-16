from pyspark import SparkContext, SparkFiles
from pyspark.sql import SparkSession
import os
from zipfile import ZipFile

sc = SparkContext(appName='Upload CSV files')
ss = SparkSession(sc)



myCmd = 'ls -la .'
print("Files:")
os.system(myCmd)

# Create a ZipFile Object and load sample.zip in it
with ZipFile("files.zip", 'r') as zipObj:
   # Extract all the contents of zip file in current directory
   zipObj.extractall(SparkFiles.getRootDirectory())

print("Files unzipped:")
#os.system(myCmd)
os.system("ls -la " + SparkFiles.getRootDirectory())


files = [name for name in os.listdir(SparkFiles.getRootDirectory() + "/files/") if os.path.isfile(name)]
print(files)
for file in files:
    print("File: " + file)
    path = "file://" + SparkFiles.getRootDirectory() + "/files/" + file
    sc.textFile(path).saveAsTextFile("hdfs://namenode:9000/csvfiles/" + file)

sc.stop()

#files = sc.wholeTextFiles("file://" + SparkFiles.getRootDirectory() + "/files")
#for key in files.keys:
#    print(key)

#df = ss.read.option("header", "true").csv("file://" + SparkFiles.getRootDirectory() + "/files")
#df.printSchema()
#print("Number of rows: " + str(df.count()))
#
#df.write.csv("hdfs://namenode:9000/csv/street.csv")