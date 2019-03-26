import http from '@/http'

const METHOD = { GET: 1, POST: 2, PUT: 3, DELETE: 4 }
export function excuteApis(requestParams, mod, submod, todo) {
  requestParams = requestParams || {}
  const httpEntity = Object.assign(
    {
      url: mod.baseUrl + submod + mod[submod][todo].url,
      method: mod[submod][todo].method,
      headers:
        mod[submod][todo].method === 'get'
          ? {
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-kzhhr-token': global.helper.ls.get('x-kzhhr-token')
            }
          : {
              'Content-Type': 'application/json',
              'x-kzhhr-token': global.helper.ls.get('x-kzhhr-token')
            }
    },
    mod[submod][todo].method === 'get'
      ? { params: appendParams(requestParams, mod[submod][todo].method) }
      : { data: appendParams(requestParams, mod[submod][todo].method) }
  )
  return http(httpEntity)
}

function appendParams(requestParams, method) {
  let mod = method.toUpperCase()
  let user = global.helper.ls.get('user')
  let extrasParams = user ? Object.assign({}, {}) : null
  let keys = Object.keys(requestParams || {})
  let isNoNeed = keys.filter(key => {
    return key.indexOf('isNoNeed') === 0
  })
  let params = new URLSearchParams()
  let curGetParams = extrasParams
    ? Object.assign(isNoNeed.length > 0 ? {} : extrasParams, requestParams)
    : requestParams
  let pp = deleteKeyOfObject(curGetParams, 'isNoNeed')
  switch (METHOD[mod]) {
    case 1:
      for (let p in pp) {
        params.append(p, pp[p])
      }
      break
    case 2:
      params = extrasParams
        ? Object.assign(isNoNeed.length > 0 ? {} : extrasParams, requestParams)
        : requestParams
      params = deleteKeyOfObject(params, 'isNoNeed')
      break
    case 3:
      break
    case 4:
      break
    default:
      params = requestParams
      params = deleteKeyOfObject(params, 'isNoNeed')
  }
  return params
}

function deleteKeyOfObject(object, key) {
  delete object[key]
  return object
}
