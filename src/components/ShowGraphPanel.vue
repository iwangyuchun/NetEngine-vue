<template>
  <div class="show-graph-panel d-flex">
    <div id="main-svg-container" class="main-svg-container"></div>
    <div id="sub-svg-container">
      <div id="sub-svg-container1" class="sub-svg-container"></div>
      <div id="sub-svg-container2" class="sub-svg-container"></div>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { defineComponent, onMounted, watch } from "vue";
export default defineComponent({
  name: "",
  props: {},
  setup() {
    onMounted(()=>{
      const mainContainerWidth=parseInt(document.getElementById("main-svg-container")?.getBoundingClientRect().width+'');
      const mainContainerHeight=parseInt(document.getElementById("main-svg-container")?.getBoundingClientRect().height+'');
      store.commit("updateSvgContainerDim",{ mainSvgContanerDim: { width: mainContainerWidth, height: mainContainerHeight } })
    });
    window.addEventListener("resize",()=>{
      const mainContainerWidth=parseInt(document.getElementById("main-svg-container")?.getBoundingClientRect().width+'');
      const mainContainerHeight=parseInt(document.getElementById("main-svg-container")?.getBoundingClientRect().height+'');
      store.commit("updateSvgContainerDim",{ mainSvgContanerDim: { width: mainContainerWidth, height: mainContainerHeight } })
    })
    const render=()=>{
      
    }
  
    return {};
  },
  
});
</script>
<style scoped>
.show-graph-panel {
  min-width: 1200px;
  min-height: 800px;
}

#main-svg-container{
    flex-grow: 0.8;
    background-color: aqua;
}
#sub-svg-container{
    flex-grow: 0.2;
    background-color: bisque;
}

</style>