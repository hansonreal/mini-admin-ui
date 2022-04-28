<template>
  <div class="login">
    <div class="left-wrap" :style="{backgroundImage: `url(${leftBg})`}">
      <div class="logo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconzhaopian-copy"></use>
        </svg>
        <h1 class="title">{{systemName}}</h1>
      </div>

      <img class="left-img" src="@img/lf_icon.svg"/>
    </div>
    <div class="right-wrap">
      <div class="header">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconzhaopian-copy"></use>
        </svg>
        <h1>{{systemName}}</h1>
      </div>
      <div class="login-wrap">
        <div class="form">
          <h3>{{$t('login.title')}}</h3>
          <el-col style="margin-top: 30px">
            <span class="input-label">{{$t('login.label[0]')}}</span>
            <el-input placeholder="admin" size="medium" v-model.trim="account"/>
          </el-col>
          <el-col style="margin-top: 15px">
            <span class="input-label">{{$t('login.label[1]')}}</span>
            <el-input placeholder="123456" size="medium" v-model.trim="password" type="password"
              autocomplete="off"
              @keyup.enter.native="login"
            />
          </el-col>
          <el-col style="margin-top: 15px">
            <span class="input-label">{{$t('login.label[2]')}}</span>
            <el-col class="code">
              <el-input size="medium" v-model.trim="code" @keyup.enter.native="login"/>
              <img :src="captcha.picPath" @click="getCaptcha()"/>
            </el-col>
          </el-col>
          <el-col style="margin-top: 30px">
            <el-button class="login-btn" @click="login" :loading="loading">
              {{$t('login.btn')}}
            </el-button>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import setting from '@/config/setting'
  import { getMenuList } from '@/api/menuApi.js'
  import { getCaptchaApi, loginApi } from '@/api/loginApi'

  export default {
    data () {
      return {
        systemName: setting.systemName,
        account: setting.login.username,
        password: setting.login.password,
        leftBg: require('@img/lf_bg.png'),
        code: '',
        loading: false,
        captcha: {
          captchaId: '',
          picPath: ''
        }
      }
    },
    created() {
      this.initLanguage()
      this.getCaptcha()
    },
    methods: {
      // 获取验证码
      getCaptcha() {
        getCaptchaApi().then(res => {
          if(res.code === 0) {
            this.captcha = res.data
          }
        })
      },
      // 登录
      login() {
        let {account, password, code, captcha} = this

        if(!account) {
          this.showTips(0); return;
        }

        if(!password) {
          this.showTips(1); return;
        }

        if(!code) {
          this.showTips(2); return;
        }

        loginApi({
          username: account,
          password: password,
          captcha: code,
          captchaId: captcha.captchaId
        }).then(res => {
          if(res.code === 0) {
            this.loading = true
            this.$store.dispatch('user/setUserInfo', res.data)
            this.$store.dispatch('user/setLoginStatus', true)
            getMenuList()

            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          }

          if(res.code === 7) {
            this.getCaptcha()
          }
        })
      },
      initLanguage() {
        let sys = JSON.parse(localStorage.getItem("sys"))
        if(sys) {
          let { language } = sys.user
          if(language) {
            this.$i18n.locale = language
            this.$store.dispatch('user/setLanguage', language)
          }
        }
      },
      showTips(index) {
        this.$message.error(this.$t(`login.tips[${index}]`))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;

    .icon {
      width: 32px;
      height: 32px;
    }

    /deep/ .el-input__inner {
      &:focus {
        border: 1px solid #4E83FD;
      }
    }

    /deep/ .el-input--medium .el-input__inner {
      height: 40px;
      line-height: 40px;
    }

    .left-wrap {
      width: 520px;
      height: 100%;
      background: #fff;
      background-size: cover;
      padding: 20px;
      box-sizing: border-box;

      .logo {
        display: flex;
        align-items: center;

        .title {
          color: #555;
          font-size: 20px;
          font-weight: 500;
          // font-size: ;
          margin-left: 5px;
        }
      }

      .left-img {
        display: block;
        margin: auto;
        margin-top: 300px;
      }
    }
      
    .right-wrap {
      width: calc(100% - 520px);
      height: 100%;
      position: relative;

      .header {
        display: none;
      }

      .login-wrap{
        width: 440px;
        height: 550px;
        border-radius: 5px;
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-size: cover;
        box-shadow: 0 0 10px rgba(28,76,186,.1);

        .form {
          widows: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 40px 30px;
          background: #fff;

          h3 {
            color: #555;
            font-size: 23px;
            text-align: center;
            font-weight: 500;
          }

          .input-label {
            color: #333;
            font-size: 14px;
            padding: 8px 0;
            display: block;
          }

          .code {
            display: flex;
            justify-content: space-between;

            .el-input {
              flex: 1;
              margin-right: 20px;
            }

            img {
              width: 115px;
              height: 40px;
              cursor: pointer;
              border-radius: 5px;
              background: #f8f8f8 !important;
            }
          }

          .login-btn {
            width: 100%; 
            height: 40px;
            border: 0;
            color: #fff;
            background: #4E83FD;
          }
        }
      }
    }
  }

  @media only screen and (max-width: $device-ipad-pro) { 
    .login {
      width: 100%;
      height: 100vh;

      .left-wrap {
        display: none;
      }
        
      .right-wrap {
        width: 100%;

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20vh;

          h1 {
            font-weight: 500;
            margin-left: 15px;
          }
        }

        .login-wrap{
          width: 100%;
          height: auto;
          border-radius: 0;
          position: relative;
          box-shadow: none;

          .form {
            padding: 0px 30px;
            
            h3 {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
