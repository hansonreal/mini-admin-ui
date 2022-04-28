<template>
  <div class="page-content">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="Icons" name="icons"></el-tab-pane>
      <el-tab-pane label="Element icon" name="element"></el-tab-pane>
    </el-tabs>

    <div class="el-tabs-content">
      <ul class="icon-list" v-show="activeName === 'icons'">
        <li v-for="icon in iconList" :key="icon" @click="copyIcon(icon)">
          <i class="iconfont" v-html="icon"></i>
          <span>{{ icon }}</span>
        </li>
      </ul>
      <ul class="icon-list" v-show="activeName === 'element'">
        <li v-for="icon in elIconList" :key="icon" @click="copyIcon(icon)">
          <i :class="icon"></i>
          <span>{{ icon }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { iconsList } from "@icons/icons/index.js";
import { elIconList } from "@icons/element/index.js";
export default {
  data() {
    return {
      activeName: "icons",
      iconList: iconsList,
      elIconList: elIconList
    };
  },
  methods: {
    copyIcon(text) {
      let copyipt = document.createElement("input")
      copyipt.setAttribute("value", text)
      document.body.appendChild(copyipt)
      copyipt.select()
      document.execCommand("copy")
      document.body.removeChild(copyipt)
      this.$message.success({
        message: "复制成功",
        duration: 1500
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.page-content {
  width: 100%;
  height: 100%;

  $border-color: #eee;

  .el-tabs-content {
    margin-top: -16px;
    border: 1px solid #eee;
    border-top: 0;

    .icon-list {
      display: flex;
      flex-wrap: wrap;

      li {
        color: #666;
        width: 140px;
        height: 120px;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &:hover {
          cursor: pointer;
          background: rgba($color: #2d8cf0, $alpha: 0.05);
        }

        i {
          font-size: 26px;
        }

        span {
          color: #999;
          display: block;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
