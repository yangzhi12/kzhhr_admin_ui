<template>
  <div>
    <v-modaldialog :isShow.sync="addOrEditDialog"
                   :title="addOrEditTitle"
                   :modalMaxWidth="500"
                   :bodyHeight="350"
                   :showCloseBtn="true">
      <v-form v-model="authFormValid"
              ref="authForm"
              lazy-validation
              autocomplete="off">
        <div class="baseInfo">
          <div class="baseInfoContent">
            <v-layout row>
              <v-flex xs6>
                <v-text-field label="姓名"
                              v-model="auth.username"
                              counter="20"
                              maxlength="20"
                              required
                              :rules="rules.username"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6>
                <v-text-field label="手机号"
                              v-model="auth.mobile"
                              name="mobile"
                              counter="11"
                              maxlength="11"
                              :rules="rules.mobile"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6>
                <v-select v-bind:items="roles"
                          v-model="auth.roleid"
                          item-text="rolename"
                          item-value="id"
                          label="所属分组"
                          no-data-text="无"
                          :rules="rules.required">
                </v-select>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-form>
      <template slot="btnActions">
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="success"
                 @click.native="save"> 保存 </v-btn>
          <v-btn flat
                 @click.native="cancel"> 取消 </v-btn>
        </v-card-actions>
      </template>
    </v-modaldialog>
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
  </div>
</template>

<script>
import auth from './Auth.js'
import { validLinkPhone } from '@/utils'

export default {
  name: 'v-auth-add-or-edit',
  mixins: [auth],
  props: {
    visible: {
      type: String,
      default: 'IS_NOE'
    },
    title: {
      type: String,
      default: ''
    },
    authid: {
      type: Number,
      default: 0
    }
  },
  data () {
    const ADD_OR_EDIT = {
      'IS_EDIT': true,
      'IS_ADD': true,
      'IS_NONE': false
    }
    return {
      prompt: {
        dialog: false,
        title: '提示信息',
        body: '保存成功',
        ok: true
      },
      addOrEditDialog: false,
      addOrEdit: ADD_OR_EDIT,
      addOrEditTitle: '创建合伙人',
      authFormValid: true,
      rules: {
        required: [
          (v) => !!v || '必填项'
        ],
        username: [
          (v) => !!v || '必填项',
          (v) => v && v.length <= 20 || '不超过20个字符'
        ],
        mobile: [
          (v) => !!v || '必填项',
          (v) => v && v.length === 11 || '手机号为11位',
          (v) => validLinkPhone(v) || '手机号输入有误'
        ]
      },
      roles: [
        {
          id: '',
          name: ''
        }
      ],
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      snackbarContent: ''
    }
  },
  computed: {},
  mounted () { },
  watch: {
    visible: function (v) {
      this.disposeDialog(v)
    },
    title: function (v) {
      this.authViewTitle = v
    },
    addOrEditDialog: function (v) {
      v ? null : this.$emit('update:visible', 'IS_NONE')
    }
  },
  methods: {
    save () {
      if (this.$refs['authForm'].validate()) {
        if (this.authid) {
          this.auth.edit().then((res) => {
            if (res.status === 200) {
              let response = res.data
              if (!response.errno) {
                this.$emit('update:visible', 'IS_NONE')
              } else {
                this.snackbar = true
                this.snackbarContent = response.errmsg
              }
            } else {
              this.snackbar = true
              this.snackbarContent = res.statusText
            }
          })
        } else {
          this.auth.add().then((res) => {
            if (res.status === 200) {
              let response = res.data
              if (!response.errno) {
                this.$emit('update:visible', 'IS_NONE')
              } else {
                this.snackbar = true
                this.snackbarContent = response.errmsg
              }
            } else {
              this.snackbar = true
              this.snackbarContent = res.statusText
            }
          })
        }
      }
    },
    cancel () {
      this.$emit('update:visible', 'IS_NONE')
    },
    disposeDialog (v) {
      this.addOrEditDialog = this.addOrEdit[v]
      if (v === 'IS_ADD') {
        this.auth.setId(null)
        this.auth.setUsername(null)
        this.auth.setMobile(null)
        this.auth.setRoleid(null)
        this.addOrEditTitle = '新建用户'
      } else if (v === 'IS_EDIT') {
        this.addOrEditTitle = '编辑用户'
        this.getAuthInfoById(this.authid)
      } else {
        this.addOrEditTitle = ''
      }
    }
  },
  created () {
    this.authViewDialog = this.visible
    this.authViewTitle = this.title
    this.getRoleInfo()
  },
  components: {

  }
}
</script>
<style scoped>
.titlelabel {
  position: absolute;
  right: 60px;
  top: 20px;
  z-index: 1000;
}
.hiddentips {
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 450px;
}
.baseInfo {
  margin-bottom: 15px;
  /* border: 1px solid #f5f5f5; */
}
.baseInfoContent {
  padding-top: 10px;
  padding-bottom: 10px;
}
.infolabel {
  margin-right: 10px;
  /* color: #bbb7b7; */
}
</style>
