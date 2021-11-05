
function map2Obj(map:Map<string,string>) {
    const obj:{[key:string]:string}={};
    for(const key of map.keys()){
        obj[key]=map.get(key)!;
    }
    return obj
}

function obj2Map(obj:{[key:string]:string}) {
    const map=new Map();
    for(const key of Object.keys(obj)){
        map.set(key,obj[key])
    }
    return map;
}