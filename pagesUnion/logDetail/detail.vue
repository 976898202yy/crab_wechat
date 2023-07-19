<template>
	<view class="log-detail">
		<u-form labelPosition="left" :model="form">
			<u-form-item label="设备名称:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.deviceName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="操作类型:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.operationName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="操作结果:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.result" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="操作人:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.username" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="操作信息:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.msg" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="操作时间:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.operateTime" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import { getLog } from '@/api/admin/union'
	export default{
		data(){
			return{
				id: '',
				form:{
					deviceName:'',
					operationName:'',
					operateTime:'',
					result: '',
					username: '',
					msg: ''
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
				getLog(this.id).then(res => {
					this.form = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.log-detail{
		padding: 10px 0 10px 20px;
		.u-form-item__body{
			padding: 16px 0 !important;
		}
		.u-form-item__body__right{
			margin-right: 20px;
		}
	}
</style>
