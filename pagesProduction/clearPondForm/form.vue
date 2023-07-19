<template>
	<view class="clear-pond">
		<u-form labelPosition="left" :model="form">
			<view class="content">
				<u-form-item label="塘口:" labelWidth="90" prop="pond" borderBottom @click="showPond = true">
					<u--input v-model="pondName" disabled disabledColor="#ffffff" placeholder="请选择塘口" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="清塘日期:" labelWidth="90" prop="date" borderBottom @click="showTime = true">
					<u-input v-model="dateTime" disabled disabledColor="#ffffff" placeholder="请选择清塘日期" border="none">
					</u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="清塘方式:" labelWidth="90" prop="clearType" borderBottom @click="showclearType = true">
					<u--input v-model="clearTypeName" disabled disabledColor="#ffffff" placeholder="请选择清塘方式"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item v-if="form.clearType != 'sun_pond'" label="用药名称:" labelWidth="90" prop="medicine" borderBottom @click="showMedicine = true">
					<u--input v-model="medicineName" disabled disabledColor="#ffffff" placeholder="请选择用药名称"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item v-if="form.clearType != 'sun_pond'" label="用药量:" labelWidth="90" prop="amount" borderBottom>
					<u--input v-model="form.amount" placeholder="请输入用药量" border="none"></u--input>
					<view slot="right" @click="showUnit = true">
						<u--input v-model="amountUnitName" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item v-if="form.clearType != 'sun_pond'" label="包装方式:" labelWidth="90" prop="pack" borderBottom @click="showPack = true">
					<u--input v-model="packName" disabled disabledColor="#ffffff" placeholder="请选择包装方式"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item v-if="form.clearType != 'sun_pond'" label="采购渠道:" labelWidth="90" prop="purchase" borderBottom @click="showPurchase = true">
					<u--input v-model="purchaseName" disabled disabledColor="#ffffff" placeholder="请选择采购渠道"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item v-if="form.purchase == 'other' && form.clearType != 'sun_pond'" prop="otherProcurement" borderBottom>
					<u--input v-model="form.otherProcurement" placeholder="请输入其他采购渠道" border="none"></u--input>
				</u-form-item>
				<u-form-item v-if="form.clearType == 'sun_pond'" label="晒塘天数:" labelWidth="90" prop="purchase" borderBottom>
					<u--input v-model="form.days" placeholder="请输入晒塘天数" border="none"></u--input>
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
		<u-picker :show="showclearType" :columns="clearTypeList" keyName="label" closeOnClickOverlay
			@cancel="showclearType = false" @confirm="clearTypeConfirm" @close="showclearType = false">
		</u-picker>
		<u-picker :show="showMedicine" :columns="medicineList" keyName="label" closeOnClickOverlay
			@cancel="showMedicine = false" @confirm="medicineListConfirm" @close="showMedicine = false">
		</u-picker>
		<u-picker :show="showUnit" :columns="unitList" keyName="label" closeOnClickOverlay
			@cancel="showUnit = false" @confirm="unitConfirm" @close="showUnit = false">
		</u-picker>
		<u-picker :show="showPack" :columns="packList" keyName="label" closeOnClickOverlay
			@cancel="showPack = false" @confirm="packConfirm" @close="showPack = false">
		</u-picker>
		<u-picker :show="showPurchase" :columns="purchaseList" keyName="label" closeOnClickOverlay
			@cancel="showPurchase = false" @confirm="purchaseConfirm" @close="showPurchase = false">
		</u-picker>
	</view>
</template>

<script>
	let that
	import { findPond } from '@/api/admin/index'
	import { getUtil, getClearWay, getMedicine, getPack, getPurchase, saveClean } from '@/api/admin/production'
	export default {
		data() {
			return {
				id: '',
				dateTime:'',
				form: {
					pond: '',
					date: '',
					clearType: '',
					medicine: '',
					amount: '',
					amountUnit: '',
					pack: '',
					purchase: '',
					otherProcurement:'',
					days: ''
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
						message: '请选择清塘日期',
						trigger: ['blur', 'change']
					}],
				},
				pondName: '',
				clearTypeName: '',
				medicineName: '',
				amountUnitName: '',
				packName: '',
				purchaseName:'',
				showPond: false,  // 控制塘口
				PondList: [],
				showTime: false, // 控制日期
				value1: Number(new Date()), //  初始化时间
				showclearType: false,  // 控制清塘方式
				clearTypeList: [],
				showUnit: false,   //  控制单位
				unitList:[],
				showMedicine: false,   //控制用药
				medicineList:[],
				showPack: false,      // 控制包装方式
				packList:[],
				showPurchase: false,  // 控制采购渠道
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
		methods: {
			submit(){
				that.form.date = that.dateTime + ' 00:00:00'
				let flag = this.$util.checkRules(that.form,that.rules)
				if(flag){
					saveClean(this.form).then(res => {
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
				getUtil().then(res => {
					that.unitList.push(res.data)
					that.form.amountUnit = that.unitList[0][0].value
					that.amountUnitName = that.unitList[0][0].label
				})
				getClearWay().then(res => {
					that.clearTypeList.push(res.data)
					that.form.clearType = that.clearTypeList[0][0].value
					that.clearTypeName = that.clearTypeList[0][0].label
				})
				getMedicine().then(res => {
					that.medicineList.push(res.data)
					that.form.medicine = that.medicineList[0][0].value
					that.medicineName = that.medicineList[0][0].label
				})
				getPack().then(res => {
					that.packList.push(res.data)
					that.form.pack = that.packList[0][0].value
					that.packName = that.packList[0][0].label
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
			clearTypeConfirm(e) {
				that.form.clearType = e.value[0].value
				that.clearTypeName = e.value[0].label
				that.showclearType = false
			},
			dateConfirm(e) {
				that.dateTime = this.result(e.value, e.mode)
				that.showTime = false
			},
			medicineListConfirm(e){
				that.form.medicine = e.value[0].value
				that.medicineName = e.value[0].label
				that.showMedicine = false
			},
			unitConfirm(e){
				that.form.amountUnit = e.value[0].value
				that.amountUnitName = e.value[0].label
				that.showUnit = false
			},
			packConfirm(e){
				that.form.pack = e.value[0].value
				that.packName = e.value[0].label
				that.showPack = false
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
	@import url("../../style.less");

	.clear-pond {

		.content {
			border-top: 10px solid #F3F4F5;
			padding: 10px;
		}
		.u-form-item__body{
			padding: 16px 0 !important;
		}
		.u-form-item:nth-child(5){
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
	}
</style>
