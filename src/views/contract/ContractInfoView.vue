<template>
  <div>
    <v-modaldialog :isShow.sync="contractViewDialog"
                   :title="contractViewTitle"
                   :modalMaxWidth="800"
                   :bodyHeight="600"
                   :showCloseBtn="true">
      <div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 合同信息 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>
                <v-layout row
                          mb-2>
                  <v-flex xs4>
                    <span class="infolabel">合同编号: </span>
                    <span>{{ contract.contractno }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">合同金额: </span>
                    <span>{{ contract.contractvalue || '--' }} 元</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">签单人: </span>
                    <span>{{ contract.username || '--' }}</span>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <span class="infolabel">开始日期: </span>
                    <span>{{ getFormtedTime(contract.contractstart) || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">结束时间: </span>
                    <span>{{ getFormtedTime(contract.contractend) || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">合同状态: </span>
                    <span>{{ contract.contractstate ? getApproveFlowName(contract.contractstate)['name'] : '--' }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 客户信息 </span>
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>
                <v-layout row
                          mb-2>
                  <v-flex xs12>
                    <span class="infolabel">客户名称: </span>
                    <span>{{ contract.contractname }}</span>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <span class="infolabel">所属行业: </span>
                    <span>{{ contract.industry ? getIndustryName(contract.industry)['name'] : '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">电压等级: </span>
                    <span>{{ contract.voltage ? getVoltageName(contract.voltage)['name'] : '--' }} kV</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">变压器总容量: </span>
                    <span>{{ contract.transformer || '--' }} kVA</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 服务方案 </span>
          </div>
          <div class="baseInfoContent">
            <!-- <v-layout row
                      wrap>
              <v-flex xs12>
                <v-layout row>
                  <v-flex xs4>
                    <span class="infolabel">所属行业: </span>
                    <span>{{ contract.contractvalue || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">电压等级: </span>
                    <span>{{ contract.contractname || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">变压器总容量: </span>
                    <span>{{ contract.contractvalue || '--' }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout> -->
          </div>
        </div>
      </div>
    </v-modaldialog>
  </div>
</template>

<script>
import Contract from './Contract.js'

export default {
  name: 'v-contract-info-view',
  mixins: [Contract],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    contractid: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      contractViewTitle: '',
      contractViewDialog: false
    }
  },
  computed: {},
  mounted () { },
  watch: {
    contractViewDialog: function (v) {
      this.$emit('update:visible', v)
    },
    visible: function (v) {
      v ? this.disposeDialog(this.contractid) : null
      this.contractViewDialog = v
    },
    title: function (v) {
      this.contractViewTitle = v
    }
  },
  methods: {
    save () {
      this.contractViewDialog = false
    },
    cancel () {
      this.contractViewDialog = false
    },
    disposeDialog () {
      // 根据合同ID获取合同详情
      if (!this.contractid) return
      this.getContractInfoById(this.contractid).then(() => { })
    }
  },
  created () {
    this.contractViewDialog = this.visible
    this.contractViewTitle = this.title
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
