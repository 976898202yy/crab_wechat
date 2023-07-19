<template>
	<view class="container">
		<view class="content-top">
			<u-swiper :list="bannerList" keyName="img" previousMargin="20" nextMargin="20" circular :autoplay="false"
				radius="14" bgColor="#1A7CF9"></u-swiper>
			<view class="uni-padding-wrap">
				<view class="uni-swiper-msg-myflex">
					<view class="msg-title">
						<view class="left-text">每日消息</view>
						<view class="left-Iocn">
							<image style="width: 12px;height: 14px;" src="../../static/hot.png" mode=""></image>
						</view>
					</view>
					<swiper class="limitp-hg" vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator class="scrool-list-item" :url="'../../pagesMy/message/messageDetail?id=' + item.msgId">{{item.content}}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="input-picker">
				<view @click="siteShow = true" style="margin-right: 10px;">
					<u-input :value="siteName" placeholder="基地名称" disabled disabledColor="#ffffff" border="surround" suffixIcon="arrow-down-fill" suffixIconStyle="color:#1A7CF9"></u-input>
				</view>
				<view @click="pondShow = true">
					<u-input :value="pondName" placeholder="塘口名称" disabled disabledColor="#ffffff" border="surround" suffixIcon="arrow-down-fill" suffixIconStyle="color:#1A7CF9"></u-input>
				</view>
			</view>
			<view class="weather">
				<view class="weather-top d-flex">
					<view class="d-flex">
						<image style="width: 35px;height:35px" :src="weather.hourly[0].icon" mode=""></image>
						<text class="tem">{{weather.hourly[0].temperature || ''}}°</text>
					</view>
					<view class="weather-top-right">
						<view>
							<text style="margin-right: 8px;">{{weather.location.name}}</text>
							<text>{{weather.date}}</text>
						</view>
						<view>
							<text style="margin-right: 8px;">{{weather.hourly[0].text}}</text>
							<text>{{weather.hourly[0].temperature || ''}}℃</text>
						</view>
					</view>
				</view>
				<view class="weather-bottom d-flex">
					<view class="weather-list" v-for="(item,i) in weather.hourly" :key="i">
						<view style="color: #999999;">{{item.time}}</view>
						<image style="width: 28px;height: 25px;margin-top: 4px;" :src="item.icon" mode="">
						</image>
						<view style="margin-left: 4px;color: #666666;">{{item.temperature}}°</view>
					</view>
				</view>
			</view>
			
			<view>
				<u-tabs :list="tabs" :current="current" :scrollable="false" :itemStyle="{height: '44px',width: '28%'}"
					:activeStyle="{color:'#333333',fontWeight:'bold'}"
					:inactiveStyle="{color:'#858E9A',fontWeight:'bold'}" @change="tabChange"></u-tabs>
				<view v-if="current == 0">
					<view class="tab-box d-flex" v-if="dataList.length > 0">
						<view class="box-item environment" v-for="(item,i) in dataList" :key="i">
							<view class="d-flex env-data">
								<view>
									<image style="width: 25px;height: 31px;" :src="item.icon" mode="aspectFit">
									</image>
								</view>
								<view class="evn-name">{{item.dataTypeName}}</view>
							</view>
							<view style="font-size: 32rpx;color:#1A7CF9;font-weight: bolder;">{{item.value}}{{item.unit}}</view>
							<!-- 
							<view class="d-flex env-data">
								<view class="evn-name">{{item.dataTypeName}}</view>
								<view style="font-size: 32rpx;color:#1A7CF9;font-weight: bolder;">{{item.value}}</view>
							</view> -->
							<!-- <view class="unit">单位：{{item.unit}}</view> -->
						</view>
					</view>
					<view v-if="dataList.length == 0" class="no-data">
						<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
					</view>	
				</view>
				<view v-if="current == 1">
					<view class="tab-box d-flex" v-if="dataList.length > 0">
						<view class="box-item environment" v-for="(item,i) in dataList" :key="i">
							<view class="d-flex env-data">
								<view>
									<image style="width: 30px;height: 31px;" :src="item.icon" mode="aspectFit">
									</image>
								</view>
								<view class="evn-name">{{item.dataTypeName}}</view>
							</view>
							<view style="font-size: 32rpx;color:#1A7CF9;font-weight: bolder;">{{item.value}}{{item.unit}}</view>
							<!-- <view style="font-size: 32rpx;color:#1A7CF9;font-weight: bolder;">{{item.value}}{{item.unit}}</view>
							<view class="d-flex env-data">
								<view class="evn-name">{{item.dataTypeName}}</view>
								<view style="font-size: 32rpx;color:#1A7CF9;font-weight: bolder;">{{item.value}}</view>
							</view>
							<view class="unit">单位：{{item.unit}}</view> -->
						</view>
					</view>
					<view v-if="dataList.length == 0" class="no-data">
						<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
					</view>	
				</view>
				<view v-if="current == 2">
					<view class="tab-box d-flex" v-if="dataList.length > 0">
						<view class="box-item control" v-for="(item, i) in dataList" :key="i">
							<image style="width: 50px;height: 58px;" :src="item.icon" mode="aspectFit"></image>
							<view class="control-name">{{item.deviceName}}</view>
							<view class="d-flex" style="justify-content: space-between;width: 170rpx;">
								<u-switch v-model="item.status" activeColor="#5ac725" size="16" @change="changeSwitch" @input="switchInput(item.deviceId)"></u-switch>
								<view style="font-size: 28rpx;">{{item.mode}}</view>
							</view>
						</view>
					</view>
					<view v-if="!dataList" class="no-data">
						<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
					</view>	
				</view>	
			</view>
		</view>
		<u-picker :show="siteShow" title="基地名称" :columns="siteList" keyName="siteName" closeOnClickOverlay @cancel="siteShow = false" @confirm="siteConfirm" @close="close"></u-picker>
		<u-picker :show="pondShow" title="塘口名称" :columns="pondList" keyName="name" closeOnClickOverlay @cancel="pondShow = false" @confirm="pondConfirm" @close="close"></u-picker>
	</view>
