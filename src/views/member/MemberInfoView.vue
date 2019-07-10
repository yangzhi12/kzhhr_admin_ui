<template>
  <div>
    <v-modaldialog :isShow.sync="memberViewDialog"
                   :title="memberViewTitle"
                   :modalMaxWidth="800"
                   :bodyHeight="600"
                   :showCloseBtn="true">
      <template slot="toolbarItem">
        <div style="margin-right: 10px;">
          <span>档案状态：&nbsp;&nbsp;</span>
          <span style="color: red;">{{ getStateName(member.state) }}</span>
        </div>
      </template>
      <div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 基本信息 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>
                <v-layout row>
                  <v-flex xs4>
                    <span class="infolabel">姓名: </span>
                    <span>{{ member.username }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">身份证号: </span>
                    <span>{{ member.certificate || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <!-- <span class="infolabel">出生日期: </span>
                    <span>{{ getFormtedTime(member.birthday) || '--' }}</span> -->
                    <span class="infolabel">手机号码: </span>
                    <span>{{ member.mobile }}</span>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <span class="infolabel">微信号: </span>
                    <span>{{ member.weixin_no || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">当前级别: </span>
                    <span>{{ getLevelName(member.level) || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">性别: </span>
                    <span>{{ getGenderName(member.gender) || '--' }}</span>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <span class="infolabel">是否是业务员: </span>
                    <span>{{ member.issaleman ? '是' : '否' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">是否是营销人员: </span>
                    <span>{{ member.ismarketman ? '是' : '否' }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 银行卡信息 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>
                <v-layout row>
                  <v-flex xs4>
                    <span class="infolabel">卡号: </span>
                    <span>{{ member.bankno || '--' }}</span>
                  </v-flex>
                  <v-flex xs8>
                    <span class="infolabel">开户行地址: </span>
                    <span>{{ member.bankaddress || '--' }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 电子邮箱信息 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>
                <v-layout row>
                  <v-flex xs12>
                    <span class="infolabel">账号: </span>
                    <span>{{ member.email || '--' }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 个人简历 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap v-if="member.resumelist.length === 0">
              <v-flex xs12>{{ member.resume || '暂未填写' }}</v-flex>
            </v-layout>
            <template  v-if="member.resumelist.length > 0">
              <v-layout row
                      wrap >
                <v-flex xs12 pa-2 v-for="resume in member.resumelist" :key="resume.id">
                    <v-img pa-2
                      :src="resume.downloadurl"
                      class="grey lighten-2"
                    ></v-img>
                  </v-flex>
              </v-layout>
            </template>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 家庭住址 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>{{ member.address || '暂未填写' }}</v-flex>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 家庭成员 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap v-if="member.familyinfo.length === 0">
              <v-flex xs12>{{ '暂未填写' }}</v-flex>
            </v-layout>
            <template v-if="member.familyinfo.length > 0">
                <v-layout row wrap>
                  <v-flex xs2>姓名</v-flex>
                  <v-flex xs2>称谓</v-flex>
                  <v-flex xs2>电话</v-flex>
                  <v-flex xs6>地址</v-flex>
                </v-layout>
                <v-layout row
                      wrap v-for="family in member.familyinfo" :key="family.id">
                  <v-flex xs2>{{family.name}}</v-flex>
                  <v-flex xs2>{{family.appellation}}</v-flex>
                  <v-flex xs2>{{family.mobile}}</v-flex>
                  <v-flex xs6>{{family.address}}</v-flex>
                </v-layout>
            </template>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 个人征信证明 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap v-if="member.creditlist.length === 0">
              <v-flex xs12>{{ '暂未上传' }}</v-flex>
            </v-layout>
            <template v-if="member.creditlist.length > 0">
                <v-layout row
                      wrap v-for="credit in member.creditlist" :key="credit.id">
                  <v-flex xs12 pa-2>
                    <v-img pa-2
                      :src="credit.downloadurl"
                      class="grey lighten-2"
                    ></v-img>
                  </v-flex>
                </v-layout>
            </template>
          </div>
        </div>
      </div>
      <template slot="btnActions">
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="success"
                 @click.native="acceptMemberInfo"
                 v-if="getApprovalFlag(member.state) && getRoleBtns()"> 审核通过 </v-btn>
          <v-btn flat
                 color="primary"
                 @click.native="rejectMemberInfo"
                 v-if="getApprovalFlag(member.state) && getRoleBtns()"> 审核未通过 </v-btn>
          <v-btn flat
                 @click.native="cancel"> 取消 </v-btn>
        </v-card-actions>
      </template>
    </v-modaldialog>
  </div>
</template>

<script>
import Member from './Member.js'
import { isRoleBtnsVisible } from '@/utils'

export default {
  name: 'v-member-info-view',
  mixins: [Member],
  props: {
    visible: {
      type: Boolean,
      default: false
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
    return {
      memberViewTitle: '',
      memberViewDialog: false
    }
  },
  computed: {},
  mounted () { },
  watch: {
    memberViewDialog: function (v) {
      this.$emit('update:visible', v)
    },
    visible: function (v) {
      v ? this.disposeDialog(this.memberid) : null
      this.memberViewDialog = v
    },
    title: function (v) {
      this.memberViewTitle = v
    }
  },
  methods: {
    save () {
      this.memberViewDialog = false
    },
    cancel () {
      this.memberViewDialog = false
    },
    disposeDialog () {
      // 根据会员ID获取会员详情
      if (!this.memberid) return
      this.getMemberInfoById(this.memberid).then(() => { })
    },
    acceptMemberInfo () {
      this.member.accepted().then(() => {
        this.memberViewDialog = false
      })
    },
    rejectMemberInfo () {
      this.member.rejected().then(() => {
        this.memberViewDialog = false
      })
    },
    getRoleBtns () {
      return isRoleBtnsVisible()
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
  padding: 10px 10px;
}
.infolabel {
  margin-right: 10px;
  /* color: #bbb7b7; */
}
</style>
