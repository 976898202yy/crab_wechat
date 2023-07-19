import request from '@/common/request.js'

export function getCamera(pondId) {
	return request({
		url: '/control/camera/pond/' + pondId,
		method: 'GET'
	})
}