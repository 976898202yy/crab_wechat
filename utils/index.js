import * as CryptoJS from '../common/crypto-js.js'
/**
 *加密处理
 *@param params 
 */
function encryption(params){
  let { data, type, param, key } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === "Base64") {
    param.forEach(ele => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach(ele => {
      var data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      var iv = key;
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      });
      result[ele] = encrypted.toString();
    });
  }
  return result;
};

/**
 * 判断是否是基本数据类型
 * @param value 
 */
function isPrimitive(value){
  return (typeof value === 'string' || 
  typeof value === 'number' || 
  typeof value === 'symbol' ||
  typeof value === 'boolean')
}

/**
 * 判断是否是一个js对象
 * @param value 
 */
function isObject(value){
  return Object.prototype.toString.call(value) === "[object Object]"
}

/**
 * 深拷贝一个值
 * @param value 
 */
function cloneDeep(value){
  // 记录被拷贝的值，避免循环引用的出现
  let memo = {};

  function baseClone(value){
    let res;
    // 如果是基本数据类型，则直接返回
    if(isPrimitive(value)){
      return value;
    // 如果是引用数据类型，我们浅拷贝一个新值来代替原来的值
    }else if(Array.isArray(value)){
      res = [...value];
    }else if(isObject(value)){
      res = {...value};
    }

    // 检测我们浅拷贝的这个对象的属性值有没有是引用数据类型。如果是，则递归拷贝
    Reflect.ownKeys(res).forEach(key=>{
      if(typeof res[key] === "object" && res[key]!== null){
        //此处我们用memo来记录已经被拷贝过的引用地址。以此来解决循环引用的问题
        if(memo[res[key]]){
          res[key] = memo[res[key]];
        }else{
          memo[res[key]] = res[key];
          res[key] = baseClone(res[key])
        }
      }
    })
    return res;  
  }
  return baseClone(value)
}

/**
 * 表单验证
 * @param params 
 * @param rules 
 */
function checkRules(params, rules) {		//表单校验
	for (let key in rules) {
		let arr = rules[key]
		for (let i = 0; i < arr.length; i++) {
			let rule = arr[i],
				val = params[key]===0?'0':params[key] || ''
			if (rule.required && val==='') {	//非空
				uni.showToast({
					title: rule.message,
					icon: "none"
				});
				return false
			}
			if(rule.pattern && !rule.pattern.test(val)){	//正则
				uni.showToast({
					title: rule.message,
					icon: "none"
				});
				return false
			}
		}
	}
	return true
}
/**
 * 选择到某一天的日期到小时
 * @param days
*/
function getNowFormatHour(days) {
	var date = new Date();
	date.setDate(date.getDate() + days);
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(hour >= 0 && hour <= 9){
		hour = "0" + hour;
	}
	if(min >= 0 && min <= 9){
		min = "0" + min;
	}
	var currentdate = (date.getFullYear()) + seperator1 + month + seperator1 + strDate + " " + hour + ":" + min;
	return currentdate;
}

/**
 * 选择到某一天的日期
 * @param days
*/
function getNowFormatDate(days) {
	var date = new Date();
	date.setDate(date.getDate() + days);
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(hour >= 0 && hour <= 9){
		hour = "0" + hour;
	}
	if(min >= 0 && min <= 9){
		min = "0" + min;
	}
	var currentdate = (date.getFullYear()) + seperator1 + month + seperator1 + strDate
	return currentdate;
}


// 时间格式转换 yyyy/mm/dd
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}

// 两位数以内的数字自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 计算变化多少天后的日期
function DateAddDay(d, days) {
  var d = new Date(d);
  // console.log(d.getDate() + days);
  return new Date(d.setDate(d.getDate() + days));
}
// 获得本周周日的日期
function FirstDayInThisWeek(d) {
  var d = new Date(d);
  // console.log(formatTime(DateAddDay(d, 0 - d.getDay())));
  return DateAddDay(d, 0 - d.getDay());
}

// 判断类型
function Type(obj) {
    var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
    return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}

module.exports = {
  encryption: encryption,
  cloneDeep: cloneDeep,
  checkRules: checkRules,
  getNowFormatHour: getNowFormatHour,
  getNowFormatDate: getNowFormatDate,
  formatTime: formatTime,
  formatDate: formatDate,
  DateAddDay: DateAddDay,
  FirstDayInThisWeek: FirstDayInThisWeek,
  type: Type,
  addZero: formatNumber,
}