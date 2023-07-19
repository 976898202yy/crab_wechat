<template>
	<view class='medication-form'>
		<u-form labelPosition="left" :model="form">
			<view class="content">
				<u-form-item label="塘口:" labelWidth="90" prop="pond" borderBottom @click="showPond = true">
					<u--input v-model="pondName" disabled disabledColor="#ffffff" placeholder="请选择塘口" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="用药日期:" labelWidth="90" prop="date" borderBottom @click="showTime = true">
					<u-input v-model="dateTime" disabled disabledColor="#ffffff" placeholder="请选择用药日期" border="none">
					</u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="用药目的:" labelWidth="90" prop="purpose" borderBottom @click="showPurpose = true">
					<u--input v-model="purposeName" disabled disabledColor="#ffffff" placeholder="请选择用药目的" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<view v-show="form.purpose == 'other'">
					<u-form-item prop="otherPurpose" borderBottom>
						<u--input v-model="form.otherPurpose" placeholder="请输入其他用药目的" border="none"></u--input>
					</u-form-item>
				</view>
				<u-form-item label="药品名称:" labelWidth="90" prop="medicine" borderBottom>
					<u--input v-model="form.medicine" placeholder="请输入药品名称" border="none"></u--input>
				</u-form-item>
				<u-form-item label="包装方式:" labelWidth="90" prop="pack" borderBottom @click="showPack = true">
					<u--input v-model="packName" disabled disabledColor="#ffffff" placeholder="请选择包装方式" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="规格:" labelWidth="90" prop="spec" borderBottom>
					<u--input v-model="form.spec" placeholder="请输入规格" border="none"></u--input>
					<view slot="right" @click="showSpec = true">
						<u--input v-model="form.specUnit" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="用药量:" labelWidth="90" prop="amount" borderBottom>
					<u--input v-model="form.amount" placeholder="请输入用药量" border="none"></u--input>
					<view slot="right">
						<u--input v-model="form.amountUnit" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item label="采购价格:" labelWidth="90" prop="price" borderBottom>
					<u--input v-model="form.price" placeholder="请输入采购价格" border="none"></u--input>
					<view slot="right">
						<u--input v-model="form.priceUnit" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item label="采购渠道:" labelWidth="90" prop="purchase" borderBottom @click="showPurchase = true">
					<u--input v-model="purchaseName" disabled disabledColor="#ffffff" placeholder="请选择采购渠道" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item v-if="form.purchase == 'other'" prop="otherProcurement" borderBottom>
					<u--input v-model="form.otherProcurement" placeholder="请输入其他采购渠道" border="none"></u--input>
				</u-form-item>
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
		<u-picker :show="showPurpose" :columns="purposeList" keyName="label" closeOnClickOverlay @cancel="showPurpose = false"
			@confirm="purposeConfirm" @close="showPurpose = false">
		</u-picker>
		<u-picker :show="showPack" :columns="packList" keyName="label" closeOnClickOverlay @cancel="showPack = false"
			@confirm="packConfirm" @close="showPack = false">
		</u-picker>
		<u-picker :show="showSpec" :columns="specList" keyName="label" closeOnClickOverlay @cancel="showSpec = false"
			@confirm="specConfirm" @close="showSpec = false">
		</u-picker>
		<u-picker :show="showPurchase" :columns="purchaseList" keyName="label" closeOnClickOverlay @cancel="showPurchase = false"
			@confirm="purchaseConfirm" @close="showPurchase = false">
		</u-picker>
	</view>
</template>

