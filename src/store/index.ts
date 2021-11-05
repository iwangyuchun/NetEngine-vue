import { createStore } from 'vuex'
import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"
import LayoutManager,{layoutAlgorithm} from '@/layout'


export interface InternalData {
  [key: string]: any;
  [key: number]: any;
}

export interface ServerInfo {
  host: {
    isExist: boolean,
    val: string
  },
  port: {
    isExist: boolean,
    val: number
  },
  path: {
    isExist: boolean,
    val: string
  }
}

export interface GlobalDataState {
  rawData: {
    format: 'json' | 'csv',
    data: {
      nodeData: any,
      linkData: any,
    },
    columName: {
      nodeColumns: Array<string>,
      linkColumns: Array<string>
    },
    columnMapping: {
      node: {
        open: boolean,
        oldToNew: Map<string, string>,
        newToOld: Map<string, string>,
      },
      link: {
        open: boolean,
        oldToNew: Map<string, string>,
        newToOld: Map<string, string>
      }
    }
  };
  internalDataInfo: {
    nodes: Array<InternalData>,
    links: Array<InternalData>
  },
  dataImportControl: {
    algorithmMode: 'local' | 'remote',
    localSetting: {
      allLocalAlgoritem: Array<string>,
      selectedAlgoritem: string,
      algorithmColumnMapping: {
        node: {
          open: boolean,
          oldToNew: Map<string, string>,
          newToOld: Map<string, string>
        },
        link: {
          open: boolean,
          oldToNew: Map<string, string>,
          newToOld: Map<string, string>
        }
      }
    },
    remoteSetting: {
      remoteHost: string,
      remotePort: number,
      layoutParams:string,
      remotePath:string

    }
  }
  layoutedData: {
    nodes: Array<any>,
    links: Array<any>
  },
  receiveData:{
    hasData:boolean,
    columnName:{
      nodeColumn:Array<string>,
      linkColumn:Array<string>
    }
    nodes:Array<any>,
    links:Array<any>
  }
  svgContainer:{
    mainContainer:{
      width:number,
      height:number
    }
  },
  manager:{
    layoutManager:LayoutManager
  },
  renderParams:{
    nodeColor:string,
    nodeRadius:number,
    borderColor:string,
    borderWidth:number
    lineColor:string,
    lineWidth:number
  }
}


export default createStore<GlobalDataState>({
  state: {
    rawData: {
      format: 'json',
      data: {
        nodeData: null,
        linkData: null
      },
      columName: {
        nodeColumns: [],
        linkColumns: []
      },
      columnMapping: {
        node: {
          open: false,
          oldToNew: new Map(),
          newToOld: new Map(),
        },
        link: {
          open: false,
          oldToNew: new Map(),
          newToOld: new Map(),
        }
      }
    },
    internalDataInfo: {
      nodes: [],
      links: [],
    },
    dataImportControl: {
      algorithmMode: 'local',
      localSetting: {
        allLocalAlgoritem: layoutAlgorithm,
        selectedAlgoritem: layoutAlgorithm[0],
        algorithmColumnMapping: {
          node: {
            open: false,
            oldToNew: new Map(),
            newToOld: new Map(),
          },
          link: {
            open: false,
            oldToNew: new Map(),
            newToOld: new Map()
          }
        }
      },
      remoteSetting: {
        remoteHost: 'http://localhost',
        remotePort: 8080,
        remotePath:'',
        layoutParams:"{}"
      }
    },
    receiveData:{
      hasData:false,
      columnName:{
        linkColumn:[],
        nodeColumn:[],
      },
      nodes:[],
      links:[],
    },
    layoutedData: {
      nodes: [],
      links: []
    },
    svgContainer:{
      mainContainer:{
        width:0,
        height:0
      }
    },
    manager:{
      layoutManager:new LayoutManager(),
    },
    renderParams:{
      nodeColor:"#547AA5",
      nodeRadius:4,
      borderWidth:0,
      borderColor:"#EA8936",
      lineColor:"#BEBEBE",
      lineWidth:1,
    }


  },
  mutations,
  getters,
  actions,
  modules: {
  }
})
