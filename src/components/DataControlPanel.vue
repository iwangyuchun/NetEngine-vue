<template>
  <div class="data-control-panel">
    <div class="d-grid gap-2 p-1">
      <button
        class="btn btn-primary"
        @click.prevent="openImportPanel"
        type="button"
      >
        Data Source
      </button>
      

      <div class="border rounded-1 p-2">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            @change.prevent="nodeColumnMappingChange"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked"
            >Node Attr Projection</label
          >
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            @change.prevent="linkColumnMappingChange"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked"
            >Link Attr Projection</label
          >
        </div>
      </div>
     

      <div class="border rounded-1 p-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="layout_algoritem_mode"
            id="local_layout_mode"
            @change.prevent="algorithmFromModeChange"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Local Layout Algorithm
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="layout_algoritem_mode"
            id="remote_layout_mode"
            @change.prevent="algorithmFromModeChange"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Remote Layout Algorithm
          </label>
        </div>
      </div>

      <div class="local-layout-chose mt-2" v-if="isLocalMode">
        <select class="form-select" aria-label="Default select example">
          <option selected>Force</option>
          <option value="1">Tree</option>
          <option value="2">Other</option>
        </select>
        <div class="d-grid gap-2 mt-2">
          <button class="btn btn-primary" type="button">Layout</button>
        </div>
      </div>
      <div class="border px-1 mt-2" v-if="!isLocalMode">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Server Host:</label
          >
          <input
            type="text"
            class="form-control"
            placeholder="input server host"
            v-model="serverInfoVal.host.val"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Server Port:</label
          >
          <input
            type="number"
            class="form-control"
            placeholder="input server Port"
            v-model="serverInfoVal.port.val"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Path:</label>
          <input
            type="text"
            class="form-control"
            placeholder="input path"
            v-model="serverInfoVal.path.val"
          />
        </div>
        <div class="d-grid gap-2 mt-2">
          <button
            class="btn btn-primary"
            type="button"
            :disabled="serverInfoVal.host.isExist"
            @click.prevent="sendDataToSer"
          >
            Send
          </button>
        </div>
      </div>

    </div>
    <import-data-panel
      @close-import-panel="closePanel"
      v-if="isVisible"
    ></import-data-panel>
    <column-alter-panel
      @close-column-alter-panel="closeAlterColumnPanel"
      v-if="isColumnAlterVisible"
      :is-node-alter="isNodeAlterColumn"
      :is-local="isLocalMode"
    ></column-alter-panel>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent, reactive, ref } from "vue";
import ImportDataPanel from "../components/ImportDataPanel.vue";
import ColumnAlterPanel from "./AttrProjectionDialog.vue";
export default defineComponent({
  name: "",
  props: {},
  components: { ImportDataPanel, ColumnAlterPanel },
  setup() {
    const isVisible = ref(false);
    const isColumnAlterVisible = ref(false);
    const isNodeAlterColumn = ref(false);
    const closePanel = () => {
      isVisible.value = !isVisible.value;
    };
    const closeAlterColumnPanel = () => {
      isColumnAlterVisible.value = !isColumnAlterVisible.value;
    };
    const openImportPanel = () => {
      isVisible.value = true;
    };
    const openAlterColumnPanel = () => {
      isColumnAlterVisible.value = true;
    };
    const hostValidInfo = reactive({
      error: false,
      msg: "",
    });

    const nodeColumnMappingChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (store.state.rawData.columName.nodeColumns.length <= 0) {
        target.checked = !target.checked;
        return;
      }
      if (target.checked) {
        isNodeAlterColumn.value = true;
        openAlterColumnPanel();
      } else {
      }
    };
    const linkColumnMappingChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (store.state.rawData.columName.linkColumns.length <= 0) {
        target.checked = !target.checked;
        return;
      }

      if (target.checked) {
        isNodeAlterColumn.value = false;
        openAlterColumnPanel();
      } else {
      }
    };

    const serverInfoVal = reactive(store.state.remoteServerInfo);

    const algorithmFromModeChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.id === "remote_layout_mode") {
        store.commit("updateLayoutAlgoritemMode", "remote");
      } else {
        store.commit("updateLayoutAlgoritemMode", "local");
      }
    };

    const isLocalMode = computed(() => {
      return store.state.dataImportControl.algorithmMode === "local"
        ? true
        : false;
    });

    const sendDataToSer = () => {
      if (serverInfoVal.host.val === "") {
        hostValidInfo.error = true;
        hostValidInfo.msg = "host cannot empty";
        return;
      } else {
        serverInfoVal.path.isExist = true;
      }
      if (serverInfoVal.port.val > 0) {
        serverInfoVal.port.isExist = true;
      }
      if (serverInfoVal.path.val === "") {
        serverInfoVal.path.isExist = false;
      }
      store.commit("updateServerInfo", serverInfoVal);
    };

    return {
      openImportPanel,
      closePanel,
      isVisible,
      algorithmFromModeChange,
      isLocalMode,
      serverInfoVal,
      sendDataToSer,
      isColumnAlterVisible,
      closeAlterColumnPanel,
      openAlterColumnPanel,
      nodeColumnMappingChange,
      linkColumnMappingChange,
      isNodeAlterColumn,
    };
  },
});
</script>
<style scoped>
.data-control-panel {
  background-color: #f8f9fa;
  min-height: 500px;
  min-width: 350px;
  max-width: 350px;
  flex-grow: 0.15;
}
</style>