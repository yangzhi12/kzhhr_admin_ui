<template>
  <v-card class="page-content"
          flat>
    <v-layout row>
      <v-flex xs2
              text-xs-left><span class="authTitle">合同管理</span></v-flex>
      <v-spacer></v-spacer>
      <v-flex sm3
              pt-3
              text-xs-right>
        <v-text-field v-model="keywords"
                      label="输入合同编号或客户名称查找"
                      append-icon="search"
                      @keyup.enter="getContractList"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <!-- <v-flex sm2
              text-xs-right>
        <v-btn small
               fab
               dark
               color="success"
               title="新增"
               @click="addContract">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex> -->
    </v-layout>
    <v-data-table :headers="headers"
                  :items="contracts"
                  :loading="loading"
                  no-data-text="暂无数据"
                  hide-actions
                  class="elevation-0">
      <template v-slot:items="props">
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.contractno || '--' }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.contractname }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">{{ getMoney(props.item.contractvalue) }}</td>
        <td class="text-xs-center">{{ getMoney(props.item.recommendvalue) }}</td>
        <td class="text-xs-center">
          <div class="text-xs-center">
            {{ props.item.contractstart ? getFormtedTime(props.item.contractstart) : '-' }}
          </div>
        </td>
        <td class="text-xs-center">
          <div class="text-xs-center">
            {{ props.item.contractend ? getFormtedTime(props.item.contractend) : '-' }}
          </div>
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
              {{ getApproveFlowName(props.item.contractstate)['name'] || '--' }}
            </div>
          </template>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small
                  class="mr-2"
                  title="查看"
                  @click="showContractDetail(props.item.id)">
            remove_red_eye
          </v-icon>
          <v-icon v-if="isStateBtnsVisible(props.item.contractstate, '051')"
                  small
                  title="数据已接入"
                  color="warning"
                  @click="setCurContractstate(props.item.id, '051')">
            backup
          </v-icon>
          <v-icon v-if="isStateBtnsVisible(props.item.contractstate, '071')"
                  small
                  class="mr-2"
                  title="开票"
                  color="yellow"
                  @click="setCurContractstate(props.item.id, '071')">
            receipt
          </v-icon>
          <v-icon v-if="isStateBtnsVisible(props.item.contractstate, '073')"
                  small
                  title="收款"
                  color="warning"
                  @click="setCurContractstate(props.item.id, '073')">
            attach_money
          </v-icon>
          <v-icon v-if="isStateBtnsVisible(props.item.contractstate, '082')"
                  small
                  title="合同到期"
                  color="error"
                  @click="setCurContractstate(props.item.id, '082')">
            remove_circle
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
        <v-custompagination :pagination.sync="paginationContract"></v-custompagination>
      </v-flex>
      <v-flex xs3></v-flex>
    </v-layout>
    <v-contract-info-view :visible.sync="contractViewDialog"
                          :title="contractViewDialogTitle"
                          :contractid="curcontractid"></v-contract-info-view>
    <!-- <v-auth-add-or-edit :visible.sync="addOrEditContractDialog"
                        :title="addOrEditDialogTitle"
                        :authid="curcontractid"></v-auth-add-or-edit> -->
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
import { parseTime, getApproveFlow, getCommaMoney } from '@/utils'
import VContractInfoView from './contract/ContractInfoView.vue'
// import VAuthAddOrEdit from './auth/AuthAddOrEdit.vue'

export default {
  data () {
    return {
      contracts: [],
      loading: true,
      headers: [
        {
          text: '合同编号',
          align: 'center',
          sortable: true,
          value: 'contractno'
        },
        { text: '客户名称', value: 'contractname', align: 'center', sortable: false },
        { text: '合同金额(元)', value: 'contractvalue', align: 'center', sortable: false },
        { text: '年服务费(元)', value: 'recommendvalue', align: 'center', sortable: false },
        { text: '开始时间', value: 'contractstart', align: 'center', sortable: false },
        { text: '结束时间', value: 'contractend', align: 'center', sortable: false },
        { text: '签单人', value: 'username', align: 'center', sortable: false },
        { text: '合同状态', value: 'contractstate', align: 'center', sortable: false },
        {
          text: '操作',
          align: 'center',
          sortable: false
        }
      ],
      prompt: {
        dialog: false,
        title: '提示信息',
        ok: true
      },
      contractViewDialog: false,
      contractViewDialogTitle: '合同详情',
      curcontractid: null,
      curcontract: null,
      addOrEditContractDialog: 'IS_NONE',
      addOrEditDialogTitle: '',
      showPagination: true,
      paginationContract: {
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
    contractViewDialog: function (v) {
      if (!v) {
        this.getContractList()
      }
    },
    addOrEditContractDialog (val) {
      val === 'IS_NONE' ? this.getContractList() : null
    },
    'paginationContract.rowsPerPage' () {
      this.getContractList()
    },
    'paginationContract.page' () {
      this.getContractList()
    }
  },
  methods: {
    getContractList () {
      let requestParams = Object.assign({}, {
        page: this.paginationContract.page,
        size: this.paginationContract.rowsPerPage,
      })
      if (this.keywords) {
        Object.assign(requestParams, { no: this.keywords.trim(), name: this.keywords.trim() })
      }
      try {
        excuteApis(requestParams, global.config.adminApis, 'contract', 'list').then(response => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno) {
              window.console.log(res.errmsg)
              this.loading = false
            } else {
              let result = res.data
              this.contracts = result.data
              this.loading = false
              this.paginationContract.total = result.count
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
    editCurContract (id) {
      this.curcontractid = id
      this.addOrEditDialogTitle = '编辑合同信息'
      this.addOrEditContractDialog = 'IS_EDIT'
    },
    // 开票
    setCurContractstate (id, state) {
      // 获取当前用户ID
      let userid = this.$store.state['user']['id']
      if (id) {
        let auth = Object.assign({}, { id: id, state: state, userid: userid })
        try {
          excuteApis(auth, global.config.adminApis, 'contract', 'state').then(response => {
            if (response.status === 200) {
              let res = response.data
              if (res.errno) {
                this.snackbarContent = res.errmsg
                this.snackbar = true
              } else {
                this.getContractList()
                this.snackbarContent = '操作成功'
                this.snackbar = true
              }
            }
          })
        } catch (error) {
          window.console.log(error)
        }
      }
    },
    showContractDetail (id) {
      this.curcontractid = id
      this.contractViewDialog = true
    },
    addContract () {
      this.addOrEditDialogTitle = '新建合同'
      this.addOrEditContractDialog = 'IS_ADD'
    },
    getApproveFlowName (flowno) {
      return getApproveFlow(flowno)
    },
    getMoney (money) {
      return getCommaMoney(money, false)
    },
    isStateBtnsVisible (flowno, futureno) {
      if (!flowno) return false
      let role = this.$store.state['user']['roleno']
      let curstate = getApproveFlow(flowno)
      return curstate ? curstate['isbtns'].includes(futureno) && curstate['isprivilege'].includes(role) : false
    }
  },
  created () {
    this.getContractList()
  },
  components: {
    VContractInfoView
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
