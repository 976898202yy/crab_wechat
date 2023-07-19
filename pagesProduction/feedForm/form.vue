<template>
	<view class="feed-form">
		<u-form labelPosition="left" :model="form">
			<view class="content">
				<u-form-item label="塘口:" labelWidth="90" prop="pond" borderBottom @click="showPond = true">
					<u--input v-model="pondName" disabled disabledColor="#ffffff" placeholder="请选择塘口" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="投喂日期:" labelWidth="90" prop="date" borderBottom @click="showTime = true">
					<u-input v-model="dateTime" disabled disabledColor="#ffffff" placeholder="请选择投喂日期" border="none">
					</u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="饲料类型:" labelWidth="90" prop="fodderType" borderBottom
					@click="showFodderType = true">
					<u--input v-model="fodderTypeName" disabled disabledColor="#ffffff" placeholder="请选择饲料类型"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<view v-show="form.fodderType == 'other'">
					<u-form-item prop="otherFodder" borderBottom>
						<u--input v-model="form.otherFodder" placeholder="请输入其他饲料类型" border="none"></u--input>
					</u-form-item>
				</view>
				<u-form-item label="采购价格:" labelWidth="90" prop="price" borderBottom>
					<u--input v-model="form.price" placeholder="请输入采购价格" border="none"></u--input>
					<view slot="right">
						<u--input v-model="form.priceUnit" disabled disabledColor="#ffffff" border="none">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item label="投喂量:" labelWidth="90" prop="amount" borderBottom>
					<u--input v-model="form.amount" placeholder="请输入投喂量" border="none"></u--input>
					<view slot="right">
						<u--input v-model="form.amountUnit" disabled disabledColor="#ffffff" border="none">
						</u--input>
					</view>
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
			<u-button type="primary" text="提交" customStyle="margin: 30px auto 0;width: 80%;border-radius: 20px"
				@click="submit"></u-button>
		</u-form>
		<u-picker :show="showPond" :columns="PondList" keyName="name" closeOnClickOverlay @cancel="showPond = false"
			@confirm="pondConfirm" @close="showPond = false">
		</u-picker>
		<u-datetime-picker :show="showTime" mode="date" v-model="value1" closeOnClickOverlay @confirm="dateConfirm"
			@cancel="showTime = false" @close="showTime = false"></u-datetime-picker>
		<u-picker :show="showFodderType" :columns="fodderTypeList" keyName="label" closeOnClickOverlay
			@cancel="showFodderType = false" @confirm="fodderTypeConfirm" @close="showFodderType = false">
		</u-picker>
		<u-picker :show="showPurchase" :columns="purchaseList" keyName="label" closeOnClickOverlay
			@cancel="showPurchase = false" @confirm="purchaseConfirm" @close="showPurchase = false">
		</u-picker>
	</view>
</template>

<script>
	import {
		findPond
	} from '@/api/admin/index'
	import {
		getFodder,
		getPurchase,
		saveFeed
	} from '@/api/admin/production'
	let that
	export default {
		data() {
			return {
				id: '',
				dateTime: '',
				form: {
					pond: '',
					date: '',
					fodderType: '',
					otherFodder: '',
					price: '',
					priceUnit: '元/斤',
					amount: '',
					amountUnit: '斤',
					purchase: '',
					otherProcurement: ''
				},
				rules: {
					'pond': [{
						type: 'string',
						required: true,
						message: '请选择塘口',
						trigger: ['blur', 'change']
					}],
					'date': [{
						type: 'string',
						required: true,
						message: '请选择投喂日期',
						trigger: ['blur', 'change']
					}],
				},
				pondName: '',
				fodderTypeName: '',
				purchaseName: '',
				showPond: false, // 控制塘口
				PondList: [],
				showTime: false, // 控制日期
				value1: Number(new Date()), //  初始化时间
				showFodderType: false, //控制饲料类型
				fodderTypeList: [],
				showPurchase: false, // 控制采购渠道
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
		methods: {
			submit() {
				that.form.date = that.dateTime + ' 00:00:00'
				let flag = this.$util.checkRules(that.form, that.rules)
				if (flag) {
					saveFeed(this.form).then(res => {
						if (res.code == 0) {
							uni.$u.toast('提交成功')
							setTimeout(() => {
								let pages = getCurrentPages() // 获取页面栈
								let prePage = pages[pages.length - 2] //获取上一页
								wx.navigateBack({
									delta: 1
								})
							}, 500)
						} else {
							uni.$u.toast('提交失败')
						}
					})
				}
			},
			loadData() {
				findPond(that.id).then(res => {
					that.PondList.push(res.data)
				})
				getFodder().then(res => {
					that.fodderTypeList.push(res.data)
				})
				getPurchase().then(res => {
					let list = res.data
					list.splice(2, 1)
					that.purchaseList.push(list)
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
			fodderTypeConfirm(e) {
				that.form.fodderType = e.value[0].value
				that.fodderTypeName = e.value[0].label
				that.showFodderType = false
			},
			purchaseConfirm(e) {
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
	.feed-form {
		.content {
			border-top: 10px solid #F3F4F5;
			padding: 10px;
		}

		.u-form-item__body {
			padding: 16px 0 !important;
		}

		.u-form-item:nth-child(5),
		.u-form-item:nth-child(6) {
			.item__body__right__content__icon {
				width: 100px;
				border: 1px solid #DADBDE;
				height: 30px;

				.u-input {
					height: 30px;
				}
			}
		}
	}
</style>
