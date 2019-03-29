import { excuteApis } from '@/api'
export function CAuth(admin) {
  this.id = admin && admin.hasOwnProperty('id') ? admin.id : null
  this.username =
    admin && admin.hasOwnProperty('username') ? admin.username : null
  this.mobile = admin && admin.hasOwnProperty('mobile') ? admin.mobile : null
  this.roleid = admin && admin.hasOwnProperty('roleid') ? admin.roleid : null
  this.roleno = admin && admin.hasOwnProperty('roleno') ? admin.roleno : null
  this.rolename =
    admin && admin.hasOwnProperty('rolename') ? admin.rolename : null
}

CAuth.prototype.getId = function() {
  return this.id
}

CAuth.prototype.setId = function(id) {
  this.id = id
}

CAuth.prototype.getUsername = function() {
  return this.username
}

CAuth.prototype.setUsername = function(username) {
  this.username = username
}

CAuth.prototype.getMobile = function() {
  return this.mobile
}

CAuth.prototype.setMobile = function(mobile) {
  this.mobile = mobile
}

CAuth.prototype.getRoleid = function() {
  return this.roleid
}

CAuth.prototype.setRoleid = function(roleid) {
  this.roleid = roleid
}

CAuth.prototype.getRoleno = function() {
  return this.roleno
}

CAuth.prototype.setRoleno = function(roleno) {
  this.roleno = roleno
}

CAuth.prototype.getRolename = function() {
  return this.rolename
}

CAuth.prototype.setRolename = function(rolename) {
  this.rolename = rolename
}

//新增
CAuth.prototype.add = function() {
  try {
    let auth = {}
    Object.assign(auth, { username: this.getUsername() })
    Object.assign(auth, { mobile: this.getMobile() })
    Object.assign(auth, { roleid: this.getRoleid() })
    return excuteApis(auth, global.config.adminApis, 'auth', 'save')
  } catch (error) {
    window.console.log(error)
  }
}

//编辑
CAuth.prototype.edit = function() {
  try {
    let auth = {}
    Object.assign(auth, { id: this.getId() })
    Object.assign(auth, { username: this.getUsername() })
    Object.assign(auth, { mobile: this.getMobile() })
    Object.assign(auth, { roleid: this.getRoleid() })
    return excuteApis(auth, global.config.adminApis, 'auth', 'save')
  } catch (error) {
    window.console.log(error)
  }
}
