#!/bin/bash
# This script is supposed to override the original COMMAND set in the Dockerfile 

# This call blocks any preceding calls until the HDFS is ready and not in SAFEMODE
# The resourcemanager is not able to start while the HDFS is in SAFEMODE
/opt/hadoop-3.1.3/bin/hadoop dfsadmin -safemode wait
/entrypoint.sh
$HADOOP_PREFIX/bin/yarn --config $HADOOP_CONF_DIR resourcemanager # Start the resourcemanager - was in the original run.sh script