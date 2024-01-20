<template>
	<view class="page">
		<!-- 顶部信息 -->
		<m-navbar :borderBottom="false" value="page.设置" i18n></m-navbar>
		<view class="menu">
			<view class="menu-item" v-for="(item, i) in setList" :key="i" @click="cellClick(item)">
				<m-cell BBColor="#111" v-if="i == 0" :isShowL="false" :itemStyle="{padding: '0 30rpx'}">
					<view :slot="'left'" class="d-flex py-3 a-center">
						<view class="user-avatar flex-shrink border-2 main-border-color mr-2">
							<u-image radius="100" width="100rpx" height="100rpx"
								src="/static/img/my/avatar.png"
								mode="">
							</u-image>
						</view>
						<view class="user-info d-flex flex-column j-around">
							<view class="info-name text-white line-h">
								{{$store.state.token ? $store.state.userinfo.nickname : $t('前往登录')}}
							</view>

							<view v-if="$store.state.token" class="info-desc font-md line-h">
								ID: {{$store.state.userinfo.id}}
							</view>
							<view v-else class="user-notice line-h">
								{{$t('您还未登录。立即登录，享受更多特权！')}}
							</view>
						</view>
					</view>
				</m-cell>
				<m-cell BBColor="#111" color="#fff" v-if="i > 0 && i<3"
					:itemStyle="{height: '100rpx', padding: '0 30rpx'}" i18n :item="item"></m-cell>
				<m-cell BBColor="#111" color="#fff" v-if="i == 3" :itemStyle="{height: '100rpx', padding: '0 30rpx'}"
					i18n :item="item">
					<view slot="right-row" class="main-text-color">
						V{{$store.state.appSystemInfo.appVersion}}
					</view>
				</m-cell>
				<u-gap v-if="i == 4 && $store.state.token" bgColor="#000" height="10rpx"></u-gap>
				<m-cell color="#fff" v-if="i == 4 && $store.state.token"
					:itemStyle="{height: '100rpx', padding: '0 30rpx'}" i18n textCenter :isIcon="false"
					:item="item"></m-cell>
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
		setList
	} from './data.js'
	export default {
		components: {
			MCell,
			CLangModel
		},
		data() {
			return {
				setList,
				show: false,
				langShow: false,
				systemInfo: {}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.systemInfo = uni.getSystemInfoSync()
			},
			// cell点击事件
			cellClick(i) {
				if (i.id == 1) {
					return this.langShow = true
				}
				if (i.id == 4) {
					return this.show = true
				}
				if (i.id == 0 && !this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				this.$tools.Navigate.navigateTo(i.page)
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
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.menu {
			.menu-item {

				.user-info {
					height: 100rpx;

					.info-name {
						font-size: 30rpx;
						font-weight: 500;
					}

					.info-desc {
						font-size: 26rpx;
						font-weight: 400;
						color: #898989;
					}

					.user-notice {
						font-size: 26rpx;
						font-weight: 400;
						color: #999;
					}
				}

				.user-avatar {
					border-radius: 50%;
					overflow: hidden;
				}
			}

			.menu-item:nth-child(1),
			.menu-item:nth-child(5) {
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>