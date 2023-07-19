import request from '@/common/request.js'

export function findDevice(data){
	return request({
		url: '/admin/devicestatus/deviceStatusData',
		method: 'GET',
		data
	})
}

export function updateStatus(data){
	return request({
		url: '/admin/devicestatus/updateDeviceStatus',
		method: 'POST',
		data
	})
}

export function findStrategy(data){
	return request({
		url: '/admin/strategy/findControlStrategy',
		method: 'GET',
		data
	})
}

export function findSensorType(){
	return request({
		url: '/admin/sensortype/findAllSensorType',
		method: 'GET'
	})
}

export function findDataType(sensorId){
	return request({
		url: '/admin/datatype/findDataTypeBySensor/' + sensorId,
		method: 'GET'
	})
}

export function updateStrategyStatus(data){
	return request({
		url: '/admin/strategy/updateStatus',
		method: 'PUT',
		data
	})
}

export function addStrategy(data){
	return request({
		url: '/admin/strategy/saveStrategyDetailLogic',
		method: 'POST',
		data
	})
}

export function deleteLogic(logicId){
	return request({
		url: '/admin/strategy/deleteLogic/' + logicId,
		method: 'DELETE'
	})
}

export function findPoll(data){
	return request({
		url: '/admin/pollingstrategy/findPollingStrategy',
		method: 'GET',
		data
	})
}

export function editPoll(data){
	return request({
		url: '/admin/pollingstrategy/updatePollingStategy',
		method: 'PUT',
		data
	})
}

export function getHistoryData(data){
	return request({
		url: '/admin/operatehistory/operateHistoryData',
		method: 'GET',
		data
	})
}

export function getWarnList(data){
	return request({
		url: '/admin/warningrecord/page',
		method: 'GET',
		data
	})
}

export function getLog(operateId){
	return request({
		url: '/admin/operatehistory/findOne/' + operateId,
		method: 'GET'
	})
}

export function getWarn(warningId){
	return request({
		url: '/admin/warningrecord/findOne/' + warningId,
		method: 'GET'
	})
}

export function saveWarnSet(data){
	return request({
		url: '/admin/twarnconfig/saveWarnConfig',
		method: 'POST',
		data
	})
}

export function getSetList(data){
	return request({
		url: '/admin/twarnconfig/page?pond=' + data.pond + '&current=' + data.current + '&size=' + data.size,
		method: 'GET'
	})
}

export function updateSetState(data){
	return request({
		url: '/admin/twarnconfig/updateWarnConfig',
		method: 'POST',
		data
	})
}

export function delSetList(id){
	return request({
		url: '/admin/twarnconfig/deleteWarnConfig/' + id,
		method: 'DELETE'
	})
}