</template>

<script>
	import { findSite, findPond, getWeather, getMsg } from '@/api/admin/index'
	import { getWater, getAir } from '@/api/data/index'
	import { getStatus, getOpen, getClose } from '@/api/control/index'
	let that
	export default {
		data() {
			return {
				bannerList: [{
					img: require("../../static/banner-01.png")
				}, {
					img: require("../../static/banner-02.png")
				}, {
					img: require("../../static/banner-03.png")
				}], // 轮播图
				msg: [],
				site: '',   //基地id
				siteName: "",  //基地名称
				pond: "",   //塘口id
				pondName: "",  //塘口名称
				siteShow: false,
				pondShow: false,
				siteList: [],
				pondList:[],
				tem: '27',
				weather:{},
				current: 0,
				tabs: [{
					name: '环境监测'
				}, {
					name: '气象监测'
				}, {
					name: '远程控制'
				}],
				dataList: [],
				deviceId:''
			}
		},
		onLoad() {
			that = this
		},
		onShow(){
			if(uni.getStorageSync('auth')){
				that.loadData()
			}
		},
		onHide() {
			that.current = 0
		},
		methods: {
			loadData() {
				getMsg().then(res => {
					that.msg = res.data
				})
				findSite().then(res => {
					that.siteList = []
					that.siteList.push(res.data);
					if(uni.getStorageSync('site')){
						that.site = uni.getStorageSync('site')
						that.siteName = uni.getStorageSync('siteName')
					}else{
						that.site = that.siteList[0][0].site
						that.siteName = that.siteList[0][0].siteName
					}
					getWeather(res.data[0].site).then(res => {
						that.weather = res.data
						that.weather.hourly.forEach((value, index) => {
							value["icon"] = that.result(value["code"])
							value["time"] = value["time"] < '12' ? '上午'+ value["time"] + '时' : '下午' + value["time"] + '时'
						})
					})
					findPond(res.data[0].site).then(res => {
						that.pondList = []
						that.pondList.push(res.data)
						if(that.pondList[0].length > 0){
							if(uni.getStorageSync('pond')){
								that.pond = uni.getStorageSync('pond')
								that.pondName = uni.getStorageSync('pondName')
							}else{
								that.pond = that.pondList[0][0].pondId;
								that.pondName = that.pondList[0][0].name;
							}
						}
						this.loadDevice()
					})
				})
			},
			loadDevice(){
				getWater(that.pond).then(res => {
					that.dataList = res.data
					if (that.dataList) {
						that.dataList.forEach((value, index) => {
							value["icon"] = that.iconResult(value["sensorType"])
							if(value["unit"] == null){
								value["unit"] = ''
							}
						})
					}
				})
			},
			
			// 基地选择器
			siteConfirm(e){
				let that = this
				this.site = e.value[0].site
				this.siteName = e.value[0].siteName
				uni.setStorageSync('site',this.site)
				uni.setStorageSync('siteName',this.siteName)
				getWeather(this.site).then(res => {
					that.weather = res.data
					that.weather.hourly.forEach((value, index) => {
						value["icon"] = that.result(value["code"])
						value["time"] = value["time"] < '12' ? '上午'+ value["time"] + '时' : '下午' + value["time"] + '时'
					})
				})
				that.pondList = []
				that.pondName = ''
				findPond(this.site).then(res => {
					that.pondList.push(res.data)
					if(that.pondList[0].length > 0){
						that.pond = that.pondList[0][0].pondId;
						that.pondName = that.pondList[0][0].name;
					}
					this.loadDevice()
				})
				this.siteShow = false
			},
			close(){
				this.siteShow = false
				this.pondShow = false
			},
			// 塘口选择器
			pondConfirm(e){
				let that = this
				this.pond = e.value[0].pondId;
				this.pondName = e.value[0].name;
				uni.setStorageSync('pond',this.pond)
				uni.setStorageSync('pondName',this.pondName)
				this.loadDevice()
				this.pondShow = false
			},
			tabChange(e) {
				that.current = e.index
				if(that.current == 0){
					that.loadDevice()
				}
				if(that.current == 1){
					getAir(that.pond).then(res => {
						that.dataList = [{
							icon: require("../../static/temperature.png"),
							dataTypeName: '大气温度',
							value: '19',
							unit: '℃'
						},{
							icon: require("../../static/humidity.png"),
							dataTypeName: '大气湿度',
							value: '56',
							unit: '%RH'
						},{
							icon: require("../../static/pressure.png"),
							dataTypeName: '大气压力',
							value: '1009',
							unit: '百帕'
						},{
							icon: require("../../static/wind-speed.png"),
							dataTypeName: '风速',
							value: '3-4',
							unit: '级'
						},{
							icon: require("../../static/direction.png"),
							dataTypeName: '风向',
							value: '东南风',
							unit: ''
						},{
							icon: require("../../static/humidity.png"),
							dataTypeName: '雨量',
							value: '0.0',
							unit: 'mm'
						},{
							icon: require("../../static/radiation.png"),
							dataTypeName: '太阳辐射',
							value: '219',
							unit: 'mwh'
						}]
						// that.dataList = res.data
						// if (that.dataList) {
						// 	that.dataList.forEach((value, index) => {
						// 		value["icon"] = that.iconResult(value["sensorType"])
						// 		if(value["unit"] == null){
						// 			value["unit"] = ''
						// 		}
						// 	})
						// }
					})
				}
				if(that.current == 2){
					getStatus(that.pond).then(res => {
						that.dataList = res.data
						if (that.dataList) {
							that.dataList.forEach((value, index) => {
								value["icon"] = that.iconResult(value["deviceType"])
								value["status"] = value["status"] == '开启' ? true : false
							})
						}
					})
				}
			},
			switchInput(id){
				that.deviceId = id
			},
			changeSwitch(e){
				if(e === true){
					getOpen(that.deviceId).then(res => {
						if (res.code == 0) {
							uni.$u.toast('操作成功')
						} else {
							uni.$u.toast('操作失败')
						}
					})
				}
				if(e === false){
					getClose(that.deviceId).then(res => {
						if (res.code == 0) {
							uni.$u.toast('操作成功')
						} else {
							uni.$u.toast('操作失败')
						}
					})
				}
			},
			iconResult(type){
				switch (type) {
					case 'dox':
						return require("../../pagesMy/static/oxygen.png")
					case 'waterTemp':
						return require("../../pagesMy/static/temperature.png")
					case 'PH':
						return require("../../pagesMy/static/water-quality.png")
					case 'aerator':
						return require("../../pagesMy/static/feeding-machine.png")
				}
			},
			result(code){
				switch (code) {
					case '0':
						return require("../../pagesUnion/static/weather/0@1x.png")
					case '1':
						return require("../../pagesUnion/static/weather/1@1x.png")
					case '2':
						return require("../../pagesUnion/static/weather/2@1x.png")
					case '3':
						return require("../../pagesUnion/static/weather/3@1x.png")
					case '4':
						return require("../../pagesUnion/static/weather/4@1x.png")
					case '5':
						return require("../../pagesUnion/static/weather/5@1x.png")
					case '6':
						return require("../../pagesUnion/static/weather/6@1x.png")
					case '7':
						return require("../../pagesUnion/static/weather/7@1x.png")
					case '8':
						return require("../../pagesUnion/static/weather/8@1x.png")
					case '9':
						return require("../../pagesUnion/static/weather/9@1x.png")
					case '10':
						return require("../../pagesUnion/static/weather/10@1x.png")
					case '11':
						return require("../../pagesUnion/static/weather/11@1x.png")
					case '12':
						return require("../../pagesUnion/static/weather/12@1x.png")
					case '13':
						return require("../../pagesUnion/static/weather/13@1x.png")
					case '14':
						return require("../../pagesUnion/static/weather/14@1x.png")
					case '15':
						return require("../../pagesUnion/static/weather/15@1x.png")
					case '16':
						return require("../../pagesUnion/static/weather/16@1x.png")
					case '17':
						return require("../../pagesUnion/static/weather/17@1x.png")
					case '18':
						return require("../../pagesUnion/static/weather/18@1x.png")
					case '19':
						return require("../../pagesUnion/static/weather/19@1x.png")
					case '20':
						return require("../../pagesUnion/static/weather/20@1x.png")
					case '21':
						return require("../../pagesUnion/static/weather/21@1x.png")
					case '22':
						return require("../../pagesUnion/static/weather/22@1x.png")
					case '23':
						return require("../../pagesUnion/static/weather/23@1x.png")
					case '24':
						return require("../../pagesUnion/static/weather/24@1x.png")
					case '25':
						return require("../../pagesUnion/static/weather/25@1x.png")
					case '26':
						return require("../../pagesUnion/static/weather/26@1x.png")
					case '27':
						return require("../../pagesUnion/static/weather/27@1x.png")
					case '28':
						return require("../../pagesUnion/static/weather/28@1x.png")
					case '29':
						return require("../../pagesUnion/static/weather/29@1x.png")
					case '30':
						return require("../../pagesUnion/static/weather/30@1x.png")
					case '31':
						return require("../../pagesUnion/static/weather/31@1x.png")
					case '32':
						return require("../../pagesUnion/static/weather/32@1x.png")
					case '33':
						return require("../../pagesUnion/static/weather/33@1x.png")
					case '34':
						return require("../../pagesUnion/static/weather/34@1x.png")
					case '35':
						return require("../../pagesUnion/static/weather/35@1x.png")
					case '36':
						return require("../../pagesUnion/static/weather/36@1x.png")
					case '37':
						return require("../../pagesUnion/static/weather/37@1x.png")
					case '38':
						return require("../../pagesUnion/static/weather/38@1x.png")
					default:
						return require("../../pagesUnion/static/weather/99@1x.png")
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
	@import url("index.less");
</style>
