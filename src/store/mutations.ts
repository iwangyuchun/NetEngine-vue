import store, { GlobalDataState, ServerInfo } from ".";
import { csv2json } from "@/helper/csv2json";


function convertRawToInternal(state: GlobalDataState) {
    if (state.rawData.format === 'csv') {
        state.internalDataInfo.nodes = csv2json(state.rawData.data.nodeData);
        state.internalDataInfo.links = csv2json(state.rawData.data.linkData);

    } else {

    }
}

function updateRawNodeDataCSV(state: GlobalDataState, rawData: Array<Array<string>>) {
    state.rawData.data.nodeData = rawData
    state.rawData.columName.nodeColumns = rawData[0];
    state.rawData.format = "csv"
}
function updateRawLinkDataCSV(state: GlobalDataState, rawData: Array<Array<string>>) {
    state.rawData.data.linkData = rawData
    state.rawData.columName.linkColumns = rawData[0];
    state.rawData.format = 'csv';
}

function constructNodeColumnMapping(state: GlobalDataState, newColumns: Array<string>) {
    const oldToNew = new Map();
    const newToOld = new Map();
    state.rawData.columName.nodeColumns.forEach((name, i) => {
        if (newColumns[i] === '' || !newColumns[i]) {
            oldToNew.set(name, name)
            newToOld.set(name, name);
        } else {
            oldToNew.set(name, newColumns[i]);
            newToOld.set(newColumns[i], name);
        }
    });
    state.rawData.columnMapping.node.open = true;
    state.rawData.columnMapping.node.oldToNew = oldToNew;
    state.rawData.columnMapping.node.newToOld = newToOld;
}
function constructLinkColumnMapping(state: GlobalDataState, newColumns: Array<string>) {
    const oldToNew = new Map();
    const newToOld = new Map();
    state.rawData.columName.linkColumns.forEach((name, i) => {
        if (newColumns[i] === '' || !newColumns[i]) {
            oldToNew.set(name, name)
            newToOld.set(name, name);
        } else {
            oldToNew.set(name, newColumns[i]);
            newToOld.set(newColumns[i], name);
        }
    });
    state.rawData.columnMapping.link.open = true;
    state.rawData.columnMapping.link.oldToNew = oldToNew;
    state.rawData.columnMapping.link.newToOld = newToOld;
}

function constructNodeAlgorithmColumnMapping(state: GlobalDataState, rawData: { internalAttr: Array<string>, newAttr: Array<string> }) {
    const internalAttr = rawData.internalAttr;
    const newAttr = rawData.newAttr;
    const oldToNew = new Map();
    const newToOld = new Map();
    if (internalAttr.length === newAttr.length) {
        internalAttr.forEach((inter, i) => {
            if (newAttr[i] === '' || !newAttr[i]) {
                oldToNew.set(inter, inter);
                newToOld.set(inter, inter);
            } else {
                oldToNew.set(inter, newAttr[i]);
                newToOld.set(newAttr[i], inter);
            }
        })
    }
    state.dataImportControl.localSetting.algorithmColumnMapping.node.open = true;
    state.dataImportControl.localSetting.algorithmColumnMapping.node.oldToNew = oldToNew;
    state.dataImportControl.localSetting.algorithmColumnMapping.node.newToOld = newToOld;
    useMappingToLayoutNodeData(state);
}

function constructLinkAlgorithmColumnMapping(state: GlobalDataState, rawData: { internalAttr: Array<string>, newAttr: Array<string> }) {
    const internalAttr = rawData.internalAttr;
    const newAttr = rawData.newAttr;
    const oldToNew = new Map();
    const newToOld = new Map();
    if (internalAttr.length === newAttr.length) {
        internalAttr.forEach((inter, i) => {
            if (newAttr[i] === '' || !newAttr[i]) {
                oldToNew.set(inter, inter);
                newToOld.set(inter, inter);
            } else {
                oldToNew.set(inter, newAttr[i]);
                newToOld.set(newAttr[i], inter);
            }
        })
    }
    state.dataImportControl.localSetting.algorithmColumnMapping.link.open = true;
    state.dataImportControl.localSetting.algorithmColumnMapping.link.oldToNew = oldToNew;
    state.dataImportControl.localSetting.algorithmColumnMapping.link.newToOld = newToOld;
    useMappingToLayoutLinkData(state);
}

function closeNodeMapping(state: GlobalDataState) {
    state.rawData.columnMapping.node.open = false;
}

function closeLinkMapping(state: GlobalDataState) {
    state.rawData.columnMapping.link.open = false;
}

function updateLayoutAlgoritemMode(state: GlobalDataState, mode: 'local' | 'remote') {
    state.dataImportControl.algorithmMode = mode
}

