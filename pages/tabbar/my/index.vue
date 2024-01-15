<template>
	<view class="page">
		<!-- 顶部信息 -->
		<!-- <m-navbar :borderBottom="false" i18n isTab></m-navbar> -->
		<!-- 内容区域 -->
		<view class="content p-3">
			<view class="user d-flex a-center">
				<view class="user-avatar flex-shrink border-2 border-white mr-2">
					<u-image radius="100" width="100rpx" height="100rpx"
						src="/static/img/my/avatar.png">
					</u-image>
				</view>
				<view v-if="userinfo" class="user-info d-flex flex-column j-around" @click="openLogin">
					<view class="info-name font-lg line-h text-white">
						{{token ? userinfo.nickname : $t('前往登录')}}
					</view>
					<view v-if="token" class="info-desc font-md text-light-muted line-h mt-2">
						ID: {{userinfo.id}}
					</view>
					<view v-else class="user-notice text-light-muted line-h mt-2">
						{{$t('您还未登录。立即登录，享受更多特权！')}}
					</view>
				</view>
				<u-image @click="$tools.Navigate.navigateTo('/pages-common/setting/index')" class="ml-auto"
					width="56rpx" height="56rpx" src="/static/img/my/set.png"></u-image>
			</view>
			<view class="position-relative vip mt-3">
				<view class="vip-name d-flex a-center line-h" @click="openVIP">
					{{userinfo.group_id == 2 ? $t('尊贵的VIP会员') : $t('会员专属')}}
					<u-image class="ml-2" width="26rpx" height="26rpx" src="/static/img/my/right.png"></u-image>
				</view>
				<view v-if="userinfo.group_id == 1" class="vip-desc line-h mt-1">
					{{$t('充值越多，折扣越优惠')}}
				</view>
				<view v-else class="vip-desc line-h mt-1">
					{{$t('有效期至')}} {{userinfo.dtime | date('dd/mm/yyyy hh:MM:ss')}}
				</view>
				<view class="position-absolute p-3 left-0 vip-card">
					<view class="balance d-flex a-center">
						<view class="balance-name text-white font-weight">
							{{$t('余额')}}
						</view>
						<view class="balance-desc ml-auto" @click="openBalanceDetail">
							{{$t('余额明细')}} >
						</view>
					</view>
					<view class="d-flex a-center mt-5">
						<view class="d-flex a-center text-white font-weight">
							<u-image width="50rpx" height="50rpx" src="/static/img/my/coin.png"></u-image>
							<span v-if="userinfo" class="ml-1 balance-value line-h">{{token ? userinfo.money : '--'}}</span>
						</view>
						<view class="balance-up line-h ml-auto d-flex a-center j-center" @click="openTopUp">
							{{$t('充值')}}
						</view>
					</view>
				</view>
			</view>
			<view style="height: 208rpx;"></view>
			<view class="menu-list mt-3">
				<view class="list-item" v-for="(item, i) in menuList" :key="i" @click="menuClick(item)">
					<m-cell BBColor="#262529" :itemStyle="{height: '120rpx'}" imgWidth="58rpx" imgHeight="58rpx" i18n color="#fff"
						:item="item">
					</m-cell>
				</view>
			</view>
			<!-- <view class="text-white" @click="$tools.Navigate.navigateTo('/pages-common/pay/cancel?trade_no=56489743454')">
				取消支付
			</view>
			<view class="text-white" @click="$tools.Navigate.navigateTo('/pages-common/pay/return?status=0&trade_no=56489743454')">
				支付失败返回
			</view>
			<view class="text-white" @click="$tools.Navigate.navigateTo('/pages-common/pay/return?status=1&trade_no=56489743454')">
				支付成功返回
			</view> -->
		</view>
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import {
		menuList,
	} from './data.js'
	export default {
		components: {
			MCell
		},
		data() {
			return {
				menuList,
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.$store.dispatch('getUserinfo')
			},
			// 前往余额明细
			openBalanceDetail() {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				this.$tools.Navigate.navigateTo('/pages-common/balance-detail/index')
			},
			// 前往充值
			openTopUp() {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				this.$tools.Navigate.navigateTo('/pages-common/balance-topup/index')
			},
			// 前往VIP
			openVIP() {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				this.$tools.Navigate.navigateTo('/pages-common/vip/index')
			},
			menuClick(item) {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				switch (item.id) {
					case 1:
						this.$tools.Navigate.navigateTo(item.page)
						break;
					case 2:
						this.$tools.Navigate.navigateTo(item.page)
						break;
					case 3:
						this.$tools.Navigate.navigateTo(item.page)
						break;
					case 4:
						this.$tools.Navigate.navigateTo(item.page)
						break;
				}
			},
			// 前往登录
			openLogin() {
				if (!this.$store.state.token) {
					this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
			},
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px)`
				}
			},
			userinfo() {
				return this.$store.state.userinfo
			},
			token() {
				return this.$store.state.token
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		
		.user-avatar {
			border-radius: 50%;
			overflow: hidden;
		}
		
		.vip {
			padding: 25rpx;
			width: 100%;
			height: 155rpx;
			background: url('/static/img/my/vip.png') no-repeat;
			background-size: cover;

			.vip-name {
				font-size: 26rpx;
				font-weight: 600;
				color: #7E3501;
			}

			.vip-desc {
				font-size: 20rpx;
				font-weight: 400;
				color: #A28A5F;
			}

			.vip-card {
				width: 100%;
				height: 266rpx;
				bottom: -208rpx;
				border-radius: 20rpx;
				overflow: hidden;
				background: url('/static/img/my/vip-card.png') no-repeat;
				background-size: cover;

				.balance-name {
					font-size: 28rpx;
				}

				.balance-desc {
					font-size: 26rpx;
					font-weight: 400;
					color: #FF9F24;
				}

				.balance-value {
					font-size: 36rpx;
				}

				.balance-up {
					background: #DBB37A;
					border-radius: 12rpx;
					font-size: 28rpx;
					font-weight: 600;
					color: #7E3501;
					padding: 15rpx 35rpx;
				}
			}
		}

		.menu-list {
			padding: 0 30rpx;
			background: #333;
			border-radius: 25rpx;

			.list-item:first-child {
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>