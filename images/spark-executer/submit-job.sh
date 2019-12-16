#!/bin/bash
ls -la /app

FILE=/app/files.zip
if test -f "$FILE"; 
then
# Submits job with zip file containing extra files. E.g. csv files
/spark/bin/spark-submit \
    --master yarn \
    --deploy-mode cluster \
    --files /app/files.zip \
    /app/app.py
else
# Submits the python script to the YARN cluster
/spark/bin/spark-submit \
    --master yarn \
    --deploy-mode cluster \
    /app/app.py
fi
