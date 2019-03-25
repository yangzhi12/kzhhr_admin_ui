/**
*
判断一个对象是否为数组,缺省
*
@param {Object} Object 检测对象
*
@return {Boolean} Boolean[true 是 false 否]
*/
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
  // return obj.__proto__ === Array.prototype
}

/**
 *
 * 判断对象中是否含有某个属性
 * @param {Object, String} Object 检测对象, String 对象属性
 *
 * @return {Boolean} Boolean[true 是 false 否]
 */
function hasKey(obj, key) {
  if (typeof obj === 'object') {
    return obj.hasOwnProperty(key)
  } else {
    return false
  }
}

/**
 * 清空对象属性值
 * @param {Object} obj 待清空对象
 *
 * @return {Object} obj 已清空的对象
 * */
function initObj(obj) {
  if (Object.keys(obj).length > 0) {
    for (let key in obj) {
      obj[key] = null
    }
    return obj
  } else {
    return obj
  }
}

/**
 * 根据所有温度值计算各段控制点、起始点，返回完整svg三次贝塞尔曲线路径
 * @param  {Array} coordinate  所有要绘制曲线的温度坐标数据
 * @param  {Number} x1         控制点1横轴方向相对于末尾点的偏移
 * @param  {Number} x2         控制点2横轴方向相对于末尾点的偏移
 * @return {String}            完整的曲线路径
 */
function getSVGPathByCoordinate(coordinate, x1 = 21.5, x2 = 41.5) {
  let str = ''
  for (let i = 0; i < coordinate.length - 1; i++) {
    let arr = coordinate.slice(i, i + 2)
    str += `C${arr[1].x - x2},${arr[0].y} ${arr[1].x - x1},${arr[1].y} ${
      arr[1].x
    },${arr[1].y} `
  }
  return `M${coordinate[0].x},${coordinate[0].y} ${str}`
}

/**
 * 经纬度转换为平面坐标
 * @param {Double} latitude 纬度坐标
 * @param {Double} lontitude 经度坐标
 * @return {Object} {x, y} x,y坐标值
 */

// function millierConvertion (lat, lng) {
//   let L = 6381372 * Math.PI * 2
//   let W = L
//   let H = L / 2
//   let mill = 2.3
//   let x = lng * Math.PI / 180
//   let y = lat * Math.PI / 180
//   y = 1.25 * Math.log(Math.tan(0.25 * Math.PI + 0.4 * y))
//   x = (W / 2) + (W / (2 * Math.PI)) * x
//   y = (H / 2) - (H / (2 * mill)) * y
//   return Object.assign({}, {x, y})
// }
/**
 * 经纬度转换为svg路径
 * @param {Array} latlngs 经纬度坐标
 * @return {String} 坐标路径
 */
function latLngToCoordi(latlngs, size) {
  let base = size || 180
  try {
    if (isArray(latlngs) && latlngs.length > 1) {
      let pairLatlng = latlngs.map(item => [item.longitude, 90 - item.latitude])
      let maxLng = Math.max.apply(
        this,
        pairLatlng.map(item => {
          return item[0]
        })
      )
      let minLng = Math.min.apply(this, pairLatlng.map(item => item[0]))
      let maxLat = Math.max.apply(this, pairLatlng.map(item => item[1]))
      let minLat = Math.min.apply(this, pairLatlng.map(item => item[1]))
      let lngScale = base / (maxLng - minLng)
      let latScale = base / (maxLat - minLat)
      let scale = Math.min(lngScale, latScale)
      // 计算y轴平移距离
      let my = (base - (maxLat - minLat) * scale) / 2
      let pathArr = pairLatlng.map(item => [
        (item[0] - minLng) * scale,
        (item[1] - minLat) * scale + my
      ]) // 等比例缩放
      // 根据容器当前位置缩放
      return 'M' + pathArr.map(p => p.join(' ')).join(' L') + ' Z'
    } else {
      throw new Error('该坐标点集不满足绘图条件')
    }
  } catch (err) {
    window.console.log('' + err)
  }
}

/**
 * 判断对象是否含有某个属性，并返回其属性值，属性值为空时返回缺省值
 * @param {Object} obj                    待检测对象
 * @param {String} key                    对象属性
 * @param {String[Number]} defauletValue  属性缺省值
 * @return {String[Number]}               属性返回值
 * */
