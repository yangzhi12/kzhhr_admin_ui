import { excuteApis } from '@/api'
import { parseTime } from '@/utils'
import { CAuth } from '../model/auth'
export default {
  data() {
    let auth = new CAuth()
    return {
      auth: auth,
      roles: []
    }
  },
  methods: {
    async getAuthInfoById(authId) {
      let requestParams = Object.assign({}, { id: authId })
      try {
        let response = await excuteApis(
          requestParams,
          global.config.adminApis,
          'auth',
          'info'
        )
        let res = response.data
        if (res.errno) {
          window.console.log(res.errmsg)
          this.loading = false
        } else {
          // this.member = res.data
          this.assignAuth(res.data)
          this.loading = false
        }
      } catch (error) {
        window.console.log(error)
        this.loading = false
      }
    },
    async getRoleInfo() {
      let requestParams = {}
      try {
        let response = await excuteApis(
          requestParams,
          global.config.adminApis,
          'role',
          'list'
        )
        let res = response.data
        if (res.errno) {
          window.console.log(res.errmsg)
          this.loading = false
        } else {
          let roleList = res.data
          this.roles = roleList.data
          this.loading = false
        }
      } catch (error) {
        window.console.log(error)
        this.loading = false
      }
    },
    getFormtedTime(time) {
      if (!time) {
        return '--'
      }
      return parseTime(new Date(Number(time)), 'yyyy-MM-dd')
    },
    getRoleName(index) {
      let res = null
      switch (index) {
        case 'ADMIN':
          res = '超级管理员'
          break
        case 'TECHNICAL':
          res = '技术组'
          break
        case 'CONTRACT':
          res = '合同组'
          break
        case 'LAW':
          res = '法务组'
          break
        case 'FINANCE':
          res = '财务组'
          break
        default:
      }
      return res
    },
    assignAuth(resAuth) {
      if (resAuth) {
        this.auth.setId(resAuth.hasOwnProperty('id') ? resAuth.id : null)
        this.auth.setUsername(
          resAuth.hasOwnProperty('username') ? resAuth.username : null
        )
        this.auth.setMobile(
          resAuth.hasOwnProperty('mobile') ? resAuth.mobile : null
        )
        this.auth.setRoleid(
          resAuth.hasOwnProperty('roleid') ? resAuth.roleid : null
        )
        this.auth.setRoleno(
          resAuth.hasOwnProperty('roleno') ? resAuth.roleno : null
        )
        this.auth.setRolename(
          resAuth.hasOwnProperty('rolename') ? resAuth.rolename : null
        )
      }
    }
  }
}
