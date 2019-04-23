<template>
  <v-card class="page-content"
          flat>
    <v-layout row>
      <v-flex xs3
              pa-2
              class="pageLeft">
        <v-layout row>
          <v-flex xs12
                  text-xs-left>合伙人列表</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12
                  pt-3
                  pl-3
                  pr-3>
            <v-text-field v-model="keywords"
                          append-icon="search"
                          label="输入用户名或手机号查找"
                          @keyup.enter="getMemberList"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12
                  class="tablelist">
            <v-data-table :headers="headers"
                          :items="members"
                          :loading="loading"
                          no-data-text="暂无数据"
                          hide-actions
                          class="elevation-0">
              <template v-slot:items="props">
                <tr style="cursor: pointer"
                    @click="showLevel(props.item)">
                  <td class="text-xs-center">
                    <template>
                      <span>
                        <v-icon v-if="curmember.id === props.item.id"
                                color="primary"
                                small
                                dark>check_circle</v-icon>
                      </span>
                      <span>
                        {{ props.item.username }}
                      </span>
                    </template>
                  </td>
                  <td class="text-xs-center">{{ getMobile(props.item.mobile) }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs9
              pa-2>
        <v-layout row
                  justify-center>
          <v-flex xs6>
            <v-layout row>
              <v-flex xs12
                      text-xs-left>评级评定</v-flex>
            </v-layout>
            <div class="standard">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs3
                        text-xs-right>姓名：</v-flex>
                <v-flex xs3
                        text-xs-left>{{curmember.username || '--'}}</v-flex>
                <v-flex xs3
                        text-xs-right>手机号：</v-flex>
                <v-flex xs3
                        text-xs-left>{{curmember.mobile || '--'}}</v-flex>
              </v-layout>
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs3
                        text-xs-right>身份证号：</v-flex>
                <v-flex xs3
                        text-xs-left>{{curmember.certificate || '--'}}</v-flex>
                <v-flex xs3
                        text-xs-right>微信号：</v-flex>
                <v-flex xs3
                        text-xs-left>{{curmember.weixin_no || '--'}}</v-flex>
              </v-layout>
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs3
                        text-xs-right>邮箱：</v-flex>
                <v-flex xs3
                        text-xs-left>{{curmember.email || '--'}}</v-flex>
                <v-flex xs3
                        text-xs-right>银行卡号：</v-flex>
                <v-flex xs3
                        text-xs-left>{{ curmember.bankno || '--' }}</v-flex>
              </v-layout>
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs3
                        text-xs-right>开户行地址：</v-flex>
                <v-flex xs9
                        text-xs-left>{{curmember.bankaddress || '--'}}</v-flex>
              </v-layout>
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs3
                        text-xs-right>个人简历：</v-flex>
                <v-flex xs9
                        text-xs-left>{{curmember.resume || '--'}}</v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 @click="showDetail('standarone')">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs6
                        text-xs-right>自签站点数（个）：</v-flex>
                <v-flex xs6
                        text-xs-left>0</v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 @click="showDetail('standartwo')">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs4
                        text-xs-right>拓展数（个）：</v-flex>
                <v-flex xs2
                        text-xs-left>0</v-flex>
                <v-flex xs4
                        text-xs-right>团队站点数（个）：</v-flex>
                <v-flex xs2
                        text-xs-left>0</v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 @click="showDetail('standarthree')">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs4
                        text-xs-right>培训次数（次）：</v-flex>
                <v-flex xs2
                        text-xs-left>0</v-flex>
                <v-flex xs4
                        text-xs-right>分享次数（次）：</v-flex>
                <v-flex xs2
                        text-xs-left>0</v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 @click="showDetail('standarfour')">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs4
                        text-xs-right>老客户总数（个）：</v-flex>
                <v-flex xs2
                        text-xs-left>120</v-flex>
                <v-flex xs5
                        text-xs-right>目前老客户流失数（个）：</v-flex>
                <v-flex xs1
                        text-xs-left>10</v-flex>
              </v-layout>
            </div>
            <v-layout row>
              <v-flex xs8>
                <v-checkbox mt-0
                            pt-0
                            label="是否冲抵老客户流失数"></v-checkbox>
              </v-flex>
              <v-flex xs4
                      text-xs-left>
                <div style="font-size: 16px; padding-top: 18px;">
                  <span>当前拟定钻级：</span>
                  <span style="color: red;">一钻A</span>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12
                      text-xs-center>
                <v-btn color="primary">确定</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>{{title.name}}
            <div v-if="title.id === 'standarone'">
              <!-- <template v-for="contract in contracts"> -->
              <v-layout row
                        :key="contract">
                <v-flex xs6>合同编号：</v-flex>
                <v-flex xs6></v-flex>
              </v-layout>
              <v-layout row
                        :key="contract">
                <v-flex xs6>客户名称：</v-flex>
                <v-flex xs6></v-flex>
              </v-layout>
              <v-layout row
                        :key="contract">
                <v-flex xs6>合同金额：</v-flex>
                <v-flex xs6></v-flex>
              </v-layout>
              <v-layout row
                        :key="contract">
                <v-flex xs6>起止时间：</v-flex>
                <v-flex xs6></v-flex>
              </v-layout>
              <!-- </template> -->
            </div>
          </v-flex>
        </v-layout>
        <!-- <v-layout row>
          <v-flex xs12>表格</v-flex>
        </v-layout> -->
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { excuteApis } from '@/api'
import { parseTime, getIdInvisible, getMobileInvisible, isRoleBtnsVisible, getQuarter } from '@/utils'
import { Promise } from 'q';

export default {
  data () {
    return {
      members: [],
      titles: {
        standarone: {
          id: 'standarone',
          name: '自签站点数'
        },
        standartwo: {
          id: 'standartwo',
          name: '拓展数及团队站点数'
        },
        standarthree: {
          id: 'standarthree',
          name: '培训及分享次数'
        },
        standarfour: {
          id: 'standarfour',
          name: '老客户流失数'
        }
      },
      title: '',
      pagination: {},
      totalMembers: 0,
      loading: true,
      headers: [
        { text: '姓名', align: 'center', sortable: false, value: 'username' },
        { text: '联系电话', value: 'mobile', align: 'center', sortable: false }
      ],
      prompt: {
        dialog: false,
        title: '合伙人注册信息',
        ok: true
      },
      keywords: '',
      curmember: 0
    }
  },
  watch: {},
  methods: {
    getMemberList () {
      let requestParams = Object.assign({}, {
        page: 1,
        size: 1000,
      })
      if (this.keywords) {
        Object.assign(requestParams, { mobile: this.keywords.trim(), name: this.keywords.trim() })
      }
      try {
        excuteApis(requestParams, global.config.adminApis, 'user', 'list').then(response => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno) {
              window.console.log(res.errmsg)
              this.loading = false
            } else {
              let result = res.data
              this.members = result.data
              this.curmember = this.members[0]
              this.loading = false
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
      return parseTime(time, 'yyyy-MM-dd')
    },
    getGenderName (index) {
      let res = null
      switch (index) {
        case 'MALE':
          res = '男'
          break
        case 'FEMALE':
          res = '女'
          break
        default:
      }
      return res
    },
    getLevelName (level) {
      return global.config.level[level]
    },
    getStateName (state) {
      return global.config.state[state]
    },
    editCurmember (id) {
      this.curmemberid = id
      this.addOrEditDialogTitle = '编辑合伙人'
      this.addOrEditMemberDialog = 'IS_EDIT'
    },
    deleteCurmember (id) {
      if (id) {
        let member = Object.assign({}, { id: id })
        try {
          excuteApis(member, global.config.adminApis, 'user', 'delete').then(response => {
            if (response.status === 200) {
              let res = response.data
              if (res.errno) {
                window.console.log(res.errmsg)
              } else {
                this.getMemberList()
              }
            }
          })
        } catch (error) {
          window.console.log(error)
        }
      }
    },
    resetPasswordCurmember (id) {
      if (id) {
        let member = Object.assign({}, { id: id })
        try {
          excuteApis(member, global.config.adminApis, 'user', 'resetpassword').then(response => {
            if (response.status === 200) {
              let res = response.data
              if (res.errno) {
                window.console.log(res.errmsg)
              }
            }
          })
        } catch (error) {
          window.console.log(error)
        }
      }
    },
    showMemberDetail (id) {
      this.curmemberid = id
      this.memberViewDialog = true
    },
    addMember () {
      this.addOrEditDialogTitle = '新建合伙人'
      this.addOrEditMemberDialog = 'IS_ADD'
    },
    getID (certificate) {
      return getIdInvisible(certificate)
    },
    getMobile (mobile) {
      return getMobileInvisible(mobile)
    },
    getRoleBtns () {
      return isRoleBtnsVisible()
    },
    showLevel (member) {
      this.curmember = member
    },
    showDetail (title) {
      if (!title) return
      this.title = this.titles[title]
      // 根据用户id查询合同信息
      let userid = this.curmember.id
      // 合同起止时间
      let quarter = getQuarter(2019, 2)
      let params = Object.assign({}, { userid: userid, startdate: quarter.startdate, enddate: quarter.enddate })
      let requests = [
        excuteApis(params, global.config.adminApis, 'contract', 'level')
      ]
      Promise.all(requests).then(res => {

      })
    }
  },
  created () {
    this.getMemberList()
  },
  components: {}
}
</script>

<style scoped>
.pageLeft {
  border-right: 1px solid #f4f4f4;
}
.tablelist {
  height: 480px;
  overflow-y: hidden;
  overflow-y: scroll;
}
.standard {
  border: 1px solid #f4f4f4;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
}
</style>
