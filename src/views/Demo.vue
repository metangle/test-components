<template>
  <div class="demo">
      <!-- <DfxGrid :id="id" :gridOptions="gridOptions"/> -->
      <!-- <br>
      <br>
      <br>
      <br> -->
      <!-- <DfxAutocomplete/> -->
      <FormSearch key="role" v-model="modelValue" @search="handleSearch"/>
  </div>
</template>

<script>
import DfxGrid from '@/components/dfx-grid/index.vue'
import DfxAutocomplete from '@/components/dfx-autocomplete/index.vue'
// import FormSearch from '@/components/form-search/index.vue'


import FormSearch from '@/lib/form-search/FormSearch.umd.js'
console.log('FormSearch',FormSearch)

export default {
  name: 'Demo',
  components: {
      DfxGrid,
      DfxAutocomplete,
      FormSearch
  },
  data() {
    return {
      gridOptions: {},
      /* =============== */
      modelValue: '11'
      /* =============== */
      
    }
  },
  computed: {
    
  },
  created() {
    
  },
  methods: {
    handleSearch(data) {
      console.log('要搜索=-=', data)
    }
  }
}
        
</script>
<style lang='scss'>
@import '../lib/form-search/FormSearch.css';
  .demo{
    .form-search {
      margin-left: 500px;
    }
  }
</style>