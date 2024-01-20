<template>
	<view class="page">
		<!-- 顶部信息 -->
		<!-- <m-navbar :borderBottom="false" i18n isTab></m-navbar> -->
		<!-- 内容区域 -->
		<view class="content p-3">
			<view class="user d-flex a-center" @click="openLogin">
				<view class="user-avatar flex-shrink border-2 border-white mr-2">
					<u-image radius="100" width="100rpx" height="100rpx" src="/static/img/my/avatar.png">
					</u-image>
				</view>
				<view v-if="userinfo" class="user-info d-flex flex-column j-around">
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
			</view>
			<view class="vip p-3 mt-3 d-flex  flex-column j-around" @click="openVIP">
				<view class="vip-name font-md d-flex a-center line-h">
					{{userinfo.group_id == 2 && $store.state.token ? $t('尊贵的VIP会员') : $t('会员专属')}}
					<u-image class="ml-2" width="30rpx" height="30rpx" src="/static/img/my/right.png"></u-image>
				</view>
				<view v-if="userinfo.group_id == 2 && $store.state.token" class="vip-desc line-h mt-1">
					{{$t('有效期至')}} {{userinfo.dtime | date('dd/mm/yyyy hh:MM:ss')}}
				</view>
				<view v-else class="vip-desc mt-3 line-h mt-1">
					{{$t('充值越多，折扣越优惠')}}
				</view>
			</view>
			<view class="p-3 mt-3 vip-card">
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
			<view class="menu-list mt-3">
				<view class="list-item" v-for="(item, i) in menuList" :key="i" @click="menuClick(item)">
					<m-cell v-if="item.id < 5" BBColor="#262529" :itemStyle="{height: '120rpx'}" imgWidth="58rpx"
						imgHeight="58rpx" i18n color="#fff" :item="item">
					</m-cell>
					<m-cell v-if="item.id == 5" BBColor="#262529" :itemStyle="{height: '120rpx'}" imgWidth="58rpx"
						imgHeight="58rpx" i18n color="#fff" :item="item">
						<view slot="right-row" class="main-text-color">
							V{{$store.state.appSystemInfo.appVersion}}
						</view>
					</m-cell>
					<m-cell v-if="item.id == 6 && $store.state.token" BBColor="#262529" :itemStyle="{height: '120rpx'}"
						imgWidth="58rpx" imgHeight="58rpx" i18n color="#fff" :item="item">
					</m-cell>
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="确认退出" @cancel="show = false" @confirm="confirmLogout">
			<view class="d-flex a-center j-center">
				{{$t('确定退出登录吗？')}}
			</view>
		</m-modal>
		<c-lang-model :show="langShow" @close="langShow = false" @confirmSwitch="confirmSwitch" />
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import CLangModel from '@/components/common/c-lang-model/index.vue'
	// #ifdef APP-PLUS
	import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	import {
		logout
	} from '@/utils/request/api/get.js'
	import {
		menuList,
	} from './data.js'
	export default {
		components: {
			MCell,
			CLangModel
		},
		data() {
			return {
				menuList,
				show: false,
				langShow: false,
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
				switch (item.id) {
					case 1:
						if (!this.$store.state.token) {
							return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
						}
						this.$tools.Navigate.navigateTo(item.page)
						break;
					case 2:
						if (!this.$store.state.token) {
							return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
						}
						this.$tools.Navigate.navigateTo(item.page)
						break;
					case 3:
						this.langShow = true
						break;
					case 4:
						this.$tools.Navigate.navigateTo(item.page)
						break;
					case 5:
						this.$tools.Navigate.navigateTo(item.page)
						break;
					case 6:
						this.show = true
						break;
				}
			},
			// 前往登录
			openLogin() {
				if (!this.$store.state.token) {
					this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
			},
			// 确认退出登录
			async confirmLogout() {
				let {
					code
				} = await logout()
				if (code == 200) {
					uni.removeStorageSync('token')
					uni.removeStorageSync('userinfo')
					this.$store.commit('updateToken', '')
					this.$store.commit('updateUserinfo', {})
					this.show = false
					uni.showToast({
						icon: 'none',
						title: this.$t('退出登录成功')
					})
				}
			},
			// 确认切换语言
			confirmSwitch(lang) {
				this.$store.commit('updateLanguage', lang)
				uni.setStorageSync('lang', lang)
				this.$i18n.locale = lang
				uni.setLocale(lang)
				this.langShow = false
				uni.showToast({
					icon: 'none',
					title: this.$t('切换语言成功')
				})
			}
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
			width: 100%;
			height: 155rpx;
			background: url('/static/img/my/vip.png') no-repeat;
			background-size: cover;

			.vip-name {
				font-weight: 600;
				color: #7E3501;
			}

			.vip-desc {
				font-weight: 400;
				color: #A28A5F;
			}
		}

		.vip-card {
			width: 100%;
			height: 266rpx;
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