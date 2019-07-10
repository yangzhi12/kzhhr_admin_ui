import { excuteApis } from '@/api'
export function CMember(member) {
  this.id = member && member.hasOwnProperty('id') ? member.id : null
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
  this.username =
    member && member.hasOwnProperty('username') ? member.username : null
  this.certificate =
    member && member.hasOwnProperty('certificate') ? member.certificate : null
  this.weixin_no =
    member && member.hasOwnProperty('weixin_no') ? member.weixin_no : null
  this.address =
    member && member.hasOwnProperty('address') ? member.address : null
  this.register_type =
    member && member.hasOwnProperty('register_type')
      ? member.register_type
      : null
  this.referee =
    member && member.hasOwnProperty('referee') ? member.referee : null
  this.email = member && member.hasOwnProperty('email') ? member.email : null
  this.bankno = member && member.hasOwnProperty('bankno') ? member.bankno : null
  this.bankaddress =
    member && member.hasOwnProperty('bankaddress') ? member.bankaddress : null
  this.issaleman =
    member && member.hasOwnProperty('issaleman') ? member.issaleman : null
  this.ismarketman =
    member && member.hasOwnProperty('ismarketman') ? member.ismarketman : null
  this.resumelist = []
  this.creditlist = []
  this.familyinfo = []  
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

CMember.prototype.getAddress = function() {
  return this.address
}

CMember.prototype.setAddress = function(address) {
  this.address = address
}

CMember.prototype.getRegister_type = function () {
  return this.register_type
}

CMember.prototype.setRegister_type = function (register_type) {
  this.register_type = register_type
}

CMember.prototype.getReferee = function () {
  return this.referee
}

CMember.prototype.setReferee = function (referee) {
  this.referee = referee
}

CMember.prototype.getEmail = function () {
  return this.email
}

CMember.prototype.setEmail = function (email) {
  this.email = email
}

CMember.prototype.getBankno = function () {
  return this.bankno
}

CMember.prototype.setBankno = function (bankno) {
  this.bankno = bankno
}

CMember.prototype.getBankaddress = function () {
  return this.bankaddress
}

CMember.prototype.setBankaddress = function (bankaddress) {
  this.bankaddress = bankaddress
}

CMember.prototype.getResumelist = function () {
  return this.resumelist
}

CMember.prototype.setResumelist = function (resumelist) {
  this.resumelist = resumelist
}

CMember.prototype.getCreditlist = function () {
  return this.creditlist
}

CMember.prototype.setCreditlist = function (creditlist) {
  this.creditlist = creditlist
}

CMember.prototype.getFamilyinfo = function () {
  return this.familyinfo
}

CMember.prototype.setFamilyinfo = function (familyinfo) {
  this.familyinfo = familyinfo
}

CMember.prototype.getIssaleman = function () {
  return this.issaleman
}

CMember.prototype.setIssaleman = function (issaleman) {
  this.issaleman = issaleman
}

CMember.prototype.getIsmarketman = function () {
  return this.ismarketman
}

CMember.prototype.setIsmarketman = function (ismarketman) {
  this.ismarketman = ismarketman
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
    Object.assign(member, { issaleman: this.getIssaleman() })
    Object.assign(member, { ismarketman: this.getIsmarketman() })
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
    Object.assign(member, { issaleman: this.getIssaleman() })
    Object.assign(member, { ismarketman: this.getIsmarketman() })
    return excuteApis(member, global.config.adminApis, 'user', 'save')
  } catch (error) {
    window.console.log(error)
  }
}
