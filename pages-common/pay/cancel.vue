<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar unBack @pageBack="pageBack" bgColor="#transparent" :borderBottom="false" textColor="#fff" value="page.已取消支付" i18n></m-navbar>
		<view class="content pt-10 d-flex a-center flex-column">
			<u-image width="160rpx" height="160rpx" src="/static/img/common/cancel.svg"></u-image>
			<view class="mt-10 font" style="color: #8a8a8a;">
				{{$t('订单号')}}: {{query.trade_no}}
			</view>
			<view class="mt-2 font-md" style="color: #8a8a8a;">
				{{$t('page.已取消支付')}}
			</view>
			<view @click="$tools.Navigate.reLaunch('/pages/tabbar/theater/index')" 
			class="text-white d-flex a-center j-center mt-10 main-bg-color" 
			style="border-radius: 50rpx; width: 360rpx; height: 80rpx;">
				{{$t('回到首页')}}
			</view>
		</view>
	</view>
</template>

<script>
	import { cancelPay } from '@/utils/request/api/get.js'
	export default {
		data() {
			return {
				query: {
					trade_no: ''
				}
			}
		},
		onLoad(args) {
			this.query.trade_no = args.trade_no
			this.cancelPay()
		},
		methods: {
			// 取消支付
			async cancelPay() {
				await cancelPay(this.query)
			},
			// 返回
			pageBack() {
				this.$tools.Navigate.switchTab('/pages/tabbar/theater/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
	}
</style>