function getObjValue(obj, key, defalutValue) {
  let result = null
  try {
    result = obj[key] ? obj[key] : defalutValue
  } catch (err) {
    result = defalutValue
  }
  return result
}

/**
 * 身份证号码效验
 * @param {String} pid 身份证号
 * @return {Boolean} true 效验通过 false 效验不通过
 */
function validPersonID(pid) {
  let flag = false
  var pid0 = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var pid1 = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  if (pid.length === 18) {
    // 如果出生日期非法则直接返回
    let datestr = pid
      .substr(6, 4)
      .concat('-', pid.substr(10, 2), '-', pid.substr(12, 2))
    if (isNaN(Date.parse(datestr))) return flag
    let pids = pid.split('')
    let reg = /^\d+$/
    let pd = 0
    // 第一、二步
    for (let i = 0; i < 17; i++) {
      if (reg.test(pids[i])) {
        flag = true
        pd += pids[i] * pid0[i]
      } else {
        flag = false
        break
      }
    }
    if (flag) {
      // 第三步
      let r = pd % 11
      // 第四步
      if (pids[17] + '' === pid1[r] + '') {
        flag = true
      } else {
        flag = false
      }
    }
  }
  return flag
}

/**
 * 验证手机号
 * @param {String} linkphone 联系电话
 * @return {Boolean} true 校验通过 false 校验不通过
 */
function validLinkPhone(linkphone) {
  if (linkphone) {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(linkphone)
  }
  return true
}

/**
 * 格式化日期
 * @author liangf
 * @param {Date} time 需格式化的时间
 * @param {String|null} fmt 格式，如'yyyy-MM-dd' 、'yyyy-MM-dd hh:mm:ss'等
 */
function parseTime(time, fmt) {
  try {
    let date
    if (arguments.length === 0) {
      date = new Date()
    }
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'a+': date.getDay(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S+': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (let p in o) {
      if (new RegExp('(' + p + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[p]
            : ('00' + o[p]).substr(('' + o[p]).length)
        )
      }
    }
    return fmt
  } catch (err) {
    window.console.log('日期非法,格式化失败!' + err)
    return '--'
  }
}

function diffTime(beginDateTime, endDateTime) {
  try {
    let res = ''
    beginDateTime = parseTime(beginDateTime, 'yyyy-MM-dd')
    endDateTime = parseTime(endDateTime, 'yyyy-MM-dd')
    let dy =
      parseInt(endDateTime.substr(1, 4)) - parseInt(beginDateTime.substr(1, 4))
    let dM =
      parseInt(endDateTime.substr(6, 2)) - parseInt(beginDateTime.substr(6, 2))
    let dd =
      parseInt(endDateTime.substr(8, 2)) - parseInt(beginDateTime.substr(8, 2))
    res += dy ? dy + '年' : ''
    res += dM ? dM + '月' : ''
    res += dd ? dd + '天' : '0天'
    return res
  } catch (err) {
    window.console.log('求日期相差失败!' + err)
    return '--'
  }
}

function getChinesesDay(date) {
  let res = ''
  if (date && date instanceof Date) {
    let today = new Date()
    let diff = Math.floor((today - date) / 1000 / 3600 / 24)
    let d = date.getDay()
    if (diff >= 0 && diff < 2) {
      diff === 0 ? (res = '今天') : diff === 1 ? (res = '昨天') : ''
    } else {
      switch (d) {
        case 1:
          res = '周一'
          break
        case 2:
          res = '周二'
          break
        case 3:
          res = '周三'
          break
        case 4:
          res = '周四'
          break
        case 5:
          res = '周五'
          break
        case 6:
          res = '周六'
          break
        default:
          res = '周日'
      }
    }
  }
  return res
}

function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 获取各级行政区代码
function getCode(code, level) {
  let preCode = ''
  switch (level) {
    case 2: // 省
      preCode = code.substr(0, 2)
      break
    case 3: // 市
      preCode = code.substr(0, 4)
      break
    case 4: // 县
      preCode = code.substr(0, 6)
      break
    case 5: // 镇
      preCode = code.substr(0, 9)
      break
    case 6: // 村
      preCode = code.substr(0, 12)
      break
  }
  return preCode
}

// 行政区划代码补零
function formatCode(code, level) {
  let resCode = getCode(code, level)
  let subStr = ''
  while (subStr.length < 12 - resCode.length) {
    subStr += '0'
  }
  resCode = resCode + subStr
  return resCode
}

