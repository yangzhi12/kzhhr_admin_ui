export function CContract(contract) {
  this.id = contract && contract.hasOwnProperty('id') ? contract.id : null
  this.contractno =
    contract && contract.hasOwnProperty('contractno')
      ? contract.contractno
      : null
  this.contractname =
    contract && contract.hasOwnProperty('contractname')
      ? contract.contractname
      : null
  this.contractvalue =
    contract && contract.hasOwnProperty('contractvalue')
      ? contract.contractvalue
      : null
  this.contractstart =
    contract && contract.hasOwnProperty('contractstart')
      ? contract.contractstart
      : null
  this.contractend =
    contract && contract.hasOwnProperty('contractend')
      ? contract.contractend
      : null
  this.contractstate =
    contract && contract.hasOwnProperty('contractstate')
      ? contract.contractstate
      : null
  this.userid =
    contract && contract.hasOwnProperty('userid') ? contract.userid : null
  this.username =
    contract && contract.hasOwnProperty('username') ? contract.username : null
  this.technicalid =
    contract && contract.hasOwnProperty('technicalid')
      ? contract.technicalid
      : null
  this.technicalname =
    contract && contract.hasOwnProperty('technicalname')
      ? contract.technicalname
      : null
  this.technicalstate =
    contract && contract.hasOwnProperty('technicalstate')
      ? contract.technicalstate
      : null
  this.technicalnote =
    contract && contract.hasOwnProperty('technicalnote')
      ? contract.technicalnote
      : null
  this.projectuserid =
    contract && contract.hasOwnProperty('projectuserid')
      ? contract.projectuserid
      : null
  this.projectusername =
    contract && contract.hasOwnProperty('projectusername')
      ? contract.projectusername
      : null
  this.projectstate =
    contract && contract.hasOwnProperty('projectstate')
      ? contract.projectstate
      : null
  this.projectnote =
    contract && contract.hasOwnProperty('projectnote')
      ? contract.projectnote
      : null
  this.lawuserid =
    contract && contract.hasOwnProperty('lawuserid') ? contract.lawuserid : null
  this.lawusername =
    contract && contract.hasOwnProperty('lawusername')
      ? contract.lawusername
      : null
  this.lawstate =
    contract && contract.hasOwnProperty('lawstate') ? contract.lawstate : null
  this.lawnote =
    contract && contract.hasOwnProperty('lawnote') ? contract.lawnote : null
  this.accessstate =
    contract && contract.hasOwnProperty('accessstate')
      ? contract.accessstate
      : null
  this.accessnote =
    contract && contract.hasOwnProperty('accessnote')
      ? contract.accessnote
      : null
  this.accountstate =
    contract && contract.hasOwnProperty('accountstate')
      ? contract.accountstate
      : null
  this.plan = contract && contract.hasOwnProperty('plan') ? contract.plan : null
  this.voltage =
    contract && contract.hasOwnProperty('voltage') ? contract.voltage : null
  this.transformer =
    contract && contract.hasOwnProperty('transformer')
      ? contract.transformer
      : null
  this.industry =
    contract && contract.hasOwnProperty('industry') ? contract.industry : null
  this.plan = contract && contract.hasOwnProperty('plan') ? contract.plan : null
  this.recommendvalue =
    contract && contract.hasOwnProperty('recommendvalue')
      ? contract.recommendvalue
      : null
  this.attachments =
    contract && contract.hasOwnProperty('attachments')
      ? contract.attachments
      : []
  this.paymenttime =
    contract && contract.hasOwnProperty('paymenttime')
      ? contract.paymenttime
      : null
}

CContract.prototype.getId = function() {
  return this.id
}

CContract.prototype.setId = function(id) {
  this.id = id
}

CContract.prototype.getContractno = function() {
  return this.contractno
}

CContract.prototype.setContractno = function(contractno) {
  this.contractno = contractno
}

CContract.prototype.getContractname = function() {
  return this.contractname
}

CContract.prototype.setContractname = function(contractname) {
  this.contractname = contractname
}

CContract.prototype.getContractvalue = function() {
  return this.contractvalue
}

CContract.prototype.setContractvalue = function(contractvalue) {
  this.contractvalue = contractvalue
}

CContract.prototype.getContractstart = function() {
  return this.contractstart
}

CContract.prototype.setContractstart = function(contractstart) {
  this.contractstart = contractstart
}

