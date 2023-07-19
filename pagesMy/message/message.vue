<template>
	<view class="message">
		<scroll-view v-if="dataList.length > 0" scroll-y @scrolltolower="scrolltolower" style="height:100vh">
			<view>
				<view class="list-box" v-for="(item,i) in dataList" :key="i" @click="toDetail(item.msgId)">
					<view class="d-flex">
						<image style="width: 60px;height: 60px" :src="item.icon" mode=""></image>
						<view class="list-item">
							<view class="d-flex between">
								<view>{{item.type}}</view>
								<view class="d-flex" style="align-items: center;">
									<view class="text-info">{{item.createTime.slice(0, 16)}}</view>
									<u-badge v-if="item.checked == 0" :isDot="true" type="error"></u-badge>
								</view>
							</view>
							<view class="text-info">{{item.content}}</view>
						</view>
					</view>
				</view>
				<u-loadmore v-if="dataList.length > 9" :status="status" loading-text="努力加载中" loadmore-text="轻轻上拉"
					nomore-text="没有更多了" line />
			</view>
		</scroll-view>
		<view v-if="dataList.length == 0" style="margin-top: 30%;">
			<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/list.png" text="暂无消息"></u-empty>
		</view>
	</view>
</template>

<script>
	import { getMsg } from "@/api/admin/my"
	export default{
		data(){
			return{
				page:{
					size: 10,
					current: 1
				},
				pages: '',
				status: 'loadmore',
				dataList:[]
			}
		},
		onShow() {
			this.dataList.forEach((value) => {
				if(value['msgId'] == uni.getStorageSync('id')){
					value['checked'] = 1
				}
			})
		},
		mounted(){
			this.loadData();
		},
		methods:{
			scrolltolower(){
				if (this.page.current == this.pages) {
					this.status = 'noMore'
				} else {
					this.page.current ++
					this.status = 'loading';
					setTimeout(() => {
						this.loadData()
					}, 1000)
				}
			},
			toDetail(id){
				uni.navigateTo({
					url: '../../pagesMy/message/messageDetail?id=' + id
				})
			},
			loadData(){
				getMsg(this.page).then(res => {
					if(res.data.records.length > 0){
						for (let i = 0; i < res.data.records.length; i++) {
							this.dataList.push(res.data.records[i])
						}
						this.pages = res.data.pages
						if(this.dataList.length > 0) {
							this.dataList.forEach((value) => {
								value['icon'] = this.iconResult(value['type'])
							})
						}else{
							this.status = 'noMore'
						}
					}else{
						this.dataList = []
					}
				})
			},
			iconResult(type){
				switch (type) {
					case '设备异常':
						return require("../static/msg-01.png")
					case '设备离线':
						return require("../static/msg-02.png")
					case '数据异常':
						return require("../static/msg-03.png")
				}
			},
		}
	}
</script>

<style lang="less">
	.message{
		border-top: 10px solid #F3F4F5;
		padding: 10px;
		.list-box{
			padding: 16px;
			border-bottom: 1px solid #EEEEEE;
			.d-flex{
				display: flex;
			}
			.between{
				justify-content: space-between;
			}
			.list-item{
				width: 82%;
				margin-left: 10px;
				height: 60px;
				flex-direction: column;
				justify-content: space-around;
				display: flex;
				.text-info{
					font-size: 28rpx;
					color: #999999;
					margin-right: 6px;
				}
			}
		}
		.list-box:last-child{
			border-bottom: 0;
		}
	}
</style>
