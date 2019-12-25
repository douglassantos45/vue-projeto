<template>
  <v-app>
      <FormModal />
      <DataTable />
  </v-app>
</template>

<script>
import DataTable from './templates/ComponentDataTable'
import FormModal from '../templates/ComponentFormModalPeople'
export default {
    name: 'SupervisorPage',
    components: { DataTable, FormModal }
}
</script>

<style>

</style>