import {Map, MapOptions, tileLayer} from 'leaflet';

export function createMap(divID: string): Map {

    let mapOptions: MapOptions = {
        center: [51.505, -0.09],
        zoom: 13
    };
    let map = new Map(divID, mapOptions);

    let tileLayerURL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'; 
    let tileLayerOptions = {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidmVkc3RlZCIsImEiOiJjazEwaGtiNnEwMjl2M2NzNTF5M3hvdmdlIn0.kmwNOymubSmWYo_g39sKpQ'
    };
    tileLayer(tileLayerURL, tileLayerOptions).addTo(map);

    return map;
}