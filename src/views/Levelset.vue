<template>
  <v-card class="page-content"
          flat>
    <v-layout row>
      <v-flex xs3
              pa-2
              class="pageLeft">
        <!-- <v-layout row>
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
        </v-layout> -->
        <v-layout row>
          <v-flex xs12
                  text-xs-left>合伙人列表</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12
                  pt-3
                  pl-3
                  pr-3>
            <v-text-field v-model="search"
                          append-icon="search"
                          label="输入用户名"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12
                  class="tablelist"
                  v-if="memberTree && memberTree.children.length > 0">
            <div class="levelcontainer">
              <div class="level rootmember">
                <div class="leveltext">{{memberTree.username}}</div>
                <!-- <div class="leveltext levelsubtext">({{tree.levelname}})</div> -->
              </div>
            </div>
            <div class="levelcontainer"
                 v-for="item in memberTree.children"
                 :key="item.id">
              <div class="navline0"></div>
              <div class="level"
                   :class="{selectedMember: item.id === curmember.id}"
                   @click="showLevel(item)">
                <div class="levelh"></div>
                <div class="leveltext"
                     :class="{membercolor: item.id === curmember.id}">{{item.username}}</div>
                <div class="leveltext levelsubtext">({{item.levelname}})</div>
              </div>
              <div class="levelcontainer"
                   v-for="item in item.children"
                   :key="item.id">
                <div class="navline1"></div>
                <div class="level"
                     :class="{selectedMember: item.id === curmember.id}"
                     @click="showLevel(item)">
                  <div class="levelh"></div>
                  <div class="leveltext"
                       :class="{membercolor: item.id === curmember.id}">{{item.username}}</div>
                  <div class="leveltext levelsubtext">({{item.levelname}})</div>
                </div>
                <div class="levelcontainer"
                     v-for="item in item.children"
                     :key="item.id">
                  <div class="navline1"></div>
                  <div class="level"
                       :class="{selectedMember: item.id === curmember.id}"
                       @click="showLevel(item)">
                    <div class="levelh"></div>
                    <div class="leveltext"
                         :class="{membercolor: item.id === curmember.id}">{{item.username}}</div>
                    <div class="leveltext levelsubtext">({{item.levelname}})</div>
                  </div>
                  <div class="levelcontainer"
                       v-for="item in item.children"
                       :key="item.id">
                    <div class="navline1"></div>
                    <div class="level"
                         :class="{selectedMember: item.id === curmember.id}"
                         @click="showLevel(item)">
                      <div class="levelh"></div>
                      <div class="leveltext"
                           :class="{membercolor: item.id === curmember.id}">{{item.username}}</div>
                      <div class="leveltext levelsubtext">({{item.levelname}})</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <!-- <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs3
                        text-xs-right>个人简历：</v-flex>
                <v-flex xs9
                        text-xs-left>{{curmember.resume || '--'}}</v-flex>
              </v-layout> -->
            </div>
            <div class="standard"
                 :class="{ standardactive: title.id === 'standarone' }"
                 @click="showDetail('standarone')">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs6
                        text-xs-right>自签站点数(个)：</v-flex>
                <v-flex xs6
                        text-xs-left>{{orders}}</v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 :class="{ standardactive: title.id === 'standartwo' }"
                 @click="showDetail('standartwo')">
              <v-layout row
                        pt-1
                        pb-1
                        justify-center>
                <v-flex xs12
                        text-xs-center>团队站点总数(个)：{{ teamorders }}<span style="color:#1976d2 !important;">（下一级站点数(个)：{{ dirOrders }}&nbsp;&nbsp;下二级站点数(个)：{{ indirOrders }}）</span></v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 :class="{ standardactive: title.id === 'standarthree' }"
                 @click="showDetail('standarthree')">
              <v-layout row
                        pt-1
                        pb-1
                        justify-center>
                <v-flex xs12
                        text-xs-center>拓展总人数(人)：{{ expandnumber }}<span style="color:#1976d2 !important;">（业务员10人，级别最高且人数最多）</span></v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 :class="{ standardactive: title.id === 'standarfour' }"
                 @click="showDetail('standarfour')">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs4
                        text-xs-right>培训次数(次)：</v-flex>
                <v-flex xs2
                        text-xs-left>{{trains.length}}</v-flex>
                <v-flex xs4
                        text-xs-right>分享次数(次)：</v-flex>
                <v-flex xs2
                        text-xs-left>{{shares.length}}</v-flex>
              </v-layout>
            </div>
            <div class="standard"
                 :class="{ standardactive: title.id === 'standarfive' }"
                 @click="showDetail('standarfive')">
              <v-layout row
                        pt-1
                        pb-1>
                <v-flex xs4
                        text-xs-right>老客户总数(个)：</v-flex>
                <v-flex xs2
                        text-xs-left>0</v-flex>
                <v-flex xs5
                        text-xs-right>目前老客户流失数(个)：</v-flex>
                <v-flex xs1
                        text-xs-left>0</v-flex>
              </v-layout>
            </div>
            <v-layout row>
              <!-- <v-flex xs8>
                <v-checkbox mt-0
                            pt-0
                            label="是否冲抵客户流失数"></v-checkbox>
              </v-flex> -->
              <v-flex xs12
                      text-xs-center>
                <div style="font-size: 16px; padding-top: 18px;">
                  <span>当前拟定钻级：</span>
                  <span style="color: red;">{{curlevel.name || '--'}}</span>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row
                      mt-2>
              <v-flex xs12
                      text-xs-center>
                <v-btn color="primary"
                       @click="reviewOk">确定</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6
                  ml-2
                  mr-2>
            <div class="pageRight">
              <v-layout row>
                <v-flex xs12>
                  <span>{{title.name}}</span>
                  <span class="labelsubtext"
                        v-if="title.id === 'standarthree'">（注：季度拓展成员标识为红色）</span>
                </v-flex>
              </v-layout>
              <div v-if="title.id === 'standarone'"
                   class="standarcontainer">
                <template v-for="contract in contracts">
                  <div class="standarcontent"
                       :key="contract.id">
                    <v-layout row>
                      <v-flex xs12>
                        <span>合同编号：</span>
                        <span>{{contract.contractno}}</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <span>客户名称：</span>
                        <span>{{contract.contractname}}</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <span>合同金额：</span>
                        <span>{{contract.contractvalue}}&nbsp;&nbsp;元</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <span>起止时间：</span>
                        <span>{{getFormtedTime(contract.contractstart)}}&nbsp;&nbsp;至&nbsp;&nbsp;{{getFormtedTime(contract.contractend)}}</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <span>收款时间：</span>
                        <span>{{getFormtedTime(contract.paymenttime)}}</span>
                      </v-flex>
                    </v-layout>
                  </div>
                </template>
              </div>
              <div v-if="title.id === 'standartwo'"
                   class="standarcontainer">
                <div v-if="levelcontracts.length > 0">
                  <template v-for="contract in levelcontracts">
                    <div class="standarcontent"
                         :key="contract.id">
                      <v-layout row>
                        <v-flex xs12>
                          <span>合同编号：</span>
                          <span>{{contract.contractno}}</span>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <span>客户名称：</span>
                          <span>{{contract.contractname}}</span>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <span>合同金额：</span>
                          <span>{{contract.contractvalue}}&nbsp;&nbsp;元</span>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <span>起止时间：</span>
                          <span>{{getFormtedTime(contract.contractstart)}}&nbsp;&nbsp;至&nbsp;&nbsp;{{getFormtedTime(contract.contractend)}}</span>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <span>收款时间：</span>
                          <span>{{getFormtedTime(contract.paymenttime)}}</span>
                        </v-flex>
                      </v-layout>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div v-if="title.id === 'standarthree'"
                 class="standarcontainer">
              <div v-if="relation && relation.children.length > 0">

                <div class="member">
                  <div class="levelcontainer">
                    <div class="level rootmember">
                      <div class="leveltext">{{relation.username}}</div>
                      <div class="leveltext levelsubtext">({{relation.levelname}})</div>
                    </div>
                  </div>
                  <div class="levelcontainer"
                       v-for="item in relation.children"
                       :key="item.id">
                    <div class="navline0"></div>
                    <div class="level">
                      <div class="levelh"></div>
                      <div class="leveltext"
                           :class="{membercolor: (item.year == curyear && item.q === curquarter)}">{{item.username}}</div>
                      <div class="leveltext levelsubtext">({{item.levelname}})</div>
                    </div>
                    <div class="levelcontainer"
                         v-for="item in item.children"
                         :key="item.id">
                      <div class="navline1"></div>
                      <div class="level">
                        <div class="levelh"></div>
                        <div class="leveltext"
                             :class="{membercolor: (item.year == curyear && item.q === curquarter)}">{{item.username}}</div>
                        <div class="leveltext levelsubtext">({{item.levelname}})</div>
                      </div>
                      <div class="levelcontainer"
                           v-for="item in item.children"
                           :key="item.id">
                        <div class="navline1"></div>
                        <div class="level">
                          <div class="levelh"></div>
                          <div class="leveltext"
                               :class="{membercolor: (item.year == curyear && item.q === curquarter)}">{{item.username}}</div>
                          <div class="leveltext levelsubtext">({{item.levelname}})</div>
                        </div>
                        <div class="levelcontainer"
                             v-for="item in item.children"
                             :key="item.id">
                          <div class="navline1"></div>
                          <div class="level">
                            <div class="levelh"></div>
                            <div class="leveltext"
                                 :class="{membercolor: (item.year == curyear && item.q === curquarter)}">{{item.username}}</div>
                            <div class="leveltext levelsubtext">({{item.levelname}})</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="title.id === 'standarfour'"
                 class="standarcontainer">
              <template v-for="train in trains">
                <div class="standarcontent"
                     :key="train.id + '_train'">
                  <v-layout row>
                    <v-flex xs12>
                      <v-layout row>
                        <template v-for="attachment in train.attachments">
                          <div :key="attachment.id"
                               class="levelimagecontainer">
                            <v-flex xs4>
                              <img class="levelImage"
                                   :src="attachment.downloadurl" />
                            </v-flex>
                          </div>
                        </template>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <span>所在位置：</span>
                      <span>{{train.address}}</span>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <span>培训时间：{{getFormtedTime(train.createtime)}}&nbsp;&nbsp;</span>
                      <span>参与人数：{{train.peoples}}人</span>
                    </v-flex>
                  </v-layout>
                </div>
              </template>
              <template v-for="share in shares">
                <div class="standarcontent"
                     :key="share.id + '_share'">
                  <v-layout row>
                    <v-flex xs12>
                      <v-layout row>
                        <template v-for="attachment in share.attachments">
                          <div :key="attachment.id"
                               class="levelimagecontainer">
                            <v-flex xs4>
                              <img class="levelImage"
                                   :src="attachment.downloadurl" />
                            </v-flex>
                          </div>
                        </template>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <span>所在位置：</span>
                      <span>{{share.address}}</span>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <span>分享时间：{{getFormtedTime(share.createtime)}}&nbsp;&nbsp;</span>
                      <span>参与人数：{{share.peoples}}人</span>
                    </v-flex>
                  </v-layout>
                </div>
              </template>
            </div>
            <div v-if="title.id === 'standarfive'"
                 class="standarcontainer">
            </div>
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
import { parseTime, getIdInvisible, getMobileInvisible, isRoleBtnsVisible, getQuarter, traverseNodes, traverseNoRootNodes } from '@/utils'
import { Promise } from 'q';

