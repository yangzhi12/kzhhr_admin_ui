import { excuteApis } from '@/api'
import { parseTime, getApproveFlow, getIndustry, getVoltage } from '@/utils'
import { CContract } from '../model/contract'
export default {
  data() {
    let contract = new CContract()
    return {
      contract: contract
    }
  },
  methods: {
    async getContractInfoById(contractId) {
      let requestParams = Object.assign({}, { id: contractId })
      try {
        let response = await excuteApis(
          requestParams,
          global.config.adminApis,
          'contract',
          'info'
        )
        let res = response.data
        if (res.errno) {
          this.loading = false
        } else {
          this.assignContract(res.data)
          this.loading = false
        }
      } catch (error) {
        window.console.log(error)
        this.loading = false
      }
    },
    // async saveMemberInfoById(member) {
    //   let requestParams = Object.assign({}, member)
    //   try {
    //     let response = await excuteApis(
    //       requestParams,
    //       global.config.adminApis,
    //       'user',
    //       'save'
    //     )
    //     let res = response.data
    //     if (res.errno) {
    //       window.console.log(res.errmsg)
    //       this.loading = false
    //     } else {
    //       this.member = res.data
    //       this.loading = false
    //     }
    //   } catch (error) {
    //     window.console.log(error)
    //     this.loading = false
    //   }
    // },
    getFormtedTime(time) {
      if (!time) {
        return '--'
      }
      return parseTime(new Date(Number(time)), 'yyyy-MM-dd')
    },
    assignContract(resContract) {
      if (resContract) {
        this.contract.setId(
          resContract.hasOwnProperty('id') ? resContract.id : null
        )
        this.contract.setContractno(
          resContract.hasOwnProperty('contractno')
            ? resContract.contractno
            : null
        )
        this.contract.setContractname(
          resContract.hasOwnProperty('contractname')
            ? resContract.contractname
            : null
        )
        this.contract.setContractvalue(
          resContract.hasOwnProperty('contractvalue')
            ? resContract.contractvalue
            : null
        )
        this.contract.setContractstate(
          resContract.hasOwnProperty('contractstate')
            ? resContract.contractstate
            : null
        )
        this.contract.setUserid(
          resContract.hasOwnProperty('userid') ? resContract.userid : null
        )
        this.contract.setUsername(
          resContract.hasOwnProperty('username') ? resContract.username : null
        )
        this.contract.setContractstart(
          resContract.hasOwnProperty('contractstart')
            ? resContract.contractstart
            : null
        )
        this.contract.setContractend(
          resContract.hasOwnProperty('contractend')
            ? resContract.contractend
            : null
        )
        this.contract.setTechnicalid(
          resContract.hasOwnProperty('technicalid')
            ? resContract.technicalid
            : null
        )
        this.contract.setTechnicalname(
          resContract.hasOwnProperty('technicalname')
            ? resContract.technicalname
            : null
        )
        this.contract.setTechnicalstate(
          resContract.hasOwnProperty('technicalstate')
            ? resContract.technicalstate
            : null
        )
        this.contract.setTechnicalnote(
          resContract.hasOwnProperty('technicalnote')
            ? resContract.technicalnote
            : null
        )
        this.contract.setProjectuserid(
          resContract.hasOwnProperty('projectuserid')
            ? resContract.projectuserid
            : null
        )
        this.contract.setProjectusername(
          resContract.hasOwnProperty('projectusername')
            ? resContract.projectusername
            : null
        )
        this.contract.setProjectstate(
          resContract.hasOwnProperty('projectstate')
            ? resContract.projectstate
            : null
        )
        this.contract.setProjectnote(
          resContract.hasOwnProperty('projectnote')
            ? resContract.projectnote
            : null
        )
        this.contract.setLawuserid(
          resContract.hasOwnProperty('lawuserid') ? resContract.lawuserid : null
        )
        this.contract.setLawusername(
          resContract.hasOwnProperty('lawusername')
            ? resContract.lawusername
            : null
        )
        this.contract.setLawstate(
          resContract.hasOwnProperty('lawstate') ? resContract.lawstate : null
        )
        this.contract.setLawnote(
          resContract.hasOwnProperty('lawnote') ? resContract.lawnote : null
        )
        this.contract.setAccessstate(
          resContract.hasOwnProperty('accessstate')
            ? resContract.accessstate
            : null
        )
        this.contract.setAccountstate(
          resContract.hasOwnProperty('accountstate')
            ? resContract.accountstate
            : null
        )
        this.contract.setPlan(
          resContract.hasOwnProperty('plan') ? resContract.plan : null
        )
        this.contract.setVoltage(
          resContract.hasOwnProperty('voltage') ? resContract.voltage : null
        )
        this.contract.setTransformer(
          resContract.hasOwnProperty('transformer')
            ? resContract.transformer
            : null
        )
        this.contract.setIndustry(
          resContract.hasOwnProperty('industry') ? resContract.industry : null
        )
      }
    },
    getApproveFlowName(flowno) {
      return getApproveFlow(flowno)
    },
    getIndustryName(industryno) {
      return getIndustry(industryno)
    },
    getVoltageName(voltageno) {
      return getVoltage(voltageno)
    }
  }
}
