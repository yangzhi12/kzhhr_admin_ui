<template>
  <v-container fluid
               fill-height>
    <v-layout align-center
              justify-center>
      <v-flex xs12
              sm8
              md4>
        <v-toolbar dark
                   color="primary">
          <v-toolbar-title>系统登录</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    lazy-validation
                    disableautocomplete
                    autocomplete="off">
              <v-text-field v-model="mobile"
                            prepend-icon="person"
                            :rules="mobileRules"
                            label="手机号"
                            type="text"
                            required
                            autocomplete="off"
                            disableautocomplete
                            autofocus></v-text-field>
              <v-text-field v-model="password"
                            prepend-icon="lock"
                            :rules="passwordRules"
                            label="密码"
                            :append-icon="visibility ? 'visibility' : 'visibility_off'"
                            @click:append="() => (visibility = !visibility)"
                            :type="visibility ? 'text' : 'password'"
                            required
                            autocomplete="off"
                            disableautocomplete></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <span style="padding-left: 20px; color: #ff5252 !important; caret-color: #ff5252 !important;">{{errorMsg}}</span>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   @click="login">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { excuteApis } from '@/api'

export default {
  data () {
    return {
      valid: false,
      visibility: false,
      mobile: null,
      password: null,
      mobileRules: [
        v => !!v || '请输入手机号',
        v => /^[1][3,4,5,7,8][0-9]{9}$/.test(v) || '手机号输入有误，请重新输入'
      ],
      passwordRules: [
        v => !!v || '请输入密码'
      ],
      errorMsg: ''
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        let requestParams = Object.assign({}, {
          mobile: this.mobile,
          password: this.password
        })
        try {
          excuteApis(requestParams, global.config.adminApis, 'auth', 'login').then(
            response => {
              if (response.status !== 200) {
                this.errorMsg = '登录异常，请联系管理员'
              } else {
                let res = response.data
                if (res.errno) {
                  this.errorMsg = res.errmsg
                } else {
                  this.errorMsg = ''
                  this.$store.commit('setAuth', { user: res.data.userInfo, token: res.data.token })
                  this.$router.replace('/')
                }
              }
            })
        } catch (err) {
          this.errorMsg = '登录异常，请联系管理员'
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
