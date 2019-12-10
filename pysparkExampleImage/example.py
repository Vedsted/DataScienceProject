from pyspark import SparkConf, SparkContext
import locale
locale.getdefaultlocale()
locale.getpreferredencoding()

conf = SparkConf().set('spark.driver.host', '127.0.0.1')
#sc = SparkContext(master='spark://spark-master:7077', appName='myAppName', conf=conf) # Schedule the job to the spark cluster
sc = SparkContext(master='local', appName='myAppName', conf=conf) # Schedule the job to the local container/machine i.e. non-cluster mode

files = "hdfs://namenode:9000/books" # Look in the folder books
txtFiles = sc.wholeTextFiles(files, 20)
words_in_files = txtFiles.map(lambda s: s[1].split())
all_word = txtFiles.flatMap(lambda s: s[1].split())
word_map = all_word.map(lambda s: (s, 1))
word_reduce = word_map.reduceByKey(lambda s, t: s+t)
print(word_reduce.sortBy(lambda s: s[1]).collect())
