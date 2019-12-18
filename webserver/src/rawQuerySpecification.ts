export class RawQuerySpecification{

    public columns : string[] 
    public filePath :string;
    public params: {key:string,value:any}[];

    constructor(bodyObject : {columns:string[], filePath:string, params:{key:string,value:any}[]}){
        if(!(bodyObject.columns && bodyObject.filePath && bodyObject.params)){
            throw new Error("Bad request.")
        }

        
        this.columns = bodyObject.columns;
        this.filePath = bodyObject.filePath;
        this.params = bodyObject.params;
    }


}