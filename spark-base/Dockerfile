FROM alpine:3.10

ENV SPARK_VERSION=2.4.4
ENV HADOOP_VERSION=2.7
ENV SPARK_HOME=/spark

RUN apk add --no-cache curl bash openjdk8-jre python3 py-pip nss libc6-compat \
      && ln -s /lib64/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2 \
      && wget https://archive.apache.org/dist/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz \
      && tar -xvzf spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz \
      && mv spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION} spark \
      && rm spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz \
      && cd /

# The jersey-bundle needs to be included in order to support calls to the history server
# See: https://www.hackingnote.com/en/spark/trouble-shooting/NoClassDefFoundError-ClientConfig
ADD jars/jersey-bundle-1.17.1.jar /spark/jars/jersey-bundle-1.17.1.jar
ADD jars/jsr311-api-1.1.1.jar /spark/jars/jsr311-api-1.1.1.jar

# Add the YARN and Hadoop configuration files which will be replicated to the node managers (YARN workers)
ADD conf /conf

# Add the spark environment variables. This sets variables that points to the configuration folders for YARN and Hadoop (above)
ADD spark-env.sh /spark/conf/spark-env.sh
# Make sure that we can execute the script
RUN chmod +x /spark/conf/spark-env.sh


ENTRYPOINT ["/bin/bash"]