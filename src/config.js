// const baseUrl = 'https://hhr.dianjuhui.com:3393'
const baseUrl = 'http://localhost:8360'
// const baseUrl = ''
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}/admin/api/upload`,
  debug: {
    mock: false, // enable mock
    http: false // http request log
  },
  api: `${baseUrl}`,
  adminApis: {
    baseUrl: '/admin/',
    auth: {
      login: { url: '/login', method: 'post' },
      modifypassword: { url: '/modifypassword', method: 'post' },
      list: { url: '/index', method: 'post' },
      info: { url: '/info', method: 'get' },
      save: { url: '/store', method: 'post' },
      delete: { url: '/destory', method: 'post' },
      resetpassword: { url: '/resetpassword', method: 'post' }
    },
    role: {
      list: { url: '/index', method: 'post' },
      info: { url: '/info', method: 'get' },
      save: { url: '/store', method: 'post' },
      delete: { url: '/destory', method: 'post' }
    },
    user: {
      list: { url: '/index', method: 'post' },
      info: { url: '/info', method: 'get' },
      save: { url: '/store', method: 'post' },
      delete: { url: '/destory', method: 'post' },
      resetpassword: { url: '/resetpassword', method: 'post' }
    },
    contract: {
      list: { url: '/index', method: 'post' }
    }
  },
  level: {
    '00': '业务员',
    '10': '一钻',
    '20': '二钻',
    '30': '三钻',
    '40': '四钻',
    '50': '五钻'
  },
  state: {
    '00': '注册未审核',
    '01': '注册已审核',
    '02': '注册未通过',
    '10': '一钻未审核',
    '11': '一钻已审核',
    '12': '一钻未通过',
    '20': '二钻未审核',
    '21': '二钻已审核',
    '22': '二钻未通过',
    '30': '三钻未审核',
    '31': '三钻已审核',
    '32': '三钻未通过',
    '40': '四钻未审核',
    '41': '四钻已审核',
    '42': '四钻未通过',
    '50': '五钻未审核',
    '51': '五钻已审核',
    '52': '五钻未通过'
  },
  role: {
    ADMIN: '超级管理员',
    TECHNICAL: '技术组',
    CONTRACT: '合同组',
    LAW: '法务组',
    FINANCE: '财务组'
  }
}

global.config = config

export default config
