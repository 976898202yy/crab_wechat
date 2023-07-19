import request from '@/common/request.js'

export function getInfo(id){
	return request({
		url: '/admin/user/findOne/' + id,
		method: 'GET'
	})
}

export function editPassword(data){
	return request({
		url: '/admin/user/updatePassword',
		method: 'PUT',
		data
	})
}

export function bind(code) {
  return request({
    url: '/admin/social/bind?state=MINI&code=' + code,
    method: 'POST',
  })
}

export function myInfo(){
	return request({
		url: '/admin/user/findUserInfo',
		method: 'GET'
	})
}

export function getMsg(data){
	return request({
		url: '/admin/tmsg/page',
		method: 'GET',
		data
	})
}

export function msgDetail(msgId) {
  return request({
    url: '/admin/tmsg/findOneAndUpdate/' + msgId,
    method: 'GET',
  })
}

export function getCountMsg() {
	return request({
	  url: '/admin/tmsg/getCountMsg',
	  method: 'GET',
	})
}