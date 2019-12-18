import {createMap} from './mapCreator';
import 'leaflet.heat';
import { heatLayer, HeatMapOptions } from 'leaflet';
//import {cordinates} from './testCordinates';
import {fetchLatLongs} from './fetchData'

let map = createMap("map");

let url = "http://localhost:3000/raw2";

fetchLatLongs(url).then((cordinates) => {
    let heatmapOptions: HeatMapOptions = {
        blur: 15,
        radius: 25
    }
    
    heatLayer(cordinates, heatmapOptions).addTo(map);
});