<template>
	<view class="union-tabs">
		<u-tabs :list="tabs" :current="current" :activeStyle="{color:'#1A7CF9 ',fontWeight:'bold',fontSize:'28rpx'}"
			:inactiveStyle="{color:'#858E9A',fontSize:'28rpx'}" itemStyle="height: 48px;"
			@change="tabChange">
		</u-tabs>
		<!-- 实时监控 -->
		<view class="monitor" v-if="current == 0">
			<view v-if="videoList" class="d-flex center">
				<view class="arrow" style="margin-right: 6px;" @click="last"><u-icon name="arrow-left" color="#999" size="18"></u-icon></view>
				<video id="myVideo" :src="videoSrc" style="width: 100%;height: 204px;border-radius: 4px;" autoplay="autoplay" object-fit="fill" :auto-pause-if-open-native="true"></video>
				<view class="arrow" style="margin-left: 6px;" @click="next"><u-icon name="arrow-right" color="#999" size="18"></u-icon></view>
			</view>
			<view v-if="!videoList">
				<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无摄像头">
				</u-empty>
			</view>
			<u-tabs :list="dataControlTabs" :current="controlCurrent" :scrollable="false"
				:activeStyle="{color:'#333333',fontWeight:'bold',fontSize:'32rpx'}"
				:inactiveStyle="{color:'#858E9A',fontWeight:'bold',fontSize:'32rpx'}"
				itemStyle="flex: initial;height: 48px;padding: 0 16px;" @change="dataChange"></u-tabs>
			<!-- 实时数据 -->
			<view>
				<view class="tab-box d-flex" v-if="controlCurrent == 0">
					<view class="box-item environment" v-for="(item,i) in environmentList" :key="i">
						<view class="d-flex env-data">
							<view>
								<image style="width: 25px;height: 31px;" :src="item.icon" mode="aspectFit">
								</image>
							</view>
							<view class="evn-name">{{item.dataTypeName}}</view>
						</view>
						<view style="font-size: 32rpx;color:#1A7CF9;font-weight: bolder;">{{item.value}}{{item.unit}}</view>
					</view>
				</view>
				<view v-if="environmentList.length == 0 && controlCurrent == 0">
					<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无数据">
					</u-empty>
				</view>
			</view>
			<!-- 设备控制 -->
			<view>
				<view class="tab-box d-flex" v-if="controlCurrent == 1">
					<view class="box-item control" v-for="(item, i) in deviceList" :key="i">
						<image style="width: 50px;height: 58px;" :src="item.icon" mode="aspectFit"></image>
						<view class="control-name">{{item.deviceName}}</view>
						<view class="d-flex" style="justify-content: space-between;width: 170rpx;">
							<u-switch v-model="item.status" activeColor="#5ac725" size="16" style="margin-left: 4px;" @change="deviceChange" @input="deviceInput(item.deviceId)"></u-switch>
							<view style="font-size: 28rpx;">{{item.mode}}</view>
						</view>
					</view>
				</view>
				<view v-if="!deviceList && controlCurrent == 1">
					<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无设备">
					</u-empty>
				</view>
			</view>
		</view>
		<!-- 控制策略 -->
		<view class="strategy" v-if="current == 1">
			<view class="box" v-for="(item, i) in strategyList" :key="i">
				<view class="box-item strategy-item">
					<view class="d-flex space-between" style="margin-bottom: 20px;">
						<view class="equ-name">设备：{{item.deviceName}}</view>
						<u-switch v-model="item.isOn" activeColor="#07C160" size="26" style="margin-left: 4px;"
							@change="strategyChange(item.deviceId)" @input="strategyInput">
						</u-switch>
					</view>
					<view class="conditions">
						<view class="conditions-list d-flex">
							<view class="nowrap" style="color:#999999;width:70px">开启条件：</view>
							<view>
								<u-button text="增加" size="mini" type="info" @click="toStrategyForm('开启',item.deviceId)"></u-button>
							</view>
						</view>
						<view class="conditions-list d-flex" v-for="(val, index) in item.openList" :key="index">
							<view class="nowrap" style="margin-left: 70px">{{val.condition}}</view>
							<view>
								<u-button v-if="item.openList.length > 0" text="删除" size="mini" type="error"
									@click="delOpen(val.logicId,item,index)"></u-button>
							</view>
						</view>
					</view>
					<view class="conditions">
						<view class="conditions-list d-flex">
							<view class="nowrap" style="color:#999999;width:70px">关闭条件：</view>
							<view>
								<u-button text="增加" size="mini" type="info" @click="toStrategyForm('关闭',item.deviceId)"></u-button>
							</view>
						</view>
						<view class="conditions-list d-flex" v-for="(val, index) in item.closeList" :key="index">
							<view class="nowrap" style="margin-left: 70px">{{val.condition}}</view>
							<view>
								<u-button v-if="item.closeList.length > 0" text="删除" size="mini" type="error"
									@click="delClose(val.logicId,item,index)"></u-button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="strategyList.length == 0">
				<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无策略信息" marginTop="140">
				</u-empty>
			</view>
		</view>
		<!-- 巡检策略 -->
		<view class="inspection" v-if="current == 2">
			<view class="box" v-for="(item, i) in inspectionList" :key="i">
				<view class="box-item-2">
					<view class="d-flex space-between">
						<view>设备：{{item.deviceName}}</view>
						<view class="d-flex">
							<u-button text="修改" size="mini" type="primary" customStyle="margin-right: 10px;" @click="openModal(item.id,item.deviceId,item.status)"></u-button>
							<u-button :color="item.status == 0 ? '#f56c6c' : '#1AA034'" :text="item.status == 0 ? '关闭' : '开启'" size="mini" type="error" @click="updatePollStatus(item.id,item.deviceId, item.status)"></u-button>
						</view>
					</view>
					<view class="d-flex space-between" style="margin-top: 26px;">
						<view style="font-size: 28rpx;">
							<text style="color:#999999;margin-right: 10px;">巡检周期</text>
							<text>{{!item.pollingPeriod ? '无' : item.pollingPeriod + '小时'}}</text>
						</view>
						<view :class="item.status == 0 ? 'blue' : 'grey'">{{item.statusName}}</view>
					</view>
				</view>
			</view>
			<view v-if="inspectionList.length == 0">
				<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无策略信息" marginTop="140">
				</u-empty>
			</view>
		</view>
		<!-- 告警设置 -->
		<view class="set" v-if="current == 3">
			<scroll-view v-if="alarmSetList.length > 0" scroll-y @scrolltolower="scrolltolower" style="height: 73vh;">
				<view class="box" v-for="(item, i) in alarmSetList" :key="i">
					<view class="box-item-2">
						<view></view>
						<view class="d-flex space-between">
							<view>{{item.sensorTypeName}}</view>
							<view class="d-flex">
								<u-button text="修改" size="mini" type="primary" customStyle="margin-right: 10px;" @click="openSet(item.id)"></u-button>
								<u-button :color="item.state == 0 ? '#1AA034' : '#F9AE3D'" :text="item.state == 0 ? '开启' : '关闭'" size="mini" type="error" @click="updateSetStatus(item.id, item.state)" customStyle="margin-right: 10px;"></u-button>
								<u-button text="删除" size="mini" type="error" @click="delSet(item.id, i)"></u-button>
							</view>
						</view>
						<view class="d-flex space-between" style="margin-top: 26px;">
							<view style="font-size: 28rpx;">
								<text style="color:#999999;margin-right: 10px;">报警值下限</text>
								<text>{{item.min}}{{item.unit}}</text>
							</view>
							<view style="font-size: 28rpx;">
								<text style="color:#999999;margin-right: 10px;">报警值上限</text>
								<text>{{item.max}}{{item.unit}}</text>
							</view>
							<view :class="item.state == 0 ? 'blue' : 'grey'">{{item.statusName}}</view>
						</view>
					</view>
				</view>
				<u-loadmore v-if="alarmSetList.length > 9" :status="status" loading-text="努力加载中" loadmore-text="轻轻上拉" nomore-text="没有更多了" line />
			</scroll-view>
			
			<view class="set-btn">
				<u-button type="primary" shape="circle" text="增加" customStyle="width:75%" @click="toSetForm(site,pond)"></u-button>
			</view>
			<view v-if="alarmSetList.length == 0">
				<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无告警设置" marginTop="140">
				</u-empty>
			</view>
		</view>
		
		<!-- 告警记录 -->
		<view class="log" v-if="current == 4">
			<view class="log-list-top d-flex">
				<view style="width: 30%;">告警时间</view>
				<view style="width: 30%;">告警类型</view>
				<view style="width: 30%;">所属塘口</view>
			</view>
			<view class="log-list-content">
				<scroll-view v-if="alarmList.length > 0" scroll-y @scrolltolower="scrolltolower" style="height: 65vh;">
					<view class="log-list-item d-flex" v-for="(item, i) in alarmList" :key="i" @click="warnDetail(item.warningId)">
						<view class="hide" style="width: 30%;">{{item.warningTime}}</view>
						<view class="hide" style="width: 40%;">{{item.warningType}}</view>
						<view class="hide" style="width: 30%;">{{item.pondName}}</view>
					</view>
					<u-loadmore v-if="alarmList.length > 9" :status="status" loading-text="努力加载中" loadmore-text="上拉加载更多" nomore-text="没有更多了" line />
				</scroll-view>
				<view v-if="alarmList.length == 0">
					<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无告警记录"></u-empty>
				</view>
			</view>
		</view>
		<!-- 操作日志 -->
		<view class="log" v-if="current == 5">
			<view class="log-list">
				<scroll-view v-if="tableList.length > 0" scroll-y @scrolltolower="scrolltolower" style="height: 73vh;">
					<view class="list-item"  v-for="(item, i) in tableList" :key="i" @click="logDetail(item.id)">
						<view>
							<text class="left">设备名称：</text>
							<text class="right">{{item.deviceName}}</text>
						</view>
						<view>
							<text class="left">操作类型：</text>
							<text class="right">{{item.operationName}}</text>
						</view>
						<view>
							<text class="left">操作结果：</text>
							<text class="right" :class="item.result == '成功' ? '' : 'red'">{{item.result}}</text>
						</view>
						<view>
							<text class="left">操作时间：</text>
							<text class="right">{{item.operateTime}}</text>
						</view>
						<view class="bottom-right">操作人：{{item.username}}</view>
					</view>
					<u-loadmore v-if="tableList.length > 9" :status="status" loading-text="努力加载中" loadmore-text="轻轻上拉" nomore-text="没有更多了" line />
				</scroll-view>
				<view v-if="tableList.length == 0">
					<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无日志"></u-empty>
				</view>
			</view>
		</view>
		<!--  巡检策略修改弹框 -->
		<u-modal :show="showModal" showCancelButton closeOnClickOverlay confirmText="修改" @confirm="pollConfirm" @cancel="showModal = false">
			<view class="slot-content">
				<u--form labelPosition="left" :mode="inspectionForm">
					<u-form-item labelWidth="90" label="巡检周期:" prop="pollingPeriod">
						<u-input v-model="inspectionForm.pollingPeriod" type="number" border="none" placeholder="请输入巡检周期">
							<u--text text="小时" slot="suffix" type="tips"></u--text>
						</u-input>
					</u-form-item>
				</u--form>
			</view>
		</u-modal>
		<!-- 告警设置修改弹框 -->
		<u-modal :show="showSet" showCancelButton closeOnClickOverlay confirmText="修改" @confirm="setConfirm" @cancel="showSet = false">
			<view class="slot-content">
				<u--form labelPosition="left" :mode="setForm">
					<u-form-item labelWidth="90" label="报警值上限:" prop="max">
						<u-input v-model="setForm.max" type="number" border="none" placeholder="请输入报警值上限"></u-input>
					</u-form-item>
					<u-form-item labelWidth="90" label="报警值下限:" prop="min">
						<u-input v-model="setForm.min" type="number" border="none" placeholder="请输入报警值下限"></u-input>
					</u-form-item>
				</u--form>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		findDevice,
		updateStatus,
		findStrategy,
		updateStrategyStatus,
		deleteLogic,
		findPoll,
		editPoll,
		getHistoryData,
		getWarnList,
		getSetList,
		updateSetState,
		delSetList
	} from '@/api/admin/union'
	import { getWater, getAir } from '@/api/data/index'
	import { getStatus, getOpen, getClose } from '@/api/control/index'
	import { getCamera } from '@/api/control/union'
	export default {
		props: {
			site: {
				type: String,
				default: ''
			},
			pond: {
				type: String,
				default: ''
			},
			needRefresh:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tabs: [{
					name: '实时监控'
				}, {
					name: '控制策略'
				}, {
					name: '巡检策略'
				}, {
					name: '告警设置'
				},{
					name: '告警记录'
				},{
					name: '操作日志'
				}],
				current: 0,
				dataControlTabs: [{
					name: '实时数据'
				}, {
					name: '设备控制'
				}],
				controlCurrent: 0,
				videoList: [],
				videoSrc: '',
				num: 0,
				environmentList: [],  
				deviceList:[],   // 设备控制数据
				deviceStatus: "", //设备控制开关
				strategyList: [], //控制策略数据
				strategyStatus: '', //策略控制开关
				showModal: false,  // 控制巡检策略弹框
				inspectionList: [], // 巡检策略数据
				inspectionForm:{    //  巡检策略修改表单
					id: '',
					deviceId: '',
					status: '',
					pollingPeriod: ''
				},
				rules:{
					'pollingPeriod': [{
						type: 'string',
						required: true,
						message: '请输入巡检周期',
						trigger: ['blur']
					}]
				},
				alarmSetList:[],    // 告警设置列表
				showSet:false,
				setForm:{
					id: '',
					max: '',
					min: ''
				},
				setRules:{
					'max':[{
						type: 'string',
						required: true,
						message: '请输入报警值上限',
						trigger: ['blur']
					}],
					'min':[{
						type: 'string',
						required: true,
						message: '请输入报警值下限',
						trigger: ['blur']
					}]
				},
				tableList: [], // 操作日志数据
				page: 1,      // 分页
				size: 10,
				allPages:'',
				status: 'loadmore',
				alarmList: [],  // 告警记录数据
				deviceId: ''
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		mounted() {
			this.videoContext = uni.createVideoContext('myVideo',this);//创建视频实例指向video
		},
		methods: {
			last(){
				if(this.num > 0){
					this.num = this.num - 1
					this.videoSrc = this.videoList[this.num].deviceCode
				}else{
					uni.$u.toast('到顶了')
				}
			},
			next(){
				if(this.videoList && this.num < this.videoList.length - 1){
					this.num = this.num + 1
					this.videoSrc = this.videoList[this.num].deviceCode
				}else{
					uni.$u.toast('到底了')
				}
			},
			scrolltolower() {    // 日志上拉加载
				if(this.page > this.allPages){
					this.status = 'noMore'
					return
				}else{
					this.page ++
					this.status = 'loading';
					if(this.current == 3){
						setTimeout(() => {
							this.loadSet()
						},1000)
					}
					if(this.current == 4){
						setTimeout(() => {
							this.loadAlarm()
						},1000)
					}
					if(this.current == 5) {
						setTimeout(() => {
							this.loadLog()
						},1000)
					}
				}
			},
			/* 设备控制 */
			deviceChange(e) {
				if(e === true){
					getOpen(this.deviceId).then(res => {
						if (res.code == 0) {
							uni.$u.toast('操作成功')
						} else {
							uni.$u.toast('操作失败')
						}
					})
				}
				if(e === false){
					getClose(this.deviceId).then(res => {
						if (res.code == 0) {
							uni.$u.toast('操作成功')
						} else {
							uni.$u.toast('操作失败')
						}
					})
				}
			},
			deviceInput(id) {
				this.deviceId = id
			},
			/***************/
			/* 策略控制 */
			strategyChange(id) {
				updateStrategyStatus({
					deviceId: id,
					isOn: this.strategyStatus
				}).then(res => {
					if (res.code == 0) {
						uni.$u.toast('操作成功')
					} else {
						uni.$u.toast('操作失败')
						this.strategyList.forEach((value, index) => {
							value["isOn"] = !value["isOn"]
						})
					}
				})
			},
			strategyInput(value) {
				this.strategyStatus = value === true ? '1' : '0'
			},
			/***************/
			tabChange(e) {
				this.current = e.index
				this.$emit('current',this.current);
				this.page = 1
				this.allPages = ''
				this.status = 'loadmore'
				this.tableList = []
				this.alarmList = []
				this.videoList = []
				this.alarmSetList = []
				this.videoSrc = ""
				if(this.current == 0){
					this.loadVideo()
					this.getData()
				}
				if (this.current == 1) {
					this.loadData()
				}
				if(this.current == 2){
					this.loadPoll()
				}
				if(this.current == 3){
					this.loadSet()
				}
				if(this.current == 4){
					this.loadAlarm()
				}
				if(this.current == 5){
					this.loadLog()
				}
			},
			dataChange(e) {
				this.controlCurrent = e.index || 0
				this.$emit('controlCurrent',this.controlCurrent);
				if(this.controlCurrent == 0){
					this.environmentList = []
					this.getData()
				}
				if(this.controlCurrent == 1){
					this.getControl()
				}
			},
			// 跳转到表单
			toStrategyForm(type, id) {
				uni.navigateTo({
					url: '../../pagesUnion/strategyForm/strategyForm?type=' + type + '&id=' + id
				})
			},
			//策略开启条件删除
			delOpen(id,item,index) {
				uni.showModal({
				    title: '是否确定删除该条件？',
				    success: function (res) {
				        if (res.confirm) {
				            deleteLogic(id).then(res => {
				            	if (res.code == 0) {
				            		uni.$u.toast('删除成功')
									if(item.openList.length > 1){
										item.openList.splice(index, 1)
									}else{
										item.openList.splice(index, 1)
										item.openList = []
									}
				            	} else {
				            		uni.$u.toast('删除失败')
				            	}
				            })
				        } else if (res.cancel) {}
				    }
				});
			},
			//策略关闭条件删除
			delClose(id,item,index) {
				uni.showModal({
				    title: '是否确定删除该条件？',
				    success: function (res) {
				        if (res.confirm) {
				            deleteLogic(id).then(res => {
				            	if (res.code == 0) {
				            		uni.$u.toast('删除成功')
									if(item.closeList.length > 1){
										item.closeList.splice(index, 1)
									}else{
										item.closeList.splice(index, 1)
										item.closeList = []
									}
									
				            	} else {
				            		uni.$u.toast('删除失败')
				            	}
				            })
				        } else if (res.cancel) {}
				    }
				});
			},
			// 打开修改弹框
			openModal(id,deviceId,status){
				this.showModal = true
				this.inspectionForm.id = id
				this.inspectionForm.deviceId = deviceId
				this.inspectionForm.status = status ? status : '1'
			},
			// 巡检策略修改确认
			pollConfirm(){
				let flag = this.$util.checkRules(this.inspectionForm,this.rules)
				if(this.inspectionForm.pollingPeriod < 1 || this.inspectionForm.pollingPeriod > 24) return uni.$u.toast('请输入1~24之间的数字')
				if(flag){
					editPoll(this.inspectionForm).then(res => {
						if(res.code == 0){
							this.inspectionList.forEach((value, index) => {
								if(this.inspectionForm.deviceId == value['deviceId']){
									value["pollingPeriod"] = this.inspectionForm.pollingPeriod
								}
							})
							uni.$u.toast('修改成功')
							this.showModal = false
						}else{
							uni.$u.toast('修改失败')
						}
					})
				}
			},
			// 巡检策略修改状态
			updatePollStatus(id,deviceId,status){
				let that = this
				let info = status == 0 ? '关闭' : '开启'
				let state = status == 0 ? '1' : '0'
				let data = {
					id : id,
					deviceId: deviceId,
					status: state
				}
				uni.showModal({
				    title: `是否确定${info}该巡检？`,
				    success: function (res) {
				        if (res.confirm) {
				            editPoll(data).then(res => {
				            	if (res.code == 0) {
									that.inspectionList.forEach((value, index) => {
										if(id == value['id']){
											value["status"] = state
											value["statusName"] = state == 0 ? '已启动' : '未启动'
										}
									})
				            		uni.$u.toast('操作成功')
				            	} else {
				            		uni.$u.toast('操作失败')
				            	}
				            })
				        } else if (res.cancel) {}
				    }
				});
			},
			
			//  告警设置修改状态
			updateSetStatus(id, status){
				let info = status == 0 ? '开启' : '关闭'
				let state = status == 0 ? '1' : '0'
				let data = {
					id: id,
					state: state
				}
				let that = this
				uni.showModal({
				    title: `是否确定${info}该设置？`,
				    success: function (res) {
				        if (res.confirm) {
				            updateSetState(data).then(res => {
				            	if (res.code == 0) {
									that.alarmSetList.forEach((value, index) => {
										if(id == value['id']){
											value["state"] = state
											value["statusName"] = state == 0 ? '未启动' : '已启动'
										}
									})
				            		uni.$u.toast('操作成功')
				            	} else {
				            		uni.$u.toast('操作失败')
				            	}
				            })
				        } else if (res.cancel) {}
				    }
				});
			},
			//  告警设置修改
			setConfirm(){
				let flag = this.$util.checkRules(this.setForm,this.setRules)
				if(flag){
					updateSetState(this.setForm).then(res => {
						if(res.code == 0){
							this.alarmSetList.forEach((value, index) => {
								if(this.setForm.id == value['id']){
									value["max"] = this.setForm.max
									value["min"] = this.setForm.min
								}
							})
							uni.$u.toast('修改成功')
							this.showSet = false
						}else{
							uni.$u.toast('修改失败')
						}
					})
				}
			},
			// 告警设置修改
			openSet(id){
				this.showSet = true
				this.setForm.id = id
			},
			//告警设置删除
			delSet(id,index){
				let that = this
				uni.showModal({
				    title: '是否确定删除该设置？',
				    success: function (res) {
				        if (res.confirm) {
				            delSetList(id).then(res => {
				            	if (res.code == 0) {
				            		uni.$u.toast('删除成功')
									if(that.alarmSetList.length > 1){
										that.alarmSetList.splice(index, 1)
									}else{
										that.alarmSetList.splice(index, 1)
										that.alarmSetList = []
									}
				            	} else {
				            		uni.$u.toast('删除失败')
				            	}
							})
				        } else if (res.cancel) {}
				    }
				});
			},
			
			toSetForm(siteId,pond){
				uni.navigateTo({
					url: '../../pagesUnion/alarmSetForm/alarmSetForm?siteId=' + siteId + '&pondId=' + pond
				})
			},
			logDetail(id){
				uni.navigateTo({
					url: '../../pagesUnion/logDetail/detail?id=' + id
				})
			},
			warnDetail(id){
				uni.navigateTo({
					url: '../../pagesUnion/warnDetail/detail?id=' + id
				})
			},
			getData(){             //获取实时数据
				getWater(this.pond).then(res => {
					this.environmentList = res.data
					if (this.environmentList) {
						this.environmentList.forEach((value, index) => {
							value["icon"] = this.iconResult(value["sensorType"])
							if(value["unit"] == null){
								value["unit"] = ''
							}
						})
					}
				})
				getAir(this.pond).then(res => {
					let list = [{
						icon: require("../../../static/temperature.png"),
						dataTypeName: '大气温度',
						value: '19',
						unit: '℃'
					},{
						icon: require("../../../static/humidity.png"),
						dataTypeName: '大气湿度',
						value: '56',
						unit: '%RH'
					},{
						icon: require("../../../static/pressure.png"),
						dataTypeName: '大气压力',
						value: '1009',
						unit: '百帕'
					},{
						icon: require("../../../static/wind-speed.png"),
						dataTypeName: '风速',
						value: '3-4',
						unit: '级'
					},{
						icon: require("../../../static/direction.png"),
						dataTypeName: '风向',
						value: '东南风',
						unit: ''
					},{
						icon: require("../../../static/humidity.png"),
						dataTypeName: '雨量',
						value: '0.0',
						unit: 'mm'
					},{
						icon: require("../../../static/radiation.png"),
						dataTypeName: '太阳辐射',
						value: '219',
						unit: 'mwh'
					}]
					this.environmentList = this.environmentList.concat(list)
					// let list = res.data
					// if (list) {
					// 	list.forEach((value, index) => {
					// 		value["icon"] = this.iconResult(value["sensorType"])
					// 		if(value["unit"] == null){
					// 			value["unit"] = ''
					// 		}
					// 	})
					// 	this.environmentList = this.environmentList.concat(list)
					// }
				})
			},
			getControl(){                //获取设备控制
				getStatus(this.pond).then(res => {
					this.deviceList = res.data
					if (this.deviceList) {
						this.deviceList.forEach((value, index) => {
							value["icon"] = this.iconResult(value["deviceType"])
							value["status"] = value["status"] == '开启' ? true : false
						})
					}
				})
			},
			loadVideo(){               // 获取实时监控
				getCamera(this.pond).then(res => {
					this.videoList = res.data
					if(this.videoList.length > 0){
						this.videoSrc = res.data[0].deviceCode
					}
				})
			},
			loadData() {            // 获取控制策略
				let data = {
					siteId: this.site || '',
					pondId: this.pond || '',
				}
				findStrategy(data).then(res => {
					this.strategyList = res.data
					if(this.strategyList){
						this.strategyList.forEach((value, index) => {
							value["isOn"] = value["isOn"] == 1 ? true : false
						})
					}
				})
			},
			loadPoll(){                        // 获取巡检策略
				let data = {
					siteId: this.site || '',
					pondId: this.pond || '',
				}
				findPoll(data).then(res => {
					this.inspectionList = res.data
					if(this.inspectionList){
						this.inspectionList.forEach((value, index) => {
							value["statusName"] = value["status"] == 0 ? '已启动' : '未启动'
						})
					}
				})
			},
			loadSet(){                       // 获取告警设置
				let data = {
					pond: this.pond,
					current: this.page,
					size: this.size
				}
				getSetList(data).then(res => {
					if(res.data.records.length > 0){
						for(let i = 0; i < res.data.records.length; i++){
							this.alarmSetList.push(res.data.records[i])
						}
						this.alarmSetList.forEach((value, index) => {
							value["statusName"] = value["state"] == 0 ? '未启动' : '已启动'
						})
						this.allPages = res.data.pages
					}else{
						this.status = 'noMore'
					}
				})
			},
			loadLog(){                    // 获取操作日志
				let data = {
					current: this.page,
					size: this.size,
					siteId: this.site || '',
					pondId: this.pond || '',
				}
				getHistoryData(data).then(res => {	
					if(res.data.records.length > 0){
						for(let i = 0; i < res.data.records.length; i++){
							this.tableList.push(res.data.records[i])
						}
						this.allPages = res.data.pages
					}else{
						this.status = 'noMore'
					}					
				})
			},
			loadAlarm(){                  // 获取告警记录
				if(this.site || this.pond){
					this.alarmList = []
					this.page = 1
					this.size = 10
				}
				let data = {
					current: this.page,
					size: this.size,
					siteId: this.site || '',
					pondId: this.pond || '',
				}
				getWarnList(data).then(res => {
					if(res.data.records.length > 0){
						for(let i = 0; i < res.data.records.length; i++){
							this.alarmList.push(res.data.records[i])
						}
						this.allPages = res.data.pages
					}else{
						this.status = 'noMore'
					}	
				})
			},
			iconResult(type){
				switch (type) {
					case 'dox':
						return require("../../../pagesMy/static/oxygen.png")
					case 'waterTemp':
						return require("../../../pagesMy/static/temperature.png")
					case 'PH':
						return require("../../../pagesMy/static/water-quality.png")
					case 'aerator':
						return require("../../../pagesMy/static/feeding-machine.png")
				}
			},
			Initialize(){
				this.current = 0
				this.controlCurrent = 0
				this.videoContext.pause()
			}
		},
		watch:{
			needRefresh(val){
				if(val && this.current == 3){
					this.alarmSetList = []
					this.page = 1
					this.loadSet()
				}
				if(val && this.current == 4){
					this.alarmList = []
					this.page = 1
					this.loadAlarm()
				}
				if(val && this.current == 5){
					this.tableList = []
					this.page = 1
					this.loadLog()
				}
				this.needRefresh = false
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../style.less");

	.union-tabs {
		font-family: 'PingFangSC-Medium' !important;

		.d-flex {
			display: flex;
		}
		.center{
			align-items: center;
		}
		.space-between {
			justify-content: space-between;
		}

		.monitor {
			margin: 16px 0;
		}

		.nowrap {
			white-space: nowrap
		}
		.hide{
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.arrow{
			border: 1px solid #999;
			border-radius: 50%;
			padding: 1px;
			&:active{
				background-color: #999999;
			}
		}
		.tab-box {
			flex-wrap: wrap;
			justify-content: space-between;
			flex-direction: row;

			.box-item {
				margin-top: 16px;
				background-color: @background-color-white;
				border-radius: 8px;
				width: 22%;

				&:last-child:nth-child(3n + 2) {
					margin-right: calc((100% - 31%) / 2);
				}
			}

			.environment {
				padding: 10px 14px;

				.env-data {
					align-items: center;
					justify-content: space-between;
					margin-bottom: 22px;
					.evn-name{
						// overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						font-size: 27rpx;
						font-weight: bold;
					}
				}

				.unit {
					margin-top: 6px;
					font-size: 23rpx;
					color: #BBBBBB;
				}
			}

			.control {
				padding: 4px 20px 6px 10px;

				.control-name {
					font-weight: bold;
					font-size: 27rpx;
					margin-bottom: 8px;
				}
			}
		}

		.box {
			margin: 12px 0;
			border-radius: 8px;
			background-color: #fff;

			.box-item {
				padding: 20px 12px 0;
			}

			.box-item-2 {
				padding: 20px 12px;
			}
		}

		.u-empty__wrap {
			margin-top: 20px;
		}

		.strategy-item {
			.equ-name {
				font-weight: bold;
			}

			.conditions {
				font-size: 28rpx;

				.conditions-list {
					width: 100%;
					padding-bottom: 12px;
					justify-content: space-between;
				}
			}

			.u-button--info {
				background-color: #E3EFFE;
				color: #1A7CF9;
				border: none;
			}

			.u-button--error {
				background-color: #FFE5E9;
				color: #FF2442;
				border: none;
			}

			uni-button:after {
				border: 0;
			}
		}
		.set{
			position: relative;
			padding-bottom: 36px;
			.set-btn{
				position: fixed;
				bottom: 16px;
				left: 0;
				right: 0;
			}
		}
		.u-button--mini {
			padding: 12px 0;
		}

		.blue {
			color: @blue;
		}

		.red {
			color: @red  !important;
		}

		.grey {
			color: @grey;
		}

		.log {
			background-color: @font-white;
			margin-top: 16px;
			border-radius: 8px;
			font-size: 28rpx;

			.log-list-top {
				text-align: center;
				align-items: center;
				justify-content: space-around;
				padding: 10px 0;
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				background-color: @blue;
				color: @font-white;
				font-weight: bold;
			}
			
			.log-list-content{
				height: 70vh;
			}

			.log-list-item {
				padding: 12px 8px;
				align-items: center;
				justify-content: space-between;
				text-align: center;
			}
		}
		.log-list{
			height: 75vh;
			padding: 5px 20px;
			.list-item{
				padding: 10px 0;
				border-bottom: 1px solid #f5f5f5;
				.right{
					color: #2D2D2D;
					font-size: 26rpx;
				}
				.bottom-right{
					text-align: right;
					color: #C3C3C3;
				}
			}
		}

		.bold {
			font-weight: 500;
		}
		.u-text__value--tips{
			color: #606266;
		}
	}
</style>
