#!/bin/bash
# Submits the python script to the YARN cluster
/spark/bin/spark-submit \
    --master yarn \
    --deploy-mode cluster \
    /app/app.py $BKM_IN --outputFile $BKM_OUT --k $BKM_K --n $BKM_N --m $BKM_M