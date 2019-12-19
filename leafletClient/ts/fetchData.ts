export interface DataRequestBody {
    columns: string[],
    filePath: string,
    params: {
        key: string,
        value: string
    }[]
}

export async function fetchLatLongs(url: string){
    
    let body: DataRequestBody = { 
        columns:["Latitude", "Longitude"], 
        filePath:"street", 
        params:[]
    }
    
    let headers = {
        "Content-Type": "application/json"
    }
    
    let options: RequestInit = {
        headers: headers,
        body: JSON.stringify(body),
        method: "POST"
    }
    
    let res = await fetch(url, options);
    return res.json();
}