export interface ConvertRes{
    [key:string]:any,
    [key:number]:any
}

export function csv2json(data:Array<Array<string>>){
    const objectKeys=data[0];
    const result:Array<ConvertRes>=[]
    for(let i=1;i<data.length;i++){
        const obj:ConvertRes={}
        for(let j=0;j<objectKeys.length;j++){
            obj[objectKeys[j]]=data[i][j]
        }
        result.push(obj)
    }
    return result
}