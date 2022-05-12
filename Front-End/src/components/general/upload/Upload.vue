<template>
  <div class="row">
    <div class="col-6">
      <p class="text-body1 text-weight-bold q-my-sm">Upload New App</p>
    </div>
  </div>
  <div class="row q-pa-sm" @dragover.prevent @drop.prevent="dropFiles">
    <div class="col-12 text-center brdr-dashed">
      <Icon size="100px" name="cloud_upload" color="primary" />
      <div class="text-center">
        <span class="row justify-center">
          <p class="q-px-xs">Drag & drop your app file or</p>
          <FileInput
            multiple
            :model-value="files"
            @update:model-value="dropFiles"
          />
        </span>
        <p class="q-pa-xs q-mb-xs q-mt-none">
          The file should end in .ipa or .pkg <br />.ipa files must use an
          Enterprise provisioning profile
        </p>
      </div>
      <div v-for="(fileInfo, i) in filesProgress" :key="i" class="col-12">
        <div class="row q-px-md">
          <div class="col-12 text-left">
            <h6 class="q-my-sm">Name: {{ fileInfo?.name }}</h6>
          </div>
          <div class="col-11">
            <q-linear-progress
              :color="
                hasError ? 'red' : fileInfo?.progress === 1 ? 'green' : 'blue'
              "
              size="10px"
              :value="getProgress(fileInfo?.progress)"
            />
          </div>
          <div class="col-1 q-my-none">
            <Icon size="sm" name="cancel" />
          </div>

          <div class="row">
            Size: {{ getSize(fileInfo?.progress).currentSize }} MB /
            {{ getSize(fileInfo?.progress).totalSize }} MB
          </div>
        </div>
      </div>
    </div>
  </div>
  <slot></slot>
  <div class="row q-pa-sm">
    <div class="col-12">
      <h6 class="q-my-md">All Apps</h6>
    </div>
    <div v-for="(file, i) in files" :key="i" class="col-4 q-pa-xs">
      <div class="row full-width justify-between items-center brdr-br q-pa-sm">
        <div>
          <p class="text-body1 text-weight-bold q-mt-sm q-mb-none app-name">
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <p class="text-body2 q-my-xs">
                {{ file.name }}
              </p>
            </q-tooltip>
            <Icon name="rhc-document" color="warning" /> {{ file.name }}
          </p>
          <p class="text-body2 text-warning q-my-none">{{ file.size }}</p>
        </div>
        <Icon
          class="cursor-pointer q-mx-none q-mt-md q-mb-none"
          name="rhc-trash"
          color="warning"
          size="lg"
          @click="removeFile(file.app_id, i)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent, PropType } from "vue";
import FileInput from "@/components/general/FileInput.vue";
import AppsService from "@/modules/apps/AppsService";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    FileInput,
  },
  props: {
    documents: {
      type: Array as PropType<any>,
    },
    uploadingFileE: {
      type: Object as PropType<any>,
    },
    filesProgress: {
      type: Array as PropType<any>,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update", "reset", "remove"],
  setup(props, context) {
    const route = useRoute();
    const layout = ref(false);
    const { notify } = useQuasar();
    const files = computed({
      get() {
        return props.documents;
      },
      set(val: any) {
        if (val.length) {
          context.emit("update", [...val]);
        } else context.emit("reset", []);
      },
    });

    const getSize = (progress: any) => {
      if (!progress) {
        return {
          totalSize: 0,
          currentSize: 0,
        };
      }
      return {
        totalSize: +(progress.total / 1000000).toFixed(2),
        currentSize: +(progress.loaded / 1000000).toFixed(2),
      };
    };

    const getProgress = (progress: any) => {
      if (progress) {
        return progress.loaded / progress.total;
      }
    };

    const removeFile = async (id: number, index: number) => {
      const config_id = route.params && route.params.id;
      if (config_id) {
        await AppsService.deleteApp(id, +config_id);
        context.emit("remove", id);
      } else {
        await AppsService.deleteApp(id);
      }
      files.value.splice(index, 1);
      notify({
        message: "App removed successfully",
      });
    };

    const dropFiles = (event: any) => {
      if (event.dataTransfer) {
        event.preventDefault();
        files.value = event.dataTransfer.files;
      } else {
        files.value = event;
      }
    };

    return {
      files,
      removeFile,
      dropFiles,
      layout,
      getSize,
      getProgress,
    };
  },
});
</script>

<style lang="scss">
.app-name {
  white-space: nowrap;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
