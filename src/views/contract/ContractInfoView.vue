<template>
  <div>
    <v-modaldialog :isShow.sync="contractViewDialog"
                   :title="contractViewTitle"
                   :modalMaxWidth="800"
                   :bodyHeight="650"
                   :showCloseBtn="true">
      <div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 合同信息 </span>
            <!-- <div style="float: right;margin-right: 20px;">
              <span v-if="contract.recommendvalue"
                    style="padding-right: 100px;">建议收费：<span style=" color: red">{{ getMoney(contract.recommendvalue) || '--'}} </span>元</span>
            </div> -->
          </div>
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>
                <v-layout row
                          mb-2>
                  <v-flex xs4>
                    <span class="infolabel">合同编号: </span>
                    <span>{{ contract.contractno || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">签单人: </span>
                    <span>{{ contract.username || '--' }}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="infolabel">合同金额: </span>
                    <span>{{ getMoney(contract.contractvalue) || '--' }} 元（<span style="color:red;">{{getMoney(contract.recommendvalue)}}元/年</span>）</span>
                    <!-- <span style="cursor: pointer; margin-left: 20px; color: green;"
                          @click="getContractFee">核算</span> -->
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
                    <span>{{ contract.industry ? getIndustryName(contract.industry)['industryname'] : '--' }}</span>
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
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel">合同扫描件: </span>
              </v-flex>
              <v-flex xs10></v-flex>
            </v-layout>
            <v-layout row
                      wrap>
              <v-flex xs2></v-flex>
              <template v-for="item in attachments000">
                <v-flex xs2
                        :key="item.id">
                  <img class="imagecontainer"
                       title="点击看大图"
                       :src="item.downloadurl"
                       @click="viewimage(item.downloadurl)" />
                </v-flex>
              </template>
            </v-layout>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel">电气主接线图: </span>
              </v-flex>
              <v-flex xs10></v-flex>
            </v-layout>
            <v-layout row
                      wrap>
              <v-flex xs2></v-flex>
              <template v-for="item in attachments010">
                <v-flex xs2
                        :key="item.id">
                  <img class="imagecontainer"
                       title="点击看大图"
                       :src="item.downloadurl"
                       @click="viewimage(item.downloadurl)" />
                </v-flex>
              </template>
            </v-layout>
          </div>
        </div>
        <div class="baseInfo">
          <div class="baseInfoTitle">
            <span class="titleInner"> 服务方案</span>
          </div>
          <div class="baseInfoContent">
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel">业务类别</span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">服务产品说明</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">服务类别</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">服务勾选</span>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel">基础服务</span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">平台基础服务</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">监测</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">
                  <v-icon v-if="getServiceSelected('0000000')"
                          light
                          color="green"
                          small>check_circle</v-icon>
                  <v-icon v-else
                          light
                          small>remove_circle</v-icon>
                </span>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel"></span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">配电室带电巡检</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">巡检</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">
                  <v-icon v-if="getServiceSelected('1000000')"
                          light
                          color="green"
                          small>check_circle</v-icon>
                  <v-icon v-else
                          light
                          small>remove_circle</v-icon>
                </span>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel"></span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">配电设施设备维保</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">维保</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">
                  <v-icon v-if="getServiceSelected('1000100')"
                          light
                          color="green"
                          small>check_circle</v-icon>
                  <v-icon v-else
                          light
                          small>remove_circle</v-icon>
                </span>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel">定制服务</span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">配电设备预防性试验</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">试验</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">
                  <v-icon v-if="getServiceSelected('1000200')"
                          light
                          color="green"
                          small>check_circle</v-icon>
                  <v-icon v-else
                          light
                          small>remove_circle</v-icon>
                </span>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel"></span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">配电设施设备应急抢修保障</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">抢修</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">
                  <v-icon v-if="getServiceSelected('1000300')"
                          light
                          color="green"
                          small>check_circle</v-icon>
                  <v-icon v-else
                          light
                          small>remove_circle</v-icon>
                </span>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel"></span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">能效管理</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">节能</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">
                  <v-icon v-if="getServiceSelected('1000400')"
                          light
                          color="green"
                          small>check_circle</v-icon>
                  <v-icon v-else
                          light
                          small>remove_circle</v-icon>
                </span>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
              <v-flex xs2>
                <span class="infolabel">托管服务</span>
              </v-flex>
              <v-flex xs6>
                <span class="infolabel">包含平台基础服务、线下维护服务、应急抢修保障</span>
              </v-flex>
              <v-flex xs2>
                <span class="infolabel">托管</span>
              </v-flex>
              <v-flex xs2
                      text-xs-center>
                <span class="infolabel">
                  <v-icon v-if="getServiceSelected('2000000')"
                          light
                          color="green"
                          small>check_circle</v-icon>
                  <v-icon v-else
                          light
                          small>remove_circle</v-icon>
                </span>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </div>
        </div>
      </div>
      <template slot="btnActions">
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="success"
                 @click.native="setCurContractstate(contract.id, '011')"
                 v-if="isStateBtnsVisible(contract.contractstate, '011')"> 评审通过(技术) </v-btn>
          <v-btn flat
                 color="error"
                 @click.native="setCurContractstate(contract.id, '012')"
                 v-if="isStateBtnsVisible(contract.contractstate, '012')"> 评审未通过(技术) </v-btn>
          <v-btn flat
                 color="success"
                 @click.native="setCurContractstate(contract.id, '031')"
                 v-if="isStateBtnsVisible(contract.contractstate, '031')"> 评审通过(合同) </v-btn>
          <v-btn flat
                 color="error"
                 @click.native="setCurContractstate(contract.id, '032')"
                 v-if="isStateBtnsVisible(contract.contractstate, '032')"> 评审未通过(合同) </v-btn>
          <!-- <v-btn flat
                 color="success"
                 @click.native="setCurContractstate(contract.id, '051')"
                 v-if="isStateBtnsVisible(contract.contractstate, '051')"> 评审通过(法务) </v-btn>
          <v-btn flat
                 color="error"
                 @click.native="setCurContractstate(contract.id, '052')"
                 v-if="isStateBtnsVisible(contract.contractstate, '052')"> 评审未通过(法务) </v-btn> -->
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
      this.fee = 0.0
      this.recommendfee = 0.0
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
  height: 45px;
  line-height: 45px;
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
.infoTitle {
  line-height: 20px;
  height: 20px;
}
.infolabel {
  line-height: 30px;
  height: 20px;
}
.imagecontainer {
  height: 100px;
  width: 100px;
}
</style>
