# Web client for crime data
This is a web client for showing crime data in a web browser. It uses OpenLayers and GeoJSON to display a Heatmap of the crimes.

![Web Client](web-client.png?raw=true)

# Building the web client
```bash
./build.sh
```

# Cleaning up
```bash
./clean.sh
```

# Known issues
The map.on("postrender", ..) method makes an error appear in the web console: TypeError: kc is undefined
This issue should can be solve by a workaround; click the button 'Update map' in the UI will effectively make this error dissapear. The reason is that the postrender method on the openlayers map cannot be executed when no data is visualized on the map.
