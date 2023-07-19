import request from '@/common/request.js'

export function getStatus(pondId) {
	return request({
		url: '/control/status/pond/' + pondId,
		method: 'GET'
	})
}

export function getOpen(deviceId) {
	return request({
		url: '/control/operate/' + deviceId + '/open',
		method: 'POST'
	})
}

export function getClose(deviceId) {
	return request({
		url: '/control/operate/' + deviceId + '/close',
		method: 'POST'
	})
}