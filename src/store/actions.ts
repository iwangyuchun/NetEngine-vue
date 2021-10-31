import {GlobalDataState} from "."
import { Commit, ActionContext, ActionHandler } from 'vuex'
import axios from "axios"
import { layout } from "./mutations";


async function post(url: string, payload: any) {
    const { data } = await axios.post(url, payload);
    return true;
}

function  combinePayload(state:GlobalDataState,data:{nodes:Array<any>,links:Array<any>}) {
    const layoutParams=JSON.parse(state.dataImportControl.remoteSetting.layoutParams);
    return {layout:layoutParams,nodes:data.nodes,links:data.links};
}

function generateRemoteUrl(state:GlobalDataState) {
    const host=state.dataImportControl.remoteSetting.remoteHost||'http://localhost';
    const port=state.dataImportControl.remoteSetting.remotePort;
    const path=state.dataImportControl.remoteSetting.remotePath;
    return `${host}:${port}${path}`;
}

const sendData: ActionHandler<GlobalDataState, GlobalDataState> = (context: ActionContext<GlobalDataState, GlobalDataState>) => {
    const nodeColumnMapping=context.state.rawData.columnMapping.node;
    const linkColumnMapping=context.state.rawData.columnMapping.link;

    const formatData:{nodes:Array<any>,links:Array<any>}={nodes:[],links:[]}
    if(nodeColumnMapping.open){
        const columnMapping=nodeColumnMapping.newToOld;

        context.state.internalDataInfo.nodes.forEach((preNode,ind)=>{
            const newNode:{[key:string]:any}={};
            for(const newKey of columnMapping.keys()){
                newNode[newKey]=preNode[columnMapping.get(newKey)!];
            }
            formatData.nodes.push(newNode);
        })
    }else{
        formatData.nodes=context.state.internalDataInfo.nodes;
    }
    if(linkColumnMapping.open){
        const columnMapping=linkColumnMapping.newToOld;
        context.state.internalDataInfo.links.forEach((preLink,ind)=>{
            const newLink:{[key:string]:any}={};
            for(const newKey of columnMapping.keys()){
                newLink[newKey]=preLink[columnMapping.get(newKey)!];
            }
            formatData.links.push(newLink);
        })

    }else{
        formatData.links=context.state.internalDataInfo.links;
    }
    const url=generateRemoteUrl(context.state);
    const payload=combinePayload(context.state,formatData);
    post(url,payload);
}

export {sendData}