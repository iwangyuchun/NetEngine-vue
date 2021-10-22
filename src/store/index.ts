import { createStore } from 'vuex'
import * as mutations from "./mutations"
import * as getters from "./getters"


export interface InternalData{
  [key:string]:any;
  [key:number]:any;
}

export interface ServerInfo{
  host:{
    isExist:boolean,
    val:string
  },
  port:{
    isExist:boolean,
    val:number
  },
  path:{
    isExist:boolean,
    val:string
  }
}

export interface GlobalDataState{
  rawData:{
    format:'json'|'csv',
    data:{
      nodeData:any,
      linkData:any,
    },
    columName:{
      nodeColumns:Array<string>,
      linkColumns:Array<string>
    },
    columnMapping:{
      node:{
        open:boolean,
        oldToNew:Map<string,string>,
        newToOld:Map<string,string>,
      },
      link:{
        open:boolean,
        oldToNew:Map<string,string>,
        newToOld:Map<string,string>
      }
    }
  };
  internalDataInfo:{
    nodes:Array<InternalData>,
    links:Array<InternalData>
  },
  dataImportControl:{
    algorithmMode:'local'|'remote',
    localSetting:{
      allLocalAlgoritem:Array<string>,
      selectedAlgoritem:string,
    },
    remoteSetting:{
      remoteHost:string,
      remotePort:number,

    }
  }
  remoteServerInfo:ServerInfo,
  layoutedData:{
    nodes:Array<any>,
    links:Array<any>
  }
}

export default createStore<GlobalDataState>({
  state: {
    rawData:{
      format:'json',
      data:{
        nodeData:null,
        linkData:null
      },
      columName:{
        nodeColumns:[],
        linkColumns:[]
      },
      columnMapping:{
        node:{
          open:false,
          oldToNew:new Map(),
          newToOld:new Map(),
        },
        link:{
          open:false,
          oldToNew:new Map(),
          newToOld:new Map(),
        }
      }
    },
    internalDataInfo:{
      nodes:[],
      links:[],
    },
    dataImportControl:{
      algorithmMode:'local',
      localSetting:{
        allLocalAlgoritem:['Force'],
        selectedAlgoritem:'Force',
      },
      remoteSetting:{
        remoteHost:'',
        remotePort:8080
      }
    },
    remoteServerInfo:{
      host:{
        isExist:false,
        val:'http://localhost'
      },
      port:{
        isExist:false,
        val:8080,
      },
      path:{
        isExist:false,
        val:''
      }
    },
    layoutedData:{
      nodes:[],
      links:[]
    }
    
  },
  mutations,
  getters,
  actions: {
  },
  modules: {
  }
})
