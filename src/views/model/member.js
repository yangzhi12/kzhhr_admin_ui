import { excuteApis } from '@/api'
export function CMember(member) {
  this.id = member && member.hasOwnProperty('id') ? member.id : null
  this.avatar = member && member.hasOwnProperty('avatar') ? member.avatar : null
  this.birthday =
    member && member.hasOwnProperty('birthday') ? member.birthday : null
  this.gender = member && member.hasOwnProperty('gender') ? member.gender : null
  this.last_login_ip =
    member && member.hasOwnProperty('last_login_ip')
      ? member.last_login_ip
      : null
  this.last_login_time =
    member && member.hasOwnProperty('last_login_time')
      ? member.last_login_time
      : null
  this.level = member && member.hasOwnProperty('level') ? member.level : null
  this.mobile = member && member.hasOwnProperty('mobile') ? member.mobile : null
  this.nickname =
    member && member.hasOwnProperty('nickname') ? member.nickname : null
  this.password =
    member && member.hasOwnProperty('password') ? member.password : null
  this.password_salt =
    member && member.hasOwnProperty('password_salt')
      ? member.password_salt
      : null
  this.register_ip =
    member && member.hasOwnProperty('register_ip') ? member.register_ip : null
  this.register_time =
    member && member.hasOwnProperty('register_time')
      ? member.register_time
      : null
  this.state = member && member.hasOwnProperty('state') ? member.state : null
  this.user_level_id =
    member && member.hasOwnProperty('user_level_id')
      ? member.user_level_id
      : null
  this.username =
    member && member.hasOwnProperty('username') ? member.username : null
  this.certificate =
    member && member.hasOwnProperty('certificate') ? member.certificate : null
  this.weixin_no =
    member && member.hasOwnProperty('weixin_no') ? member.weixin_no : null
  this.weixin_openid =
    member && member.hasOwnProperty('weixin_openid')
      ? member.weixin_openid
      : null
  this.address =
    member && member.hasOwnProperty('address') ? member.address : null
}

CMember.prototype.getId = function() {
  return this.id
}

CMember.prototype.setId = function(id) {
  this.id = id
}

CMember.prototype.getAvatar = function() {
  return this.avatar
}

CMember.prototype.setAvatar = function(avatar) {
  this.avatar = avatar
}

CMember.prototype.getBirthday = function() {
  return this.birthday
}

CMember.prototype.setBirthday = function(birthday) {
  this.birthday = birthday
}

CMember.prototype.getGender = function() {
  return this.gender
}

CMember.prototype.setGender = function(gender) {
  this.gender = gender
}

CMember.prototype.getLast_login_ip = function() {
  return this.last_login_ip
}

CMember.prototype.setLast_login_ip = function(last_login_ip) {
  this.last_login_ip = last_login_ip
}

CMember.prototype.getLast_login_time = function() {
  return this.last_login_time
}

CMember.prototype.setLast_login_time = function(last_login_time) {
  this.last_login_time = last_login_time
}

CMember.prototype.getLevel = function() {
  return this.level
}

CMember.prototype.setLevel = function(level) {
  this.level = level
}

CMember.prototype.getMobile = function() {
  return this.mobile
}

CMember.prototype.setMobile = function(mobile) {
  this.mobile = mobile
}

CMember.prototype.getNickname = function() {
  return this.nickname
}

CMember.prototype.setNickname = function(nickname) {
  this.nickname = nickname
}

CMember.prototype.getPassword = function() {
  return this.password
}

CMember.prototype.setPassword = function(password) {
  this.password = password
}

CMember.prototype.getPassword_salt = function() {
  return this.password_salt
}

CMember.prototype.setPassword_salt = function(password_salt) {
  this.password_salt = password_salt
}

CMember.prototype.getRegister_ip = function() {
  return this.register_ip
}

CMember.prototype.setRegister_ip = function(register_ip) {
  this.register_ip = register_ip
}

CMember.prototype.getRegister_time = function() {
  return this.register_time
}

CMember.prototype.setRegister_time = function(register_time) {
  this.register_time = register_time
}

CMember.prototype.getState = function() {
  return this.state
}

CMember.prototype.setState = function(state) {
  this.state = state
}

CMember.prototype.getUser_level_id = function() {
  return this.user_level_id
}

CMember.prototype.setUser_level_id = function(user_level_id) {
  this.user_level_id = user_level_id
}

CMember.prototype.getUsername = function() {
  return this.username
}

CMember.prototype.setUsername = function(username) {
  this.username = username
}

CMember.prototype.getCertificate = function() {
  return this.certificate
}

CMember.prototype.setCertificate = function(certificate) {
  this.certificate = certificate
}

CMember.prototype.getWeixin_no = function() {
  return this.weixin_no
}

CMember.prototype.setWeixin_no = function(weixin_no) {
  this.weixin_no = weixin_no
}

CMember.prototype.getWeixin_openid = function() {
  return this.weixin_openid
}

CMember.prototype.setWeixin_openid = function(weixin_openid) {
  this.weixin_openid = weixin_openid
}

CMember.prototype.getAddress = function() {
  return this.address
}

CMember.prototype.setAddress = function(address) {
  this.address = address
}

//新增
CMember.prototype.add = function() {
  try {
    let member = {}
    // window.console.log(new Date(this.getBirthday()))
    Object.assign(member, { username: this.getUsername() })
    Object.assign(member, { certificate: this.getCertificate() })
    Object.assign(member, { mobile: this.getMobile() })
    Object.assign(member, { gender: this.getGender() })
    // Object.assign(member, { birthday: this.getBirthday() })
    Object.assign(member, { weixin_no: this.getWeixin_no() })
    Object.assign(member, { address: this.getAddress() })
    return excuteApis(member, global.config.adminApis, 'user', 'save')
  } catch (error) {
    window.console.log(error)
  }
}

//编辑
CMember.prototype.edit = function() {
  try {
    let member = {}
    Object.assign(member, { id: this.getId() })
    Object.assign(member, { username: this.getUsername() })
    Object.assign(member, { certificate: this.getCertificate() })
    Object.assign(member, { mobile: this.getMobile() })
    Object.assign(member, { gender: this.getGender() })
    // Object.assign(member, { birthday: this.getBirthday() })
    Object.assign(member, { weixin_no: this.getWeixin_no() })
    Object.assign(member, { address: this.getAddress() })
    return excuteApis(member, global.config.adminApis, 'user', 'save')
  } catch (error) {
    window.console.log(error)
  }
}

//审核通过
CMember.prototype.accepted = function() {
  try {
    let member = {}
    Object.assign(member, { id: this.getId() })
    Object.assign(member, { is_show: 1 })
    Object.assign(member, { state: this.getState().substr(0, 1) + '1' })
    return excuteApis(member, global.config.adminApis, 'user', 'save')
  } catch (error) {
    window.console.log(error)
  }
}

//审核未通过
CMember.prototype.rejected = function() {
  try {
    let member = {}
    Object.assign(member, { id: this.getId() })
    Object.assign(member, { is_show: 1 })
    Object.assign(member, { state: this.getState().substr(0, 1) + '2' })
    return excuteApis(member, global.config.adminApis, 'user', 'save')
  } catch (error) {
    window.console.log(error)
  }
}
