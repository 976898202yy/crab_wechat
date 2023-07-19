import request from '@/common/request.js'

export function getDataLine(data){
	return request({
		url: '/admin/common/monitorDataLine?pond=' + data.pond + '&beginDate=' + data.beginDate + '&endDate=' + data.endDate + '&dataType=' + data.dataType,
		method: 'GET',
	})
}

export function getActivityLine(data){
	return request({
		url: '/admin/common/activityLine?pond=' + data.pond + '&beginDate=' + data.beginDate + '&endDate=' + data.endDate,
		method: 'GET',
	})
}

export function getActivityPie(data){
	return request({
		url: '/admin/common/activityPie?pond=' + data.pond + '&beginDate=' + data.beginDate + '&endDate=' + data.endDate,
		method: 'GET',
	})
}

// 假数据
export function getdate(days){
	return request({
		url: '/admin/common/getDate/' + days,
		method: 'GET'
	})
}