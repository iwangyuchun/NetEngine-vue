<template>
  <div class="param-control-panel">
    <div id="node-params-setting-container" class="border rounded-2 p-1">
      <div class="node-color-picker-container d-flex border">
        <span style="height: 40px; line-height: 40px;width:118px" class="px-2"
          >node color:</span
        >
        <el-color-picker
          v-model="settingParams.nodeColor"
          show-alpha
          :predefine="predefineColors"
          @change="onNodeColorChange"
        >
        </el-color-picker>
        <span style="height: 40px; line-height: 40px" class="px-2">{{
          settingParams.nodeColor
        }}</span>
      </div>
      <div class="node-color-picker-container d-flex border mt-2 ">
        <span style="height: 40px; line-height: 40px;width:118px" class="px-2"
          >border color:</span
        >
        <el-color-picker
          v-model="settingParams.borderColor"
          show-alpha
          :predefine="predefineColors"
          @change="onBorderColorChange"
        >
        </el-color-picker>
        <span style="height: 40px; line-height: 40px" class="px-2">{{
          settingParams.borderColor
        }}</span>
      </div>
      <div class="mt-2">
        <label for="customRange1" class="form-label">node radius:</label>
        <input type="range" class="form-range" id="customRange1" min="1" max="20" :value="settingParams.nodeRadius" @change.prevent="onNodeRadiusChange"/>
      </div>
       <div class="mt-2">
        <label for="customRange1" class="form-label">node border:</label>
        <input type="range" class="form-range" id="customRange1" min="0" max="4" :value="settingParams.borderWidth" @change.prevent="onBorderWidthChange"/>
      </div>
    </div>
    <div id="link-params-setting-container" class="border rounded-2 p-1 mt-3">
      <div class="node-color-picker-container d-flex border ">
        <span style="height: 40px; line-height: 40px;width:118px" class="px-2"
          >line color:</span
        >
        <el-color-picker
          v-model="settingParams.lineColor"
          show-alpha
          :predefine="predefineColors"
          @change="onLineColorChange"
        >
        </el-color-picker>
        <span style="height: 40px; line-height: 40px; " class="px-2">{{
          settingParams.lineColor
        }}</span>
      </div>
       <div class="mt-2">
        <label for="customRange1" class="form-label">line width:</label>
        <input type="range" class="form-range" id="customRange1" min="1" max="4" :value="settingParams.lineWidth" @change.prevent="onLineWidthChange"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent, reactive, watch } from "vue";

export default defineComponent({
  name: "",
  props: {},
  data() {
    return {
      color: "#ff4500",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
      ],
    };
  },

  setup() {
    
    let settingParams=reactive(store.state.renderParams);
    // watch(store.state.renderParams,(oldVal,newVal)=>{

    // })
    const onNodeColorChange=()=>{
      store.commit("alterNodeColor",settingParams.nodeColor);
    }
    const onNodeRadiusChange=(e:Event)=>{
      const target=e.target as HTMLInputElement;
      store.commit("alterNodeRadius",parseInt(target.value));
    }
    const onBorderColorChange=()=>{
      store.commit("alterBorderColor",settingParams.borderColor);
    }
    const onBorderWidthChange=(e:Event)=>{
      const target=e.target as HTMLInputElement;
      store.commit("alterBorderWidth",parseInt(target.value));
    }
    const onLineColorChange=()=>{
      store.commit("alterLineColor",settingParams.lineColor);

    }
    const onLineWidthChange=(e:Event)=>{
      const target=e.target as HTMLInputElement;
      store.commit("alterLineWidth",parseInt(target.value));
    }
    return {
      settingParams,
      onNodeColorChange,
      onNodeRadiusChange,
      onBorderColorChange,
      onBorderWidthChange,
      onLineColorChange,
      onLineWidthChange
    };
  },
});
</script>
<style scoped>
.param-control-panel {
  min-width: 360px;
  max-width: 360px;
  min-height: 500px;

  
}
</style>