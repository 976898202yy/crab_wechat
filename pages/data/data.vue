<template>
	<view class="data">
		<input-picker ref="pickerRef" @site="getSite" @pond="getPond"></input-picker>
		<u-tabs :list="tabs" :current="current" :scrollable="false" :activeStyle="{color:'#1A7CF9',fontWeight:'bold'}" :inactiveStyle="{color:'#858E9A'}" itemStyle="height: 48px;padding:0 18px" @change="change">
		</u-tabs>
		<view v-if="current == 0">
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">溶解氧</view>
					<!-- <view class="d-flex">
						<view class="title-right d-flex" style="margin-right: 10px;" @click="siteShow = true">
							<view class="name">{{siteName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" @click="pondShow = true">
							<view class="name">{{pondName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
					</view> -->
					
				</view>
				<view style="margin-top: 16px;">
					<u-subsection :list="subList" :current="subIndex1" mode="subsection" inactiveColor="#333333" activeColor="#1A7CF9" @change="subChange1"></u-subsection>
				</view>
				<view>
					<view class="box-item" v-if="chartData1.categories.length > 0">
						<qiun-data-charts type="line" :chartData="chartData1" :canvas2d="true" canvasId="lineOxygen" />
					</view>
					<view v-if="chartData1.categories.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
				
			</view>
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">水温</view>
					<!-- <view class="d-flex">
						<view class="title-right d-flex" style="margin-right: 10px;" @click="siteShow = true">
							<view class="name">{{siteName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" @click="pondShow = true">
							<view class="name">{{pondName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
					</view> -->
					
				</view>
				<view style="margin-top: 16px;">
					<u-subsection :list="subList" :current="subIndex2" mode="subsection" inactiveColor="#333333" activeColor="#1A7CF9" @change="subChange2"></u-subsection>
				</view>
				<view>
					<view class="box-item" v-if="chartData2.categories.length > 0">
						<qiun-data-charts type="line" :chartData="chartData2" :canvas2d="true" canvasId="lineWaterTemperature" />
					</view>
					<view v-if="chartData2.categories.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
			</view>
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">PH</view>
					<!-- <view class="d-flex">
						<view class="title-right d-flex" style="margin-right: 10px;" @click="siteShow = true">
							<view class="name">{{siteName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" @click="pondShow = true">
							<view class="name">{{pondName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
					</view> -->
					
				</view>
				<view style="margin-top: 16px;">
					<u-subsection :list="subList" :current="subIndex3" mode="subsection" inactiveColor="#333333" activeColor="#1A7CF9" @change="subChange3"></u-subsection>
				</view>
				<view>
					<view class="box-item" v-if="chartData3.categories.length > 0">
						<qiun-data-charts type="line" :chartData="chartData3" :canvas2d="true" canvasId="linecharts" />
					</view>
					<view v-if="chartData3.categories.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 1">
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">生产活动趋势</view>
					<!-- <view class="d-flex">
						<view class="title-right d-flex" style="margin-right: 10px;" @click="siteShow = true">
							<view class="name">{{siteName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" @click="pondShow = true">
							<view class="name">{{pondName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
					</view> -->
					
				</view>
				<view style="margin-top: 16px;">
					<u-subsection :list="subList2" :current="activityIndex1" mode="subsection" inactiveColor="#333333" activeColor="#1A7CF9" @change="activityChange1"></u-subsection>
				</view>
				<view>
					<view class="box-item" v-if="productionChart.categories.length > 0">
						<qiun-data-charts type="line" :canvas2d="true" canvasId="linecharts" :chartData="productionChart" :ontouch="true" />
					</view>
					<view v-if="productionChart.categories.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
			</view>
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">生产活动占比</view>
					<!-- <view class="d-flex">
						<view class="title-right d-flex" style="margin-right: 10px;" @click="siteShow = true">
							<view class="name">{{siteName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" @click="pondShow = true">
							<view class="name">{{pondName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
					</view> -->
					
				</view>
				<view style="margin-top: 16px;">
					<u-subsection :list="subList2" :current="activityIndex2" mode="subsection" inactiveColor="#333333" activeColor="#1A7CF9" @change="activityChange2"></u-subsection>
				</view>
				<view>
					<view class="box-item" v-if="pieData.series.length > 0">
						<qiun-data-charts type="pie" :canvas2d="true" canvasId="piecharts" :chartData="pieData" />
					</view>
					<view v-if="pieData.series.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 2">
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">市场价格趋势</view>
					<view class="d-flex">
						<view class="title-right d-flex" style="margin-right: 10px;" @click="showProvince = true">
							<view class="name">{{provinceName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" style="margin-right: 10px;" @click="showCity = true">
							<view class="name">{{cityName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" @click="showCrab = true">
							<view class="name">{{crabName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
					</view>
				</view>
				<view style="margin-top: 16px;">
					<u-subsection :list="subList2" :current="marketIndex" mode="subsection" inactiveColor="#333333" activeColor="#1A7CF9" @change="marketChange"></u-subsection>
				</view>
				<view>
					<view class="box-item" v-if="marketChart.series.length > 0">
						<qiun-data-charts type="line" :canvas2d="true" canvasId="linecharts" :chartData="marketChart" :ontouch="true" />
					</view>
					<view v-if="marketChart.series.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 3">
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">价格预测</view>					
				</view>
				<view>
					<view class="box-item" v-if="priceForecastChart.series.length > 0">
						<qiun-data-charts type="line" :canvas2d="true" canvasId="priceCharts" :chartData="priceForecastChart" :ontouch="true" />
					</view>
					<view v-if="priceForecastChart.series.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
			</view>
			<view class="chart-box">
				<view class="d-flex between">
					<view class="chart-title">产量预测</view>	
					<!-- <view class="d-flex">
						<view class="title-right d-flex" style="margin-right: 10px;" @click="siteShow = true">
							<view class="name">{{siteName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
						<view class="title-right d-flex" @click="pondShow = true">
							<view class="name">{{pondName}}</view>
							<view class="iconfont icon-xiala" style="color: #858E9A"></view>
						</view>
					</view>	 -->			
				</view>
				<view>
					<view class="box-item" v-if="productionForecastChart.series.length > 0">
						<qiun-data-charts type="line" :canvas2d="true" canvasId="productionCharts" :chartData="productionForecastChart" :ontouch="true" />
					</view>
					<view v-if="productionForecastChart.series.length == 0">
						<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据"></u-empty>
					</view>
				</view>
			</view>
		</view>
		
		<u-picker :show="siteShow" title="基地名称" :columns="siteList" keyName="siteName" closeOnClickOverlay @cancel="siteShow = false" @confirm="siteConfirm" @close="close"></u-picker>
		<u-picker :show="pondShow" title="塘口名称" :columns="pondList" keyName="name" closeOnClickOverlay @cancel="pondShow = false" @confirm="pondConfirm" @close="close"></u-picker>
		
		<u-picker :show="showProvince" title="省" :columns="provinceList" keyName="name" closeOnClickOverlay @cancel="showProvince = false" @confirm="provConfirm" @close="close"></u-picker>
		<u-picker :show="showCity" title="市" :columns="cityList" keyName="name" closeOnClickOverlay @cancel="showCity = false" @confirm="cityConfirm" @close="close"></u-picker>
		<u-picker :show="showCrab" :columns="crabList" keyName="text" closeOnClickOverlay @cancel="showCrab = false" @confirm="crabConfirm" @close="close"></u-picker>
	</view>
</template>

<script>
	import { findSite, findPond } from '@/api/admin/index'
	import { getDataLine, getActivityLine, getActivityPie, getdate } from '@/api/admin/data'
	import inputPicker from '../union/component/inputPicker.vue'
	let that
	export default{
		data(){
			return{
				current: 0,
				tabs:[{name: '监测数据'},{name: '生产数据'},{name: '市场数据'},{name: '预测数据'}],
				subList:['近一小时','近一天'],
				subList2:['近一周','近一个月'],
				subIndex1: 0,
				subIndex2: 0,
				subIndex3: 0,
				activityIndex1: 0,
				activityIndex2: 0,
				marketIndex: 0,
				site: '',   //基地id
				siteName: "",  //基地名称
				pond: "",   //塘口id
				pondName: "",  //塘口名称
				siteShow: false,
				pondShow: false,
				siteList: [],
				pondList:[],
				chartData1:{
				  categories: [],
				  series: []
				},
				chartData2:{
				  categories: [],
				  series: []
				},
				chartData3:{
				  categories: [],
				  series: []
				},
				productionChart:{   //生产活动趋势
					categories: [],
					series: []
				},
				pieData:{    //  生产活动占比
					series: []
				},
				
				// 市场假数据
				provinceList:[
					[{
						code: '320000',
						name: '江苏省'
					},{
						code: '330000',
						name: '浙江省'
					}]
				],  //  省   
				showProvince: false,
				province: '',
				provinceName: '',
				cityList:[],
				showCity: false,
				city: '',
				cityName: '',
				crabList:[
					[{
						value: '1',
						text: '公蟹'
					},{
						value: '2',
						text: '母蟹'
					}]
				],
				showCrab: false,
				crab:'',
				crabName:'',
				marketChart:{   //生产活动趋势
					categories: [],
					series: []
				},
				
				//预测假数据
				priceForecastChart:{
					categories: [],
					series: []
				},
				productionForecastChart:{
					categories: [],
					series: []
				},
				needRefresh:false,  //是否需要刷新
			}
		},
		components: {
			inputPicker
		},
		onLoad() {
			that = this
		},
		onShow(){
			// this.loadData()
			this.$refs.pickerRef.loadData()
		},
		methods:{
			loadData(){
				that.loadDetection1()
				that.loadDetection2()
				that.loadDetection3()
				// that.siteList = []
				// findSite().then(res => {
				// 	that.siteList.push(res.data);
				// 	that.site = that.siteList[0][0].site
				// 	that.siteName = that.siteList[0][0].siteName
				// 	that.pondList = []
				// 	findPond(res.data[0].site).then(res => {
				// 		that.pondList.push(res.data)
				// 		that.pond = that.pondList[0][0].pondId;
				// 		that.pondName = that.pondList[0][0].name;
				// 		that.loadDetection1()
				// 		that.loadDetection2()
				// 		that.loadDetection3()
				// 	})
				// })
			},
			getSite(e) {
				that.site = e.site
				that.needRefresh = e.needRefresh
			},
			getPond(e) {
				that.pond = e.pond
				that.needRefresh = e.needRefresh
			},
			loadDetection1(){
				let data = {
					pond: this.pond,
					beginDate: this.frontOneHour(),
					endDate: this.$util.getNowFormatHour(0),
					dataType: 'dox'
				}
				getDataLine(data).then(res => {
					this.chartData1.categories = res.data.date
					this.chartData1.series = res.data.data
				})
			},
			loadDetection2(){
				let data = {
					pond: this.pond,
					beginDate: this.frontOneHour(),
					endDate: this.$util.getNowFormatHour(0),
					dataType: 'waterTemp'
				}
				getDataLine(data).then(res => {
					this.chartData2.categories = res.data.date
					this.chartData2.series = res.data.data
				})
			},
			loadDetection3(){
				let data = {
					pond: this.pond,
					beginDate: this.frontOneHour(),
					endDate: this.$util.getNowFormatHour(0),
					dataType: 'ph'
				}
				getDataLine(data).then(res => {
					this.chartData3.categories = res.data.date
					this.chartData3.series = res.data.data
				})
			},
			loadEarnings(){    // 获取生产数据
				let data = {
					pond: this.pond,
					beginDate: this.$util.getNowFormatDate(-7),
					endDate: this.$util.getNowFormatDate(0),
				}
				getActivityLine(data).then(res => {
					this.productionChart.categories = res.data.date
					this.productionChart.series = res.data.data
				})
				getActivityPie(data).then(res => {
					this.pieData.series.push(res.data)
					this.pieData.series[0].format = "pieDemo"
				})
			},
			change(e){
				that.current = e.index
				if(that.current == 0){
					that.loadDetection1()
					that.loadDetection2()
					that.loadDetection3()
				}
				this.pieData.series = []
				if(that.current == 1){
					that.loadEarnings()
				}
				if(that.current == 2){
					getdate(7).then(res => {
						that.marketChart.categories = res.data
					})
					that.province = that.provinceList[0][0].code
					that.provinceName = that.provinceList[0][0].name
					this.crab = that.crabList[0][0].value
					this.crabName = that.crabList[0][0].text
					this.cityList = []
					if(this.province == '320000'){
						let list = [{code:'320100',name: '南京市'},{code: '320200',name: '无锡市'},{code: '320400',name: '常州市'},{code: '320500',name:'苏州市'}]
						this.cityList.push(list)
						this.city = this.cityList[0][0].code
						this.cityName = this.cityList[0][0].name
					}
					let list =  [{
						data: ["700", "680", "750", "600", "700", "710", "690", "650"],
						name: "公蟹6两"
					},{
						data: ["600", "580", "650", "500", "500", "510", "590", "550"],
						name: "公蟹5两"
					},{
						data: ["500", "480", "450", "400", "400", "410", "490", "450"],
						name: "公蟹4两"
					},{
						data: ["400", "380", "350", "300", "300", "310", "390", "350"],
						name: "公蟹3两"
					},{
						data: ["300", "280", "250", "200", "200", "210", "290", "250"],
						name: "公蟹2两"
					}]
					this.marketChart.series = list
				}
				if(that.current == 3){
					let date = []
					getdate(15).then(res => {
						date = res.data
						setTimeout(function(){
							that.priceForecastChart.categories = date
							that.priceForecastChart.series = [{
								data: ['400','450','380','410','500','550','560','440','400','450','380','410','500','550','560'],
								name: '公蟹'
							},{
								data: ['300','350','280','310','200','250','260','340','200','350','280','210','100','250','160'],
								name: '母蟹'
							}]
						},200)
						setTimeout(function(){
							that.productionForecastChart.categories = date
							that.productionForecastChart.series = [{
								data: ['1400','1450','1380','910','1600','1550','1060','1440','1200','1350','1680','1810','1500','1308','1560'],
								name: '总产量'
							}]
						},500)
					})
				}
			},
			subChange1(e){
				this.subIndex1 = e;
				if(this.subIndex1 == 0){
					this.loadDetection1()
				}
				if(this.subIndex1 == 1){
					let data = {
						pond: this.pond,
						beginDate: this.$util.getNowFormatHour(-1),
						endDate: this.$util.getNowFormatHour(0),
						dataType: 'dox'
					}
					getDataLine(data).then(res => {
						this.chartData1.categories = res.data.date
						this.chartData1.series = res.data.data
					})
				}
			},
			subChange2(e){
				this.subIndex2 = e;
				if(this.subIndex2 == 0){
					this.loadDetection2()
				}
				if(this.subIndex2 == 1){
					let data = {
						pond: this.pond,
						beginDate: this.$util.getNowFormatHour(-1),
						endDate: this.$util.getNowFormatHour(0),
						dataType: 'waterTemp'
					}
					getDataLine(data).then(res => {
						this.chartData2.categories = res.data.date
						this.chartData2.series = res.data.data
					})
				}
			},
			subChange3(e){
				this.subIndex3 = e;
				if(this.subIndex3 == 0){
					this.loadDetection3()
				}
				if(this.subIndex3 == 1){
					let data = {
						pond: this.pond,
						beginDate: this.$util.getNowFormatHour(-1),
						endDate: this.$util.getNowFormatHour(0),
						dataType: 'ph'
					}
					getDataLine(data).then(res => {
						this.chartData3.categories = res.data.date
						this.chartData3.series = res.data.data
					})
				}
			},
			activityChange1(e){
				that.activityIndex1 = e
				if(that.activityIndex1 == 0){
					let data = {
						pond: this.pond,
						beginDate: this.$util.getNowFormatDate(-7),
						endDate: this.$util.getNowFormatDate(0),
					}
					getActivityLine(data).then(res => {
						this.productionChart.categories = res.data.date
						this.productionChart.series = res.data.data
					})
				}
				if(that.activityIndex1 == 1){
					let data = {
						pond: this.pond,
						beginDate: this.$util.getNowFormatDate(-30),
						endDate: this.$util.getNowFormatDate(0),
					}
					getActivityLine(data).then(res => {
						this.productionChart.categories = res.data.date
						this.productionChart.series = res.data.data
					})
				}
			},
			activityChange2(e){
				that.activityIndex2 = e
				this.pieData.series = []
				if(that.activityIndex2 == 0){
					let data = {
						pond: this.pond,
						beginDate: this.$util.getNowFormatDate(-7),
						endDate: this.$util.getNowFormatDate(0),
					}
					getActivityPie(data).then(res => {
						this.pieData.series.push(res.data)
						this.pieData.series[0].format = "pieDemo"
					})
				}
				if(that.activityIndex2 == 1){
					let data = {
						pond: this.pond,
						beginDate: this.$util.getNowFormatDate(-30),
						endDate: this.$util.getNowFormatDate(0),
					}
					getActivityPie(data).then(res => {
						this.pieData.series.push(res.data)
						this.pieData.series[0].format = "pieDemo"
					})
				}
			},
			close(){
				this.siteShow = false
				this.pondShow = false
				this.showProvince = false
				this.showCity = false
				this.showCrab = false
			},
			// 基地选择器
			siteConfirm(e){
				let that = this
				this.site = e.value[0].site
				this.siteName = e.value[0].siteName
				that.pondList = []
				that.pondName = ''
				findPond(this.site).then(res => {
					that.pondList.push(res.data)
					if(that.pondList[0].length > 0){
						that.pond = that.pondList[0][0].pondId;
						that.pondName = that.pondList[0][0].name;
					}
				})
				this.siteShow = false
			},
			// 塘口选择器
			pondConfirm(e){
				let that = this
				this.pond = e.value[0].pondId;
				this.pondName = e.value[0].name;
				this.pondShow = false
			},
			
			//市场数据切换
			marketChange(e){
				this.marketIndex = e
				if(this.marketIndex == 0){
					getdate(7).then(res => {
						that.marketChart.categories = res.data
					})
				}
				if(this.marketIndex == 1){
					getdate(30).then(res => {
						that.marketChart.categories = res.data
					})
					this.marketChart.series = []
					if(this.crab == 1){
						let list =  [{
							data: ["700", "680", "750", "600", "700", "710", "690", "650","700", "680", "750", "600", "700", "710", "690", "650","700", "680", "750", "600", "700", "710", "690", "650","700", "680", "750", "600", "700", "710", "690", "650"],
							name: "公蟹6两"
						},{
							data: ["600", "580", "650", "500", "500", "510", "590", "550","600", "580", "650", "500", "500", "510", "590", "550","600", "580", "650", "500", "500", "510", "590", "550","600", "580", "650", "500", "500", "510", "590", "550"],
							name: "公蟹5两"
						},{
							data: ["500", "480", "450", "400", "400", "410", "490", "450","500", "480", "450", "400", "400", "410", "490", "450","500", "480", "450", "400", "400", "410", "490", "450","500", "480", "450", "400", "400", "410", "490", "450"],
							name: "公蟹4两"
						},{
							data: ["400", "380", "350", "300", "300", "310", "390", "350","400", "380", "350", "300", "300", "310", "390", "350","400", "380", "350", "300", "300", "310", "390", "350","400", "380", "350", "300", "300", "310", "390", "350"],
							name: "公蟹3两"
						},{
							data: ["300", "280", "250", "200", "200", "210", "290", "250","300", "280", "250", "200", "200", "210", "290", "250","300", "280", "250", "200", "200", "210", "290", "250","300", "280", "250", "200", "200", "210", "290", "250"],
							name: "公蟹2两"
						}]
						this.marketChart.series = list
					}
					if(this.crab == 2){
						let list =  [{
							data: ["500", "480", "450", "500", "500", "510", "490","500", "480", "450", "500", "500", "510", "490","500", "480", "450", "500", "500", "510", "490","500", "480", "450", "500", "500", "510", "490",'470','460'],
							name: "母蟹6两"
						},{
							data: ["400", "380", "350", "400", "400", "410", "390","400", "380", "350", "400", "400", "410", "390","400", "380", "350", "400", "400", "410", "390","400", "380", "350", "400", "400", "410", "390",'368','358'],
							name: "母蟹5两"
						},{
							data: ["300", "280", "250", "300", "300", "310", "290","300", "280", "250", "300", "300", "310", "290","300", "280", "250", "300", "300", "310", "290","300", "280", "250", "300", "300", "310", "290",'298','268'],
							name: "母蟹4两"
						},{
							data: ["200", "280", "250", "230", "260", "210", "290","200", "280", "250", "230", "260", "210", "290","200", "280", "250", "230", "260", "210", "290","200", "280", "250", "230", "260", "210", "290",'188','199'],
							name: "母蟹3两"
						},{
							data: ["150", "80", "150", "100", "120", "110", "90","150", "80", "150", "100", "120", "110", "90","150", "80", "150", "100", "120", "110", "90","150", "80", "150", "100", "120", "110", "90",'99','98'],
							name: "母蟹2两"
						}]
						this.marketChart.series = list
					}
				}
			},
			// 选择省
			provConfirm(e){
				this.province = e.value[0].code;
				this.provinceName = e.value[0].name;
				this.cityList = []
				this.city = ''
				this.cityName = ''
				if(this.province == '320000'){
					let list = [{code:'320100',name: '南京市'},{code: '320200',name: '无锡市'},{code: '320400',name: '常州市'},{code: '320500',name:'苏州市'}]
					this.cityList.push(list)
				}
				if(this.province == '330000'){
					let list = [{code:'330100',name: '杭州市'},{code: '330500',name: '湖州市'},{code: '330200',name: '宁波市'},{code: '320300',name:'温州市'}]
					this.cityList.push(list)
				}
				this.showProvince = false;
			},
			// 选择市
			cityConfirm(e){
				this.city = e.value[0].code
				this.cityName = e.value[0].name
				this.showCity = false
			},
			// 选择蟹
			crabConfirm(e){
				this.crab = e.value[0].value
				this.crabName = e.value[0].text
				if(e.value[0].value == 1 && this.marketIndex == 0){
					let list =  [{
						data: ["700", "680", "750", "600", "700", "710", "690"],
						name: "公蟹6两"
					},{
						data: ["600", "580", "650", "500", "500", "510", "590"],
						name: "公蟹5两"
					},{
						data: ["500", "480", "450", "400", "400", "410", "490"],
						name: "公蟹4两"
					},{
						data: ["400", "380", "350", "300", "300", "310", "390"],
						name: "公蟹3两"
					},{
						data: ["300", "280", "250", "200", "200", "210", "290"],
						name: "公蟹2两"
					}]
					this.marketChart.series = list
				}
				if(e.value[0].value == 2 && this.marketIndex == 0){
					let list =  [{
						data: ["500", "480", "450", "500", "500", "510", "490"],
						name: "母蟹6两"
					},{
						data: ["400", "380", "350", "400", "400", "410", "390"],
						name: "母蟹5两"
					},{
						data: ["300", "280", "250", "300", "300", "310", "290"],
						name: "母蟹4两"
					},{
						data: ["200", "280", "250", "230", "260", "210", "290"],
						name: "母蟹3两"
					},{
						data: ["150", "80", "150", "100", "120", "110", "90"],
						name: "母蟹2两"
					}]
					this.marketChart.series = list
				}
				this.showCrab = false
			},
			frontOneHour(){
				let d = new Date(new Date().getTime() - 1 * 60 * 60 * 1000);
				var month = d.getMonth() + 1;
				var strDate = d.getDate();
				var hour = d.getHours();
				var min = d.getMinutes();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				if(hour >= 0 && hour <= 9){
					hour = "0" + hour;
				}
				if(min >= 0 && min <= 9){
					min = "0" + min;
				}
				let datetTime = d.getFullYear() + '-' + month + '-' + strDate + ' ' + hour + ':' + min
				return datetTime
			}
		},
		watch:{
			needRefresh(){
				if(this.needRefresh){
					if(this.current == 0){
						this.loadData()
					}
					if(this.current == 1){
						that.loadEarnings()
					}
					this.needRefresh = false
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
	@import url("data.less");
</style>
