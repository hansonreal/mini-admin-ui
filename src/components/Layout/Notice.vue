<template>
  <div class="notice" :style="{transform: show ? 'scaleY(1)' : 'scaleY(0.9)', opacity: show ? 1 : 0}" 
    @click.stop="" v-show="visible"
  >
    <ul class="bar">
      <li v-for="(item, index) in barList" :key="index" :class="{'active': barActiveIndex === index}"
        @click="changeBar(index)"
      >
        {{$t(`notice.bar[${index}]`)}} ({{item.num}})
      </li>
    </ul>
    <div class="content">
      <vue-scroll :ops="ops" ref="scroll" class="scroll">
        <ul class="notice-list" v-show="barActiveIndex === 0">
          <li v-for="(item, index) in noticeList" :key="index">
            <div class="icon" :style="{background: getIcon(item.type)[0] + '!important'}">
              <i class="iconfont">{{getIcon(item.type)[1]}}</i>
            </div>
            <div class="text">
              <h4>{{item.title}}</h4>
              <p>{{item.time}}</p>
            </div>
          </li>
        </ul>
        <ul class="user-list" v-show="barActiveIndex === 1">
          <li v-for="(item, index) in msgList" :key="index">
            <div class="avatar">
              <img :src="item.avatar"/>
            </div>
            <div class="text">
              <h4>{{item.title}}</h4>
              <p>{{item.time}}</p>
            </div>
          </li>
        </ul>
        <ul class="base" v-show="barActiveIndex === 3">
          <li v-for="(item, index) in pendingList" :key="index">
            <h4>{{item.title}}</h4>
            <p>{{item.time}}</p>
          </li>
        </ul>

        <div class="empty-tips" v-show="barActiveIndex === 0 && noticeList.length === 0">
          <i class="iconfont">&#xe707;</i>
          <p>{{$t('notice.text[0]')}} {{$t(`notice.bar[${barActiveIndex}]`)}}</p>
        </div>
        <div class="empty-tips" v-show="barActiveIndex === 1 && msgList.length === 0">
          <i class="iconfont">&#xe707;</i>
          <p>{{$t('notice.text[0]')}} {{$t(`notice.bar[${barActiveIndex}]`)}}</p>
        </div>
        <div class="empty-tips" v-show="barActiveIndex === 2 && pendingList.length === 0">
          <i class="iconfont">&#xe707;</i>
          <p>{{$t('notice.text[0]')}} {{$t(`notice.bar[${barActiveIndex}]`)}}</p>
        </div>
      </vue-scroll>
    </div>

    <div class="load" @click="loadMore">
      <i :style="{opacity: isLoading ? 1 : 0}" class="el-icon-loading"></i>
      <span>{{$t('notice.btn[0]')}}</span>
    </div>
  </div>
</template>

<script>
  import { noticeList, msgList } from '@/mock/noticeData.js'
  import { scrollBarOpstion } from '@/config/scrollbar.js'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: false,
        barList: [
          {
            name: '通知',
            num: 1
          },{
            name: '消息',
            num: 1
          },{
            name: '代办',
            num: 0
          }
        ],
        barActiveIndex: 0,
        ops: scrollBarOpstion,
        noticeList: noticeList,
        msgList: msgList,
        pendingList: [],
        isLoading: false
      };
    },
    methods: {
      changeBar(index) {
        this.barActiveIndex = index
      },
      loadMore() {
        this.isLoading = true

        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
      getIcon(type) {
        let color = '#3391E5'
        let icon = '\ue64a'

        switch(type) {
          case 'email':
            icon = '\ue697'
            color = '#0AACAC'
            break
          case 'home':
            icon = '\ue62b'
            color = '#86D266'
            break
          case 'collection':
            icon = '\ue62c'
            color = '#FF9900'
            break
          case 'user':
            icon = '\ue6da'
            color = '#F06292'
            break
          case 'notice':
            icon = '\ue64a'
            color = '#3B95E6'
            break
        }

        return [color, icon]
      },
      showNoticeFunc(show) {
        if(show) {
          this.visible = show
        }else {
          setTimeout(() => {
            this.visible = show
          }, 350)
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .notice {
    width: 310px;
    height: 460px;
    background: #fff;
    position: absolute;
    top: 67px;
    right: 75px;
    box-shadow: 0 6px 16px -8px rgba(0,0,0,.08), 0 9px 28px 0 rgba(0,0,0,.05), 0 12px 48px 16px rgba(0,0,0,.03);
    border-radius: 4px;
    overflow: hidden;
    transition: all .35s;
    transform-origin: center top 0px; 
    will-change: top, left;

    .bar {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #F0F0F0;
      padding: 0 10px;
      box-sizing: border-box;
      
      li {
        height: 38px;
        flex: 1;
        text-align: center;
        color: #515a6e;
        font-size: 14px;
        cursor: pointer;
        transition: color .3s;
        margin-right: 10px;
        @include userSelect;
        overflow: hidden;

        &:last-of-type {
          margin-right: 0;
        }
        
        &:hover {
          color: #2d8cf0;
        }

        &.active {
          color: #2d8cf0 !important;
          border-bottom: 2px solid #2d8cf0;
        }
      }
    }

    .content {
      width: 100%;
      height: calc(100% - 80px);
      
      .scroll {
        height: 100%;

        .notice-list {
          li {
            padding: 15px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #F0F0F0;
            display: flex;
            align-items: center;

            &:last-of-type{
              border-bottom: 0;
            }

            .icon {
              width: 32px;
              height: 32px;
              line-height: 33px;
              border-radius: 50%;
              text-align: center;

              i {
                color: #fff !important;
                font-size: 17px;
                background: transparent !important;
              }
            }

            .text {
              width: calc(100% - 45px);
              margin-left: 10px;

              h4 {
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: #515a6e;
              }

              p {
                font-size: 12px;
                color: #808695;
              }
            }
          }
        }

        .user-list {
          li {
            padding: 15px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #F0F0F0;
            display: flex;
            align-items: center;

            &:last-of-type{
              border-bottom: 0;
            }

            .avatar {
              width: 32px;
              height: 32px;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .text {
              width: calc(100% - 45px);
              margin-left: 10px;

              h4 {
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: #515a6e;
              }

              p {
                font-size: 12px;
                color: #808695;
              }
            }
          }
        }

        .base {
          li {
            padding: 15px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #F0F0F0;

            &:last-of-type{
              border-bottom: 0;
            }

            h4 {
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
              color: #515a6e;
            }

            p {
              font-size: 12px;
              color: #808695;
            }
          }
        }

        .empty-tips {
          height: 100%;
          text-align: center;
          position: relative;
          top: 150px;
          color: #999;
          background: transparent !important;

          i {
            font-size: 35px;
          }

          p {
            margin-top: 5px;
            background: transparent !important;
          }
        }
      }
    }

    .load {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-top: 1px solid #E8EAEC;
      cursor: pointer;
      color: #808695;
      font-size: 14px;
      transition: color .3s;
      @include userSelect;

      &:hover {
        color: #2d8cf0;
      }
    }
  }

  @media only screen and (max-width: $device-phone) { 
    .notice {
      width: 100%;
      height: 80vh;
      top: 65px;
      right: 0;
    }
  }
</style>
