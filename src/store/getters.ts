import { GlobalDataState } from ".";

function layoutAlgoritemMode(state:GlobalDataState){
    return state.dataImportControl.algorithmMode==='local'?true:false
}

export {layoutAlgoritemMode}