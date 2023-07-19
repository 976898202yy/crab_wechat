import request from '@/common/request.js'

export function getWater(pondId) {
	return request({
		url: '/data/real_time/' + pondId + '/water',
		method: 'GET'
	})
}

export function getAir(pondId) {
	return request({
		url: '/data/real_time/' + pondId + '/air',
		method: 'GET'
	})
}
