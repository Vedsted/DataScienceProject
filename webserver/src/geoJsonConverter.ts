export function convertToGeoJson(rows: any[]) {

    let weights = rows.map(row => parseInt(row.ClusterSize));
    console.log("Weights:");
    console.log(weights);
    let min = getMin(weights);
    let max = getMax(weights);
    console.log("Min: " + min + ", Max: " + max);

    return  {
        type: "FeatureCollection", 
        features: rows.map(row => {
            return { type: "Feature", geometry: { type: "Point", coordinates: [parseFloat(row.Longitude),parseFloat(row.Latitude)] }, properties: { weight: normalizeMinMax(min, max, row.ClusterSize), clustersize: parseInt(row.ClusterSize) } }
        })
    }
}

function normalizeMinMax(min: number, max: number, x: number) {

    // Special case for this implementation of the min max normalization.
    // The min and max values (weights) are equal when making queries on raw data.
    if (min == max) {
        return 1;
    }

    let normalizedValue = (x-min)/(max-min);
    return normalizedValue;
}


// The regular Math.max() is recursive and fails on large arrays with "rangeerror maximum call stack size exceeded"
// Therefore, use this instead
function getMax(arr : number[]) {
    let len = arr.length;
    let max = -Infinity;

    while (len--) {
        max = arr[len] > max ? arr[len] : max;
    }
    return max;
}


// The regular Math.min() is recursive and fails on large arrays with "rangeerror maximum call stack size exceeded"
// Therefore, use this instead
function getMin(arr : number[]) {
    let len = arr.length;
    let min = Infinity;

    while (len--) {
        min = arr[len] < min ? arr[len] : min;
    }
    return min;
}

