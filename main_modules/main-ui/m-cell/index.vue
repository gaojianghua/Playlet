<template>
	<!-- #ifndef MP -->
	<view class="menu-item d-flex a-center" 
	:class="[textCenter ? 'j-center': 'j-sb', isActive ? 'active': '']" :style="{borderTop: `1rpx solid ${BBColor}`, ...itemStyle}">
	<!-- #endif -->
	<!-- #ifdef MP -->
	<view class="menu-item d-flex a-center" 
	:class="[textCenter ? 'j-center': 'j-sb', isActive ? 'active': '']" :style="[{borderTop: `1rpx solid ${BBColor}`}, itemStyle]">
	<!-- #endif -->
		<view v-if="isShowL" class="menu-item-left d-flex a-center">
			<slot name="left-row"></slot>
			<u-image class="mr-2" v-if="item.icon" :radius="radius" :src="item.icon" :width="imgWidth"
				:height="imgHeight" :mode="mode"></u-image>
			<span v-if="item[keyName]" :style="{color}">{{i18n ? $t(item[keyName]) : item[keyName]}}</span>
		</view>
		<slot name="left" />
		<view v-if="isShowR" class="menu-item-right d-flex a-center">
			<slot name="right-row" />
			<u-icon v-if="isIcon" name="arrow-right" :color="iconColor" size="16"></u-icon>
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		props,
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.menu-item {
		min-height: 90rpx;
		span {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.active:active{
		background-color: #fc8bb266;
	}
</style>
