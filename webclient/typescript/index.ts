import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat, toLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON'
import { Heatmap as HeatmapLayer, Tile as TileLayer, Vector, Layer } from 'ol/layer';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import {click, pointerMove} from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import {toStringHDMS} from 'ol/coordinate';
import FeatureFormat from 'ol/format/Feature';
import Point from 'ol/geom/Point';
import Geometry from 'ol/geom/Geometry';
import UrlTile from 'ol/source/UrlTile';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

const blur = document.getElementById('blur') as HTMLInputElement;
const radius = document.getElementById('radius') as HTMLInputElement;
const radiusValue = document.getElementById('radiusValue') as HTMLElement;
const blurValue = document.getElementById('blurValue') as HTMLElement;
let vector: HeatmapLayer;
let raster: TileLayer;
let map: Map;
let sovs: VectorSource;
let min: number;
let max: number;
const updateMapBtn = document.getElementById('updateMap') as HTMLButtonElement;
updateMapBtn.onclick = updateMap;

/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup') as HTMLElement;
var content = document.getElementById('popup-content') as HTMLElement;
var closer = document.getElementById('popup-closer') as HTMLElement;

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new Overlay({
   element: container,
   autoPan: false
 });

 /**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
   overlay.setPosition(undefined);
   closer.blur();
   return false;
 };


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

raster = new TileLayer({
   source: new Stamen({
         layer: 'toner'
   })
});

map = new Map({
   layers: [raster],
   target: 'map',
   view: new View({
         //center: fromLonLat([-0.22, 51.5285582]), // Approx. Center of London
         center: fromLonLat([0.184317, 51.57628199]), // Romford
         //center: fromLonLat([-4.5698728, 52.8170751]), // Approx Center of UK
         zoom: 15 // Zoom level match when using Center of London
   }),
   overlays: [overlay]
});

// select interaction working on "pointermove"
var selectPointerMove = new Select({
   condition: pointerMove,
   multi: true
});
selectPointerMove.setHitTolerance(10);

// Add hover to each feature on the map
map.addInteraction(selectPointerMove);
selectPointerMove.on('select', function(e) {
   let features = e.selected;

   if (features != undefined && features.length > 0) {
      let feature = features[0];

      let clustersize = feature.get('clustersize');
      let point = feature.getGeometry() as Point;
      let coordinate = point.getCoordinates(); // XY pair i.e. not lat/long pairs
      let lonLat = toLonLat(coordinate);

      content.innerHTML = '<p>Cluster size:</p><code>' + clustersize +
          '</code>' +
          '<br/>' +
          '<p>Coordinates [lat, long]:</p><code>' +
          '[' + lonLat[1] + ", " + lonLat[0] + "]"
          '</code>';
      overlay.setPosition(coordinate);
   } else {
      overlay.setPosition(undefined);
   }
});


function updateMap() {
   console.log("Update trigger");
   clearHeatMapLayer();
   console.log("Heatmap cleared");
   let selectedDataset = document.getElementById("dataset") as HTMLInputElement;
   let datasetEndpoint = "http://localhost:3000" + selectedDataset.value
   console.log("Updating heatmap with: " + datasetEndpoint);
   updateHeatMapLayer(datasetEndpoint);
   console.log("Heatmap updated");
}

function clearHeatMapLayer() {
   if (vector != null) {
      var features = vector.getSource().getFeatures();
      features.forEach((feature) => {
         vector.getSource().removeFeature(feature);
      });
   }
}


function updateHeatMapLayer(url: string) : void {
   let res= fetch(url, {method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ columns:["Latitude", "Longitude"], filePath:"street/out-2019-10-k-30000-n-544118-m-3", params:[]})})
   res.then((res) => {
      return res.json()
   }).then((json) => {
      let input = json;
      console.log(input.features[0])
      input.features[0]["ol_uid"] = undefined
      delete input.features[0].ol_uid
      console.log(input.features[0])
      console.log(input);

      sovs = new VectorSource({format: new GeoJSON(), loader: () => {
         if(sovs != undefined){
               let f = sovs.getFormat()
               
               if(f) {
                  sovs.addFeatures(f.readFeatures(input, {featureProjection: "EPSG:3857"}) as Feature[]);
               }
         }
      }});
      
      
      
      vector = new HeatmapLayer({
         source: sovs,
         blur: parseInt(blur.value, 25),
         radius: parseInt(radius.value, 10),
         gradient: ['#0000ff', '#0000f0', '#00ffff', '#00ff00', '#00f000', '#ffff00', '#fff000', '#f00000', '#ff0000'],
         weight: function(feature) {
               //var weightProperty = feature.get('weight'); // The key from the properties object in the GeoJSON object
               //var weight = parseFloat(weightProperty);
               //return weight + 0.2; // weight; The weight should be between 0-1. 

               if (min == max) {
                  return 1;
               }

               let newWeight = (parseFloat(feature.get('weight'))-min)/(max-min);

               return newWeight + 0.2;
         }
      });

      map.addLayer(vector);
      
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
   });
}

map.on("postrender", function(e){
   var extent = map.getView().calculateExtent(map.getSize());

   let weights = sovs.getFeaturesInExtent(extent).map(x => parseFloat(x.get("weight")));

   min = Math.min(... weights);
   max = Math.max(... weights);

   console.log("moveend: min: " + min + ", max: " + max);
});