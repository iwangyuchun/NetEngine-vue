import {onUnmounted} from "vue"

export default function useDomCreate(nodeId:string){
    const node=document.createElement('div')
    node.id=nodeId
    //node.classList.add(...["modal","fade"])
    document.body.appendChild(node)
    onUnmounted(()=>{
        document.body.removeChild(node)
    })
}