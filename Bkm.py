from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark.ml.clustering import BisectingKMeans
from pyspark.ml.feature import VectorAssembler
from pyspark.sql import functions as sf
from pyspark.sql.functions import *
import sys
import argparse


"""
Usage: --inputFile inputPath [--outputFile outputPath] [--k numberOfClusters] [--numberOfObservations n] [--minimumDivisibleClusterSize m (>=1.0)]
"""
def log(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

parser = argparse.ArgumentParser(description='BKM Cluster on input file')
parser.add_argument('inputFile', metavar='inputPath', type=str, help='Path to input data')
parser.add_argument('--outputFile', metavar='outputPath', type=str, help='Path to store the BKM output')
parser.add_argument('--k', metavar='numberOfClusters', type=int, help='Number of clusters to be used in the BKM model')
parser.add_argument('--n', metavar='numberOfObservations', type=int, help='Number of rows from the input file to be used for clustering')
parser.add_argument('--m', metavar='minimumDivisibleClusterSize', type=int, help='Minimum cluster size, should be greater than or equal to 1.0')
args = parser.parse_args()

if args.k:
    num_of_Clusters = args.k
else:
    num_of_Clusters = 3

if args.outputFile:
    output = args.outputFile
else:
    output = "somepath.csv" #Set this to some HDFS PATH

if args.n:
    observations = args.n
else:
    observations = 25

if args.m:
    minDivisSize = args.m
else:
    minDivisSize = 25


log('Running BKM.py with following arguments:')
log("Number of Clusters: ")
log("Input File: ")
log("Output File: ")
log("Number of Observations: ")
log("Minimum Divisible Cluster Size: ")

"""
#BKM model variables
minDivisSize = 1.0
num_of_Clusters = 3
observations = 25
"""


#data = args.inputFile
data = "london-street.csv"

sc = SparkContext(appName='ClusteringAlgorithm').getOrCreate()
ss = SparkSession(sc)

df = ss.read.option("header", "true").csv(data)



#REmove null values in lat/long
df_notnull = df.filter(sf.col("Latitude").isNotNull() & sf.col("Longitude").isNotNull())
df_limit = df_notnull.limit(observations)

vectorAssembler = VectorAssembler(inputCols=["Latitude", "Longitude"],
                                  outputCol="Features")


# For your special case that has string instead of doubles you should cast them first.
expr = [col(c).cast("Double").alias(c)
        for c in vectorAssembler.getInputCols()]

#Apply the above expression
df_vector = df_limit.select(*expr)

#Transform the dataFrame based on the vector assembler
df_trans = vectorAssembler.transform(df_vector)

#Create id that can be used correlate each observation to its feature vector
df_trans = df_trans.withColumn("id", monotonically_increasing_id())
df_limit = df_limit.withColumn("id", monotonically_increasing_id()).drop()

#Drop one of the id columns after joining
df_joined = df_limit.join(df_trans, "id", "inner").drop("id")

bkm = BisectingKMeans(k=num_of_Clusters, minDivisibleClusterSize=minDivisSize, featuresCol="Features")
model = bkm.fit(df_joined)

log("Model was trained using following parameters:")
log("")
log(model.extractParamMap())
log("")

centers = model.clusterCenters()
log("The coordinates to each cluster center:")
log(centers)

summary = model.summary
log("Size of each identified cluster:")
log(summary.clusterSizes)

#DataFrame of predicted cluster centers for each training data point
predictions = summary.cluster

#Combine the predictions with the input dataFrame
df_With_Predictions = model.transform(df_joined)
df_With_Predictions.show(25)

df_With_Predictions.write.format("com.databricks.spark.csv").option("header", "true").save("test2.csv")

cost = model.computeCost(df_joined) #Sum of square distnances - model error
log("SSD = " + str(cost))
