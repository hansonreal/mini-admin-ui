<template>
  <div class="excel-export">
    <download-excel
      :name="name"
      :data="data"
      :fields="fields"
      style="display: inline-block; margin-left: 8px"
    >
      <el-button type="primary">{{button}}</el-button>
    </download-excel>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: 'Excel导出模板'
      },
      data: {
        type: Array,
        default: []
      },
      fields: {
        type: Object,
        default: {}
      },
      button: {
        type: String,
        default: 'Excel导出'
      }
    }
  };
</script>

<style lang="scss" scoped>
  .excel-export {
    display: inline-block;

    .el-button {
      margin-left: -8px;
    }
  }
</style>