#!/bin/bash
# Cleans the dist folder created by the Parcel plugin
rm -fr dist

# Clean the cache dir created by the Parcel plugin
rm -fr .cache

# Clean the intalled node modules
rm -fr node_modules