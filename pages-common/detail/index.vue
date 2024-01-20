<template>
	<view class="page" :style="scrollStyle">
		<yingbing-video autoplay ref="video" v-if="!$check.isEmptyObject(detail)" :style="scrollStyle"
			:poster="detail.list[current].img" :initialTime="initialTime" :src="detail.list[current].videourl ? detail.list[current].videourl : '123.mp4'" settings="playbackRate"
			@play="monitorPlay" @pause="monitorPause" @ended="ended" @timeupdate="timeupdate">
			<template #controls>
				<view style="position:absolute;top:0;left:0;right:0;">
					<m-navbar :borderBottom="false" bgColor="#00000080" :value="detail.list[current].name">
					</m-navbar>
				</view>
				<view class="position-absolute top-half left-half tf-half-xy text-white">
					<u-icon @click="$refs.video.play()" v-if="status == 0" name="play-right-fill" size="50"
						color="#ffffff80"></u-icon>
					<u-icon @click="$refs.video.pause()" v-else name="pause" size="50" color="#ffffff80"></u-icon>
				</view>
				<view class="d-flex a-center j-center flex-column" style="position:absolute;right:20rpx;bottom: 100px;">
					<view class="d-flex a-center j-center flex-column" @click.stop="openLike">
						<image style="width: 70rpx; height: 70rpx;"
							:src="`/static/img/common/${detail.love == 0 ? 'like' : 'like-active'}.png`"></image>
						<view class="font" :style="{color: detail.love == 0 ? '#fff': '#F73648'}">
							{{$t('点赞')}}
						</view>
					</view>
					<view class="d-flex a-center j-center flex-column mt-3" @click.stop="openCollect">
						<image style="width: 70rpx; height: 70rpx;"
							:src="`/static/img/common/${detail.collect == 0 ? 'collect' : 'collect-active'}.png`"></image>
						<view class="font" :style="{color: detail.collect == 0 ? '#fff': '#F8B33B'}">
							{{$t('追剧')}}
						</view>
					</view>
				</view>
				<view class="text-white" style="position:absolute;left:20rpx;bottom: 100px;">
					<view class="text-ellipsis5" style="width: 500rpx;">
						{{detail.info.name}}
					</view>
					<view class="text-ellipsis5 mt-2" style="width: 500rpx;">
						{{detail.info.story}}
					</view>
					<view class="d-flex a-center" @click.stop="selectEpisode">
						<span class="text-white mr-1">{{$t('选择剧集')}}</span>
						<u-icon name="arrow-right" color="#fff" size="14"></u-icon>
					</view>
				</view>
			</template>
		</yingbing-video>
		<m-popup :show="show" i18n @close="showClose" title="选择剧集">
			<m-scroll-y :isLoading="false" :scrollStyle="{height: '60vh'}" :isCustomRefresh="false">
				<view class="select w-100 d-flex flex-wrap p-3">
					<view @click="openVideo(i)" class="item hidden mt-2 d-flex flex-column position-relative"
						v-for="(item, i) in detail.list" :key="i">
						<u-image width="100%" height="420rpx" :src="item.img"></u-image>
						<view class="text-white p-2 line-h">
							{{item.name}}
						</view>
						<view v-if="current == i"
							class="position-absolute top-0 left-0 right-0 bottom-0 text-light-muted d-flex a-center j-center"
							style="background-color: #00000090;">
							{{$t('当前播放')}}
						</view>
						<view v-if="item.is_play == 0"
							class="pay d-flex a-center j-center position-absolute top-0 right-0">
							<u-image width="26rpx" height="26rpx" src="/static/img/common/pay.png"></u-image>
							<view class="pay-name ml-1 font-weight">
								{{$t('付费')}}
							</view>
						</view>
					</view>
				</view>
			</m-scroll-y>
		</m-popup>
		<!-- 购买剧集弹窗 -->
		<m-popup :show="payShow" i18n @close="payShowClose" title="购买剧集">
			<view class="d-flex flex-column p-3" style="background-color: #000;">
				<view class="money font-md text-white">
					{{$t('我的余额')}}: {{$store.state.userinfo.money}}
				</view>
				<view class="d-flex a-center text-white j-sb mt-2">
					<view class="money-btn d-flex a-center j-center flex-column py-2 px-2 main-bg-color" @click="openPayVideo(false)">
						<span class="line-h-md">{{$t('购买单集视频')}}</span>
						<span class="line-h-md">{{detail.list && detail.list[current].price}}</span>
					</view>
					<view class="money-btn d-flex a-center j-center flex-column py-2 px-2 main-bg-color" @click="openPayVideo(true)">
						<span class="line-h-md">{{$t('购买整部视频')}}</span>
						<span class="line-h-md">{{detail.info && detail.info.price}}</span>
					</view>
				</view>
				<view class="mt-4 font-weight w-100 font-md text-center" style="color: #d27804;">
					{{$t('VIP用户权益')}}
				</view>
				<view class="d-flex a-center text-white j-sb">
					<view class="font-md d-flex a-center j-center flex-column">
						<span>{{$t('VIP单集视频')}}</span>
						<span>{{detail.list && detail.list[current].vipprice}}</span>
					</view>
					<view class="font-md d-flex a-center j-center flex-column">
						<span>{{$t('VIP整部视频')}}</span>
						<span>{{detail.info && detail.info.vipprice}}</span>
					</view>
				</view>
				<view class="text-center text-danger font mt-2">
					{{$t('开通VIP尊享更多优惠福利')}}
				</view>
				<view class="btn main-bg-color d-flex a-center j-center w-100 py-2 mt-1"
				@click="$tools.Navigate.navigateTo('/pages-common/vip/index')">
					{{$t('开通会员')}}
				</view>
			</view>
		</m-popup>
		<!-- 取消收藏弹窗 -->
		<m-modal :show="collShow" title="温馨提示" i18n @cancel="collShow = false" @confirm="delCollect">
			<view class="d-flex a-center j-center">
				{{$t('确定要取消收藏吗？')}}
			</view>
		</m-modal>
		<!-- 确认购买弹窗 -->
		<m-modal :show="viewShow" title="温馨提示" i18n @cancel="viewShow = false" @confirm="openPay">
			<view class="d-flex a-center j-center">
				{{$t(payText)}}
			</view>
		</m-modal>
		<!-- 倒计时弹窗 -->
		<u-popup zIndex="999999" :show="timeShow" :overlay="false" :round="10" mode="center" @close="timeShow = false">
			<view class="time text-light-muted d-flex a-center j-center flex-column">
				<view class="font-big">
					{{time}}
				</view>
				<view class="w-100 text-center px-2">
					{{$t('3秒后自动播放下一集')}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	import {
		getVideoInfo,
	} from '@/utils/request/api/get.js'
	import {
		addCollect,
		buyVideo,
		videoLog,
		setLike
	} from '@/utils/request/api/post.js'
	export default {
		components: {
			MPopup
		},
		data() {
			return {
				query: {
					vid: 0,
					mid: 0,
					type: 0
				},
				current: 0,
				detail: {},
				status: 0,
				show: false,
				collShow: false,
				payShow: false,
				viewShow: false,
				payText: '',
				isAll: false,
				timeShow: false,
				time: 3,
				isObject: false,
				initialTime: 0,
				scheduleTime: 0,
				timeout: null
			}
		},
		onLoad(args) {
			let value = this.$tools.Navigate.receivePageData(args)
			this.isObject = this.$check.isObject(value)
			if (this.isObject) {
				this.query.vid = value.vid
				this.query.mid = value.mid
			}else {
				this.query.vid = value
			}
			this.init()
		},
		onUnload() {
			clearInterval(this.timeout)
		},
		methods: {
			// 初始化
			init() {
				this.getData()
			},
			// 获取数据
			async getData() {
				let {
					code,
					data
				} = await getVideoInfo(this.query)
				if (code == 200) {
					if (this.isObject) {
						data.list.forEach((item, i) => {
							if (item.id == this.query.mid) {
								this.current = i
							}
						})
						if (data.is_play == 0 || data.list[this.current].is_play == 0) {
							this.payShow = true
						}
					}else {
						if (data.is_play == 0 || data.list[0].is_play == 0) {
							this.payShow = true
						}
						this.query.mid = data.list[0].id
					}
					this.detail = data
				}
			},
			// 播放进度上报
			async playScheduleReport() {
				await videoLog({
					vid: this.query.vid,
					mid: this.query.mid,
					vtime: this.scheduleTime
				})
			},
			// 打开选剧集弹框
			selectEpisode() {
				this.$refs.video.pause()
				this.show = true
			},
			// 购买视频
			openPayVideo(i) {
				this.isAll = i
				if (!i) {
					this.payText = '确定购买单集视频吗？'
				} else {
					this.payText = '确定购买整部视频吗？'
				}
				this.viewShow = true
			},
			// 点赞
			async openLike() {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				if (this.detail.love == 0) {
					this.query.type = 1
				}else {
					this.query.type = 0
				}
				let { code } = await setLike(this.query)
				if (code == 200) {
					if (this.query.type == 1) {
						this.detail.love = 1
						uni.showToast({
							icon: 'none',
							title: this.$t('点赞成功')
						})
					}else{
						this.detail.love = 0
						uni.showToast({
							icon: 'none',
							title: this.$t('已取消点赞')
						})
					}
				}
			},
			// 收藏
			async openCollect() {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				if (this.detail.collect == 0) {
					this.query.type = 1
					let {
						code,
						data
					} = await addCollect(this.query)
					if (code == 200) {
						this.detail.collect = 1
						uni.showToast({
							icon: 'none',
							title: this.$t('添加收藏成功') 
						})
					}
				} else {
					this.collShow = true
				}
			},
			// 取消追剧
			async delCollect() {
				this.query.type = 0
				let {
					code,
					data
				} = await addCollect(this.query)
				if (code == 200) {
					this.detail.collect = 0
					this.collShow = false
					uni.showToast({
						icon: 'none',
						title: this.$t('取消收藏成功')
					})
				}
			},
			// 购买剧集
			async openPay() {
				// 调接口购买
				if (this.isAll) {
					this.query.type = 1
				}else {
					this.query.type = 2
					this.query.mid = this.detail.list[this.current].id
				}
				let { code, data } = await buyVideo(this.query)
				if (code == 200) {
					this.getData()
					uni.showToast({
						icon: 'none',
						title: this.$t('购买成功')
					})
				}
				this.viewShow = false
				this.payShow = false
			},
			// 点击播放剧集
			openVideo(i) {
				this.current = i
				if (this.detail.list[i].is_play == 0) {
					this.show = false
					this.payShow = true
				} else {
					this.show = false
					this.query.mid = this.detail.list[this.current].id
				}
			},
			// 播放结束事件
			ended() {
				if (this.current < this.detail.list.length - 1) {
					this.timeShow = true
					let time = setInterval(() => {
						this.time--
						if (this.time <= 0) {
							this.timeShow = false
							this.current++
							this.query.mid = this.detail.list[this.current].id
							let date = setTimeout(() => {
								this.time = 3
								clearTimeout(date)
							}, 1000)
							clearInterval(time)
						}
					}, 1000)
				}
			},
			// 关闭选集弹框
			showClose() {
				this.show = false
				this.$refs.video.play()
			},
			// 关闭购买视频弹框
			payShowClose() {
				this.payShow = false
			},
			// 监听播放事件
			monitorPlay() {
				this.status = 1
				if (this.$store.state.token) {
					clearInterval(this.timeout)
					this.timeout = setInterval(() => {
						this.playScheduleReport()
					}, 10000)
				}
			},
			// 监听暂停事件
			monitorPause() {
				this.status = 0
				if (this.$store.state.token) {
					clearInterval(this.timeout)
				}
			},
			// 监听播放进度事件
			timeupdate(e) {
				this.scheduleTime = e.currentTime
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom) - ${this.$store.state.browserFitHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {

		/deep/ .u-popup__content {
			background-color: #00000099;
		}

		.select {
			background-color: #111;

			.item {
				width: 48.5%;
				margin-right: 3%;
				background-color: #333;
				border-radius: 16rpx;

				.item-state {
					color: #EE7623;
					font-size: 24rpx;
				}

				.pay {
					padding: 0 16rpx;
					height: 44rpx;
					background: linear-gradient(90deg, #D6BCA0 0%, #FDE4CE 100%);
					border-radius: 0rpx 12rpx 0rpx 12rpx;

					.pay-name {
						font-size: 20rpx;
						color: #834E21;
					}
				}
			}

			.item:nth-child(1),
			.item:nth-child(2),
			{
			margin-top: 0 !important;
		}

		.item:nth-child(2n) {
			margin-right: 0 !important;
		}
	}
		.money-btn {
			border-radius: 20rpx;
			width: 45%;
		}
		.btn{
			border-radius: 20rpx;
			color: #6d4006;
		}

		.time {
			width: 400rpx;
			height: 280rpx;
		}
	}
</style>