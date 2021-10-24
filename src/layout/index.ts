// const mainSvgContainerWidth=parseInt(document.getElementById("main-svg-container")?.getBoundingClientRect().width+"");
// const mainSvgContainerHeight=

import store from "@/store";
import {mitter} from "../main"

interface MapType{
    [key:string]:any
}
export default class LayoutManager{
    private mapType:MapType
    constructor(){
        this.mapType={
            "random":this.randomLayout
        }
    }

    layout(name:string,data:any){
        this.mapType[name](data);
    }

    randomLayout({nodes}:{nodes:Array<any>}){
        const {width,height}=store.state.svgContainer.mainContainer;
        nodes.forEach((node)=>{
            node.x=Math.random()*width;
            node.y=Math.random()*height;
        });
        store.commit("updateLayoutRes",{nodes})
        mitter.emit("render")
    }
}