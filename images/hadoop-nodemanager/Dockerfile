FROM bde2020/hadoop-nodemanager:2.0.0-hadoop3.1.2-java8

RUN apt update
# Install python dependencies
RUN apt install -yq python python-pip python3 python3-pip

# Force the nodemanager to use python3 instead of python2. PySpark requires(?) python3.
RUN alias python=python3 >> /root/.bashrc
RUN alias pip=pip3 >> /root/.bashrc
RUN pip install numpy