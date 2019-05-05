const baseUrl = 'http://127.0.0.1:8360'
// const baseUrl = ''
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}:2392/upload`,
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
      list: { url: '/index', method: 'post' },
      info: { url: '/info', method: 'get' },
      state: { url: '/state', method: 'post' },
      fee: { url: '/fee', method: 'post' },
      level: { url: '/levelcontract', method: 'post' },
      team: { url: '/teamindex', method: 'post' },
      levels: { url: '/levelcontracts', method: 'post' },
      levelreview: { url: '/levelreview', method: 'post' },
      allmember: { url: '/allmember', method: 'post' }
    },
    share: {
      list: { url: '/index', method: 'post' },
      level: { url: '/levelshare', method: 'post' }
    },
    train: {
      list: { url: '/index', method: 'post' },
      level: { url: '/leveltrain', method: 'post' }
    },
    level: {
      levelreview: { url: '/levelreview', method: 'post' }
    },
    report: {
      getsubrecords: { url: '/getsubrecords', method: 'post' },
      curlevel: { url: '/curlevel', method: 'post' },
      store: { url: '/store', method: 'post' },
      list: { url: '/index', method: 'post' }
    },
    dict: {
      index: { url: '/index', method: 'post' }
    },
    notify: {
      add: { url: '/store', method: 'post' },
      list: { url: '/index', method: 'post' },
      delete: { url: '/delete', method: 'post' }
    }
  },
  level: {
    '00': '业务员',
    '11': '一钻A',
    '12': '一钻B',
    '13': '一钻C',
    '14': '一钻D',
    '21': '二钻A',
    '22': '二钻B',
    '23': '二钻C',
    '24': '二钻D',
    '31': '三钻A',
    '32': '三钻B',
    '33': '三钻C',
    '34': '三钻D',
    '41': '四钻A',
    '42': '四钻B',
    '43': '四钻C',
    '44': '四钻D',
    '51': '五钻A',
    '52': '五钻B',
    '53': '五钻C',
    '54': '五钻D',
    '55': '五钻E'
  },
  state: {
    '00': '注册未审核',
    '01': '注册已审核',
    '02': '注册未通过',
    '03': '修改待审核',
    '10': '一钻未审核',
    '11': '一钻已审核',
    '12': '一钻未通过',
    '13': '一钻修改待审核',
    '20': '二钻未审核',
    '21': '二钻已审核',
    '22': '二钻未通过',
    '23': '二钻修改待审核',
    '30': '三钻未审核',
    '31': '三钻已审核',
    '32': '三钻未通过',
    '33': '三钻修改待审核',
    '40': '四钻未审核',
    '41': '四钻已审核',
    '42': '四钻未通过',
    '43': '四钻修改待审核',
    '50': '五钻未审核',
    '51': '五钻已审核',
    '52': '五钻未通过',
    '53': '五钻修改待审核',
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
