<template>
	<view class="warn-detail">
		<u-form labelPosition="left" :model="form">
			<u-form-item label="所属塘口:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.pondName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="告警类型:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.warningType" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="告警时间:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.warningTime" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="告警内容:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.warningContent" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import { getWarn } from '@/api/admin/union'
	export default{
		data(){
			return{
				id: '',
				form:{
					pondName:'',
					warningType: '',
					warningTime: '',
					warningContent: ''
				}
			}
		},
		onLoad(option){
			this.id = option.id
		},
		mounted(){
			this.loadData()
		},
		methods:{
			loadData(){
				getWarn(this.id).then(res => {
					this.form = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.warn-detail{
		padding: 10px 0 10px 20px;
		.u-form-item__body{
			padding: 16px 0 !important;
		}
		.u-form-item__body__right{
			margin-right: 20px;
		}
	}
</style>
