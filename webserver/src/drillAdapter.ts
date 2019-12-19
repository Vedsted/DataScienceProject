import * as request from "request-promise-native";

export class DrillAdapter {

    private drillAddress: string;
    constructor(drillAddress: string) {
        this.drillAddress = drillAddress;
    }

    async performRequest(sqlString: string): Promise<{columns: string[], rows:any[], metadata:string[], queryState:string,attemptedAutoLimit:number}> {
        try {

            let result = await request.post("http://" + this.drillAddress + "/query.json", {
                json: {
                    queryType: "SQL",
                    // query: "SELECT * FROM dfs.`dataframes/street.csv`",
                    query: sqlString,
                    autoLimit: "1000000"
                }
            })
            //
            //console.log(result)
            return result;

        } catch (e) {
            console.log(e);
            throw new Error("Bad request to Drill");
        }
    }
}