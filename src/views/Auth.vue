<template>
  <v-card class="page-content mt-2"
          flat>
    <v-layout row
              pa-2>
      <v-flex sm2
              text-xs-left><span class="authTitle">用户管理</span></v-flex>
      <v-spacer></v-spacer>
      <v-flex sm2
              text-xs-right>
        <v-text-field v-model="keywords"
                      label="输入手机号或名字查找"
                      single-line
                      hide-details
                      append-icon="search"
                      @keyup.enter="getauthList"></v-text-field>
      </v-flex>
      <v-flex sm2
              text-xs-right>
        <v-btn small
               fab
               dark
               color="success"
               title="新增"
               @click="addAuth">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-data-table :headers="headers"
                  :items="auths"
                  :loading="loading"
                  no-data-text="暂无数据"
                  hide-actions
                  class="elevation-0">
      <template v-slot:items="props">
        <!-- <td class="text-xs-center">
          <template>
            <v-avatar size="45px"
                      class="grey lighten-4">
              <img v-if="props.item.avatar"
                   :src="props.item.avatar" />
              <img v-else
                   src="../assets/moren.png" />
            </v-avatar>
          </template>
        </td> -->
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.username }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">{{ props.item.mobile }}</td>
        <td class="text-xs-center">{{ props.item.rolename ? props.item.rolename : '--' }}</td>
        <td class="text-xs-center">
          <div class="text-xs-center">
            {{ props.item.last_login_time ? getFormtedTime(props.item.last_login_time) : '-' }}
          </div>
        </td>
        <td class="justify-center layout px-0">
          <!-- <v-icon small
                  class="mr-2"
                  title="查看"
                  @click="showAuthDetail(props.item.id)">
            remove_red_eye
          </v-icon> -->
          <v-icon small
                  class="mr-2"
                  title="编辑"
                  @click="editCurAuth(props.item.id)">
            edit
          </v-icon>
          <v-icon small
                  title="删除"
                  color="error"
                  @click="deleteCurAuth(props.item.id)">
            delete
          </v-icon>
          <v-icon small
                  title="密码重置"
                  class="ml-2 mr-2"
                  @click="resetPasswordCurAuth(props.item.id)">
            lock
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <!-- 分页 -->
    <v-layout row>
      <v-flex xs3></v-flex>
      <v-flex xs6
              class="pageBar"
              text-xs-center
              v-show="showPagination">
        <v-custompagination :pagination.sync="paginationauth"></v-custompagination>
      </v-flex>
      <v-flex xs3></v-flex>
    </v-layout>
    <v-auth-info-view :visible.sync="authViewDialog"
                      :title="authViewDialogTitle"
                      :authid="curauthid"></v-auth-info-view>
    <v-auth-add-or-edit :visible.sync="addOrEditauthDialog"
                        :title="addOrEditDialogTitle"
                        :authid="curauthid"></v-auth-add-or-edit>
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
import { parseTime, getIdInvisible, getMobileInvisible } from '@/utils'
import VAuthInfoView from './auth/AuthInfoView.vue'
import VAuthAddOrEdit from './auth/AuthAddOrEdit.vue'

export default {
  data () {
    return {
      auths: [],
      pagination: {},
      totalauths: 0,
      loading: true,
      headers: [
        {
          text: '姓名',
          align: 'center',
          sortable: true,
          value: 'username'
        },
        { text: '联系电话', value: 'mobile', align: 'center', sortable: false },
        { text: '所属分组', value: 'rolename', align: 'center', sortable: false },
        { text: '最近登录时间', value: 'last_login_time', align: 'center', sortable: false },
        {
          text: '操作',
          align: 'center',
          sortable: false
        }
      ],
      prompt: {
        dialog: false,
        title: '用户信息',
        ok: true
      },
      authViewDialog: false,
      authViewDialogTitle: '用户档案详情',
      curauthid: null,
      curauth: null,
      addOrEditauthDialog: 'IS_NONE',
      addOrEditDialogTitle: '',
      showPagination: true,
      paginationauth: {
        total: 0,
        page: 1, // page 当前页
        rowsPerPage: 10
      },
      keywords: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      snackbarContent: ''
    }
  },
  watch: {
    authViewDialog: function (v) {
      if (!v) {
        this.getauthList()
      }
    },
    addOrEditauthDialog (val) {
      val === 'IS_NONE' ? this.getauthList() : null
    },
    'paginationauth.rowsPerPage' () {
      this.getauthList()
    }
  },
  methods: {
    getauthList () {
      let requestParams = Object.assign({}, {
        page: this.paginationauth.page,
        size: this.paginationauth.rowsPerPage,
      })
      if (this.keywords) {
        Object.assign(requestParams, { mobile: this.keywords.trim(), name: this.keywords.trim() })
      }
      try {
        excuteApis(requestParams, global.config.adminApis, 'auth', 'list').then(response => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno) {
              window.console.log(res.errmsg)
              this.loading = false
            } else {
              let result = res.data
              this.auths = result.data
              this.loading = false
              this.paginationauth.total = result.count
            }
          } else {
            this.loading = false
            window.console.log(response.statusText)
          }
        })
      } catch (error) {
        window.console.log(error)
        this.loading = false
      }
    },
    getFormtedTime (time) {
      if (!time) {
        return '--'
      }
      return parseTime(time, 'yyyy-MM-dd hh:mm:ss')
    },
    editCurAuth (id) {
      this.curauthid = id
      this.addOrEditDialogTitle = '编辑用户信息'
      this.addOrEditauthDialog = 'IS_EDIT'
    },
    deleteCurAuth (id) {
      if (id) {
        let auth = Object.assign({}, { id: id })
        try {
          excuteApis(auth, global.config.adminApis, 'auth', 'delete').then(response => {
            if (response.status === 200) {
              let res = response.data
              if (res.errno) {
                this.snackbarContent = res.errmsg
                this.snackbar = true
              } else {
                this.getauthList()
                this.snackbarContent = '用户删除成功'
                this.snackbar = true
              }
            }
          })
        } catch (error) {
          window.console.log(error)
        }
      }
    },
    resetPasswordCurAuth (id) {
      if (id) {
        let auth = Object.assign({}, { id: id })
        try {
          excuteApis(auth, global.config.adminApis, 'auth', 'resetpassword').then(response => {
            if (response.status === 200) {
              let res = response.data
              if (res.errno) {
                this.snackbarContent = res.errmsg
                this.snackbar = true
              } else {
                this.snackbarContent = '密码重置成功'
                this.snackbar = true
              }
            } else {
              this.snackbarContent = '服务异常，请联系管理员'
              this.snackbar = true
            }
          })
        } catch (error) {
          this.snackbarContent = '网络异常，请联系管理员'
          this.snackbar = true
        }
      }
    },
    showAuthDetail (id) {
      this.curauthid = id
      this.authViewDialog = true
    },
    addAuth () {
      this.addOrEditDialogTitle = '新建用户'
      this.addOrEditauthDialog = 'IS_ADD'
    },
    getID (certificate) {
      return getIdInvisible(certificate)
    },
    getMobile (mobile) {
      return getMobileInvisible(mobile)
    }
  },
  created () {
    this.getauthList()
  },
  components: {
    VAuthInfoView,
    VAuthAddOrEdit
  }
}
</script>

<style scoped>
.avatar {
  justify-content: left;
}
.username {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.authTitle {
  height: 52px;
  line-height: 52px;
  padding-left: 15px;
}
.pageBar {
  padding-bottom: 15px;
}
</style>
