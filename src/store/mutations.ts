import { GlobalDataState, ServerInfo } from ".";
import { csv2json } from "@/helper/csv2json";


function convertRawToInternal(state:GlobalDataState){
    if(state.rawData.format==='csv'){
        state.internalDataInfo.nodes=csv2json(state.rawData.data.nodeData);
        state.internalDataInfo.links=csv2json(state.rawData.data.linkData);
    
    }else{

    }
}

function updateRawNodeDataCSV(state: GlobalDataState, rawData: Array<Array<string>>) {
    state.rawData.data.nodeData=rawData
    state.rawData.columName.nodeColumns=rawData[0];
    state.rawData.format = "csv"
}
function updateRawLinkDataCSV(state: GlobalDataState, rawData: Array<Array<string>>){
    state.rawData.data.linkData=rawData
    state.rawData.columName.linkColumns=rawData[0];
    state.rawData.format='csv';
}

function constructNodeColumnMapping(state: GlobalDataState, newColumns:Array<string>){
    const oldToNew=new Map();
    const newToOld=new Map();
    state.rawData.columName.nodeColumns.forEach((name,i)=>{
        if(newColumns[i]===''||!newColumns[i]){
            oldToNew.set(name,name)
            newToOld.set(name,name);
        }else{
            oldToNew.set(name,newColumns[i]);
            newToOld.set(newColumns[i],name);
        }
    });
    state.rawData.columnMapping.node.open=true;
    state.rawData.columnMapping.node.oldToNew=oldToNew;
    state.rawData.columnMapping.node.newToOld=newToOld;
}
function constructLinkColumnMapping(state:GlobalDataState,newColumns:Array<string>){
    const oldToNew=new Map();
    const newToOld=new Map();
    state.rawData.columName.linkColumns.forEach((name,i)=>{
        if(newColumns[i]===''||!newColumns[i]){
            oldToNew.set(name,name)
            newToOld.set(name,name);
        }else{
            oldToNew.set(name,newColumns[i]);
            newToOld.set(newColumns[i],name);
        }
    });
    state.rawData.columnMapping.link.open=true;
    state.rawData.columnMapping.link.oldToNew=oldToNew;
    state.rawData.columnMapping.link.newToOld=newToOld;
}
function closeNodeMapping(state:GlobalDataState){
    state.rawData.columnMapping.node.open=false;
}

function closeLinkMapping(state:GlobalDataState){
    state.rawData.columnMapping.link.open=false;
}

function updateLayoutAlgoritemMode(state: GlobalDataState, mode:'local'|'remote'){
    state.dataImportControl.algorithmMode=mode
}

function updateServerInfo(state: GlobalDataState, info:ServerInfo){
    state.remoteServerInfo=info;
}



export {updateRawNodeDataCSV,updateRawLinkDataCSV,convertRawToInternal,updateLayoutAlgoritemMode,updateServerInfo,constructNodeColumnMapping,constructLinkColumnMapping,closeNodeMapping,closeLinkMapping}