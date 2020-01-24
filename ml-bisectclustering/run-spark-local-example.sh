#!/bin/bash
# The example should be run locally and requires PySpark
# Runs the bisect clustering algorithm with test data on 20 observations
rm -fr testdata/out.csv
python Bkm.py testdata/2019-02-surrey-street.csv --outputFile testdata/out.csv --k 5 --n 20 --m 1