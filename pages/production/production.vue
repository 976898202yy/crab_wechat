<template>
	<view class="production">
		<input-picker ref="pickerRef" @site="getSite" @pond="getPond"></input-picker>
		<view class="production-card">
			<image src="../../static/demo.png" mode="right"
				style="width: 100%; height: 180px;border-top-left-radius: 8px;border-top-right-radius: 8px;"></image>
			<!-- <view class="card-info">
				<text>螃蟹养殖技术，河蟹隶属甲壳纲，绒螯蟹属，是一种大型的甲壳动物，身体分21节，由于头部和胸部各节相互愈合，因此全身分为头胸部和腹部。</text>
			</view> -->
		</view>
		<view class="production-bottom">
			<view class="d-flex" style="justify-content: center;">
				<view class="btn" style="margin-right: 24px;" @click="actionSheet = true">添加</view>
				<view class="btn" @click="toHistory">历史</view>
			</view>
			<view class="calendar d-flex" style="justify-content: space-between;">
				<u-icon name="arrow-left" color="#41454E" size="14"></u-icon>
				<scroll-view scroll-x="true" :scroll-left="scrollLeft" scroll-with-animation="true" style="width: 90%;height: 70px;white-space: nowrap;">
					<view class="calendar-box d-flex">
						<view class="calendar-list d-flex" v-for="(date,index) in dateList" :key="index">
							<view class="calendar-item" :class="dateCurrentStr==date.id ? 'active' : ''" @click="chooseDate(date.id)">
								<view>{{date.week}}</view>
								<view style="font-size: 26rpx;">{{ date.date }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<u-icon name="arrow-right" color="#41454E" size="14"></u-icon>
			</view>
			<view>
				<uni-collapse ref="collapse" accordion="true" @change="change">
					<uni-collapse-item v-if="clear.length > 0" :border="false" :show-arrow="false" :show-animation="true" title-border="none" name="0">
						<template v-slot:title>
							<view class="info-btn" :class="changeId === '0' ? 'active' : ''">
								<text>{{title[0]}}</text>
							</view>
						</template>
						<view :style="'height:' + height + 'px'">
							<view class="list-box">
								<view class="box-item" v-for="(item, i) in clear" :key="i">
									<view class="d-flex">
										<image style="width: 61px;height: 61px;" :src="item.icon"></image>
										<view class="list-item">
											<view class="d-flex item-top">
												<view class="list-title">{{item.site}}</view>
												<view class="line"></view>
												<view class="list-title" style="padding-left: 8px;">{{item.pond}}</view>
											</view>
											<view class="text-style iten-info">
											    <text v-for="(val,index) in item.typeNum" :key="index">{{val}}</text>
											</view>
										</view>
									</view>
									<view class="d-flex around">
										<view class="text-style m-l-10">{{item.typeName}}</view>
										<view class="text-style m-l-10">操作时间：{{item.date}}</view>
										<view class="text-style">操作人：{{item.username}}</view>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item v-if="feed.length > 0" :border="false" :show-arrow="false" :show-animation="true" title-border="none" name="1">
						<template v-slot:title>
							<view class="info-btn" :class="changeId === '1' ? 'active' : ''">
								<text>{{title[1]}}</text>
							</view>
						</template>
						<view :style="'height:' + height + 'px'">
							<view class="list-box">
								<view class="box-item" v-for="(item, i) in feed" :key="i">
									<view class="d-flex">
										<image style="width: 61px;height: 61px;" :src="item.icon"></image>
										<view class="list-item">
											<view class="d-flex item-top">
												<view class="list-title">{{item.site}}</view>
												<view class="line"></view>
												<view class="list-title" style="padding-left: 8px;">{{item.pond}}</view>
											</view>
											<view class="text-style iten-info">
											    <text v-for="(val,index) in item.typeNum" :key="index">{{val}}</text>
											</view>
										</view>
									</view>
									<view class="d-flex around">
										<view class="text-style m-l-10">{{item.typeName}}</view>
										<view class="text-style m-l-10">操作时间：{{item.date}}</view>
										<view class="text-style">操作人：{{item.username}}</view>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item v-if="medicine.length > 0" :border="false" :show-arrow="false" :show-animation="true" title-border="none" name ="2">
						<template v-slot:title>
							<view class="info-btn" :class="changeId === '2' ? 'active' : ''">
								<text>{{title[2]}}</text>
							</view>
						</template>
						<view :style="'height:' + height + 'px'">
							<view class="list-box">
								<view class="box-item" v-for="(item, i) in medicine" :key="i">
									<view class="d-flex">
										<image style="width: 61px;height: 61px;" :src="item.icon"></image>
										<view class="list-item">
											<view class="d-flex item-top">
												<view class="list-title">{{item.site}}</view>
												<view class="line"></view>
												<view class="list-title" style="padding-left: 8px;">{{item.pond}}</view>
											</view>
											<view class="text-style iten-info">
											    <text v-for="(val,index) in item.typeNum" :key="index">{{val}}</text>
											</view>
										</view>
									</view>
									<view class="d-flex around">
										<view class="text-style m-l-10">{{item.typeName}}</view>
										<view class="text-style m-l-10">操作时间：{{item.date}}</view>
										<view class="text-style">操作人：{{item.username}}</view>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item v-if="capture.length > 0" :border="false" :show-arrow="false" :show-animation="true" title-border="none" name="3">
						<template v-slot:title>
							<view class="info-btn" :class="changeId === '3' ? 'active' : ''">
								<text>{{title[3]}}</text>
							</view>
						</template>
						<view :style="'height:' + height + 'px'">
							<view class="list-box">
								<view class="box-item" v-for="(item, i) in capture" :key="i">
									<view class="d-flex">
										<image style="width: 61px;height: 61px;" :src="item.icon"></image>
										<view class="list-item">
											<view class="d-flex item-top">
												<view class="list-title">{{item.site}}</view>
												<view class="line"></view>
												<view class="list-title" style="padding-left: 8px;">{{item.pond}}</view>
											</view>
											<view class="text-style iten-info">
											    <text v-for="(val,index) in item.typeNum" :key="index">{{val}}</text>
											</view>
										</view>
									</view>
									<view class="d-flex around">
										<view class="text-style m-l-10">{{item.typeName}}</view>
										<view class="text-style m-l-10">操作时间：{{item.date}}</view>
										<view class="text-style">操作人：{{item.username}}</view>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item v-if="seed.length > 0" :border="false" :show-arrow="false" :show-animation="true" title-border="none" name="4">
						<template v-slot:title>
							<view class="info-btn" :class="changeId === '4' ? 'active' : ''">
								<text>{{title[4]}}</text>
							</view>
						</template>
						<view :style="'height:' + height + 'px'">
							<view class="list-box">
								<view class="box-item" v-for="(item, i) in seed" :key="i">
									<view class="d-flex">
										<image style="width: 61px;height: 61px;" :src="item.icon"></image>
										<view class="list-item">
											<view class="d-flex item-top">
												<view class="list-title">{{item.site}}</view>
												<view class="line"></view>
												<view class="list-title" style="padding-left: 8px;">{{item.pond}}</view>
											</view>
											<view class="text-style iten-info">
											    <text v-for="(val,index) in item.typeNum" :key="index">{{val}}</text>
											</view>
										</view>
									</view>
									<view class="d-flex around">
										<view class="text-style m-l-10">{{item.typeName}}</view>
										<view class="text-style m-l-10">操作时间：{{item.date}}</view>
										<view class="text-style">操作人：{{item.username}}</view>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item ref="collapseItem5" v-if="grass.length > 0" :border="false" :show-arrow="false" :show-animation="true" title-border="none" name="5">
						<template v-slot:title>
							<view class="info-btn" :class="changeId === '5' ? 'active' : ''">
								<text>{{title[5]}}</text>
							</view>
						</template>
						<view :style="'height:' + height + 'px'">
							<view class="list-box">
								<view class="box-item" v-for="(item, i) in grass" :key="i">
									<view class="d-flex">
										<image style="width: 61px;height: 61px;" :src="item.icon"></image>
										<view class="list-item">
											<view class="d-flex item-top">
												<view class="list-title">{{item.site}}</view>
												<view class="line"></view>
												<view class="list-title" style="padding-left: 8px;">{{item.pond}}</view>
											</view>
											<view class="text-style iten-info">
											    <text v-for="(val,index) in item.typeNum" :key="index">{{val}}</text>
											</view>
										</view>
									</view>
									<view class="d-flex around">
										<view class="text-style m-l-10">{{item.typeName}}</view>
										<view class="text-style m-l-10">操作时间：{{item.date}}</view>
										<view class="text-style">操作人：{{item.username}}</view>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
				<view v-if="clear.length == 0 && feed.length == 0 && medicine.length == 0 && capture.length == 0 && seed.length == 0 && grass.length == 0">
					<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" width="90" height="90" text="暂无数据"></u-empty>
				</view>
			</view>
		</view>
		<u-action-sheet :show="actionSheet" :round="24" @close="actionSheet = false">
			<view class="d-flex sheet-list">
				<view class="sheet-list-item" v-for="(item, i) in iconList" :key="i" @click="toForm(item.router)">
					<image style="width: 61px; height: 61px;margin-bottom: 10px;" :src="item.img" mode=""></image>
					<view>{{item.text}}</view>				
				</view>
			</view>
			<u-icon size="40" color="#979797" name="close" @click="actionSheet = false"></u-icon>
		</u-action-sheet>
	</view>
</template>

<script>
	import { getDate, getList } from '@/api/admin/production'
	import inputPicker from '../union/component/inputPicker.vue'
	let that
	export default {
		data() {
			return {
				site: '',
				pond: '',
				pondName: '',
				dateList: [],
				actionSheet: false,
				dateCurrent: new Date(), // 正选择的当前日期
				dateCurrentStr: '', // 正选择日期的 id
				dateListArray: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				changeId: '',
				iconList:[{
					img: require("../../pagesMy/static/production-01.png"),
					text: '清塘',
					router: '../../pagesProduction/clearPondForm/form'
				},{
					img: require("../../pagesMy/static/production-02.png"),
					text: '投喂',
					router: '../../pagesProduction/feedForm/form'
				},{
					img: require("../../pagesMy/static/production-03.png"),
					text: '用药',
					router: '../../pagesProduction/medicationForm/form'
				},{
					img: require("../../pagesMy/static/production-04.png"),
					text: '捕捞',
					router: '../../pagesProduction/fishForm/form'
				},{
					img: require("../../pagesMy/static/production-04.png"),
					text: '投苗',
					router: '../../pagesProduction/castForm/form'
				},{
					img: require("../../pagesMy/static/production-04.png"),
					text: '水草',
					router: '../../pagesProduction/plantsForm/form'
				}],
				scrollLeft: 0,
				title:[],
				dataList:[],
				clear:[],
				feed:[],
				medicine:[],
				capture: [],
				seed: [],
				grass:[],
				needRefresh:false,  //是否需要刷新
				height: 0
			}
		},
		options: { styleIsolation: 'shared' },
		onLoad() {
			that = this
			// that.initDate(); // 日历组件程序
		},
		onShow() {
			this.$refs.pickerRef.loadData()
		},
		onHide() {
			for(let i = 0; i < this.$refs.collapse.$children.length; i++){
				if(this.$refs.collapse.$children[i].isOpen){
					this.$refs.collapse.$children[i].isOpen = false
				}
				this.changeId = ''
			}
		},
		components: {
			inputPicker
		},
		methods: {
			change(e){
				that.changeId = e
				that.height = 0
				if(that.changeId == 0){
					that.clear.forEach((value) => {
						value['date'] = value['date'].slice(0, 10)
						value['icon'] = require("../../pagesMy/static/production-01.png")
					})
					that.height = 115 * that.clear.length + 20
				}
				if(that.changeId == 1){
					that.feed.forEach((value) => {
						value['date'] = value['date'].slice(0, 10)
						value['icon'] = require("../../pagesMy/static/production-02.png")
					})
					that.height = 115 * that.feed.length + 20
				}
				if(that.changeId == 2){
					that.medicine.forEach((value) => {
						value['date'] = value['date'].slice(0, 10)
						value['icon'] = require("../../pagesMy/static/production-03.png")
					})
					that.height = 115 * that.medicine.length + 20
				}
				if(that.changeId == 3){
					that.capture.forEach((value) => {
						value['date'] = value['date'].slice(0, 10)
						value['icon'] = require("../../pagesMy/static/production-04.png")
					})
					that.height = 115 * that.capture.length + 20
				}
				if(that.changeId == 4){
					that.seed.forEach((value) => {
						value['date'] = value['date'].slice(0, 10)
						value['icon'] = require("../../pagesMy/static/production-04.png")
					})
					that.height = 115 * that.seed.length + 20
				}
				if(that.changeId == 5){
					that.grass.forEach((value) => {
						value['date'] = value['date'].slice(0, 10)
						value['icon'] = require("../../pagesMy/static/production-04.png")
					})
					that.height = 115 * that.grass.length + 20
				}
			},
			loadData(){
				getDate().then(res => {
					let d = new Date();
					let year = d.getFullYear(),
						month = this.$util.addZero(d.getMonth() + 1),
						day = this.$util.addZero(d.getDate())
					that.dateList = res.data
					that.dateList.forEach((value) => {
						value['date'] = value['date'].slice(0,5)
					})
					that.dateCurrentStr = year + '-' + month + '-' + day
					for(let i = 0; i < that.dateList.length; i++){
						if(that.dateCurrentStr == that.dateList[i].id && i > 2){
							that.scrollLeft = 72 * (i - 1.6)
						}
					}
					that.loadList()
				})
			},
			loadList(){
				let data = {
					page: '',
					size: '',
					pond: that.pond,
					site: that.site,
					type: '',
					start: '',
					end: '',
					dayTime: that.dateCurrentStr
				}
				getList(data).then(res => {
					that.title[0] = "清塘(" + res.data.clear.length + ")"
					that.title[1] = "投喂(" + res.data.feed.length + ")"
					that.title[2] = "用药(" + res.data.medicine.length + ")"
					that.title[3] = "捕捞(" + res.data.capture.length + ")"
					that.title[4] = "投苗(" + res.data.seed.length + ")"
					that.title[5] = "水草(" + res.data.grass.length + ")"
					that.clear = res.data.clear
					that.feed = res.data.feed
					that.medicine = res.data.medicine
					that.capture = res.data.capture
					that.seed = res.data.seed
					that.grass = res.data.grass	

				})
			},
			toHistory(){
				uni.navigateTo({
					url: '../../pagesProduction/productionList/productionList'
				})
			},
			toForm(url){
				uni.navigateTo({
					url: url + '?id=' + that.site + '&pondId=' + that.pond + '&pondName=' + that.pondName
				})
			},
			getSite(e) {
				that.site = e.site
				that.needRefresh = e.needRefresh
			},
			getPond(e) {
				that.pond = e.pond
				that.pondName = e.pondName
				that.needRefresh = e.needRefresh
			},
			// 点击日历某日
			chooseDate(id) {
				that.dateCurrentStr = id;
				that.changeId = ''
				that.title = []
				that.clear = []
				that.feed = []
				that.medicine = []
				that.capture = []
				that.seed = []
				that.grass = []
				that.height = 0
				that.loadList()
			},
			// 日历部分
			// ----------------------------
			// initDate() {
			// 	let d = new Date();
			// 	let month = this.$util.addZero(d.getMonth() + 1),
			// 		day = this.$util.addZero(d.getDate());
			// 	for (let i = -5; i <= 5; i++) {
			// 		this.updateDate(this.$util.DateAddDay(d, i * 9)); //多少天之后的
			// 	}
			// 	this.dateCurrent = d;
			// 	this.dateCurrentStr = month + '-' + day;
			// },
			// 获取这周从周日到周六的日期
			// calculateDate(_date) {
			// 	var first = this.$util.FirstDayInThisWeek(_date);
			// 	var d = {
			// 		month: first.getMonth() + 1,
			// 		days: []
			// 	};
			// 	let week = {}
			// 	for (var i = 0; i < 7; i++) {
			// 		var dd = this.$util.DateAddDay(first, i);
			// 		var day = this.$util.addZero(dd.getDate()),
			// 			month = this.$util.addZero(dd.getMonth() + 1);
			// 		d.days.push({
			// 			day: day,
			// 			id: month + '月' + day,
			// 			key: month + '-' + day
			// 		});
			// 	}
			// 	for(var i in d.days){
			// 		for(var k in that.dateListArray){
			// 			d.days[i].week = that.dateListArray[i]
			// 		}
			// 	}
			// 	return d;
			// },
			// 更新日期数组数据
			// updateDate(_date, atBefore) {
			// 	let week = this.calculateDate(_date);
			// 	if (atBefore) {
			// 		this.dateList = [week].concat(this.dateList);
			// 	} else {
			// 		this.dateList = this.dateList.concat(week);
			// 	}
			// 	console.log(this.dateList)
			// },
		},
		watch:{
			needRefresh(val){
				if(val){
					that.loadList()
					that.needRefresh = false
				}
			}
		}
		
	}
</script>
<style>
	page {
		background-color: #F0F1FB;
	}
</style>
<style lang="less">
	@import url("production.less");
</style>
