# Hadoop-nodemanager
An extension of to the image `bde2020/hadoop-nodemanager:2.0.0-hadoop3.1.2-java8`.

This image contains runtimes that are needed in order to execute jobs on nodemanagers (workers) in the YARN cluster. For example, in order to execute Python programs, a Python runtime must be available on each nodemanager or an exception is thrown when Python jobs are submitted to the YARN cluster.