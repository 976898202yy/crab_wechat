import request from '@/common/request.js'

export function logout(){
	return request({
		url: '/auth/token/logout',
		method: 'delete',
	})
}