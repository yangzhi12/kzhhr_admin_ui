<template>
  <v-card class="page-content mt-2"
          flat>
    <v-card-text>
      <span>用户姓名：{{user.username}}</span><br>
      <span>用户手机号：{{user.mobile}}</span><br>
      <span>所属用户组：{{user.rolename}}</span><br>
      <v-btn flat
             title="点击可修改个人密码"
             color="orange"
             @click="isModifyBtns = !isModifyBtns">修改个人密码</v-btn>
    </v-card-text>
    <v-card-text v-if="isModifyBtns">
      <v-form v-model="formValid"
              ref="form"
              lazy-validation
              autocomplete="off">
        <v-layout row>
          <v-flex xs3>
            <v-text-field label="密码"
                          v-model="password"
                          counter="11"
                          maxlength="11"
                          required
                          :rules="rules.password"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-text-field label="确认密码"
                          v-model="confirmpassword"
                          counter="11"
                          maxlength="11"
                          required
                          :rules="rules.confirmpassword"></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions v-if="isModifyBtns">
      <v-btn flat
             @click="isModifyBtns = !isModifyBtns">取消</v-btn>
      <v-btn flat
             color="primary"
             @click="savePassword">保存</v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar"
                :bottom="y === 'bottom'"
                :left="x === 'left'"
                :right="x === 'right'"
                :timeout="3000"
                :top="y === 'top'"
                color="primary"
                :vertical="mode === 'vertical'">
      {{ snackbarContent }}
      <v-btn dark
             flat
             @click="snackbar = false">
        关闭
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { excuteApis } from '@/api'

export default {
  data () {
    return {
      user: {
        id: '',
        username: '',
        mobile: '',
        roleno: '',
        rolename: ''
      },
      isModifyBtns: false,
      password: '',
      confirmpassword: '',
      formValid: true,
      rules: {
        password: [
          (v) => !!v || '必填项',
          (v) => v && v.length <= 11 || '不超过11个字符'
        ],
        confirmpassword: [
          (v) => !!v || '必填项',
          (v) => v && v.length <= 11 || '不超过11个字符',
          (v) => v && v === this.password || '两次输入密码不一致'
        ]
      },
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      snackbarContent: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.user = global.helper.ls.get('user')
    },
    savePassword () {
      if (this.$refs['form'].validate()) {
        let resquestParams = Object.assign({}, {
          id: this.user.id,
          password: this.password
        })
        excuteApis(resquestParams, global.config.adminApis, 'auth', 'modifypassword').then(
          (res) => {
            if (res.status === 200) {
              let response = res.data
              if (response.errno) {
                this.snackbar = true
                this.snackbarContent = response.errmsg
              } else {
                this.snackbar = true
                this.snackbarContent = '密码修改成功'
                this.$router.push({ name: 'login' })
              }
            } else {
              this.snackbar = true
              this.snackbarContent = '网络或服务异常'
            }
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.personalTitle {
  height: 20px;
  line-height: 20px;
  padding-left: 15px;
  font-weight: 15px;
}
</style>

  