// 求地块中心坐标
function fixed(n) {
  return +n.toFixed(7)
}

function centerOf(polygon) {
  let maxLng = Math.max.apply(null, polygon.map(p => p.lng))
  let minLng = Math.min.apply(null, polygon.map(p => p.lng))

  let maxLat = Math.max.apply(null, polygon.map(p => p.lat))
  let minLat = Math.min.apply(null, polygon.map(p => p.lat))

  return {
    lng: fixed(minLng + (maxLng - minLng) / 2),
    lat: fixed(minLat + (maxLat - minLat) / 2)
  }
}

function deAreasCode(areacode) {
  if (
    !areacode ||
    areacode === '000000000000000000000000' ||
    areacode.length !== 24
  )
    return {}
  let curcode = areacode
  let provincecode =
    curcode.substr(0, 2) !== '00'
      ? Object.assign(
          {},
          {
            provincecode:
              curcode.substr(0, 2) +
              '0000000000' +
              curcode.substr(0, 2) +
              '0000000000'
          }
        )
      : {}
  let citycode =
    curcode.substr(2, 2) !== '00'
      ? Object.assign(
          {},
          {
            citycode:
              curcode.substr(0, 4) +
              '00000000' +
              curcode.substr(0, 4) +
              '00000000'
          }
        )
      : {}
  let countycode =
    curcode.substr(4, 2) !== '00'
      ? Object.assign(
          {},
          {
            countycode:
              curcode.substr(0, 6) + '000000' + curcode.substr(0, 6) + '000000'
          }
        )
      : {}
  let towncode =
    curcode.substr(6, 3) !== '000'
      ? Object.assign(
          {},
          {
            towncode:
              curcode.substr(0, 9) + '000' + curcode.substr(0, 9) + '000'
          }
        )
      : {}
  let villagecode =
    curcode.substr(9, 3) !== '000'
      ? Object.assign({}, { villagecode: curcode })
      : {}
  let code = {
    provincecode: null,
    citycode: null,
    countycode: null,
    towncode: null,
    villagecode: null
  }
  provincecode ? Object.assign(code, provincecode) : code
  citycode ? Object.assign(code, citycode) : code
  countycode ? Object.assign(code, countycode) : code
  towncode ? Object.assign(code, towncode) : code
  villagecode ? Object.assign(code, villagecode) : code
  return code
}

function enAreasCode(
  provincecode,
  citycode,
  countycode,
  towncode,
  villagecode
) {
  let addresscode = {}
  provincecode ? Object.assign(addresscode, { provincecode }) : null
  citycode ? Object.assign(addresscode, { citycode }) : null
  countycode ? Object.assign(addresscode, { countycode }) : null
  towncode ? Object.assign(addresscode, { towncode }) : null
  villagecode ? Object.assign(addresscode, { villagecode }) : null
  return villagecode || towncode || countycode || citycode || provincecode
}

function addDate(date, days) {
  if (days === undefined || days === '') {
    days = 1
  }
  let d = new Date(date)
  d.setDate(date.getDate() + days)
  let month = d.getMonth() + 1
  let day = d.getDate()
  let mm = '' + month + ''
  let dd = '' + day + ''
  if (mm.length === 3) {
    month = '0' + month
  }
  if (dd.length === 3) {
    day = '0' + day
  }
  let time = d.getFullYear + '-' + month + '-' + day
  return time
}

function addHour(time, hours) {
  if (hours === undefined || hours === '') {
    hours = 1
  }
  let d = new Date(time)
  d.setHours(time.getHours() + hours)
  return parseTime(d, 'yyyy-MM-dd hh:mm:mm')
}

function findSingleElement(desElement, srcElements) {
  if (srcElements.constructor.name === 'Array' && srcElements.length > 0) {
    return srcElements.find(item => {
      return desElement === item
    })
  }
  return null
}

export {
  isArray,
  hasKey,
  initObj,
  getSVGPathByCoordinate,
  getObjValue,
  latLngToCoordi,
  validLinkPhone,
  validPersonID,
  parseTime,
  diffTime,
  getChinesesDay,
  trim,
  getCode,
  formatCode,
  centerOf,
  deAreasCode,
  enAreasCode,
  addDate,
  addHour,
  findSingleElement
}
