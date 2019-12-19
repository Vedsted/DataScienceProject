import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON'
import { Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';

const blur = document.getElementById('blur') as HTMLInputElement;
const radius = document.getElementById('radius') as HTMLInputElement;
const radiusValue = document.getElementById('radiusValue') as HTMLElement;
const blurValue = document.getElementById('blurValue') as HTMLElement;


let j = `
{ 
    "type":"FeatureCollection",
    "features":[ 
       { 
          "type":"Feature",
          "geometry":{ 
             "type":"Point",
             "coordinates":[ 
                51.515307,
                -0.097277
             ]
          },
          "properties":{ 
             "weight":1
          }
       },
       { 
          "type":"Feature",
          "geometry":{ 
             "type":"Point",
             "coordinates":[ 
                51.515606,
                -0.094094
             ]
          },
          "properties":{ 
             "weight":1
          }
       },
       { 
          "type":"Feature",
          "geometry":{ 
             "type":"Point",
             "coordinates":[ 
                51.515606,
                -0.094094
             ]
          },
          "properties":{ 
             "weight":1
          }
       },
       { 
          "type":"Feature",
          "geometry":{ 
             "type":"Point",
             "coordinates":[ 
                51.515606,
                -0.094094
             ]
          },
          "properties":{ 
             "weight":1
          }
       },
       { 
          "type":"Feature",
          "geometry":{ 
             "type":"Point",
             "coordinates":[ 
                51.516497,
                -0.094115
             ]
          },
          "properties":{ 
             "weight":1
          }
       }
    ]
 }
`;




let res= fetch("http://192.168.43.60:3000/raw", {method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ columns:["Latitude", "Longitude"], filePath:"street", params:[]})})
res.then((res) => {
    return res.json()
}).then((json) => {
    let input = json;
    console.log(input.features[0])
    input.features[0]["ol_uid"] = undefined
    delete input.features[0].ol_uid
    console.log(input.features[0])
    console.log(input);

    let sovs = new VectorSource({format: new GeoJSON(), loader: () => {
        if(sovs != undefined){
            let f = sovs.getFormat()
            
            if(f) {
                sovs.addFeatures(f.readFeatures(input, {featureProjection: "EPSG:3857"}) as Feature[]);
            }
        }
    }});
    
    
    
    var vector = new HeatmapLayer({
        source: sovs,
        blur: parseInt(blur.value, 25),
        radius: parseInt(radius.value, 10),
        weight: function(feature) {
            var weightProperty = feature.get('weight'); // The key from the properties object in the GeoJSON object
            var weight = parseFloat(weightProperty);
            return weight;
        }
    });
    
    var raster = new TileLayer({
        source: new Stamen({
            layer: 'toner'
        })
    });
    
    new Map({
        layers: [raster, vector],
        target: 'map',
        view: new View({
            center: fromLonLat([-0.096091, 51.51391]), // Approx. Center of London
            zoom: 15
        })
    });
    
    var blurHandler = function() {
        vector.setBlur(parseInt(blur.value, 10));
        blurValue.innerHTML = blur.value;
    };
    blur.addEventListener('input', blurHandler);
    blur.addEventListener('change', blurHandler);
    
    var radiusHandler = function() {
        vector.setRadius(parseInt(radius.value, 10));
        radiusValue.innerHTML = radius.value;
    };
    radius.addEventListener('input', radiusHandler);
    radius.addEventListener('change', radiusHandler);
})

