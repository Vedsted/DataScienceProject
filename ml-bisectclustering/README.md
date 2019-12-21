# Bisecting kmeans clustering
This program contains an implementation of Bisecting kmeans clustering which is an extension to the original kmeans clustering algorithm. The main difference is that bisecting divides clusters that have the highest sum of squared distances (i.e. variance, heterogenity).

## Prerequisites
* Python3 (preferably 3.5.0+ and < 3.8.0)
* PySpark (+ Spark which should be included when downloading PySpark)
* pip install numpy

## Running local mode
The clustering algorithm can be run in spark local mode by typing the command:
```
./run-spark-local-example.sh

or

spark-submit --driver-memory 8g --executor-memory 8g --jars core-1.1.2.jar Bkm.py testdata/crime-data/*/*.csv --outputFile testdata/out.csv --k 100000 --m 3
```
The parameters for the bisect clustering algorithm can be manipulated in the script.

To see the help for the python program type:
```
python Bkm.py --help
```

### Performance considerations
Use df.cache() on the dataframe where .fit(df) is called. This eliminates to read all the csv files multiple times for each .collect() in the machine learning algorithm.
dont use df.limit(observations) because this takes A LONG TIME to calculate between iterations of kmeans
Decreasing the number of k should increase the performance, because the more clusters that are made, the more divisions/splits required.
There should be enough driver-memory and executor memory in order not to get out-of-memory exceptions. Successufully tested with 8g driver memory and 8g executor memory for all the street crime data.



### Measures
Measures
testdata/crime-data/2019-10/*.csv
spark-submit --driver-memory 4g --executor-memory 8g --jars core-1.1.2.jar Bkm.py nill --outputFile testdata/out.csv --k 100000 --m 3
k = 100.000, m = 3, on dataset 2019-10-*
start time: ~21:40
finish time: ~22:28


testdata/crime-data/2019-*/*.csv
spark-submit --driver-memory 4g --executor-memory 8g --jars core-1.1.2.jar Bkm.py nill --outputFile testdata/out.csv --k 100000 --m 3
start time: ~22:33
end time: ~23:52
SSD = 52.53385109099166

testdata/crime-data/*/*.csv
spark-submit --driver-memory 8g --executor-memory 8g --jars core-1.1.2.jar Bkm.py nill --outputFile testdata/out.csv --k 100000 --m 3
start time: ~00:15
end time: ~02:48
SSD = 248.25876109053772