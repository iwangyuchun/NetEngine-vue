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
              <div v-for="(item,index) in originColumns" class="tab-content w-100" id="v-pills-tabContent" :key="index">
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
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Server"
                    aria-label="Server"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="hide"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";
import useDomCreate from "../hooks/useDomCreate";
export default defineComponent({
  name: "",
  props: {
    isNodeAlter: Boolean,
  },
  components: {},
  emits: ["close-column-alter-panel"],
  setup(props, context) {
    useDomCreate("column_alter");
    const hide = () => {
      context.emit("close-column-alter-panel");
    };
    const originColumns=computed(()=>{
        if(props.isNodeAlter){
            return store.state.rawData.columName.nodeColumns;
        }else{
            console.log(store.state.rawData.columName.linkColumns)
            return store.state.rawData.columName.linkColumns;
        }
        
    })

    return {
      hide,
      originColumns
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