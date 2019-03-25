<template>
  <div>
    <v-modaldialog :isShow.sync="addOrEditDialog"
                   :title="addOrEditTitle"
                   :modalMaxWidth="680"
                   :bodyHeight="600"
                   :showCloseBtn="true">
      <v-form v-model="memberFormValid"
              ref="memberForm"
              lazy-validation
              autocomplete="off">
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 基本信息 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row>
              <v-flex xs6
                      pa-2>
                <v-text-field label="姓名"
                              v-model="member.username"
                              counter="20"
                              maxlength="20"
                              required
                              :rules="rules.username"></v-text-field>
              </v-flex>
              <v-flex xs6
                      pa-2>
                <v-select v-bind:items="sexs"
                          v-model="member.gender"
                          item-text="name"
                          item-value="value"
                          label="请选择性别"
                          no-data-text="无"
                          :rules="rules.required">
                </v-select>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6
                      pa-2>
                <v-text-field label="手机号"
                              v-model="member.mobile"
                              name="mobile"
                              counter="11"
                              maxlength="11"
                              :rules="rules.mobile"></v-text-field>
              </v-flex>
              <v-flex xs6
                      pa-2>
                <!-- <v-customdatepicker datePickerMenu="begintime"
                                    pickerLabel="选择出生日期"
                                    :selectedDate.sync="birthday"
                                    :singleLine="false"
                                    :rules="rules.required">
                </v-customdatepicker> -->
                <v-text-field label="身份证号"
                              v-model="member.certificate"
                              name="mobile"
                              counter="50"
                              maxlength="50"
                              :rules="rules.certificate"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6
                      pa-2>
                <v-text-field label="微信号"
                              v-model="member.weixin_no"
                              name="mobile"
                              counter="50"
                              maxlength="50"
                              :rules="rules.weixin_no"></v-text-field>
              </v-flex>
              <v-flex xs6
                      pa-2>
                <v-text-field label="联系地址"
                              v-model="member.address"
                              name="mobile"
                              counter="100"
                              maxlength="100"></v-text-field>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 社交账号 </span>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 银行卡信息 </span>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 邮箱账号 </span>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 个人简历 </span>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 家庭住址 </span>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 家庭成员 </span>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 个人征信证明 </span>
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
  </div>
</template>

<script>
import Member from './Member.js'
import { validLinkPhone, validPersonID } from '@/utils'

export default {
  name: 'v-member-add-or-edit',
  mixins: [Member],
  props: {
    visible: {
      type: String,
      default: 'IS_NOE'
    },
    title: {
      type: String,
      default: ''
    },
    memberid: {
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
      memberFormValid: true,
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
        ],
        weixin_no: [
          (v) => !!v || '必填项',
          (v) => v && v.length <= 50 || '不超过50个字符'
        ],
        certificate: [
          (v) => !!v || '必填项',
          (v) => validPersonID(v) || '身份证号输入有误'
        ]
      },
      sexs: [
        {
          value: 0,
          name: '--'
        },
        {
          value: 1,
          name: '男'
        },
        {
          value: 2,
          name: '女'
        }
      ]
    }
  },
  computed: {},
  mounted () { },
  watch: {
    visible: function (v) {
      this.disposeDialog(v)
    },
    title: function (v) {
      this.memberViewTitle = v
    },
    addOrEditDialog: function (v) {
      v ? null : this.$emit('update:visible', 'IS_NONE')
    }
  },
  methods: {
    save () {
      if (this.$refs['memberForm'].validate()) {
        if (this.memberid) {
          if (this.birthday) {
            let date = new Date(this.birthday)
            this.member.setBirthday(date.getTime())
          }
          this.member.edit().then(() => {
            this.$emit('update:visible', 'IS_NONE')
          })
        } else {
          this.member.add().then(() => {
            this.$emit('update:visible', 'IS_NONE')
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
        this.member.setUsername(null)
        this.member.setGender(null)
        this.member.setMobile(null)
        this.member.setBirthday(null)
        this.member.setWeixin_no(null)
        this.member.setAddress(null)
        this.addOrEditTitle = '新建（注册）合伙人'
      } else if (v === 'IS_EDIT') {
        this.addOrEditTitle = '编辑合伙人'
        this.getMemberInfoById(this.memberid)
      } else {
        this.addOrEditTitle = ''
      }
    }
  },
  created () {
    this.memberViewDialog = this.visible
    this.memberViewTitle = this.title
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
  border: 1px solid #f5f5f5;
}
.baseInfoTitle {
  /* padding: 10px; */
  height: 40px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.87);
  background-color: #f5f5f5;
}
.titleInner {
  margin-left: 15px;
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
