<template>
	<view class="page">
		<!-- 顶部信息 -->
		<m-navbar :borderBottom="false" i18n value="page.会员中心"></m-navbar>
		<m-scroll-y placeHeight="150rpx" :isLoading="false" :scrollStyle="scrollStyle" :isCustomRefresh="false">
			<view class="p-2">
				<view class="user position-relative ">
					<view v-if="$store.state.token" class="d-flex a-center">
						<u-image width="80rpx" height="80rpx"
							src="/static/img/my/avatar.png"></u-image>
						<view class="text-white text-ellipsis1 font-weight ml-2">
							{{$store.state.userinfo.nickname}}
						</view>
						<view class="ml-auto flex-shrink text-light-muted">
							ID: {{$store.state.userinfo.id}}
						</view>
					</view>
					<view v-else class="text-white" style="height: 80rpx;line-height: 80rpx;">
						{{$t('您还未登录。请登录后购买！')}}
					</view>
					<view class="position-absolute d-flex flex-column left-0 w-100 vip hidden">
						<u-image width="126rpx" height="53rpx" src="/static/img/my/vip-tag.png"></u-image>
						<view class="vip-info d-flex a-center j-sb">
							<view class="d-flex flex-column">
								<view class="font-weight font-md" style="color: #333333;">
									{{$t('VIP会员')}}
								</view>
								<view v-if="$store.state.userinfo.group_id == 2" class="font-weight font" style="color: #666666;">
									{{$t('有效期至')}} {{$store.state.userinfo.dtime | date('dd/mm/yyyy hh:MM:ss')}}
								</view>
								<view v-else class="font-weight font" style="color: #666666;">
									{{$t('快加入会员吧！')}}
								</view>
							</view>
							<u-image width="151.68rpx" height="130.64rpx" src="/static/img/my/vip-mark.png"></u-image>
						</view>
						<view v-if="$store.state.userinfo.group_id == 2" class="time mt-auto d-flex a-center px-3">
							<view class="time-name">
								{{$t('尊贵的VIP用户，欢迎您的加入！')}}
							</view>
						</view>
						<view v-else class="time mt-auto d-flex a-center px-3">
							<view class="time-name">
								{{$t('成为会员，享受独家特权')}}
							</view>
						</view>
					</view>
				</view>
				<view style="height: 294rpx;"></view>
				<view class="equity mt-3">
					<view class="equity-title text-white font-md">
						{{$t('会员权益')}}
					</view>
					<view class="equity-list d-flex a-center mt-2">
						<view class="equity-item d-flex a-center j-center flex-column" v-for="(item, i) in equityList"
							:key="i">
							<u-image width="108rpx" height="108rpx" :src="item.img"></u-image>
							<view class="text-white font line-h mt-1">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="up-change d-flex a-center mt-4">
					<scroll-view class="scroll-row position-relative" scroll-x>
						<view class="up-data scroll-row-item mr-2" v-for="(item, i) in VIPPriceList" :key="i"
							@click="selectVIP(item, i)" :class="i == VIPIndex ? 'up-active': ''">
							<view class="up-i">
								<view class="item-name font-weight" :class="VIPIndex == i ? 'item-active': ''">
									{{item.name}}
								</view>
								<view class="item-desc mt-1" :class="VIPIndex == i ? 'item-action': ''">
									{{$t('会员尊享')}}
								</view>
								<view class="item-price d-flex a-center flex-column j-center mt-5">
									<span class="price font-weight line-h"
										:class="VIPIndex == i ? 'price-active': ''">{{item.price}}</span>
									<u-image class="mt-2" width="50rpx" height="50rpx" src="/static/img/my/coin.png"></u-image>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</m-scroll-y>
		<view class="bottombox position-fixed bottom-0 left-0 p-2 w-100">
			<view class="bottombox-ri d-flex a-center flex-column j-center" @click="openVIP">
				<view class="bottombox-name font-weight line-h">
					{{$t('开通会员')}}
				</view>
				<view v-if="VIPPriceList[VIPIndex]" class="bottombox-price d-flex a-center line-h mt-1">
					{{VIPPriceList[VIPIndex].name}} / {{VIPPriceList[VIPIndex].price}}
					<u-image width="30rpx" height="30rpx" src="/static/img/my/coin.png"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getVIPConfig } from '@/utils/request/api/get.js'
	import { buyVIP } from '@/utils/request/api/post.js'
	export default {
		data() {
			return {
				equityList: [{
						img: '/static/img/my/vip1.png',
						name: this.$t('特殊报价')
					},
					{
						img: '/static/img/my/vip2.png',
						name: this.$t('折扣')
					},
					{
						img: '/static/img/my/vip3.png',
						name: this.$t('福利')
					},
					{
						img: '/static/img/my/vip4.png',
						name: this.$t('顾问')
					},
				],
				VIPPriceList: [],
				VIPIndex: 0,
				query: {
					vip_code: ''
				}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getData()
			},
			// 获取VIP数据
			async getData() {
				let { code, data } = await getVIPConfig()
				if (code == 200) {
					this.VIPPriceList = data
				}
			},
			// 开通VIP
			async openVIP() {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				let { code, data } = await buyVIP(this.query)
				if (code == 200) {
					this.$store.dispatch('getUserinfo')
					uni.showToast({
						icon: 'none',
						title: this.$t('开通VIP成功')
					})
				}
			},
			// 选择vip
			selectVIP(item, i) {
				this.VIPIndex = i
				this.query.vip_code = item.code
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px - ${this.$store.state.statusHeight}px - ${this.$store.state.browserFitHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.user {
			padding: 16rpx 28rpx;
			height: 130rpx;
			background: url('/static/img/my/user-card.png') no-repeat;
			background-size: cover;

			.vip {
				padding-top: 15rpx;
				bottom: -294rpx;
				height: 312rpx;
				background: #F3E0B3;
				border-radius: 20rpx;

				.vip-info {
					padding: 30rpx 20rpx 0 64rpx;
				}

				.time {
					height: 64rpx;
					background: #DBB37A;

					.time-name {
						font-size: 24rpx;
						font-weight: 400;
						color: #7E3501;
					}
				}
			}
		}

		.equity {
			.equity-title {}

			.equity-list {
				.equity-item {
					width: 25%;
				}
			}
		}

		.up-change {
			padding: 0 20rpx 0 30rpx;
			height: 492rpx;
			background: #34302F;
			box-shadow: 0 -2rpx 4rpx 0 #8C867F;
			border-radius: 40rpx;

			.scroll-row::after {
				content: '';
				position: absolute;
				right: -1rpx;
				top: -2%;
				z-index: 100;
				width: 30rpx;
				height: 104%;
				border-radius: 0 10rpx 10rpx 0;
				background: linear-gradient(to right, #00000000 0%, #34302F 60%);
			}

			.up-data {
				margin-right: 24rpx;
				padding: 48rpx 32rpx;
				width: 268rpx;
				height: 336rpx;
				background: linear-gradient(180deg, rgba(89, 70, 41, 0.8) 0%, rgba(88, 68, 41, 0) 35%, rgba(88, 68, 41, 0) 64%, rgba(88, 68, 41, 0.8) 100%);
				border-radius: 16rpx;
				border: 2rpx solid #FFE0C2;

				.up-i {
					.item-name {
						background: #E5CC91;
						line-height: 32rpx;
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}

					.item-active {
						background: #5D3717;
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}

					.item-desc {
						font-size: 24rpx;
						background: #E5CC91;
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}

					.item-action {
						background: #5D3717;
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}

					.item-price {
						.price {
							background: #FFE0C2;
							line-height: 66rpx;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							font-size: 56rpx;
						}

						.price-active {
							background: #290D00;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}

						.syml {
							font-size: 50rpx;
							background: #E5CC91;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}

						.syml-active {
							background: #5D3717;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
					}
				}
			}

			.up-active {
				border: 2rpx solid #fff;
				background: linear-gradient(180deg, #FFE3C2 0%, #FFD7C0 100%);
			}
		}
		.bottombox {
			background-color: #000000;
			.bottombox-ri {
				height: 100rpx;
				background: #F3E0B3;
				border-radius: 16rpx;
		
				.bottombox-name {
					background: #744201;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
		
				.bottombox-price {
					font-size: 22rpx;
					background: #744201;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}
	}
</style>