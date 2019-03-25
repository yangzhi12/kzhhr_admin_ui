import axios from 'axios'
import config from './config'

// enable mock
// import mock from './mock'
// if (!config.debug.mock) {
//   mock.restore()
// }

const http = axios.create({
  baseURL: config.api,
  timeout: 3000
})
http.interceptors.request.use(
  function(request) {
    return request
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  function(response) {
    const request = response.config
    if (config.debug.http) {
      window.console.log(
        '>>>',
        request.method.toUpperCase(),
        request.url,
        request.params,
        '\n   ',
        response.status,
        response.data
      )
    }
    return response
  },
  function(error) {
    if (config.debug.http) {
      let { response, config: request } = error
      if (request) {
        window.console.log(
          '>>>',
          request.method.toUpperCase(),
          request.url,
          request.params,
          '\n   ',
          response.status,
          response.data
        )
      }
    }
    // Do something with response error
    return Promise.reject(error)
  }
)
export default http
