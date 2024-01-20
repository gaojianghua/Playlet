<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#transparent" :borderBottom="false" textColor="#fff" value="page.关于我们" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<!-- #ifndef MP -->
			<view class="content d-flex pt-10 flex-column  a-center" :style="scrollStyle">
				<!-- #endif -->
			<!-- #ifdef MP -->
			<view class="content d-flex pt-10 flex-column  a-center" :style="[scrollStyle]">
				<!-- #endif -->
				<u-image width="205.86rpx" height="218.94rpx"
					src="/static/img/common/logo.png"></u-image>
				<view class="mt-2 text-light font-weight line-h">
					V{{appSystemInfo.appVersion}}
				</view>
				<view class="desc initial p-4 text-i2">
					<u-parse :content="$store.state.sysConfig[0].value"></u-parse>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {

			},
			// 进入协议页面
			openAgree(e) {
				this.$tools.Navigate.navigateTo('/pages-common/policy-agreement/index', e)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			appSystemInfo() {
				return this.$store.state.appSystemInfo
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {

		.desc {
			font-size: 26rpx;
			letter-spacing: 2rpx;
			color: #999;
		}
	}
</style>