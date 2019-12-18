import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON'
import { Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';

const blur = document.getElementById('blur') as HTMLInputElement;
const radius = document.getElementById('radius') as HTMLInputElement;
const radiusValue = document.getElementById('radiusValue') as HTMLElement;
const blurValue = document.getElementById('blurValue') as HTMLElement;

let res= fetch("http://localhost:3000/raw", {method:"POST", body:JSON.stringify({ columns:["Latitude", "Longitude"], filePath:"street", params:[{key:"Crime_type", value:"Drugs" }]})})
res.then((res) => {
    return res.json()
}).then((json) => {
    var vector = new HeatmapLayer({
        source: new VectorSource({
            format: new GeoJSON(),
            features: JSON.parse(json).features
    
        }),
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





