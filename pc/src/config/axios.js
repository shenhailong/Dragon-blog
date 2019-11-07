import axios from 'axios'
let cancel = null
let promiseMap = {}
const CancelToken = axios.CancelToken

console.log(process.env)
// const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
// console.log(VUE_APP_BASE_URL)
// const TOKEN_KEY = process.env.TOKEN_KEY
// const APP_ID = process.env.APP_ID
// axios.defaults.baseURL = VUE_APP_BASE_URL
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  function (config) {
    promiseMap[config.url] = cancel
    if (config.method === 'get') {
      if (!config.params) {
        config.params = {}
      }
      config.params._ = new Date().getTime()
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    if (response.data.code === '0') {
      console.log(response.data.message)
    } else if (response.data.code === '403') {
      console.log(response.data.message)
    }
    return response
  },
  function (error) {
    if (axios.isCancel(error)) {} else {
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        console.log('请求超时')
      } else if (error && error.response) {
        let str = '网络不给力哦，请检查网络状态'
        switch (error.response.status) {
          case 404:
            str = '访问地址不存在'
            break
          case 500:
            str = '访问地址出现异常'
            break
          case 502:
          case 504:
            str = '服务器不在服务区'
            break
          default:
            break
        }
        console.log(str)
      } else {
        console.log('出现网络错误,请重试')
      }
    }

    return Promise.reject(error)
  }
)

// 默认导出这个对象
export default {
  get (url, params, type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params,
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      }).then((res) => {
        resolve(res)
      })
    })
  },
  post (url, data, type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      }).then((res) => {
        resolve(res)
      })
    })
  }
}
