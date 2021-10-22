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
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
  props: {},
  setup() {
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