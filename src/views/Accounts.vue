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
                      label="选择年份"
                      v-model="year"></v-select>
          </v-flex>
          <v-flex xs3
                  pt-3>
            <v-select :items="[{id: 1, name: '第一季度'}, {id: 2, name: '第二季度'}, {id: 3, name: '第三季度'}, {id: 4, name: '第四季度'}]"
                      item-text="name"
                      item-value="id"
                      label="选择季度"
                      v-model="quarter"></v-select>
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
                      @keyup.enter="getIncomeList"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
    </v-layout>
    <v-data-table :headers="headers"
                  :items="incomes"
                  :loading="loading"
                  no-data-text="暂无数据"
                  hide-actions
                  class="elevation-0">
      <template v-slot:items="props">
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.username || '--' }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.mobile || '--' }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ getLevelName(props.item.levelno) || '--' }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.orders }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.orderprice }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.prize }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.lastyearvalue }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.lostratio }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.issaleman ? '是' : '否' }}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.ismarketman ? '是' : '否'}}
            </div>
          </template>
        </td>
        <td class="text-xs-center">
          <template>
            <div>
              {{ props.item.incomevalue }}
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
        <v-custompagination :pagination.sync="paginationIncome"></v-custompagination>
      </v-flex>
      <v-flex xs3></v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { excuteApis } from '@/api'
import { parseTime, getCommaMoney } from '@/utils'

export default {
  data () {
    return {
      incomes: [],
      loading: true,
      headers: [
        {
          text: '姓名',
          align: 'center',
          sortable: true,
          value: 'username'
        },
        { text: '联系电话', value: 'mobile', align: 'center', sortable: false },
        { text: '钻级', value: 'levelno', align: 'center', sortable: false },
        { text: '自签站点数(个)', value: 'orders', align: 'center', sortable: false },
        { text: '单价(元)', value: 'orderprice', align: 'center', sortable: false },
        { text: '额外奖励(元)', value: 'prize', align: 'center', sortable: false },
        { text: '上年结转额(元)', value: 'lastyearvalue', align: 'center', sortable: false },
        { text: '老客户流失率', value: 'lostratio', align: 'center', sortable: false },
        { text: '业务员', value: 'issaleman', align: 'center', sortable: false },
        { text: '营销人员', value: 'ismarketman', align: 'center', sortable: false },
        { text: '结算值(元)', value: 'incomevalue', align: 'center', sortable: false }
      ],
      showPagination: true,
      paginationIncome: {
        total: 0,
        page: 1, // page 当前页
        rowsPerPage: 10
      },
      keywords: '',
      quarter: 1,
      year: 2019,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      snackbarContent: ''
    }
  },
  watch: {
    'paginationIncome.rowsPerPage' () {
      this.getIncomeList()
    },
    'paginationIncome.page' () {
      this.getIncomeList()
    },
    'year' () {
      this.getIncomeList()
    },
    'quarter' () {
      this.getIncomeList()
    }
  },
  methods: {
    getIncomeList () {
      let requestParams = Object.assign({}, {
        page: this.paginationIncome.page,
        size: this.paginationIncome.rowsPerPage,
        year: this.year,
        quarter: this.quarter
      })
      if (this.keywords) {
        Object.assign(requestParams, { mobile: this.keywords.trim(), username: this.keywords.trim() })
      }
      try {
        excuteApis(requestParams, global.config.adminApis, 'report', 'list').then(response => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno) {
              window.console.log(res.errmsg)
              this.loading = false
            } else {
              let result = res.data
              this.incomes = result.data
              this.loading = false
              this.paginationIncome.total = result.count
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
    getLevelName (level) {
      return global.config.level[level]
    },
    getMoney (money) {
      return getCommaMoney(money, false)
    }
  },
  created () {
    this.getIncomeList()
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
