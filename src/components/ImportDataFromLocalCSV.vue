<template>
  <div>
    <form>
      <div class="mb-3">
        <label for="formFile" class="form-label"
          >Please choose Node CSV file</label
        >
        <input
          class="form-control"
          :class="{'is-invalid':inputNodeFileVal.error}"
          type="file"
          id="formNodeFile"
          @change.prevent="inputNodeFileChange"
  
        />
        <span class="invalid-feedback" v-if="inputNodeFileVal.error" >{{inputNodeFileVal.msg}}</span>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label"
          >Please choose Link CSV file</label
        >
        <input
          class="form-control"
          :class="{'is-invalid':inputLinkFileVal.error}"
          type="file"
          id="formLinkFile"
          @change.prevent="inputLinkFileChange"
  
        />
        <span class="invalid-feedback" v-if="inputLinkFileVal.error">{{inputLinkFileVal.msg}}</span>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary" @click.prevent="submit">
          Add Data
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive} from "vue";
import Papa from "papaparse"
import store from "@/store";


export default defineComponent({
  name: "",
  props: {},
  emits:["finish-data-input"],
  setup(props,context) {
    const inputNodeFileVal=reactive({
      error:false,
      msg:"node data file cannot empty",
    });
    const inputLinkFileVal=reactive({
      error:false,
      msg:"link data file cannot empty"
    });
    let isChooseNodeFile=false;
    let isChooseLinkFile=false;
    const inputNodeFileChange=(e:Event)=>{
      const target=e.target as HTMLInputElement;
      const files=target.files;
      isChooseNodeFile=false;
      if(files){
        const csvNodeFile=files[0];
        const csvNodeFileReader=new FileReader();
        
        csvNodeFileReader.onload=function(e){
          let csvNodeFileContent=e.target?.result;
          if(csvNodeFile.name.includes(".csv")){
            //@ts-ignore
            let {data}=Papa.parse(csvNodeFileContent);
            isChooseNodeFile=true;
            inputNodeFileVal.error=false;
            store.commit("updateRawNodeDataCSV",data)
          }else{
            inputNodeFileVal.error=true;
            inputNodeFileVal.msg="node file must a csv formt";
          }
        }
        csvNodeFileReader.readAsText(csvNodeFile);
      }
    }

    const inputLinkFileChange=(e:Event)=>{
      const target=e.target as HTMLInputElement;
      const files=target.files;
      isChooseLinkFile=false;
      if(files){
        const csvLinkFile=files[0];
        const csvLinkFileReader=new FileReader();
        
        csvLinkFileReader.onload=function(e){
          let csvLinkFileContent=e.target?.result;
          if(csvLinkFile.name.includes(".csv")){
            //@ts-ignore
            let {data}=Papa.parse(csvLinkFileContent);
            isChooseLinkFile=true;
            inputLinkFileVal.error=false;
            store.commit("updateRawLinkDataCSV",data)
          }else{
            inputLinkFileVal.error=true;
            inputLinkFileVal.msg="link file must a csv formt";
          }
        }
        csvLinkFileReader.readAsText(csvLinkFile);
      }
    }
    const submit=()=>{
      if(!isChooseLinkFile){
        inputLinkFileVal.error=true;
        inputLinkFileVal.msg="link file cannot empty";
        return;
      }else{
        inputLinkFileVal.error=false;
      }
      if(!isChooseNodeFile){
        inputNodeFileVal.error=true;
        inputNodeFileVal.msg="node file cannot empty";
        return;
      }else{
        inputNodeFileVal.error=false;
      }
      if(inputNodeFileVal.error||inputLinkFileVal.error){
        return;
      }
      store.commit("convertRawToInternal");
      context.emit("finish-data-input")
      
    }
    return {
     inputNodeFileVal,
     inputLinkFileVal,
     inputNodeFileChange,
     inputLinkFileChange,
     submit,
    };
  },
});
</script>
<style scoped>
.label-list {
  list-style: none;
}
.btn-close {
  font-size: 0.8em;
}
</style>