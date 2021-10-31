<template>
  <div class="show-graph-panel d-flex">
    <div id="main-svg-container" class="main-svg-container border border-2 rounded-2"></div>
    <div id="sub-svg-container">
      <div id="sub-svg-container1" class="sub-svg-container1 mx-1 border border-2 rounded-2"></div>
      <div id="sub-svg-container2" class="sub-svg-container1 mx-1 border border-2 rounded-2"></div>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { defineComponent, onMounted, watch } from "vue";
//@ts-ignore
import * as d3 from "d3";
import { mitter } from "@/main";
export default defineComponent({
  name: "",
  props: {},
  setup() {
    onMounted(() => {
      const mainContainerWidth = parseInt(
        document.getElementById("main-svg-container")?.getBoundingClientRect()
          .width + ""
      );
      const mainContainerHeight = parseInt(
        document.getElementById("main-svg-container")?.getBoundingClientRect()
          .height + ""
      );
      store.commit("updateSvgContainerDim", {
        mainSvgContanerDim: {
          width: mainContainerWidth,
          height: mainContainerHeight,
        },
      });
    });
    window.addEventListener("resize", () => {
      const mainContainerWidth = parseInt(
        document.getElementById("main-svg-container")?.getBoundingClientRect()
          .width + ""
      );
      const mainContainerHeight = parseInt(
        document.getElementById("main-svg-container")?.getBoundingClientRect()
          .height + ""
      );
      store.commit("updateSvgContainerDim", {
        mainSvgContanerDim: {
          width: mainContainerWidth,
          height: mainContainerHeight,
        },
      });
    });
    let width = store.state.svgContainer.mainContainer.width;
    let height = store.state.svgContainer.mainContainer.height;
    let xScale:any=null;
    let yScale:any=null;
    const getScale = () => {
      width = store.state.svgContainer.mainContainer.width;
      height = store.state.svgContainer.mainContainer.height;
      const {nodes}=store.state.layoutedData;
      const minX=d3.min(nodes,(d:any)=>d.x);
      const maxX=d3.max(nodes,(d:any)=>d.x);
      const minY=d3.min(nodes,(d:any)=>d.y);
      const maxY=d3.max(nodes,(d:any)=>d.y);
      xScale=d3
      .scaleLinear()
      .domain([minX, maxX])
      .range([5, width - 5]);
      yScale=d3
      .scaleLinear()
      .domain([minY, maxY])
      .range([5, height - 5]);
    };
    watch(store.state.layoutedData,()=>{
      // getScale()
      // render()
      console.log("maping")
    });
    watch(store.state.renderParams,(pre,cur)=>{
      render();
    })
    const render = () => {
      getScale();
      const renderParams=store.state.renderParams;
      let svg = d3.select("#main-svg-container").select("svg");
      if (svg) {
        svg.remove();
      }
      svg = d3.select("#main-svg-container").append("svg");
      svg.attr("width", width).attr("height", height);
      const { nodes, links } = store.state.layoutedData;
      const linkG = svg.append("g");
      //const lines = linkG.selectAll("line").data(links).join("line").attr("x2");
      const nodeG=svg.append("g");
      nodeG.selectAll("circle").data(nodes).enter().append("circle").attr("cx",(d:any)=>{
        return xScale(d.x)
      }).attr("cy",(d:any)=>{
        return yScale(d.y);
      }).attr("r",renderParams.nodeRadius).attr("fill",renderParams.nodeColor).attr("stroke",renderParams.borderColor).attr("stroke-width",renderParams.borderWidth)
    };
    mitter.on("render",render)

    return {};
  },
});
</script>
<style scoped>
.show-graph-panel {
  min-width: 1200px;
  min-height: 800px;
}

#main-svg-container {
  flex-grow: 0.8;
 
}
#sub-svg-container {
  flex-grow: 0.2;
  min-width: 400px;
   min-height: 800px;
}

#sub-svg-container1{
  min-height: 400px;
}
#sub-svg-container2{
  min-height: 400px;
}

</style>