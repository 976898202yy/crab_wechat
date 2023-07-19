<template>
	<view class="fish-form">
		<u-form labelPosition="left" :model="form">
			<view class="content">
				<u-form-item label="塘口:" labelWidth="90" prop="pond" borderBottom @click="showPond = true">
					<u--input v-model="pondName" disabled disabledColor="#ffffff" placeholder="请选择塘口" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="捕获日期:" labelWidth="90" prop="date" borderBottom @click="showTime = true">
					<u-input v-model="dateTime" disabled disabledColor="#ffffff" placeholder="请选择捕获日期" border="none">
					</u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="成蟹种类:" labelWidth="90" prop="type" borderBottom @click="showType = true">
					<u--input v-model="typeName" disabled disabledColor="#ffffff" placeholder="请选择成蟹种类" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="成蟹规格:" labelWidth="90" prop="spec" borderBottom @click="showSpec = true">
					<u--input v-model="specName" disabled disabledColor="#ffffff" placeholder="请选择成蟹规格" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="捕获数量:" labelWidth="90" prop="number" borderBottom>
					<u--input v-model="form.number" placeholder="请输入捕获数量" border="none"></u--input>
					<view slot="right" @click="showNumber = true">
						<u--input v-model="numberUnitName" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="价格:" labelWidth="90" prop="price" borderBottom>
					<u--input v-model="form.price" placeholder="请输入价格" border="none"></u--input>
					<view slot="right" @click="showPrice = true">
						<u--input v-model="priceUnitName" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="销售渠道:" labelWidth="90" prop="sellType" borderBottom @click="showSellType = true">
					<u--input v-model="sellName" disabled disabledColor="#ffffff" placeholder="请选择销售渠道" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item v-if="form.sellType == 'other'" prop="otherSell" borderBottom>
					<u--input v-model="form.otherSell" placeholder="请输入其他销售渠道" border="none"></u--input>
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
		<u-picker :show="showType" :columns="typeList" keyName="label" closeOnClickOverlay @cancel="showType = false"
			@confirm="typeConfirm" @close="showType = false">
		</u-picker>
		<u-picker :show="showSpec" :columns="specList" keyName="label" closeOnClickOverlay @cancel="showSpec = false"
			@confirm="specConfirm" @close="showSpec = false">
		</u-picker>
		<u-picker :show="showNumber" :columns="numberList" keyName="label" closeOnClickOverlay @cancel="showNumber = false"
			@confirm="numberConfirm" @close="showNumber = false">
		</u-picker>
		<u-picker :show="showPrice" :columns="priceList" keyName="label" closeOnClickOverlay @cancel="showPrice = false"
			@confirm="priceConfirm" @close="showPrice = false">
		</u-picker>
		<u-picker :show="showSellType" :columns="sellTypeList" keyName="label" closeOnClickOverlay @cancel="showSellType = false"
			@confirm="sellTypeConfirm" @close="showSellType = false">
		</u-picker>
	</view>
</template>

<script>
	import { findPond } from '@/api/admin/index'
	import { getCrabType, getCrabSpec, getNumberUnit, getPriceUnit, getPurchase, saveCapture } from '@/api/admin/production'
	let that
	export default{
		data(){
			return{
				dateTime: '',
				form: {
					pond: '',
					date: '',
					type: '',
					spec: '',
					number:'',
					numberUnit: '',
					price: '',
					priceUnit: '',
					sellType: '',
					otherSell: ''
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
						message: '请选择捕获日期',
						trigger: ['blur', 'change']
					}],
				},
				pondName: '',
				typeName:'',
				sellName: '',
				specName: '',
				numberUnitName: '',
				priceUnitName: '',
				showPond: false,  // 控制塘口
				PondList: [],
				showTime: false, // 控制日期
				value1: Number(new Date()), //  初始化时间
				showType:false,  // 控制成蟹种类
				typeList:[],
				showSpec: false,  // 控制成蟹规格
				specList:[],
				showNumber: false,   // 控制数量单位
				numberList:[],
				showPrice: false, // 控制价格单位
				priceList:[],
				showSellType:false,  // 控制销售渠道
				sellTypeList:[]
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
					saveCapture(this.form).then(res => {
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
				getCrabType().then(res => {
					that.typeList.push(res.data)
				})
				getCrabSpec().then(res => {
					that.specList.push(res.data)
				})
				getNumberUnit().then(res => {
					that.numberList.push(res.data)
					that.form.numberUnit = that.numberList[0][0].value
					that.numberUnitName = that.numberList[0][0].label
				})
				getPriceUnit().then(res => {
					that.priceList.push(res.data)
					that.form.priceUnit = that.priceList[0][0].value
					that.priceUnitName = that.priceList[0][0].label
				})
				getPurchase().then(res => {
					that.sellTypeList.push(res.data)
					that.form.sellType = that.sellTypeList[0][0].value
					that.sellName = that.sellTypeList[0][0].label
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
				that.typeName = e.value[0].label;
				this.showType = false
			},
			specConfirm(e){
				this.form.spec = e.value[0].value;
				that.specName = e.value[0].label;
				this.showSpec = false
			},
			numberConfirm(e){
				this.form.numberUnit = e.value[0].value;
				that.numberUnitName = e.value[0].label;
				this.showNumber = false
			},
			priceConfirm(e){
				this.form.priceUnit = e.value[0].value;
				that.priceUnitName = e.value[0].label
				this.showPrice = false
			},
			sellTypeConfirm(e){
				that.form.sellType = e.value[0].value
				that.sellName = e.value[0].label
				that.showSellType = false
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
	.fish-form{
		.content {
			border-top: 10px solid #F3F4F5;
			padding: 10px;
		}
		.u-form-item__body{
			padding: 16px 0 !important;
		}
		.u-form-item:nth-child(5),.u-form-item:nth-child(6){
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
