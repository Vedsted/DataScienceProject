FROM csbc92/spark-base

ENV LIVY_HOME=/livy

# Env configured matching base img in file: spark-env.sh
ENV HADOOP_CONF_DIR=/conf/hadoop
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk

RUN wget http://ftp.download-by.net/apache/incubator/livy/0.6.0-incubating/apache-livy-0.6.0-incubating-bin.zip
RUN unzip apache-livy-0.6.0-incubating-bin.zip
RUN rm apache-livy-0.6.0-incubating-bin.zip
RUN mv /apache-livy-0.6.0-incubating-bin ${LIVY_HOME}
RUN cp ${LIVY_HOME}/conf/log4j.properties.template ${LIVY_HOME}/conf/log4j.properties
RUN mkdir -p /${LIVY_HOME}/logs
RUN apk --update add procps
RUN rm -rf /var/cache/apk/*


ADD conf /conf
ADD spark-defaults.conf /spark/conf/spark-defaults.conf
ADD init.sh /init.sh
RUN chmod +x /init.sh
CMD [ "init.sh" ]
