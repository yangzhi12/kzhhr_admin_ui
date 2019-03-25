<template>
  <v-card class="page-content mt-2">
    <v-layout row
              pa-2>
      <v-flex sm2
              text-xs-left><span class="memberTitle">合伙人管理</span></v-flex>
      <v-spacer></v-spacer>
      <v-flex sm2
              text-xs-right>
        <v-btn small
               fab
               dark
               color="success"
               title="新增"
               @click="addMember">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-data-table :headers="headers"
                  :items="members"
                  :loading="loading"
                  no-data-text="暂无数据"
                  hide-actions
                  class="elevation-0">
      <template v-slot:items="props">
        <td class="text-xs-center">
          <template>
            <v-avatar size="45px"
                      class="grey lighten-4">
              <img v-if="props.item.avatar"
                   :src="props.item.avatar" />
              <img v-else
                   src="../assets/moren.png" />
            </v-avatar>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.username }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.certificate }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.weixin_no ? props.item.weixin_no : '--' }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ getLevelName(props.item.level) }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ getGenderName(props.item.gender) || '--' }}
            </div>
          </template>
        </td>
        <!-- <td class="text-xs-center">
            <template>
              <div class="text-xs-center">
                {{ props.item.birthday ? getFormtedTime(props.item.birthday) : '-' }}
              </div>
            </template>
          </td> -->
        <td class="text-xs-center">{{ props.item.mobile }}</td>
        <td class="text-xs-center">{{ props.item.address ? props.item.address : '--' }}</td>
        <!-- <td class="text-xs-center">{{ props.item.nickname }}</td> -->
        <td>
          <template>
            <div class="text-xs-center">
              {{ props.item.register_time ? getFormtedTime(props.item.register_time) : '-' }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <div class="text-xs-center">
            {{ props.item.last_login_time ? getFormtedTime(props.item.last_login_time) : '-' }}
          </div>
        </td>
        <!-- <td class="text-xs-center">{{ props.item.last_login_ip }}</td> -->
        <td class="text-xs-center">
          <template>
            <div>
              {{ getStateName(props.item.state) }}
            </div>
          </template>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small
                  class="mr-2"
                  title="查看"
                  @click="showMemberDetail(props.item.id)">
            remove_red_eye
          </v-icon>
          <v-icon small
                  class="mr-2"
                  title="编辑"
                  @click="editCurmember(props.item.id)">
            edit
          </v-icon>
          <v-icon small
                  title="删除"
                  color="error"
                  @click="deleteCurmember(props.item.id)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-member-info-view :visible.sync="memberViewDialog"
                        :title="memberViewDialogTitle"
                        :memberid="curmemberid"></v-member-info-view>
    <v-member-add-or-edit :visible.sync="addOrEditMemberDialog"
                          :title="addOrEditDialogTitle"
                          :memberid="curmemberid"></v-member-add-or-edit>
    <!-- <v-modaldialog :isShow="prompt.dialog"
                   :title="prompt.title">
      <div> {{prompt.body}} </div>
      <template slot="btnActions">
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="primary"
                 @click.native.stop="back"> 取消 </v-btn>
          <v-btn v-if="prompt.ok"
                 color="primary"
                 flat
                 @click.native.stop="Ok"> 确定 </v-btn>
        </v-card-actions>
      </template>
    </v-modaldialog> -->
  </v-card>
</template>

<script>
import { excuteApis } from '@/api'
import { parseTime } from '@/utils'
import VMemberInfoView from './member/MemberInfoView.vue'
import VMemberAddOrEdit from './member/MemberAddOrEdit.vue'

export default {
  data () {
    return {
      members: [],
      pagination: {},
      totalMembers: 0,
      loading: true,
      headers: [
        {
          text: '头像',
          value: 'avatar',
          align: 'center',
          sortable: false
        },
        {
          text: '姓名',
          align: 'center',
          sortable: true,
          value: 'username'
        },
        {
          text: '身份证号',
          align: 'center',
          sortable: true,
          value: 'certificate'
        },
        {
          text: '微信号',
          align: 'center',
          sortable: true,
          value: 'weixin_no'
        },
        {
          text: '级别',
          align: 'center',
          sortable: false,
          value: 'level',
        },
        { text: '性别', value: 'gender', align: 'center', sortable: false },
        // { text: '生日', value: 'birthday', align: 'center', sortable: false },
        { text: '联系电话', value: 'mobile', align: 'center', sortable: false },
        { text: '联系地址', value: 'address', align: 'center', sortable: false },
        // { text: '昵称', value: 'nickname', align: 'center', sortable: false },
        { text: '注册时间', value: 'register_time', align: 'center', sortable: false },
        { text: '最近登录时间', value: 'last_login_time', align: 'center', sortable: false },
        // { text: '最近登录IP', value: 'last_login_ip', align: 'center', sortable: false },
        {
          text: '状态',
          align: 'center',
          sortable: false,
          value: 'state',
        },
        {
          text: '操作',
          align: 'center',
          sortable: false
        }
      ],
      prompt: {
        dialog: false,
        title: '合伙人注册信息',
        ok: true
      },
      memberViewDialog: false,
      memberViewDialogTitle: '合伙人档案详情',
      curmemberid: null,
      curmember: null,
      addOrEditMemberDialog: 'IS_NONE',
      addOrEditDialogTitle: ''
    }
  },
  watch: {
    memberViewDialog: function (v) {
      if (!v) {
        this.getMemberList()
      }
    },
    addOrEditMemberDialog (val) {
      val === 'IS_NONE' ? this.getMemberList() : null
    }
  },
  methods: {
    getMemberList () {
      let requestParams = Object.assign({}, {})
      try {
        excuteApis(requestParams, global.config.adminApis, 'user', 'list').then(response => {
          let res = response.data
          if (res.errno) {
            window.console.log(res.errmsg)
            this.loading = false
          } else {
            let result = res.data
            this.members = result.data
            this.loading = false
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
        case 1:
          res = '男'
          break
        case 2:
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
    showMemberDetail (id) {
      this.curmemberid = id
      this.memberViewDialog = true
    },
    addMember () {
      this.addOrEditDialogTitle = '新建合伙人'
      this.addOrEditMemberDialog = 'IS_ADD'
    }
  },
  created () {
    this.getMemberList()
  },
  components: {
    VMemberInfoView,
    VMemberAddOrEdit
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
.memberTitle {
  height: 52px;
  line-height: 52px;
  padding-left: 15px;
}
</style>
