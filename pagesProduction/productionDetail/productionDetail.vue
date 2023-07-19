<template>
	<view class="production-detail">
		<view class="detail-top d-flex">
			<u-icon name="file-text" color="#1A7CF9" size="20"></u-icon>
			<view class="title">{{typeName}}信息</view>
		</view>
		<u-form labelPosition="left">
			<view v-if="type == 'clear'" class="content">
				<u-form-item label="塘口">
					<u--input v-model="form.pondName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="清塘日期" labelWidth="90">
					<u--input v-model="form.date" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="清塘方式" labelWidth="90">
					<u--input v-model="form.clearTypeName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.medicineName" label="用药名称" labelWidth="90">
					<u--input v-model="form.medicineName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.amount" label="用药量" labelWidth="90">
					<u--input v-model="form.amount + form.amountUnitName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.packName" label="包装方式" labelWidth="90">
					<u--input v-model="form.packName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.purchaseName" label="采购渠道" labelWidth="90">
					<u--input v-model="form.purchaseName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if='form.otherProcurement' label="其他渠道" labelWidth="90">
					<u--input v-model="form.otherProcurement" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.days" label="晒塘天数" labelWidth="90">
					<u--input v-model="form.days" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
			</view>
			<view v-if="type == 'feed'" class="content">
				<u-form-item label="塘口">
					<u--input v-model="form.pondName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="投喂日期" labelWidth="90">
					<u--input v-model="form.date" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="饲料类型" labelWidth="90">
					<u--input v-model="form.fodderTypeName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.otherFodder" label="其他饲料类型" labelWidth="120">
					<u--input v-model="form.otherFodder" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="采购价格" labelWidth="90">
					<u--input v-model="form.price + form.priceUnit" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="投喂量" labelWidth="90">
					<u--input v-model="form.amount + form.amountUnit" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="采购渠道" labelWidth="90">
					<u--input v-model="form.purchaseName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if='form.otherProcurement' label="其他渠道" labelWidth="90">
					<u--input v-model="form.otherProcurement" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
			</view>
			<view v-if="type == 'medicine'" class="content">
				<u-form-item label="塘口">
					<u--input v-model="form.pondName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="用药日期" labelWidth="90">
					<u--input v-model="form.date" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="用药目的" labelWidth="90">
					<u--input v-model="form.purposeName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.otherPurpose" label="其他用药目的" labelWidth="120">
					<u--input v-model="form.otherPurpose" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="药品名称" labelWidth="90">
					<u--input v-model="form.medicine" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="包装方式" labelWidth="90">
					<u--input v-model="form.packName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="规格" labelWidth="90">
					<u--input v-model="form.spec + form.specUnit" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="用药量" labelWidth="90">
					<u--input v-model="form.amount + form.amountUnit" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="采购价格" labelWidth="90">
					<u--input v-model="form.price + form.priceUnit" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="采购渠道" labelWidth="90">
					<u--input v-model="form.purchaseName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if='form.otherProcurement' label="其他渠道" labelWidth="90">
					<u--input v-model="form.otherProcurement" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
			</view>
			<view v-if="type == 'capture'" class="content">
				<u-form-item label="塘口">
					<u--input v-model="form.pondName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="捕获日期" labelWidth="90">
					<u--input v-model="form.date" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="成蟹种类" labelWidth="90">
					<u--input v-model="form.typeName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="成蟹规格" labelWidth="90">
					<u--input v-model="form.specName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="捕获数量" labelWidth="90">
					<u--input v-model="form.number + form.numberUnitName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="价格" labelWidth="90">
					<u--input v-model="form.price + form.priceUnitName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="销售渠道" labelWidth="90">
					<u--input v-model="form.sellTypeName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if='form.otherSell' label="其他渠道" labelWidth="90">
					<u--input v-model="form.otherSell" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
			</view>
			<view v-if="type == 'seed'" class="content">
				<u-form-item label="塘口">
					<u--input v-model="form.pondName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="投苗日期" labelWidth="90">
					<u--input v-model="form.date" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="蟹苗来源" labelWidth="90">
					<u--input v-model="form.seedTypeName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.source" label="来源地" labelWidth="90">
					<u--input v-model="form.source" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="规格" labelWidth="90">
					<u--input v-model="form.spec + form.specUnit" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="投苗数量" labelWidth="90">
					<u--input v-model="form.amount + form.amountUnit" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="采购价格" labelWidth="90">
					<u--input v-model="form.price + form.priceUnitName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
			</view>
			<view v-if="type == 'grass'" class="content">
				<u-form-item label="塘口">
					<u--input v-model="form.pondName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="日期" labelWidth="90">
					<u--input v-model="form.date" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="管理类型" labelWidth="90">
					<u--input v-model="form.typeName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="种植方式" labelWidth="90">
					<u--input v-model="form.plantName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if='form.otherPlant' label="其他种植方式" labelWidth="120">
					<u--input v-model="form.otherPlant" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="水草种类" labelWidth="90">
					<u--input v-model="form.grassName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if='form.otherGrass' label="其他水草种类" labelWidth="120">
					<u--input v-model="form.otherGrass" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="种植面积占比" labelWidth="140">
					<u--input v-model="form.ratio + '%'" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="采购渠道" labelWidth="90">
					<u--input v-model="form.purchaseName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if='form.otherProcurement' label="其他渠道" labelWidth="90">
					<u--input v-model="form.otherProcurement" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.heightCut" label="割后水草高度" labelWidth="120">
					<u--input v-model="form.heightCut" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.ratioNow" label="当前面积占比" labelWidth="120">
					<u--input v-model="form.ratioNow + '%'" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item v-if="form.heightNow" label="当前水草高度" labelWidth="120">
					<u--input v-model="form.heightNow" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import { getDetail } from '@/api/admin/production'
	let that
	export default{
		data(){
			return{
				id: '',
				type: '',
				typeName: '',
				form:{},
				
			}
		},
		onLoad(option) {
			that = this
			that.id = option.id
			that.type = option.type
			that.typeName = option.name
		},
		mounted(){
			that.loadData()
		},
		methods:{
			loadData(){
				getDetail(that.id, that.type).then(res => {
					that.form = res.data
					that.form.date = that.form.date.slice(0, 10)
				})
			}
		}
	}
</script>

<style lang="less">
	.production-detail{
		padding: 12px;
		.d-flex{
			display: flex;
		}
		.title{
			font-size: 28rpx;
			color: #1A7CF9;
			margin-left: 2px;
		}
		.u-form-item__body{
			border: 1px solid #DADBDE;
			border-radius: 2px;
			padding: 10px !important;
			margin-top: 12px;
		}
	}
</style>
