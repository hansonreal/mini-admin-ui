<template>
  <div class="icon-selector">
    <div class="select" @click="visible=true">
      <div class="icon">
        <i class="iconfont icons" v-if="selectValue.indexOf('#') === 1" v-html="selectValue"/>
        <i class="el-icon" :class="selectValue" v-else/>
      </div>
      <div class="text">
        图标选择器
      </div>
      <div class="arrow">
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
    
    <el-dialog title="选择图标" width="40%" :visible.sync="visible">

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="Icons" name="icons"></el-tab-pane>
        <el-tab-pane label="Element icon" name="element"></el-tab-pane>
      </el-tabs>

      <div>
        <ul v-show="activeName === 'icons'">
          <li v-for="icon in iconsList" :key="icon" @click="selectorIcon(icon)">
            <i class="iconfont" v-html="icon"></i>
          </li>
        </ul>
        <ul v-show="activeName === 'element'">
          <li v-for="icon in elIconList" :key="icon" @click="selectorIcon(icon)">
            <i :class="icon"></i>
          </li>
        </ul>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { iconsList } from "@icons/icons/index.js";
  import { elIconList } from "@icons/element/index.js";

  export default {
    name: 'IconSelector',
    props: {
      defaultIcon: {
        type: String,
        default: 'el-icon-copy-document'
      }
    },
    data() {
      return {
        activeName: 'icons',
        iconsList: iconsList,
        elIconList: elIconList,
        visible: false,
        selectValue: ''
      };
    },
    created() {
      this.initIcon()
    },
    methods: {
      initIcon() {
        this.selectValue = this.defaultIcon
      },
      selectorIcon(icon) {
        this.visible = false
        this.selectValue = icon
        this.$emit('getIcon', icon)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .icon-selector {

    .select {
      width: 150px;
      height: 32px;
      line-height: 32px;
      padding: 0 8px;
      box-sizing: border-box;
      border-radius: 3px;
      margin-bottom: 15px;
      cursor: pointer;
      border: 1px solid #D3D7DE;
      transition: border .3s;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        border-color: #B3B4B7;
      }

      .icon {
        color: #888;
        display: flex;
        align-items: center;

        i {
          font-size: 13px;
        }
      }

      .text {
        height: calc(100% - 2px);
        display: flex;
        align-items: center;
        color: #888;
        font-size: 13px;
      }

      .arrow {
        height: calc(100% - 2px);
        height: calc(100% - 2px);
        display: flex;
        align-items: center;
        font-size: 13px;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        color: #666;
        width: 50px;
        height: 40px;
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
          font-size: 20px;
        }

        span {
          color: #999;
          display: block;
          margin-top: 20px;
        }
      }
    }
  }
</style>