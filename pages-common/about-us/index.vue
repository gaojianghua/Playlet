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
					<p>"Fillshort" is an app designed for users who love to watch short dramas. Whether you are a keen TV fan or want to discover new short series, "Fillshort" can meet your needs.</p>
					<p>The app brings together skits of all genres and styles, so you can enjoy great episodes anytime, anywhere. With a simple and intuitive interface and a smooth HD playback experience, you can easily browse and watch your favorite short series, whether it is a hit movie or a classic old series.</p>
				</view>
				<!-- <view class="mt-auto main-text-color pb-3">
					<span @click="openAgree(1)">《{{$t('用户协议')}}》</span>
					<span class="text-light">| |</span>
					<span @click="openAgree(2)">《{{$t('隐私政策')}}》</span>
				</view>
				<view class="text-light pb-3 d-flex a-center flex-column j-center font">
					<span>{{$t('由个人开发者高江华 版权所有')}}</span>
					<span>Copyright c 2022-{{new Date().getFullYear()}}；ALL Rights Reserved</span>
				</view> -->
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