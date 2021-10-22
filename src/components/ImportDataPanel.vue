<template>
  <teleport to="#dataimport">
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
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Import Data</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
               @click.prevent="hide"
            >
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-start">
              <div
                class="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  class="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Local CSV
                </button>
                <button
                  class="nav-link"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  LocalJSON
                </button>
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  RemoteCSV
                </button>
                <button
                  class="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  RemoteJSON
                </button>
              </div>
              <div class="tab-content w-100" id="v-pills-tabContent">
               <local-csv-component></local-csv-component>
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
import { defineComponent } from "vue";
import useDomCreate from "../hooks/useDomCreate";
import LocalCsvComponent from "../components/ImportDataFromLocalCSV.vue"
export default defineComponent({
  name: "",
  props: {},
  components:{LocalCsvComponent},
  emits: ["close-import-panel"],
  setup(props, context) {
    useDomCreate("dataimport");
    const hide = () => {
      context.emit("close-import-panel");
    };
    const classObject = {
      "alert-success": true,
    };

    return {

      hide,
      classObject,
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