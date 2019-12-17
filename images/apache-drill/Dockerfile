FROM openjdk:8

RUN apt update -y
RUN apt install -y curl wget
RUN wget http://www.apache.org/dyn/closer.lua\?filename\=drill/drill-1.16.0/apache-drill-1.16.0.tar.gz\&action\=download -O /apache-drill-1.16.0.tar.gz
RUN tar -xvzf /apache-drill-1.16.0.tar.gz
RUN mv /apache-drill-1.16.0 /drill
RUN rm /apache-drill-1.16.0.tar.gz

ADD storage-plugins-override.conf /drill/conf/storage-plugins-override.conf

ENTRYPOINT [ "/bin/bash /drill/bin/drill-embedded" ]