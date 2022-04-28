<template>
  <div class="page-content">
    <div class="head">
      <excel-export :data="excelData" :fields="excelFields"/>
      <excel-import @getData="getData"/>
    </div>

    <tao-table :data="list" :page="page">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
    </tao-table>
  </div>
</template>

<script>
  import ExcelExport from "@/components/Form/ExcelExport";
  import ExcelImport from "@/components/Form/ExcelImport";
  export default {
    components: {
      ExcelExport,
      ExcelImport
    },
    data() {
      return {
        list: [],
        excelData: [
          {
            name: "池不胖",
            mobile: "181322331333",
            email: "chibupan@qq.com"
          },
          {
            name: "唐不哭",
            mobile: "181322331333",
            email: "chibupan@qq.com"
          },
          {
            name: "何小荷",
            mobile: "181322331333",
            email: "chibupan@qq.com"
          },
        ],
        excelFields: {
          "名称": "name",
          "电话": "mobile",
          "邮箱": "email"
        },
        page: {
          page: 1,
          total: 0
        }
      };
    },
    methods: {
      getData(data) {
        let list = []

        data.map(e => {
          let obj = {}
          obj.name = e["名称"]
          obj.mobile = e["电话"]
          obj.email = e["邮箱"];
          
          list.push(obj)
        })

        this.list = list
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-content {
    width: 100%;
    height: 100%;

    .head {
      padding-bottom: 15px;
    }
  }
</style>
