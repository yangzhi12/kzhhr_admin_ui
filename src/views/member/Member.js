import { excuteApis } from '@/api'
import { parseTime } from '@/utils'
import { CMember } from '../model/member'
export default {
  data() {
    let member = new CMember()
    return {
      member: member,
      birthday: null
    }
  },
  methods: {
    async getMemberInfoById(memberId) {
      let requestParams = Object.assign({}, { id: memberId })
      try {
        let response = await excuteApis(
          requestParams,
          global.config.adminApis,
          'user',
          'info'
        )
        let res = response.data
        if (res.errno) {
          window.console.log(res.errmsg)
          this.loading = false
        } else {
          // this.member = res.data
          this.assignMember(res.data)
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
    getGenderName(index) {
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
    getLevelName(level) {
      return global.config.level[level]
    },
    getStateName(state) {
      return global.config.state[state]
    },
    getApprovalFlag(state) {
      let flag = state || '00'
      return flag.substr(1, 1) !== '1'
      // return true
    },
    assignMember(resMember) {
      if (resMember) {
        this.member.setId(resMember.hasOwnProperty('id') ? resMember.id : null)
        this.member.setState(
          resMember.hasOwnProperty('state') ? resMember.state : null
        )
        this.member.setLevel(
          resMember.hasOwnProperty('level') ? resMember.level : null
        )
        this.member.setUsername(
          resMember.hasOwnProperty('username') ? resMember.username : null
        )
        this.member.setCertificate(
          resMember.hasOwnProperty('certificate') ? resMember.certificate : null
        )
        this.member.setMobile(
          resMember.hasOwnProperty('mobile') ? resMember.mobile : null
        )
        this.member.setWeixin_no(
          resMember.hasOwnProperty('weixin_no') ? resMember.weixin_no : null
        )
        this.member.setAvatar(
          resMember.hasOwnProperty('avatar') ? resMember.avatar : null
        )
        this.member.setGender(
          resMember.hasOwnProperty('gender') ? resMember.gender : null
        )
        this.member.setBirthday(
          resMember.hasOwnProperty('birthday') ? resMember.birthday : null
        )
        let date = this.member.getBirthday()
        if (date) {
          this.birthday = parseTime(new Date(date), 'yyyy-MM-dd')
        } else {
          this.birthday = null
        }
        this.member.setAddress(
          resMember.hasOwnProperty('address') ? resMember.address : null
        )
        this.member.setRegister_type(
          resMember.hasOwnProperty('register_type')
            ? resMember.register_type
            : null
        )
        this.member.setReferee(
          resMember.hasOwnProperty('referee') ? resMember.referee : null
        )
        this.member.setEmail(
          resMember.hasOwnProperty('email') ? resMember.email : null
        )
        this.member.setBankno(
          resMember.hasOwnProperty('bankno') ? resMember.bankno : null
        )
        this.member.setBankaddress(
          resMember.hasOwnProperty('bankaddress') ? resMember.bankaddress : null
        )
        this.member.setResume(
          resMember.hasOwnProperty('resume') ? resMember.resume : null
        )
        this.member.setFamilyinfo(
          resMember.hasOwnProperty('familyinfo') ? resMember.familyinfo : null
        )
        this.member.setIssaleman(
          resMember.hasOwnProperty('issaleman') ? resMember.issaleman : null
        )
        this.member.setIsmarketman(
          resMember.hasOwnProperty('ismarketman') ? resMember.ismarketman : null
        )
      }
    }
  }
}
