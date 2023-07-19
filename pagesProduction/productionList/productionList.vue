<template>
	<view class="production-list">
		<input-picker ref="pickerRef" @site="getSite" @pond="getPond"></input-picker>
		<view class="myPicker">
			<view @click="typeShow = true" style="margin-right: 10px;">
				<u-input :value="selectName" placeholder="生产类型" disabled disabledColor="#ffffff" border="surround"
					suffixIcon="arrow-down-fill" suffixIconStyle="color:#1A7CF9"></u-input>
			</view>
			<view @click="showStartTime = true">
				<u-input v-model="startTime" disabled disabledColor="#ffffff" placeholder="开始时间" border="surround">
				</u-input>
			</view>
			<view style="margin:0 4px">—</view>
			<view @click="showEndTime = true">
				<u-input v-model="endTime" disabled disabledColor="#ffffff" placeholder="结束时间" border="surround">
				</u-input>
			</view>
		</view>
		<view style="margin-top: 20px;">
			<scroll-view v-if="productionList.length > 0" scroll-y @scrolltolower="scrolltolower" style="height: 75vh">
				<view class="list-box">
					<view class="box-item" v-for="(item, i) in productionList" :key="i" @click="toDetail(item.id,item.type,item.typeName)">
						<view class="d-flex" style="align-items: center;">
							<view style="text-align: center;">
								<image style="width: 61px;height: 61px;" :src="item.icon"></image>
								<view class="text-style m-l-4">{{item.typeName}}</view>
							</view>
							<view style="width: 100%">
								<view class="list-item" style="width: 96%;height: 66px;">
									<view class="d-flex item-top">
										<view class="list-title">{{item.site}}</view>
										<view class="line"></view>
										<view class="list-title" style="padding-left: 8px;">{{item.pond}}</view>
									</view>
									<view class="text-style iten-info">
									    <text v-for="(val,index) in item.typeNum" :key="index">{{val}}</text>
									</view>
								</view>
								<view class="list-item d-flex between" style="width: 92%;">
									<view class="text-style">操作时间：{{item.date}}</view>
									<view class="text-style">操作人：{{item.username}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore v-if="productionList.length > 9" :status="status" loading-text="努力加载中" loadmore-text="轻轻上拉"
					nomore-text="没有更多了" line />
			</scroll-view>
			<view v-if="productionList.length == 0">
				<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
			</view>
		</view>

		<u-picker :show="typeShow" title="生产类型" :columns="typeList" keyName="name" closeOnClickOverlay
			@cancel="typeShow = false" @confirm="typeConfirm" @close="typeShow = false"></u-picker>
		<u-datetime-picker title="开始时间" :show="showStartTime" mode="date" v-model="value1" closeOnClickOverlay
			@confirm="startConfirm" @cancel="showStartTime = false" @close="showStartTime = false"></u-datetime-picker>
		<u-datetime-picker title="结束时间" :show="showEndTime" mode="date" v-model="value1" closeOnClickOverlay
			@confirm="endConfirm" @cancel="showEndTime = false" @close="showEndTime = false"></u-datetime-picker>
	</view>
</template>

<script>
	import inputPicker from '../../pages/union/component/inputPicker.vue'
	import {
		findSite,
		findPond
	} from '@/api/admin/index'
	import {
		getList,
		getActivity
	} from '@/api/admin/production'
	let that
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				allPages: '',
				status: 'loadmore',
				needRefresh:false,  //是否需要刷新
				typeShow: false,
				selectId: '',
				selectName: '',
				typeList: [],
				startTime: '',
				endTime: '',
				showStartTime: false,
				showEndTime: false,
				value1: Number(new Date()), //  初始化时间
				site: '', //基地id
				pond: "", //塘口id
				productionList: []
			}
		},
		components: {
			inputPicker
		},
		onLoad(){
			that = this
		},
		mounted() {
			that.getSelect()
			this.$refs.pickerRef.loadData()
		},
		methods: {
			scrolltolower() { // 上拉加载
				if (that.page == that.allPages) {
					that.status = 'noMore'
					return
				} else {
					that.page = that.page + 1
					that.status = 'loading';
					setTimeout(() => {
						that.loadData()
					}, 1000)
				}
			},
			loadData() {
				let data = {
					page: that.page,
					size: that.size,
					pond: that.pond,
					site: that.site,
					type: that.selectId,
					start: that.startTime,
					end: that.endTime,
					dayTime: ''
				}
				getList(data).then(res => {
					if(res.data.data.length > 0){
						for (let i = 0; i < res.data.data.length; i++) {
							this.productionList.push(res.data.data[i])
						}
						if (this.productionList.length > 0) {
							that.productionList.forEach((value) => {
								value['date'] = value['date'].slice(0, 10)
								value['icon'] = that.resultImg(value['type'])
							})
							this.allPages = res.data.pages
						} else {
							this.status = 'noMore'
						}
					}else{
						this.productionList = []
					}
				})
			},
			getSelect() {
				getActivity().then(res => {
					that.typeList.push(res.data)
				})
			},
			getSite(e) {
				that.site = e.site
				that.needRefresh = e.needRefresh
			},
			getPond(e) {
				that.pond = e.pond
				that.needRefresh = e.needRefresh
			},
			typeConfirm(e) {
				that.selectName = e.value[0].name
				that.selectId = e.value[0].path
				that.productionList = []
				that.page = 1
				that.loadData()
				that.typeShow = false
			},
			//  开始日期选择器
			startConfirm(e) {
				that.startTime = that.result(e.value, e.mode)
				that.productionList = []
				that.page = 1
				that.loadData()
				that.showStartTime = false
			},
			endConfirm(e) {
				that.endTime = that.result(e.value, e.mode)
				that.productionList = []
				that.page = 1
				that.loadData()
				that.showEndTime = false
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
			},
			toDetail(id,type,name) {
				uni.navigateTo({
					url: '../../pagesProduction/productionDetail/productionDetail?id=' + id + '&type=' + type + '&name=' + name
				})
			},
			resultImg(type) {
				switch (type) {
					case 'clear':
						return require("../../pagesMy/static/production-01.png")
					case 'feed':
						return require("../../pagesMy/static/production-02.png")
					case 'medicine':
						return require("../../pagesMy/static/production-03.png")
					case 'capture':
						return require("../../pagesMy/static/production-04.png")
					case 'seed':
						return require("../../pagesMy/static/production-04.png")
					case 'grass':
						return require("../../pagesMy/static/production-04.png")
				}
			}
		},
		watch:{
			needRefresh(val){
				if(val){
					that.productionList = []
					that.page = 1
					that.loadData()
					that.needRefresh = false
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #ECF1FD;
	}
</style>
<style lang="less">
	.production-list {
		padding: 14px;

		.myPicker {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 10px;

			/deep/.u-input--radius {
				box-shadow: 0 2px 7px #C3D6EF;
				height: 38px;
			}
		}

		.d-flex {
			display: flex;
		}
		.line {
			border-right: 1px solid #1A7CF9;
			padding-left: 8px;
			height: 14px;
			margin-top: 4px;
		}

		.between {
			align-items: center;
			justify-content: space-between;
		}
		.m-l-4{
			margin-left: 4px;
		}

		.list-box {
			background-color: #fff;
			border-radius: 8px;

			box-shadow: 0 2px 7px #C3D6EF;
			padding: 12px;

			.box-item {
				border-bottom: 1px solid #EEEEEE;
				padding: 12px 0;

				&:last-child {
					border-bottom: 0;
				}
			}

			.text-style {
				font-size: 26rpx;
				line-height: 1.6;
				color: #A7A7A7;
			}

			.list-item {
				margin-left: 10px;

				.item-top {
					color: #1A7CF9;
					line-height: 1.6;
				}

				.list-title {
					font-size: 28rpx;
					white-space: nowrap;
					font-weight: bold;
				}
				.iten-info{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					flex-direction: row;
					width: 96%;
				}
			}
		}
	}
</style>
