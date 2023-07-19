import request from '@/common/request.js'

export function getDevice(data) {
	return request({
		url: '/admin/devicedata/deviceDataList',
		method: 'GET',
		data
	})
}

export function findSite() {
	return request({
		url: '/admin/site/findSite',
		methods: 'GET'
	})
}

export function findPond(siteId) {
	return request({
		url: '/admin/pond/findAllPond/' + siteId,
		methods: 'GET'
	})
}

export function getWeather(siteId){
	return request({
		url: '/admin/weather/hoursWeather/' + siteId,
		methods: 'GET'
	})
}

export function getMsg(){
	return request({
		url: '/admin/tmsg/getCheckedContent',
		methods: 'GET'
	})
}