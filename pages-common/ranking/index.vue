<template>
	<view class="page">
		<m-navbar :borderBottom="false" value="page.热门排行" i18n></m-navbar>
		<view class="w-100 position-relative d-flex a-center p-2">
			<view class="position-absolute top-0 right-0 left-0 bottom-0 index-5"
				@click="$tools.Navigate.navigateTo('/pages-common/search/index')">
			</view>
			<!-- 搜索框 -->
			<u-search bgColor="rgba(255,255,255,0.2)" :placeholder="$t('请输入关键词')" height="60rpx" disabled
				:showAction="false"></u-search>
		</view>
		<m-scroll-y :isLoading="isLoading" i18n :load="load" :scrollStyle="scrollStyle" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<view class="list px-2">
				<u-empty pt-5 v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
					icon="/static/img/common/empty.png">
				</u-empty>
				<view class="item mt-2" v-for="(item, i) in list" :key="i" @click="itemClick(item.id)">
					<view class="d-flex position-relative">
						<view class="position-relative flex-shrink hidden" style="height: 260rpx;width: 215rpx;border-radius: 12rpx;">
							<u-image width="215rpx" height="260rpx" radius="5" :src="item.full_img" :lazy-load="true">
								<view slot="error" style="font-size: 24rpx;">{{$t('加载失败')}}</view>
							</u-image>
							<view class="position-absolute p-1 d-flex a-center item-state bottom-0 right-0"
								style="background: #00000099;height: 50rpx; border-radius: 20rpx 0 12rpx 0;">
								<u-icon name="play-right-fill" color="#fff" size="14"></u-icon>
								<view class="text-white font">
									{{item.sum}}+
								</view>
							</view>
						</view>
						<view class="d-flex ml-2 flex-column" style="height: 260rpx;">
							<view class="item-title line-h-md mt-2 text-white text-ellipsis1" :style="{paddingRight: i < 3 ? '100rpx' : '0'}">{{ item.name }}</view>
							<view class="item-state line-h-md text-ellipsis5 mt-auto">
								{{item.story}}
							</view>
						</view>
						<view v-if="i<3" :style="{background: i == 0 ? 'linear-gradient(180deg, #F0A09F 0%, #E85274 100%)' : (i == 1 ? 'linear-gradient(180deg, #F3B389 0%, #ED764A 100%)' : (i == 2 ? 'linear-gradient(180deg, #F6D47A 0%, #F0B943 100%)' : 'linear-gradient(180deg, #CCCEDD 0%, #ADAFBE 100%)'))}" 
						class="rank text-white ml-auto text-center position-absolute top-0 right-0">
							TOP{{i+1}}
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import {
		getRankList
	} from '@/utils/request/api/get.js'
	export default {
		data() {
			return {
				isLoading: true,
				list: [],
				query: {
					page: 1,
					limit: 20,
					key: ''
				},
				load: 0,
				istrig: true
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData(e) {
				let {
					data,
					code
				} = await getRankList(this.query)
				if (code == 200) {
					if (e) { // 加载更多
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
					}
					if (this.query.page * this.query.limit >= data.total) {
						return this.load = 1
					} else {
						return this.load = 2
					}
				}
			},
			// 下拉刷新
			onRefresh() {
				this.query.page = 1
				this.getData()
			},
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			itemClick(i) {
				this.$tools.Navigate.navigateTo('/pages-common/detail/index', i)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - 100rpx - ${this.$store.state.navbarHeight}px - ${this.$store.state.browserFitHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-search__content__input {
		background-color: transparent !important;
	}
	.list {
		.item {
			.item-name {
				font-size: 32rpx;
				font-weight: 400;
			}
			
			.item-type {
				color: #999;
				font-size: 24rpx;
			}
					
			.item-state {
				color: #EE7623;
				font-size: 24rpx;
			}
			.rank{
				height: 60rpx;
				width: 100rpx;
				line-height: 60rpx;
				border-radius: 0 15rpx 0 15rpx;
			}
		}

		.item:first-child {
			margin-top: 0 !important;
		}
	}
</style>