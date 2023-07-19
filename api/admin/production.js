import request from '@/common/request.js'

export function getDate(){
	return request({
		url: '/activity/common/getDateList',
		method: 'GET'
	})
}


export function getUtil(){
	return request({
		url: '/admin/dict/type/unit',
		method: 'GET',
	})
}

export function getClearWay(){
	return request({
		url: '/admin/dict/type/clear_way',
		method: 'GET',
	})
}

export function getMedicine(){
	return request({
		url: '/admin/dict/type/medicine_name',
		method: 'GET',
	})
}

export function getPack(){
	return request({
		url: '/admin/dict/type/specifications_models',
		method: 'GET',
	})
}

export function getPurchase(){
	return request({
		url: '/admin/dict/type/purchasing_channels',
		method: 'GET',
	})
}

export function getFodder(){
	return request({
		url: '/admin/dict/type/fodder_type',
		method: 'GET',
	})
}

export function getPurpose(){
	return request({
		url: '/admin/dict/type/purpose',
		method: 'GET',
	})
}

export function getCrabType(){
	return request({
		url: '/admin/dict/type/crab_type',
		method: 'GET',
	})
}

export function getCrabSpec(){
	return request({
		url: '/admin/dict/type/crab_spec',
		method: 'GET',
	})
}

export function getNumberUnit(){
	return request({
		url: '/admin/dict/type/number_unit',
		method: 'GET',
	})
}

export function getPriceUnit(){
	return request({
		url: '/admin/dict/type/price_unit',
		method: 'GET',
	})
}

export function getSeedType(){
	return request({
		url: '/admin/dict/type/seed_type',
		method: 'GET',
	})
}

export function getGrassType(){
	return request({
		url: '/admin/dict/type/grass_type',
		method: 'GET',
	})
}

export function getPattern(){
	return request({
		url: '/admin/dict/type/planting_pattern',
		method: 'GET',
	})
}

export function getAquatic(){
	return request({
		url: '/admin/dict/type/aquatic_species',
		method: 'GET',
	})
}

export function getGrassPurchasing(){
	return request({
		url: '/admin/dict/type/grass_purchasing_channels',
		method: 'GET',
	})
}

export function getActivity(){
	return request({
		url: '/activity/activity/findAllActivity',
		method: 'GET',
	})
}

export function saveCapture(data){
	return request({
		url: '/activity/captureRecord/saveCaptureRecord',
		method: 'POST',
		data
	})
}

export function saveClean(data){
	return request({
		url: '/activity/clearRecord/saveCleanRecord',
		method: 'POST',
		data
	})
}

export function saveFeed(data){
	return request({
		url: '/activity/feedRecord/saveFeedRecord',
		method: 'POST',
		data
	})
}

export function saveGrass(data){
	return request({
		url: '/activity/grassManage/saveGrassManage',
		method: 'POST',
		data
	})
}

export function saveMedicine(data){
	return request({
		url: '/activity/medicineRecord/saveMedicineRecord',
		method: 'POST',
		data
	})
}

export function saveSeed(data){
	return request({
		url: '/activity/seedRecord/saveSeedRecord',
		method: 'POST',
		data
	})
}

export function getList(data){
	return request({
		url: '/activity/common/page?page=' + data.page + '&size=' + data.size + '&pond=' + data.pond + '&site=' + data.site + '&type=' + data.type + '&start=' + data.start + '&end=' + data.end + '&dayTime=' + data.dayTime,
		method: 'GET',
	})
}

export function getDetail(id,seed){
	return request({
		url: '/activity/common/findTypeInfo/' + id + '/' + seed,
		method: 'GET'
	})
}