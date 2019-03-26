import { excuteApis } from '@/api'
import { parseTime } from '@/utils'
import { CMember } from '../model/member'
export default {
  data() {
    let member = new CMember()
    return {
      member: member,
      birthday: null
      //   avatar: null,
      // birthday: null,
      // gender: null,
      // id: null,
      //   last_login_ip: null,
      //   last_login_time: null,
      //   level: null,
      // mobile: '',
      //   nickname: null,
      //   password: null,
      //   password_salt: null,
      //   register_ip: null,
      //   register_time: null,
      //   state: null,
      //   user_level_id: null,
      // username: null,
      // weixin_no: null,
      //   weixin_openid: null,
      // address: null
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
        if (this.member.getBirthday()) {
          let date = this.member.getBirthday()
          this.birthday = parseTime(new Date(date), 'yyyy-MM-dd')
        } else {
          this.birthday = null
        }
        // window.console.log(this.birthday)
        this.member.setAddress(
          resMember.hasOwnProperty('address') ? resMember.address : null
        )
        // this.member.setLast_login_time(
        //   resMember.hasOwnProperty('last_login_time')
        //     ? resMember.last_login_time
        //     : null
        // )
        // this.member.birthday = resMember.hasOwnProperty('birthday')
        //   ? parseTime(new Date(Number(resMember.birthday)), 'yyyy-MM-dd')
        //   : null
        // this.member.last_login_time = resMember.hasOwnProperty(
        //   'last_login_time'
        // )
        //   ? parseTime(
        //       new Date(Number(resMember.last_login_time)),
        //       'yyyy-MM-dd hh:mm'
        //     )
        //   : null
        // this.member.register_time = resMember.hasOwnProperty('register_time')
        //   ? parseTime(
        //       new Date(Number(resMember.register_time)),
        //       'yyyy-MM-dd hh:mm'
        //     )
        //   : null
        // this.member.avatar = resMember.hasOwnProperty('avatar')
        //   ? resMember.avatar
        //   : null
        // this.member.gender = resMember.hasOwnProperty('gender')
        //   ? resMember.gender
        //   : null
        // this.member.id = resMember.hasOwnProperty('id') ? resMember.id : null
        // this.member.last_login_ip = resMember.hasOwnProperty('last_login_ip')
        //   ? resMember.last_login_ip
        //   : null
        // this.member.level = resMember.hasOwnProperty('level')
        //   ? resMember.level
        //   : null
        // this.member.mobile = resMember.hasOwnProperty('mobile')
        //   ? resMember.mobile
        //   : null
        // this.member.nickname = resMember.hasOwnProperty('nickname')
        //   ? resMember.nickname
        //   : null
        // this.member.password = resMember.hasOwnProperty('password')
        //   ? resMember.password
        //   : null
        // this.member.password_salt = resMember.hasOwnProperty('password_salt')
        //   ? resMember.password_salt
        //   : null
        // this.member.register_ip = resMember.hasOwnProperty('register_ip')
        //   ? resMember.register_ip
        //   : null
        // this.member.state = resMember.hasOwnProperty('state')
        //   ? resMember.state
        //   : null
        // this.member.user_level_id = resMember.hasOwnProperty('user_level_id')
        //   ? resMember.user_level_id
        //   : null
        // this.member.username = resMember.hasOwnProperty('username')
        //   ? resMember.username
        //   : null
        // this.member.weixin_no = resMember.hasOwnProperty('weixin_no')
        //   ? resMember.weixin_no
        //   : null
        // this.member.weixin_openid = resMember.hasOwnProperty('weixin_openid')
        //   ? resMember.weixin_openid
        //   : null
        // this.member.address = resMember.hasOwnProperty('address')
        //   ? resMember.address
        //   : null
      }
    }
  }
}
