<template>
	<view class="detail">
		<u-form labelPosition="left" :model="form">
			<u-form-item label="设备类型:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.type" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="告警内容:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.content" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="告警时间:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.time" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import { msgDetail } from "@/api/admin/my"
	export default{
		data(){
			return{
				id: '',
				form:{
					type: '',
					content: '',
					time: ''
				}
			}
		},
		onLoad(option){
			this.id = option.id
			uni.setStorageSync('id',this.id)
		},
		mounted(){
			this.loadData()
		},
		methods:{
			loadData(){
				msgDetail(this.id).then(res => {
					this.form = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.detail{
		padding: 10px 0 10px 20px;
		.u-form-item__body{
			padding: 16px 0 !important;
		}
		.u-form-item__body__right{
			margin-right: 20px;
		}
	}
</style>
