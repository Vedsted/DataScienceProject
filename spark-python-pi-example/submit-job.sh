#!/bin/bash
# The script submits the python script to the YARN cluster
/spark/bin/spark-submit \
    --master yarn \
    --deploy-mode cluster \
    /app/app.py