export default {
  data () {
    return {
      members: [],
      titles: {
        standarone: {
          id: 'standarone',
          name: '自签站点'
        },
        standartwo: {
          id: 'standartwo',
          name: '团队站点'
        },
        standarthree: {
          id: 'standarthree',
          name: '团队拓展'
        },
        standarfour: {
          id: 'standarfour',
          name: '培训及分享'
        },
        standarfive: {
          id: 'standarfive',
          name: '流失的老客户'
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
      curmember: {},
      contracts: [],
      levelcontracts: [],
      shares: [],
      trains: [],
      teams: [],
      relation: null,
      curyear: null,
      curquarter: null,
      expandnumber: 0,
      information: 0,
      curlevel: {},
      orders: 0,
      teamorders: 0,
      memberTree: null,
      open: [1, 2],
      activeMember: [],
      search: null,
      caseSensitive: false,
      dirOrders: 0,
      indirOrders: 0
    }
  },
  computed: {
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    }
  },
  watch: {},
  methods: {
    getMemberList () {
      // let requestParams = Object.assign({}, {
      //   page: 1,
      //   size: 1000,
      // })
      // if (this.keywords) {
      //   Object.assign(requestParams, { mobile: this.keywords.trim(), name: this.keywords.trim() })
      // }
      // try {
      //   excuteApis(requestParams, global.config.adminApis, 'user', 'list').then(response => {
      //     if (response.status === 200) {
      //       let res = response.data
      //       if (res.errno) {
      //         this.loading = false
      //       } else {
      //         let result = res.data
      //         this.members = result.data
      //         this.curmember = this.members[0]
      //         this.showLevel(this.curmember)
      //         this.loading = false
      //       }
      //     } else {
      //       this.loading = false
      //       window.console.log(response.statusText)
      //     }
      //   })
      // } catch (error) {
      //   window.console.log(error)
      //   this.loading = false
      // }
      try {
        excuteApis({}, global.config.adminApis, 'contract', 'allmember').then(response => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno) {
              this.loading = false
            } else {
              let result = res.data
              let tree = this.reduceMember(result)
              this.memberTree = { id: 0, username: '昆自合伙人', children: [].concat(tree) }
              this.curmember = tree[0]
              this.showLevel(this.curmember)
              this.loading = false
            }
          } else {
            this.loading = false
            window.console.log(response.statusText)
          }
        })
      } catch (error) {

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
      if (!member) return
      this.curmember = member
      this.expandnumber = 0
      // 根据用户id查询合同信息
      let userid = this.curmember.id
      // 合同起止时间
      let quarter = getQuarter(this.curyear, this.curquarter)
      let params = Object.assign({}, { userid: userid, startdate: quarter.startdate, enddate: quarter.enddate })
      let requests = [
        excuteApis(params, global.config.adminApis, 'contract', 'level'),
        excuteApis(params, global.config.adminApis, 'share', 'level'),
        excuteApis(params, global.config.adminApis, 'train', 'level'),
        excuteApis(params, global.config.adminApis, 'contract', 'team'),
        excuteApis(params, global.config.adminApis, 'contract', 'levels')
      ]
      Promise.all(requests).then(res => {
        if (res[0].data && res[0].data.data) {
          this.contracts = res[0].data.data
          let ordersvalue = 0
          this.contracts.map(item => {
            ordersvalue += item.contractvalue
          })
          this.orders = Number(ordersvalue / 30000, 2)
        }
        if (res[1].data && res[1].data.data) {
          this.shares = res[1].data.data
        }
        if (res[2].data && res[2].data.data) {
          this.trains = res[2].data.data
        }
        if (res[3].data && res[3].data.data) {
          this.teams = res[3].data.data
          this.expandnumber = this.getTeamQNumbers(this.teams)
          this.reduceTeam(userid, this.teams)
        }
        if (res[4].data && res[4].data.data) {
          this.levelcontracts = res[4].data.data
          let teamordersvalue = 0
          this.levelcontracts.map(item => {
            teamordersvalue += item.contractvalue
          })
          this.teamorders = Number(teamordersvalue / 30000, 2)
          this.getSubcontracts(this.levelcontracts)
        }
        this.reviewLevel()
      })
    },
    getSubcontracts (levelcontracts) {
      let dirOrderValue = 0
      let indirOrderValue = 0
      this.dirOrders = 0
      this.indirOrders = 0
      let children = this.curmember.children
      if (children.length > 0) {
        // 直接下级签单
        children.map(member => {
          let order = levelcontracts.filter(con => {
            return con.userid === member.id
          })
          order.length > 0 ? dirOrderValue += order[0].contractvalue : null
        })
        this.dirOrders = Number(dirOrderValue / 30000, 2)
        // 间接下级签单
        let subChildren = children.children
        if (subChildren.length > 0) {
          subChildren.map(member => {
            let suborder = levelcontracts.filter(con => {
              return con.userid === member.id
            })
            suborder.length > 0 ? indirOrderValue += suborder[0].contractvalue : null
          })
        }
        this.indirOrders = Number(indirOrderValue / 30000, 2)
      }
    },
    showDetail (title) {
      if (!title) return
      this.title = this.titles[title]
    },
    reduceTeam (userid, teams) {
      // 设置根节点
      let root = teams.filter((item) => {
        return item.id === userid
      })
      let tree = traverseNodes(root, teams)
      this.relation = tree[0]
    },
    getTeamQNumbers (teams) {
      let num = 0
      if (teams && teams.length > 0) {
        let rl = teams[0].refmap.split('.').length
        let ft = teams.filter(item => {
          let il = item.refmap.split('.').length
          return `${item.year}` === `${this.curyear}` && `${item.q}` === `${this.curquarter}` && rl !== il
        })
        num = ft.length
      }
      return num
    },
    reviewLevel () {
      this.information = this.getInformationnum()
      let params = Object.assign({}, {
        information: this.information,
        orders: Math.round(this.orders),
        expands: this.expandnumber,
        teamorders: Math.round(this.teamorders),
        trains: this.trains.length,
        shares: this.shares.length,
        lostorders: 0
      })
      excuteApis(params, global.config.adminApis, 'level', 'levelreview').then(res => {
        if (res.data && res.data.data) {
          let level = res.data.data
          this.curlevel = level
        }
      })
    },
    getInformationnum () {
      let num = 0
      const userinfo = this.curmember
      // 一钻
      if (userinfo.mobile && userinfo.certificate && userinfo.weixin_no) {
        num += 3
      }
      // 二钻
      if (userinfo.resume && userinfo.bankno && userinfo.email) {
        num += 3
      }
      return num
    },
    reduceMember (allmembers) {
      let tree = []
      let reuses = []
      traverseNoRootNodes(allmembers, reuses)
      allmembers.map((item, index) => {
        let us = reuses.filter(rs => {
          return rs.id === item.id
        })
        us.length > 0 ? null : tree.push(item)
      })
      return tree
    },
    reviewOk () {
      // let childrenids = 
      console.log(this.teams)
    }
  },
  created () {
    this.curyear = (new Date()).getFullYear()
    let m = (new Date()).getMonth() / 3
    if (!m) {
      this.curyear -= 1
      this.curquarter = 4
    } else {
      this.curquarter = m
    }
    this.getMemberList()
  },
  components: {}
}
</script>

