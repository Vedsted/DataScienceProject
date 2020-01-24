import { RawQuerySpecification } from "./rawQuerySpecification";

export class SqlBuilder{

    private query:string;
    constructor(){
        this.query = "";
    }

    select(columns:string[]){
        this.query += "SELECT"
        for(let i = 0; i < columns.length; i++){
            this.query += " " + columns[i];
            if(i != columns.length-1){
                this.query += ',';
            }

        }
        this.query += " ";
        return this;
    }

    from(source : string){
        this.query += "FROM dfs.`csvfiles/" + source + ".csv` "
        return this; 
    }

    where(params: {key:string,value:any}[]){
        if(params.length === 0){
            return this;
        }
        this.query += "WHERE "
        this.query += params.map(kvP=> kvP.key + " = '" + kvP.value + "'").join(" AND ")
        this.query += " "
        return this;
    }

    limit(limit : number){
        this.query += "LIMIT " + limit;
        return this;
    }

    collect(){
        return this.query;
    }
}