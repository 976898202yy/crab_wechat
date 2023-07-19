<template>
	<view class="edit-password">
		<u-form labelPosition="left" :model="form">
			<u-form-item label="旧密码:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.oldPassword" border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="新密码:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.newPassword" :password="true" border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="确认密码:" labelWidth="90" prop="pond" borderBottom>
				<u--input v-model="form.confirmPasswprd" :password="true" border="none" clearable></u--input>
			</u-form-item>
			<u-button v-if="!form.oldPassword || !form.newPassword || !form.confirmPasswprd" disabled type="primary" text="修改" customStyle="margin: 30px auto 0;width: 80%;border-radius: 20px"></u-button>
			<u-button v-if="form.oldPassword && form.newPassword && form.confirmPasswprd" type="primary" text="修改" customStyle="margin: 30px auto 0;width: 80%;border-radius: 20px" @click="submit"></u-button>
		</u-form>
	</view>
</template>

<script>
	import { editPassword } from '@/api/admin/my'
	let that
	export default{
		data(){
			return{
				form:{
					userId: '',
					username: '',
					oldPassword:'',
					newPassword: '',
					confirmPasswprd: ''
				}
			}
		},
		onLoad(option){
			that = this
			that.form.userId = option.id
			that.form.username = option.name
		},
		methods:{
			submit(){
				editPassword(that.form).then(res => {
					if (res.code == 0) {
						uni.$u.toast('修改成功')
						setTimeout(() => {
							let pages = getCurrentPages() // 获取页面栈
							let prePage = pages[pages.length - 2] //获取上一页
							wx.navigateBack({
								delta: 1
							})
						}, 500)
					} else {
						uni.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.edit-password{
		padding: 10px 20px;
		.u-form-item__body{
			padding: 14px 0 !important;
		}
	}
</style>
