<template>
	<view class="plant-form">
		<u-form labelPosition="left" :model="form">
			<view class="content">
				<u-form-item label="塘口:" labelWidth="90" prop="pond" borderBottom @click="showPond = true">
					<u--input v-model="pondName" disabled disabledColor="#ffffff" placeholder="请选择塘口" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="日期:" labelWidth="90" prop="date" borderBottom @click="showTime = true">
					<u-input v-model="dateTime" disabled disabledColor="#ffffff" placeholder="请选择日期" border="none">
					</u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="管理类型:" labelWidth="90" prop="type" borderBottom @click="showType = true">
					<u--input v-model="typeName" disabled disabledColor="#ffffff" placeholder="请选择管理类型"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<view v-show="form.type == 'planting_grass'">
					<u-form-item label="种植方式:" labelWidth="90" prop="plant" borderBottom @click="showPlant = true">
						<u--input v-model="plantName" disabled disabledColor="#ffffff" placeholder="请选择种植方式"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item v-if="form.plant == 'other'" prop="otherPlant" borderBottom>
						<u--input v-model="form.otherPlant" placeholder="请输入其他种植方式" border="none"></u--input>
					</u-form-item>
					<u-form-item label="水草种类:" labelWidth="90" prop="grass" borderBottom @click="showGrass = true">
						<u--input v-model="grassName" disabled disabledColor="#ffffff" placeholder="请选择水草种类"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item v-if="form.grass == 'other'" prop="otherGrass" borderBottom>
						<u--input v-model="form.otherGrass" placeholder="请输入其他水草种类" border="none"></u--input>
					</u-form-item>
					<u-form-item label="种植面积占比(%):" labelWidth="140" prop="ratio" borderBottom>
						<u--input v-model="form.ratio" placeholder="请输入种植面积占比(%)" border="none"></u--input>
					</u-form-item>
					<u-form-item label="采购渠道:" labelWidth="90" prop="purchase" borderBottom @click="showPurchase = true">
						<u--input v-model="purchaseName" disabled disabledColor="#ffffff" placeholder="请选择采购渠道"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item v-if="form.purchase == 'other'" prop="otherProcurement" borderBottom>
						<u--input v-model="form.otherProcurement" placeholder="请输入其他采购渠道" border="none"></u--input>
					</u-form-item>
				</view>
				<view v-show="form.type == 'mow_grass'">
					<u-form-item label="割后水草高度:" labelWidth="120" prop="heightCut" borderBottom>
						<u--input v-model="form.heightCut" placeholder="请输入割后水草高度" border="none"></u--input>
					</u-form-item>
				</view>
				<view v-show="form.type == 'growth_monitoring'">
					<u-form-item label="当前面积占比:" labelWidth="120" prop="ratioNow" borderBottom>
						<u--input v-model="form.ratioNow" placeholder="请输入当前面积占比" border="none"></u--input>
					</u-form-item>
					<u-form-item label="当前水草高度:" labelWidth="120" prop="heightNow" borderBottom>
						<u--input v-model="form.heightNow" placeholder="请输入当前水草高度" border="none"></u--input>
					</u-form-item>
				</view>
				
			</view>
			<u-button
				type="primary"
				text="提交"
				customStyle="margin: 30px auto 0;width: 80%;border-radius: 20px"
				@click="submit"
			></u-button>
		</u-form>
		<u-picker :show="showPond" :columns="PondList" keyName="name" closeOnClickOverlay @cancel="showPond = false"
			@confirm="pondConfirm" @close="showPond = false">
		</u-picker>
		<u-datetime-picker :show="showTime" mode="date" v-model="value1" closeOnClickOverlay @confirm="dateConfirm"
			@cancel="showTime = false" @close="showTime = false"></u-datetime-picker>
		<u-picker :show="showType" :columns="typeList" keyName="label" closeOnClickOverlay @cancel="showType = false"
			@confirm="typeConfirm" @close="showType = false">
		</u-picker>
		<u-picker :show="showPlant" :columns="plantList" keyName="label" closeOnClickOverlay @cancel="showPlant = false"
			@confirm="plantConfirm" @close="showPlant = false">
		</u-picker>
		<u-picker :show="showGrass" :columns="grassList" keyName="label" closeOnClickOverlay @cancel="showGrass = false"
			@confirm="grassConfirm" @close="showGrass = false">
		</u-picker>
		<u-picker :show="showPurchase" :columns="purchaseList" keyName="label" closeOnClickOverlay
			@cancel="showPurchase = false" @confirm="purchaseConfirm" @close="showPurchase = false">
		</u-picker>
	</view>