CContract.prototype.getContractend = function() {
  return this.contractend
}

CContract.prototype.setContractend = function(contractend) {
  this.contractend = contractend
}

CContract.prototype.getContractstate = function() {
  return this.contractstate
}

CContract.prototype.setContractstate = function(contractstate) {
  this.contractstate = contractstate
}

CContract.prototype.getUserid = function() {
  return this.userid
}

CContract.prototype.setUserid = function(userid) {
  this.userid = userid
}

CContract.prototype.getUsername = function() {
  return this.username
}

CContract.prototype.setUsername = function(username) {
  this.username = username
}

CContract.prototype.getTechnicalid = function() {
  return this.technicalid
}

CContract.prototype.setTechnicalid = function(technicalid) {
  this.technicalid = technicalid
}

CContract.prototype.getTechnicalname = function() {
  return this.technicalname
}

CContract.prototype.setTechnicalname = function(technicalname) {
  this.technicalname = technicalname
}

CContract.prototype.getTechnicalstate = function() {
  return this.technicalstate
}

CContract.prototype.setTechnicalstate = function(technicalstate) {
  this.technicalstate = technicalstate
}

CContract.prototype.getTechnicalnote = function() {
  return this.technicalnote
}

CContract.prototype.setTechnicalnote = function(technicalnote) {
  this.technicalnote = technicalnote
}

CContract.prototype.getProjectuserid = function() {
  return this.projectuserid
}

CContract.prototype.setProjectuserid = function(projectuserid) {
  this.projectuserid = projectuserid
}

CContract.prototype.getProjectusername = function() {
  return this.projectusername
}

CContract.prototype.setProjectusername = function(projectusername) {
  this.projectusername = projectusername
}

CContract.prototype.getProjectstate = function() {
  return this.projectstate
}

CContract.prototype.setProjectstate = function(projectstate) {
  this.projectstate = projectstate
}

CContract.prototype.getProjectnote = function() {
  return this.projectnote
}

CContract.prototype.setProjectnote = function(projectnote) {
  this.projectnote = projectnote
}

CContract.prototype.getLawuserid = function() {
  return this.lawuserid
}

CContract.prototype.setLawuserid = function(lawuserid) {
  this.lawuserid = lawuserid
}

CContract.prototype.getLawusername = function() {
  return this.lawusername
}

CContract.prototype.setLawusername = function(lawusername) {
  this.lawusername = lawusername
}

CContract.prototype.getLawstate = function() {
  return this.lawstate
}

CContract.prototype.setLawstate = function(lawstate) {
  this.lawstate = lawstate
}

CContract.prototype.getLawnote = function() {
  return this.lawnote
}

CContract.prototype.setLawnote = function(lawnote) {
  this.lawnote = lawnote
}

CContract.prototype.getAccessstate = function() {
  return this.accessstate
}

CContract.prototype.setAccessstate = function(accessstate) {
  this.accessstate = accessstate
}

CContract.prototype.getAccountstate = function() {
  return this.accountstate
}

CContract.prototype.setAccountstate = function(accountstate) {
  this.accountstate = accountstate
}

CContract.prototype.getPlan = function() {
  return this.plan
}

CContract.prototype.setPlan = function(plan) {
  this.plan = plan
}

CContract.prototype.getVoltage = function() {
  return this.voltage
}

CContract.prototype.setVoltage = function(voltage) {
  this.voltage = voltage
}

CContract.prototype.getTransformer = function() {
  return this.transformer
}

CContract.prototype.setTransformer = function(transformer) {
  this.transformer = transformer
}

CContract.prototype.getIndustry = function() {
  return this.industry
}

CContract.prototype.setIndustry = function(industry) {
  this.industry = industry
}

CContract.prototype.getPlan = function() {
  return this.plan
}

CContract.prototype.setPlan = function(plan) {
  this.plan = plan
}

CContract.prototype.getRecommendvalue = function() {
  return this.recommendvalue
}

CContract.prototype.setRecommendvalue = function(recommendvalue) {
  this.recommendvalue = recommendvalue
}

CContract.prototype.getAttachments = function() {
  return this.attachments
}

CContract.prototype.setAttachments = function(attachments) {
  this.attachments = attachments
}

CContract.prototype.getPaymenttime = function() {
  return this.paymenttime
}

CContract.prototype.setPaymenttime = function(paymenttime) {
  this.paymenttime = paymenttime
}
