<template>
  <div class="row screen-center brdr custom-header justify-between">
    <h6 class="q-my-sm q-px-md">{{ title }}</h6>
    <div class="row q-px-md">
      <Select
        v-model="visible_columns"
        class="q-my-auto"
        dense
        outlined
        multiple
        label="Columns"
        options-dense
        :display-value="$q.lang.table.columns"
        emit-value
        map-options
        :options="columns"
        option-value="name"
        options-cover
        style="min-width: 115px"
      />
      <p class="q-my-auto q-mx-sm">Show</p>
      <Select
        v-model="pagination.rowsPerPage"
        class="q-my-auto"
        dense
        outlined
        :options="[5, 10, 15, 20, 25]"
      />
      <q-pagination v-model="pagination.page" :max="5" direction-links />
    </div>
  </div>
  <q-table
    flat
    bordered
    class="custom-table"
    no-data-label="No Data"
    :rows="data"
    v-bind="$attrs"
    :columns="columns"
    :pagination="pagination"
    :visible-columns="visible_columns"
    @row-click="(event, row) => $emit('row-click', row)"
  >
    <template
      v-for="col in overrideColumns"
      :key="col.name"
      #[col.templateName]="props"
    >
      <q-td dense :props="props">
        <slot :name="col.name" :props="props"></slot>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import ColumnModel from "./ColumnModel";

const props = defineProps<{
  data: Array<any>;
  columns: ColumnModel[];
  title: string;
}>();

defineEmits<{
  (e: "row-click", val: any): void;
}>();
const pagination = ref({
  descending: false,
  page: 1,
  rowsPerPage: 5,
});
const visible_columns = ref<string[]>([]);

const overrideColumns = computed(() => {
  return props.columns.filter((col: ColumnModel) => col.override);
});

onMounted(() => {
  const filteredColumns = props.columns.filter((f) => f.defaultColumn);
  visible_columns.value = filteredColumns.map((x) => x.name);
});
</script>

<style lang="scss">
.custom-header {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.custom-table {
  margin-top: unset;
  border-top: unset;
  border-top-left-radius: unset;
  border-top-right-radius: unset;
}
.my-custom-header {
  background-color: aqua;
  .title-bar {
    display: flex;
    width: 100%;
  }
}
</style>
