<template>
	<view class="union">
		<input-picker ref="pickerRef" @site="getSite" @pond="getPond"></input-picker>
		<view class="union-content">
			<union-tabs ref="unionTabs" @current="getCurrent" @controlCurrent="getControlCurrent" :deviceList="deviceList" :site="site" :pond="pond" :needRefresh="needRefresh"></union-tabs>
		</view>
	</view>
</template>

<script>
	import inputPicker from './component/inputPicker.vue'
	import unionTabs from './component/union-tabs.vue'
	let that
	export default {
		data() {
			return {
				site: '',
				pond: '',
				deviceList:[],
				current:0,
				controlCurrent: 0,
				needRefresh:false  //是否需要刷新
			}
		},
		components: {
			inputPicker,
			unionTabs
		},
		onLoad() {
			that = this
		},
		onShow() {
			if(that.needRefresh){
				this.$refs.unionTabs.loadData()  // 调用子组件方法
				that.needRefresh = false
			}else{
				this.$refs.pickerRef.loadData()
			}
		},
		onHide() {
			// this.$refs.unionTabs.Initialize()
		},
		mounted(){
		},
		methods: {
			loadData(){
				setTimeout(() => {
					this.$refs.unionTabs.loadVideo()
					this.$refs.unionTabs.getData()
				},300)
			},
			getSite(e) {
				that.site = e.site
				that.needRefresh = e.needRefresh
			},
			getPond(e){
				that.pond = e.pond
				that.needRefresh = e.needRefresh
			},
			getCurrent(e){
				that.current = e
			},
			getControlCurrent(e){
			    that.controlCurrent = e	
			}
		},
		watch:{
			needRefresh(){
				if(that.needRefresh){
					setTimeout(() => {
						if(that.controlCurrent == 0){
							this.$refs.unionTabs.getData()
						}
						if(that.controlCurrent == 1){
							this.$refs.unionTabs.getControl()
						}
						if(that.current == 0){
							this.$refs.unionTabs.loadVideo()
						}
						if(that.current == 1){
							this.$refs.unionTabs.loadData()  // 调用子组件方法
						}
						if(that.current == 2){
							this.$refs.unionTabs.loadPoll()
						}
						that.needRefresh = false
					},500)
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
	@import url("union.less");
</style>
