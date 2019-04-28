<template>
  <v-card class="page-content"
          flat>
    <v-layout row>
      <v-flex xs2
              text-xs-left><span class="authTitle">收益报表</span></v-flex>
      <v-flex xs7>
        <v-layout row>
          <v-flex xs3
                  pt-3
                  mr-4>
            <v-select :items="[2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]"
                      label="选择年份"></v-select>
          </v-flex>
          <v-flex xs3
                  pt-3>
            <v-select :items="[{id: 1, name: '第一季度'}, {id: 2, name: '第二季度'}, {id: 3, name: '第三季度'}, {id: 4, name: '第四季度'}]"
                      item-text="name"
                      item-value="id"
                      label="选择季度"></v-select>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs3
              pt-3
              text-xs-right>
        <v-text-field v-model="keywords"
                      label="输入姓名或手机号查找"
                      append-icon="search"
                      @keyup.enter="getContractList"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
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
  </v-card>
</template>

<script>
import { excuteApis } from '@/api'
import { parseTime, getApproveFlow, getCommaMoney } from '@/utils'

export default {
  data () {
    return {
      contracts: [],
      loading: true,
      headers: [
        {
          text: '姓名',
          align: 'center',
          sortable: true,
          value: 'contractno'
        },
        { text: '联系电话', value: 'contractname', align: 'center', sortable: false },
        { text: '业务员', value: 'paymenttime', align: 'center', sortable: false },
        { text: '营销人员', value: 'paymenttime', align: 'center', sortable: false },
        { text: '钻级', value: 'contractvalue', align: 'center', sortable: false },
        { text: '自签站点数(个)', value: 'recommendvalue', align: 'center', sortable: false },
        { text: '单价(元)', value: 'contractstart', align: 'center', sortable: false },
        { text: '额外奖励(元)', value: 'contractstate', align: 'center', sortable: false },
        { text: '上年结转额(元)', value: 'paymenttime', align: 'center', sortable: false },
        { text: '老客户流失率', value: 'paymenttime', align: 'center', sortable: false },
        { text: '实际结算值(元)', value: 'paymenttime', align: 'center', sortable: false },
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
    getApproveFlowName (flowno) {
      return getApproveFlow(flowno)
    },
    getMoney (money) {
      return getCommaMoney(money, false)
    }
  },
  created () {
    this.getContractList()
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
