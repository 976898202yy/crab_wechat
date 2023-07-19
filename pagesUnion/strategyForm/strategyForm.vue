<template>
	<view class="strategy-form">
		<view class="strategy-form-top bg-white">
			<text class="form-top">{{type}}条件</text>
		</view>
		<view>
			<u-form labelPosition="left" :model="form">
				<view class="form-content bg-white">
					<u-form-item label="数据指标:" labelWidth="90" prop="sensorType" borderBottom
						@click="showSensorType = true">
						<u--input v-model="sensorTypeName" disabled disabledColor="#ffffff" placeholder="请选择数据指标"
							border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="数据指标单位:" labelWidth="120" prop="dataType" borderBottom
						@click="showDataType = true">
						<u--input v-model="dataTypeName" disabled disabledColor="#ffffff" placeholder="请选择数据指标单位"
							border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="逻辑符号:" labelWidth="90" prop="logicalCondition" borderBottom
						@click="showSymbol = true">
						<u--input v-model="form.logicalCondition" disabled disabledColor="#ffffff" placeholder="请选择逻辑符号"
							border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="阈值:" labelWidth="70" prop="thresholdValue" :borderBottom="false">
						<u-input v-model="form.thresholdValue" border="none" placeholder="请输入阈值">
							<u--text :text="unit" slot="suffix" type="tips"></u--text>
						</u-input>
					</u-form-item>
				</view>
				<u-button
					type="primary"
					text="提交"
					customStyle="margin: 30px auto 40px;width: 90%;"
					@click="submit"
				></u-button>
			</u-form>
			<u-picker :show="showSensorType" :columns="sensorTypeList" keyName="description" closeOnClickOverlay
				@cancel="showSensorType = false" @confirm="sensorTypeConfirm" @close="showSensorType = false">
			</u-picker>
			<u-picker :show="showDataType" :columns="dataTypeList" keyName="description" closeOnClickOverlay
				@cancel="showDataType = false" @confirm="dataTypeConfirm" @close="showDataType = false">
			</u-picker>
			<u-picker :show="showSymbol" :columns="symbolList" closeOnClickOverlay @cancel="showSymbol = false"
				@confirm="symbolConfirm" @close="showSymbol = false">
			</u-picker>
		</view>
	</view>
</template>

<script>
	import { findSensorType, findDataType, addStrategy } from '@/api/admin/union'
	let that
	export default {
		data() {
			return {
				type: '',
				form: {
					deviceId: '',
					operationType: '',
					sensorType: '',
					dataType: '',
					logicalCondition: '',
					thresholdValue: ''
				},
				rules: {
					'sensorType': [{
						type: 'string',
					    required: true,
						message: '请选择数据指标',
						trigger: ['blur', 'change']
					}],
					'dataType': [{
						type: 'string',
						required: true,
						message: '请选择数据指标单位',
						trigger: ['blur', 'change']
					}],
					'logicalCondition': [{
						type: 'string',
						required: true,
						message: '请选择逻辑符号',
						trigger: ['blur', 'change']
					}],
					'thresholdValue': [{
						type: 'string',
						required: true,
						message: '请输入阈值',
						trigger: ['blur']
					}]
				},
				sensorTypeName: '',
				dataTypeName: '',
				unit: '',
				showSensorType: false, // 控制显示传感器类型
				sensorTypeList: [],
				showDataType: false, // 控制显示数据指标
				dataTypeList: [],
				showSymbol: false, // 控制显示逻辑符号
				symbolList: [
					['>', '<', '=']
				]
			}
		},
		onLoad(option) {
			that = this
			that.type = option.type
			that.form.deviceId = option.id
			if(that.type == '开启'){
				that.form.operationType = 'open'
			}else{
				that.form.operationType = 'close'
			}
		},
		mounted(){
			that.loadData()
		},
		methods: {
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				let flag = this.$util.checkRules(that.form,that.rules)
				if(flag){
					addStrategy(this.form).then(res => {
						if(res.code == 0){
							uni.$u.toast('提交成功')
							setTimeout(() => {
								let pages = getCurrentPages()   // 获取页面栈
								let prePage = pages[pages.length - 2] //获取上一页
								prePage.$vm.needRefresh = true // 需要刷新
								wx.navigateBack({
									delta: 1
								})
							},500)
						}else{
							uni.$u.toast('提交失败')
						}
					})
				}
			},
			sensorTypeConfirm(e) {
				that.form.sensorType = e.value[0].sensorType
				that.sensorTypeName = e.value[0].description
				that.dataTypeList = []
				that.dataTypeName = ""
				that.unit = ""
				findDataType(that.form.sensorType).then(res => {
					that.dataTypeList.push(res.data)
				})
				that.showSensorType = false
			},
			dataTypeConfirm(e) {
				that.form.dataType = e.value[0].dataType
				that.dataTypeName = e.value[0].description
				that.unit = e.value[0].unit
				that.showDataType = false
			},
			symbolConfirm(e) {
				that.form.logicalCondition = e.value[0]
				that.showSymbol = false
			},
			loadData(){
				findSensorType().then(res => {
					that.sensorTypeList.push(res.data)
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #ECF1FD;
	}
</style>
<style lang="less">
	.strategy-form {
		.bg-white{
			background-color: #fff;
		}
        .strategy-form-top{
			padding: 15px 10px 8px;
		}
		.form-content{
			margin: 8px 0;
			padding: 0 10px;
		}
		.form-top {
			font-size: 28rpx;
			color: #999;
		}
		.padding-10 {
			padding: 10px;
		}

		.blue {
			color: #1A7CF9;
		}

		.red {
			color: #FF2442;
		}

		.d-flex {
			display: flex;
		}
	}
</style>
