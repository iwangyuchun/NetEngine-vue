<template>
  <div id="container">
    <global-header></global-header>
    <div id="content-container" class="d-flex mt-2">
      <data-control-panel></data-control-panel>
      <div class="center-panel">
        <show-graph-panel></show-graph-panel>
      </div>
      <param-control-panel></param-control-panel>
    </div>
  </div>

</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css"

import {defineComponent} from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import DataControlPanel from './components/DataControlPanel.vue'
import ParamControlPanel from './components/ParamControlPanel.vue'
import ShowGraphPanel from './components/ShowGraphPanel.vue'
export default defineComponent({
  name:"App",
  components:{GlobalHeader,DataControlPanel,ParamControlPanel,ShowGraphPanel}
})
</script>
<style>

#content-container{
  padding-left:10px ;
  padding-right: 10px;
}

.left-side-panel{
  background-color: aqua;
  flex-grow:0.15;
}
.center-panel{
  
  flex-grow:0.7
}
.right-side-panel{
  background-color: rgb(101, 38, 109);
  flex-grow:0.15
}

</style>
