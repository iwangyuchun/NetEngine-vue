<template>
  <teleport to="#column_alter">
    <div
      class="
        fixed-top
        w-50
        mx-auto
        mt-0
        w-100
        h-100
        import-data-container
        z-index
      "
      id="staticBackdrop"
    >
      <div class="modal-dialog modal-l">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Column Projection
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="hide"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex flex-column align-items-start">

              <div v-for="(item) in internalAttr" class="tab-content w-100" :key="item">
                  <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control old-attr-input"
                    placeholder="Username"
                    aria-label="Username"
                    disabled
                    :value="item"
                  />
                  <span class="input-group-text">TO</span>
                  <select
                    class="form-select new-attr-select"
                    aria-label="Default select example"
                  >
                  <option selected></option>
                  <option v-for="(attr) in originColumns" :key="attr">{{attr}}</option>
                  </select>
                </div>
              </div>





              <!-- <div
                v-for="(item, index) in originColumns"
                class="tab-content w-100"
                id="v-pills-tabContent"
                :key="index"
              >
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    disabled
                    :value="item"
                  />
                  <span class="input-group-text">TO</span>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Force</option>
                    <option value="1">Tree</option>
                    <option value="2">Other</option>
                  </select>
                </div>
              </div> -->
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="hide"
            >
             Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent, reactive } from "vue";
import useDomCreate from "../hooks/useDomCreate";
export default defineComponent({
  name: "",
  props: {
    isNodeAlter: Boolean,
    isLocal:Boolean,
  },
  components: {},
  emits: ["close-column-alter-panel"],
  setup(props, context) {
    useDomCreate("column_alter");
   
    let internalAttr;
    if (props.isNodeAlter&&props.isLocal) {
      internalAttr = reactive(["id"]);
    } else if(!props.isNodeAlter&&props.isLocal){
      internalAttr = reactive(["source", "target"]);
    }else if(props.isNodeAlter&&!props.isLocal){
      internalAttr=reactive(["id","x","y"]);
    }else if(!props.isNodeAlter&&!props.isLocal){
      internalAttr=reactive(["source","target"]);
    }
    const originColumns = computed(() => {
      if (props.isNodeAlter&&props.isLocal) {
        return store.state.rawData.columName.nodeColumns;
      } else if(!props.isNodeAlter&&props.isLocal){
        return store.state.rawData.columName.linkColumns;
      }else if(props.isNodeAlter&&!props.isLocal){
        return store.state.receiveData.columnName.nodeColumn;
      }else if(!props.isNodeAlter&&!props.isLocal){
        return store.state.receiveData.columnName.linkColumn;
      }
      return null
    });


     const hide = () => {
       const oldAttrInput=document.getElementsByClassName("old-attr-input");
       const newAttrSelect=document.getElementsByClassName("new-attr-select");
       const oldAttrArray=[];
       const newAttrArray=[];
       for(const input  of oldAttrInput){
         //@ts-ignore
         oldAttrArray.push(input.value);
       }
       for(const selectEl of newAttrSelect){
         //@ts-ignore
         newAttrArray.push(selectEl.value);
       }
       if(props.isNodeAlter){
          store.commit("constructNodeAlgorithmColumnMapping",{internalAttr:oldAttrArray,newAttr:newAttrArray});
       }else if(!props.isNodeAlter){
          store.commit("constructLinkAlgorithmColumnMapping",{internalAttr:oldAttrArray,newAttr:newAttrArray});
       }
      context.emit("close-column-alter-panel");
    };

    return {
      hide,
      originColumns,
      internalAttr,
    };
  },
});
</script>
<style scoped>
.import-data-container {
  background: rgba(61, 60, 60, 0.5);

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
/* .import-data-container{
text-align: center;
} */
</style>