function updateServerInfo(state: GlobalDataState, info: {host:string,port:number,path:string,params:string}) {
    
    state.dataImportControl.remoteSetting.remoteHost=info.host;
    state.dataImportControl.remoteSetting.remotePort=info.port;
    state.dataImportControl.remoteSetting.remotePath=info.path;
    state.dataImportControl.remoteSetting.layoutParams=info.params;

}

function updateSvgContainerDim(state: GlobalDataState, info: { mainSvgContanerDim: { width: number, height: number } }) {
    state.svgContainer.mainContainer.width = info.mainSvgContanerDim.width;
    state.svgContainer.mainContainer.height = info.mainSvgContanerDim.height;
}

function useMappingToLayoutNodeData(state: GlobalDataState) {
    const {node:nodeColumnMapping}=state.dataImportControl.localSetting.algorithmColumnMapping;
    if(nodeColumnMapping.open){
        const nodes=state.internalDataInfo.nodes.map(node=>{
            const newNode:{[key:string]:any}={};
            for(const key of nodeColumnMapping.oldToNew.keys()){
                newNode[key]=node[nodeColumnMapping.oldToNew.get(key)!]
            }
            return newNode;
        });
        state.layoutedData.nodes=nodes
    }else{
        state.layoutedData.nodes=state.internalDataInfo.nodes;
    }
}

function useMappingToLayoutLinkData(state: GlobalDataState) {
    const {link:linkColumnMapping}=state.dataImportControl.localSetting.algorithmColumnMapping;
    if(linkColumnMapping.open){
        const links=state.internalDataInfo.links.map(link=>{
            const newLink:{[key:string]:any}={};
            for(const key of linkColumnMapping.oldToNew.keys()){

                newLink[key]=link[linkColumnMapping.oldToNew.get(key)!]
            }
            return newLink
        });
        state.layoutedData.links=links;
    }else{
        state.layoutedData.links=state.internalDataInfo.links;
    }
}

function useMappingToLayoutedData(state: GlobalDataState) {
    const {node:nodeColumnMapping,link:linkColumnMapping}=state.dataImportControl.localSetting.algorithmColumnMapping;
    if(nodeColumnMapping.open){
        const nodes=state.internalDataInfo.nodes.map(node=>{
            const newNode:{[key:string]:any}={};
            for(const key of nodeColumnMapping.oldToNew.keys()){
                newNode[key]=node[nodeColumnMapping.oldToNew.get(key)!]
            }
            return newNode;
        });
        state.layoutedData.nodes=nodes
    }else{
        state.layoutedData.nodes=state.internalDataInfo.nodes;
    }
    if(linkColumnMapping.open){
        const links=state.internalDataInfo.links.map(link=>{
            const newLink:{[key:string]:any}={};
            for(const key of linkColumnMapping.oldToNew.keys()){

                newLink[key]=link[linkColumnMapping.oldToNew.get(key)!]
            }
            return newLink
        });
        state.layoutedData.links=links;
    }else{
        state.layoutedData.links=state.internalDataInfo.links;
    }
}

function layout(state: GlobalDataState) {
    state.manager.layoutManager.layout(state.dataImportControl.localSetting.selectedAlgoritem,state.layoutedData)
}

function updateLayoutRes(state: GlobalDataState,{nodes}:{nodes:any}) {
    state.layoutedData.nodes=nodes;
}

function alterNodeColor(state:GlobalDataState,color:string) {
    state.renderParams.nodeColor=color;
}

function alterNodeRadius(state:GlobalDataState,radius:number) {
    state.renderParams.nodeRadius=radius;
}
function alterBorderColor(state:GlobalDataState,color:string) {
    state.renderParams.borderColor=color;
}

function alterBorderWidth(state:GlobalDataState,width:number) {
    state.renderParams.borderWidth=width;
}

function alterLineColor(state:GlobalDataState,color:string) {
    state.renderParams.lineColor=color;
}
function alterLineWidth(state:GlobalDataState,width:number) {
    state.renderParams.lineWidth=width;
}

function updateLayout(state:GlobalDataState,layout:string) {
    state.dataImportControl.localSetting.selectedAlgoritem=layout;
}


export {
    updateRawNodeDataCSV,
    updateRawLinkDataCSV,
    convertRawToInternal,
    updateLayoutAlgoritemMode,
    updateServerInfo,
    constructNodeColumnMapping,
    constructLinkColumnMapping,
    closeNodeMapping,
    closeLinkMapping,
    constructNodeAlgorithmColumnMapping,
    constructLinkAlgorithmColumnMapping,
    updateSvgContainerDim,
    useMappingToLayoutedData,
    layout,
    updateLayoutRes,
    alterNodeColor,
    alterNodeRadius,
    alterBorderColor,
    alterBorderWidth,
    alterLineColor,
    alterLineWidth,
    updateLayout

}