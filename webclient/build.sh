#!/bin/bash
npm install
npm run-script build # Run the custom script defined in the package.json file

echo "Finished building. Output is in the dist directory."