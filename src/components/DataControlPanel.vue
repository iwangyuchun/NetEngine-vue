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
      <div class="border rounded-1 p-2" v-if="isLocalMode">
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

      <div class="local-layout-chose mt-2" v-if="isLocalMode">
        <select
          class="form-select"
          aria-label="Default select example"
          @change="layoutChange"
        >
          <option
            v-for="(item, ind) in allLayoutAlgorithm"
            :key="item"
            v-bind:checked="ind === 0"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
        <div class="d-grid gap-2 mt-2">
          <button class="btn btn-primary" type="button" @click="layout">
            Layout
          </button>
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
          <span class="invalid-feedback">fdshhfksjd</span>
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
        <div class="mb-1">
          <label for="http_body_textareas" class="form-label">Http Body:</label>
          <textarea
            class="form-control"
            id="http_body_textareas"
            rows="6"
            @blur="onHttpBodyBlur"
          >
{}</textarea
          >
        </div>
        <div class="border rounded-1 p-2" v-if="!isLocalMode">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              @change.prevent="modifyNodeColumnChange"
            />
            <label class="form-check-label" for="flexSwitchCheckChecked"
              >Modify Node Column</label
            >
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              @change.prevent="modfiyLinkColumnChange"
            />
            <label class="form-check-label" for="flexSwitchCheckChecked"
              >Modify Link Column</label
            >
          </div>
        </div>
        <div class="d-grid gap-2 mt-2">
          <button
            class="btn btn-primary"
            type="button"
            :disabled="!serverInfoVal.host.isExist"
            @click.prevent="sendDataToSer"
          >
            Send
          </button>
        </div>
        <div class="border rounded-1 p-2" v-if="hasReceivedData">
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
          <div class="d-grid gap-2 mt-2" v-if="hasReceivedData">
            <button class="btn btn-primary" type="button" @click="layoutRemote">
              Layout
            </button>
          </div>
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
    <modify-column-panel
      @close-column-modify-panel="closeModifyColumnPanel"
      v-if="isColumnMidifyVisible"
      :is-node-alter="isNodeModifyColumn"
    ></modify-column-panel>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent, reactive, ref, render, watch } from "vue";
import ImportDataPanel from "../components/ImportDataPanel.vue";
import ColumnAlterPanel from "./AttrProjectionDialog.vue";
import ModifyColumnPanel from "./DataProjectionDialog.vue";
import { mitter } from "../main";
//@ts-ignore
import jsonFormat from "json-format";

export default defineComponent({
  name: "",
  props: {},
  components: { ImportDataPanel, ColumnAlterPanel, ModifyColumnPanel },
  methods: {},
  setup() {
    const isVisible = ref(false);
    const isColumnAlterVisible = ref(false);
    const isNodeAlterColumn = ref(false);
    const isNodeModifyColumn = ref(false);
    const isColumnMidifyVisible = ref(false);
    const hasReceivedData = computed(() => store.state.receiveData.hasData);

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
    const openModifyColumnPanel = () => {
      isColumnMidifyVisible.value = true;
    };
    const closeModifyColumnPanel = () => {
      isColumnMidifyVisible.value = !isColumnMidifyVisible.value;
    };
    const hostValidInfo = reactive({
      error: false,
      msg: "",
    });

    const allLayoutAlgorithm = reactive(
      store.state.dataImportControl.localSetting.allLocalAlgoritem
    );

    const nodeColumnMappingChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (
        store.state.rawData.columName.nodeColumns.length <= 0 &&
        !store.state.receiveData.hasData
      ) {
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
      if (
        store.state.rawData.columName.linkColumns.length <= 0 &&
        !store.state.receiveData.hasData
      ) {
        target.checked = !target.checked;
        return;
      }

      if (target.checked) {
        isNodeAlterColumn.value = false;
        openAlterColumnPanel();
      } else {
      }
    };

    const modifyNodeColumnChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (store.state.rawData.columName.nodeColumns.length <= 0) {
        target.checked = !target.checked;
        return;
      }
      if (target.checked) {
        isNodeModifyColumn.value = true;
        openModifyColumnPanel();
      } else {
      }
    };

    const modfiyLinkColumnChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (store.state.rawData.columName.linkColumns.length <= 0) {
        target.checked = !target.checked;
        return;
      }
      if (target.checked) {
        isNodeModifyColumn.value = false;
        openModifyColumnPanel();
      } else {
      }
    };

    const remoteSetting = store.state.dataImportControl.remoteSetting;
    const serverInfoVal = reactive({
      host: { val: remoteSetting.remoteHost, isExist: true },
      path: { isExist: true, val: remoteSetting.remotePath },
      port: { val: remoteSetting.remotePort, isExist: true },
      params: { val: "{}", isExist: true },
    });

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

    const layoutChange = (e: Event) => {
      const target = e.target as HTMLSelectElement;
      store.commit("updateLayout", target.value);
    };

    const onHttpBodyBlur = (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      // target.value=jsonFormat(target.value)

      serverInfoVal.params.val = target.value;
    };

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
      const tempObj: { [key: string]: any } = {};
      if (serverInfoVal.host.isExist) {
        tempObj["host"] = serverInfoVal.host.val;
        tempObj["port"] = serverInfoVal.port.val;
        tempObj["path"] = serverInfoVal.path.val;
      }
      tempObj["params"] = serverInfoVal.params.val;
      console.log(tempObj);
      store.commit("updateServerInfo", tempObj);
      store.dispatch("sendData");
    };

    const layout = () => {
      store.commit("layout");
    };

    const layoutRemote = () => {
      mitter.emit("render");
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
      layout,
      onHttpBodyBlur,
      modifyNodeColumnChange,
      modfiyLinkColumnChange,
      isNodeModifyColumn,
      closeModifyColumnPanel,
      isColumnMidifyVisible,
      allLayoutAlgorithm,
      layoutChange,
      hostValidInfo,
      hasReceivedData,
      layoutRemote,
    };
  },
});
</script>
<style scoped>
.data-control-panel {
  /* background-color: #f8f9fa; */
  min-height: 500px;
  min-width: 350px;
  max-width: 350px;
}
</style>

// {
//   "name": "force",
//   "params": {
//     "electricalCharge": -1,
//     "springStiffness": 1,
//     "springLength": 1,
//     "maxIterations": 50,
//     "epsilonDistance": 50,
//     "infinityDistance": 100,
//     "nodeSpacing": 20,
//     "viewSize": {
//       "width": 1000,
//       "height": 1000
//     }
//   }
// }