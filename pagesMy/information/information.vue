<template>
	<view class="information">
		<u-form labelPosition="left" :model="form">
			<u-form-item label="头像:" labelWidth="90" prop="pond" borderBottom>
				<image style="width: 120rpx;height: 120rpx;border-radius: 50%;margin-left: 360rpx" src="../static/default.png" mode=""></image>
			</u-form-item>
			<u-form-item label="昵称:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.username" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="手机号码:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.phone" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="所属部门:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.deptName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
			<u-form-item label="角色:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.roleList[0].roleName" disabled disabledColor="#ffffff" border="none" inputAlign="right"></u--input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import { getInfo } from '@/api/admin/my'
	let that
	export default{
		data(){
			return{
				id: '',
				form:{}
			}
		},
		onLoad(option){
			that = this
			that.id = option.id
		},
		mounted(){
			that.loadData()
		},
		methods: {
			loadData(){
				getInfo(that.id).then(res => {
					that.form = res.data
				})
			}
		}
	}
</script>

<style lang="less">
.information{
	padding: 10px 0 10px 20px;
	.u-form-item__body{
		padding: 16px 0 !important;
	}
	.u-form-item__body__right{
		margin-right: 20px;
	}
}
</style>