</template>

<script>
	import { findPond } from '@/api/admin/index'
	import { getGrassType, getPattern, getAquatic, getGrassPurchasing, saveGrass } from '@/api/admin/production'
	let that
	export default{
		data(){
			return{
				dateTime: '',
				form:{
					pond: '',
					date: '',
					type: '',
					plant: '',
					otherPlant: '',
					grass: '',
					otherGrass: '',
					ratio: '',
					purchase: '',
					otherProcurement: '',
					heightCut: '',
					ratioNow: '',
					heightNow: ''
				},
				rules:{
					'pond': [{
						type: 'string',
					    required: true,
						message: '请选择塘口',
						trigger: ['blur', 'change']
					}],
					'date':[{
						type: 'string',
					    required: true,
						message: '请选择日期',
						trigger: ['blur', 'change']
					}],
				},
				pondName: '',
				typeName: '',
				plantName: '',
				grassName: '',
				purchaseName: '',
				showPond: false,  // 控制塘口
				PondList: [],
				showTime: false, // 控制日期
				value1: Number(new Date()), //  初始化时间
				showType: false,   // 控制管理类型
				typeList: [],
				showPlant:false,  // 控制种植方式
				plantList:[],
				showGrass: false,  // 控制水草种类
				grassList:[],
				showPurchase: false,    // 控制采购渠道
				purchaseList: []
			}
		},
		onLoad(option) {
			that = this
			that.id = option.id
			that.form.pond = option.pondId
			that.pondName = option.pondName
			that.dateTime = this.$util.getNowFormatDate(0)
		},
		mounted() {
			that.loadData()
		},
		methods:{
			submit(){
				that.form.date = that.dateTime + ' 00:00:00'
				let flag = this.$util.checkRules(that.form,that.rules)
				if(flag){
					saveGrass(this.form).then(res => {
						if(res.code == 0){
							uni.$u.toast('提交成功')
							setTimeout(() => {
								let pages = getCurrentPages()   // 获取页面栈
								let prePage = pages[pages.length - 2] //获取上一页
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
			loadData(){
				findPond(that.id).then(res => {
					that.PondList.push(res.data)
				})
				getGrassType().then(res => {
					that.typeList.push(res.data)
					that.form.type = that.typeList[0][0].value
					that.typeName = that.typeList[0][0].label
				})
				getPattern().then(res => {
					that.plantList.push(res.data)
				})
				getAquatic().then(res => {
					that.grassList.push(res.data)
				})
				getGrassPurchasing().then(res => {
					that.purchaseList.push(res.data)
				})
			},
			pondConfirm(e) {
				that.form.pond = e.value[0].pondId;
				that.pondName = e.value[0].name;
				that.showPond = false
			},
			dateConfirm(e) {
				that.dateTime = this.result(e.value, e.mode)
				that.showTime = false
			},
			typeConfirm(e) {
				this.form.type = e.value[0].value;
				that.typeName = e.value[0].label
				this.showType = false
			},
			plantConfirm(e) {
				this.form.plant = e.value[0].value;
				that.plantName = e.value[0].label
				this.showPlant = false
			},
			grassConfirm(e) {
				this.form.grass = e.value[0].value;
				that.grassName = e.value[0].label
				this.showGrass = false
			},
			purchaseConfirm(e){
				that.form.purchase = e.value[0].value
				that.purchaseName = e.value[0].label
				that.showPurchase = false
			},
			result(time, mode) {
				const timeFormat = uni.$u.timeFormat
				switch (mode) {
					case 'datetime':
						return timeFormat(time, 'yyyy-mm-dd hh:MM')
					case 'date':
						return timeFormat(time, 'yyyy-mm-dd')
					case 'year-month':
						return timeFormat(time, 'yyyy-mm')
					case 'time':
						return time
					default:
						return ''
				}
			}
		}
	}
</script>

<style lang="less">
	.plant-form{
		.content {
			border-top: 10px solid #F3F4F5;
			padding: 10px;
		}
		.u-form-item__body{
			padding: 16px 0 !important;
		}
	}
</style>
