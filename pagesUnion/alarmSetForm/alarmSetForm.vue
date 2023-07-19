<template>
	<view class="set-form">
		<u-form labelPosition="left" :model="form">
			<view class="content">
				<u-form-item label="塘口:" labelWidth="90" prop="pond" borderBottom @click="showPond = true">
					<u--input v-model="pondName" disabled disabledColor="#ffffff" placeholder="请选择塘口" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="数据指标:" labelWidth="90" prop="sensorType" borderBottom @click="showSensorType = true">
					<u--input v-model="sensorTypeName" disabled disabledColor="#ffffff" placeholder="请选择数据指标"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="数据类型:" labelWidth="90" prop="dataType" borderBottom @click="showDataType = true">
					<u--input v-model="dataTypeName" disabled disabledColor="#ffffff" placeholder="请选择数据类型"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="报警值上限:" labelWidth="90" prop="max" borderBottom>
					<u--input v-model="form.max" placeholder="请输入报警值上限" border="none"></u--input>
				</u-form-item>
				<u-form-item label="报警值下限:" labelWidth="90" prop="min" borderBottom>
					<u--input v-model="form.min" placeholder="请输入报警值上限" border="none"></u--input>
				</u-form-item>
				<u-form-item label="启用状态:" labelWidth="90" prop="state" borderBottom
					@click="showState = true">
					<u--input v-model="stateName" disabled disabledColor="#ffffff" placeholder="请选择逻辑符号"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
			</view>
			<u-button type="primary" text="提交" customStyle="margin: 30px auto 0;width: 80%;border-radius: 20px"
				@click="submit"></u-button>
		</u-form>
		<u-picker :show="showPond" :columns="PondList" keyName="name" closeOnClickOverlay @cancel="showPond = false"
			@confirm="pondConfirm" @close="showPond = false">
		</u-picker>
		<u-picker :show="showSensorType" :columns="sensorTypeList" keyName="description" closeOnClickOverlay
			@cancel="showSensorType = false" @confirm="sensorTypeConfirm" @close="showSensorType = false">
		</u-picker>
		<u-picker :show="showDataType" :columns="dataTypeList" keyName="description" closeOnClickOverlay
			@cancel="showDataType = false" @confirm="dataTypeConfirm" @close="showDataType = false">
		</u-picker>
		<u-picker :show="showState" :columns="stateList" keyName="name" closeOnClickOverlay
			@cancel="showState = false" @confirm="stateConfirm" @close="showState = false">
		</u-picker>
	</view>
</template>

<script>
	import {
		findPond
	} from '@/api/admin/index'
	import { findSensorType, findDataType, saveWarnSet } from '@/api/admin/union'
	let that
	export default{
		data(){
			return{
				siteId:'',
				pondId: '',
				form: {
					pond: '',
					sensorType: '',
					dataType: '',
					max: '',
					min: '',
					state: ''
				},
				rules: {
					'pond': [{
						type: 'string',
						required: true,
						message: '请选择塘口',
						trigger: ['blur', 'change']
					}],
					'sensorType': [{
						type: 'string',
						required: true,
						message: '请选择数据指标',
						trigger: ['blur', 'change']
					}],
					'dataType': [{
						type: 'string',
						required: true,
						message: '请选择数据类型',
						trigger: ['blur', 'change']
					}],
					'max': [{
						type: 'string',
						required: true,
						message: '请输入报警值上限',
						trigger: ['blur']
					}],
					'min': [{
						type: 'string',
						required: true,
						message: '请输入报警值下限',
						trigger: ['blur']
					}],
				},
				pondName: '',
				sensorTypeName: '',
				dataTypeName: '',
				stateName: '',
				showPond: false, // 控制塘口
				PondList: [],
				showSensorType: false, // 控制显示数据指标
				sensorTypeList: [],
				showDataType: false, // 控制显示数据类型
				dataTypeList: [],
				showState: false,    //控制启用状态
				stateList:[[{
					id: 0,
					name: '关闭'
				},{
					id: 1,
					name: '开启'
				}]]
			}
		},
		onLoad(option) {
			that = this
			that.siteId = option.siteId
			that.pondId = option.pondId
			console.log(that.pondId);
		},
		mounted() {
			that.loadData()
		},
		methods:{
			submit(){
				let flag = this.$util.checkRules(that.form, that.rules)
				if(flag){
					saveWarnSet(this.form).then(res => {
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
			pondConfirm(e) {
				that.form.pond = e.value[0].pondId;
				that.pondName = e.value[0].name;
				that.showPond = false
			},
			sensorTypeConfirm(e) {
				that.form.sensorType = e.value[0].sensorType
				that.sensorTypeName = e.value[0].description
				that.dataTypeList = []
				that.dataTypeName = ""
				findDataType(that.form.sensorType).then(res => {
					that.dataTypeList.push(res.data)
				})
				that.showSensorType = false
			},
			dataTypeConfirm(e) {
				that.form.dataType = e.value[0].dataType
				that.dataTypeName = e.value[0].description
				that.showDataType = false
			},
			stateConfirm(e){
				that.form.state = e.value[0].id
				that.stateName = e.value[0].name
				that.showState = false
			},
			loadData() {
				findPond(that.siteId).then(res => {
					that.PondList.push(res.data)
					that.PondList[0].forEach((value) => {
						if(this.pondId == value['pondId']){
							this.form.pond = value['pondId']
							this.pondName = value['name']
						}
					})
				})
				findSensorType().then(res => {
					that.sensorTypeList.push(res.data)
				})
			},
		}
	}
</script>

<style lang="less">
	.set-form{
		.content {
			border-top: 10px solid #F3F4F5;
			padding: 10px;
		}
		.u-form-item__body {
			padding: 16px 0 !important;
		}
	}
</style>