<script>
	import { findPond } from '@/api/admin/index'
	import { getPurpose, getPack, getUtil, getPurchase, saveMedicine } from '@/api/admin/production'
	let that
	export default{
		data(){
			return{
				dateTime: '',
				form: {
					pond: '',
					date: '',
					purpose: '',
					otherPurpose: '',
					medicine: '',
					spec: '',
					specUnit: '',
					amount: '',
					amountUnit: '',
					price: '',
					priceUnit: '',
					purchase: '',
					otherProcurement: ''
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
						message: '请选择用药日期',
						trigger: ['blur', 'change']
					}],
				},
				pondName: '',
				purposeName: '',
				packName: '',
				purchaseName: '',
				showPond: false,  // 控制塘口
				PondList: [],
				showTime: false, // 控制日期
				value1: Number(new Date()), //  初始化时间
				showPurpose: false,   // 控制用药目的
				purposeList: [],
				showPack: false,    // 控制包装方式
				packList: [],
				showSpec: false,   // 控制规格单位
				specList: [],
				showPurchase: false, // 控制采购渠道
				purchaseList:[]
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
					saveMedicine(this.form).then(res => {
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
				getPurpose().then(res => {
					that.purposeList.push(res.data)
				})
				getPack().then(res => {
					that.packList.push(res.data)
					that.form.pack = that.packList[0][0].value
					that.packName = that.packList[0][0].label
					if(that.form.pack == 'bags'){
						that.form.amountUnit = '袋'
						that.form.priceUnit = '元/袋'
					}
					if(that.form.pack == 'bottled'){
						that.form.amountUnit = '瓶'
						that.form.priceUnit = '元/瓶'
					}
					if(that.form.pack == 'barrel'){
						that.form.amountUnit = '桶'
						that.form.priceUnit = '元/桶'
					}
					if(that.form.pack == 'bulk'){
						that.form.amountUnit = '包'
						that.form.priceUnit = '元/斤'
					}
					getUtil().then(res => {
						let arr = res.data
						arr.forEach((value) => {
							value['label'] = value['label'] + '/' + that.form.amountUnit
						})
						that.specList.push(arr)
						that.form.specUnit = that.specList[0][0].label
					})
				})
				getPurchase().then(res => {
					that.purchaseList.push(res.data)
					that.form.purchase = that.purchaseList[0][0].value
					that.purchaseName = that.purchaseList[0][0].label
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
			purposeConfirm(e) {
				that.form.purpose = e.value[0].value
				that.purposeName = e.value[0].label
				that.showPurpose = false
			},
			packConfirm(e){
				that.form.pack = e.value[0].value
				that.packName = e.value[0].label
				if(e.value[0].value == 'bags'){
					that.form.amountUnit = '袋'
					that.form.priceUnit = '元/袋'
				}
				if(e.value[0].value == 'bottled'){
					that.form.amountUnit = '瓶'
					that.form.priceUnit = '元/瓶'
				}
				if(e.value[0].value == 'barrel'){
					that.form.amountUnit = '桶'
					that.form.priceUnit = '元/桶'
				}
				if(e.value[0].value == 'bulk'){
					that.form.amountUnit = '包'
					that.form.priceUnit = '元/斤'
				}
				that.specList = []
				getUtil().then(res => {
					let arr = res.data
					arr.forEach((value) => {
						value['label'] = value['label'] + '/' + that.form.amountUnit
					})
					that.specList.push(arr)
					that.form.specUnit = that.specList[0][0].label
				})
				that.showPack = false
			},
			specConfirm(e) {
				that.form.specUnit = e.value[0].label
				that.showSpec = false
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
			},
		}
	}
</script>

<style lang="less">
	.medication-form{
		.content {
			border-top: 10px solid #F3F4F5;
			padding: 10px;
		}
		.u-form-item__body{
			padding: 16px 0 !important;
		}
		.u-form-item:nth-child(7),.u-form-item:nth-child(8),.u-form-item:nth-child(9){
			.item__body__right__content__icon{
				width: 100px;
				border: 1px solid #DADBDE;
				height: 30px;
				.u-input{
					height: 30px;
				}
				.u-icon__icon{
					top: -24px !important;
					right: -84px;
				}
				
			}
		} 
		.u-form-item:nth-child(8),.u-form-item:nth-child(9){
			.item__body__right__content__icon{
				width: 100px;
				border: 1px solid #DADBDE;
				height: 30px;
				.u-input{
					height: 30px;
				}
				
			}
		} 
	}
</style>
