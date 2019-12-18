export function convertToGeoJson(rows: any[]) {
    return  {
        type: "FeatureCollection", 
        features: rows.map(row => {
            return { type: "Feature", geometry: { type: "Point", coordinates: [parseFloat(row.Latitude), parseFloat(row.Longitude)] }, properties: { weight: 1, } }
        })
    }
}

