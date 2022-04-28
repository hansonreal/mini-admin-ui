<template>
  <div class="excel-import">
    <el-upload
      action=""
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      :auto-upload="false"
      :show-file-list="false"
    >
      <el-button type="primary">{{button}}</el-button>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props: {
      button: {
        type: String,
        default: 'Excel导入'
      }
    },
    methods: {
      onSuccess(data, file) { 
        
      },
      handleChange(file, fileList) {
        let _this = this;
        this.fileTemp = file.raw

        if (this.fileTemp) {
          if (
            this.fileTemp.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            this.fileTemp.type == "application/vnd.ms-excel"
          ) {
            this.importfxx(this.fileTemp);
          } else {
            this.$message({
              type: "warning",
              message: "附件格式错误，请删除后重新上传！"
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请上传附件！"
          });
        }
      },
      importfxx(obj) {
        let _this = this;
        // 通过DOM取文件数据
        this.file = obj;
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
              
                //手动转化
                type: "base64",
                cellDates: true
              });
            } else {

              wb = XLSX.read(binary, {
                type: "binary",
                cellDates: true,
                raw: true // 纯文本不解析
              });
            }
            
            // 格式化后的json数据
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {raw: true}); //outdata就是你想要的东西
            // 传递数据出去
            _this.$emit('getData', outdata)
          };
          reader.readAsArrayBuffer(f);
        };

        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      handleRemove(file, fileList) {
        this.fileTemp = null;
      },
      handleExceed() {

      },
      fileListUpload() {

      },
      // 将科学计数法转换为数值
      changNum(number) {
        if(typeof number === 'number') {

        } 
        return number
      }
    }
  };
</script>

<style lang="scss" scoped>
  .excel-import {
    display: inline-block;
    margin-left: 6px;
  }
</style>
