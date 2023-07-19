<template>
	<view class="cast-form">
		<u-form labelPosition="left" :model="form">
			<view class="content">
				<u-form-item label="塘口:" labelWidth="90" prop="pond" borderBottom @click="showPond = true">
					<u--input v-model="pondName" disabled disabledColor="#ffffff" placeholder="请选择塘口" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="投苗日期:" labelWidth="90" prop="date" borderBottom @click="showTime = true">
					<u-input v-model="dateTime" disabled disabledColor="#ffffff" placeholder="请选择投苗日期" border="none">
					</u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="蟹苗来源:" labelWidth="90" prop="seedType" borderBottom @click="showSeedType = true">
					<u--input v-model="seedTypeName" disabled disabledColor="#ffffff" placeholder="请选择蟹苗来源" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<view v-show="form.seedType == 'nonlocal'">
					<u-form-item label="来源地:" labelWidth="90" prop="source" borderBottom>
						<u--input v-model="form.source" placeholder="请输入来源地" border="none"></u--input>
					</u-form-item>
				</view>
				<u-form-item label="规格:" labelWidth="90" prop="spec" borderBottom>
					<u--input v-model="form.spec" placeholder="请输入规格" border="none"></u--input>
					<view slot="right">
						<u--input v-model="form.specUnit" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item label="投苗数量:" labelWidth="90" prop="amount" borderBottom>
					<u--input v-model="form.amount" placeholder="请输入投苗数量" border="none"></u--input>
					<view slot="right">
						<u--input v-model="form.amountUnit" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item label="采购价格:" labelWidth="90" prop="price" borderBottom>
					<u--input v-model="form.price" placeholder="请输入采购价格" border="none"></u--input>
					<view slot="right" @click="showPrice = true">
						<u--input v-model="priceUnitName" disabled disabledColor="#ffffff"
							border="none">
						</u--input>
					</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
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
		<u-picker :show="showSeedType" :columns="seedTypeList" keyName="label" closeOnClickOverlay @cancel="showSeedType = false"
			@confirm="seedTypeConfirm" @close="showSeedType = false">
		</u-picker>
		<u-picker :show="showPrice" :columns="priceList" keyName="label" closeOnClickOverlay @cancel="showPrice = false"
			@confirm="priceConfirm" @close="showPrice = false">
		</u-picker>
	</view>
</template>

<script>
	import { findPond } from '@/api/admin/index'
	import { getSeedType, getPriceUnit, saveSeed } from '@/api/admin/production'
	let that
	export default{
		data(){
			return{
				dateTime:'',
				form: {
					pond: '',
					date: '',
					seedType: '',
					source: '',
					spec: '',
					specUnit: '只/斤',
					amount: '',
					amountUnit: '只/亩',
					price: '',
					priceUnit: ''
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
						message: '请选择投苗日期',
						trigger: ['blur', 'change']
					}],
				},
				pondName: '',
				seedTypeName: '',
				priceUnitName: '',
				showPond: false,  // 控制塘口
				PondList: [],
				showTime: false, // 控制日期
				value1: Number(new Date()), //  初始化时间
				showSeedType: false,
				seedTypeList:[],
				showPrice: false,
				priceList: []
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
					saveSeed(this.form).then(res => {
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
				getSeedType().then(res => {
					that.seedTypeList.push(res.data)
				})
				getPriceUnit().then(res => {
					that.priceList.push(res.data)
					that.form.priceUnit = that.priceList[0][1].value
					that.priceUnitName = that.priceList[0][1].label
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
			seedTypeConfirm(e) {
				that.form.seedType = e.value[0].value
				that.seedTypeName = e.value[0].label
				that.showSeedType = false
			},
			priceConfirm(e){
				this.form.priceUnit = e.value[0].value;
				that.priceUnitName = e.value[0].label;
				this.showPrice = false
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
	.cast-form{
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
			}
		} 
		.u-form-item:nth-child(7){
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
