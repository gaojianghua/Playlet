<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar :borderBottom="false" bgColor="#000" textColor="#fff" :value="pageTitle" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="px-3 pb-3">
				<u-parse :content="content" :tagStyle="style"></u-parse>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import { policy, agreement } from './data.js'
	export default {
		data() {
			return {
				pageTitle: '',
				content: '',
				style: {
					h3: 'margin-top: 20rpx;',
					h4: 'margin-top: 20rpx;',
				},
				pageId: 0
			}
		},
		onLoad(options) {
			this.pageId = options.item
			options.item == 1 ? this.pageTitle = '用户协议' : this.pageTitle = '隐私政策'
			this.getData()
		},
		methods: {
			getData() {
				this.pageId == 1 ? this.content = agreement : this.content = policy
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px - ${this.$store.state.browserFitHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #FFFAE7;
	}
</style>