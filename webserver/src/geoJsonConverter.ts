export function convertToGeoJson(rows: any[]) {
    return  {
        type: "FeatureCollection", 
        features: rows.map(row => {
            return { type: "Feature", geometry: { type: "Point", coordinates: [parseFloat(row.Longitude),parseFloat(row.Latitude)] }, properties: { weight: 1 } }
        })
    }
}