<style scoped>
.pageLeft {
  border-right: 1px solid #f4f4f4;
}
.pageRight {
  margin-left: 10px;
  margin-right: 10px;
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
.standarcontainer {
  border: 1px solid #f4f4f4;
  margin-top: 10px;
  padding: 10px 10px;
  height: 540px;
  overflow-y: hidden;
  overflow-y: scroll;
}
.standarcontent {
  background-color: rgba(244, 244, 244, 0.5);
  padding: 5px 5px;
  margin-bottom: 5px;
}
.levelimagecontainer {
  padding: 2px 2px;
  margin: 1px 1px;
}
.levelImage {
  width: 80px;
  height: 80px;
}
.levelcontainer {
  position: relative;
  margin-left: 10px;
}
.levelcontainer .navline0 {
  position: absolute;
  height: 100%;
  width: 1px;
  left: 20px;
  top: -10px;
  z-index: 2;
  border-left: 1px dashed #1982c2;
}
.levelcontainer .navline1 {
  position: absolute;
  height: 100%;
  width: 1px;
  top: -15px;
  left: 22px;
  z-index: 2;
  border-left: 1px dashed #1982c2;
}
.levelcontainer .level {
  position: relative;
  display: flex;
  direction: row;
  justify-content: flex-start;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
}
.selectedMember {
  background-color: #f4f4f4;
}
.levelcontainer .level .levelh {
  border-bottom: 1px dashed #1982c2;
  width: 20px;
  height: 1px;
  margin-left: 22px;
  margin-top: 10px;
}
.levelcontainer .level .levelsubtext {
  color: rgba(51, 51, 51, 0.5);
}
.standardactive {
  background-color: rgba(244, 244, 244, 0.5);
}
.membercolor {
  color: red;
}
.labelsubtext {
  color: rgba(51, 51, 51, 0.5);
}
</style>
