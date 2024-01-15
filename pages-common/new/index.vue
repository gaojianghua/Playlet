<template>
	<view class="page">
		<m-navbar :borderBottom="false" value="page.新剧专区" i18n></m-navbar>
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
				<u-empty class="pt-5" v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
					icon="/static/img/common/empty.png">
				</u-empty>
				<view v-if="list.length != 0" class="d-flex flex-wrap">
					<view class="item pb-2 hidden d-flex flex-column mt-3" v-for="(item, i) in list" :key="i"
						@click="itemClick(item.id)">
						<view class="position-relative hidden" style="height: 270rpx;border-radius: 12rpx;">
							<u-image width="100%" height="270rpx" radius="5" :src="item.full_img" :lazy-load="true">
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
						<view class="item-title px-1 line-h-md mt-2 text-white text-ellipsis2">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import {
		getNewList
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
				} = await getNewList(this.query)
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
			width: 31.5%;
			margin-right: 2.75%;
			background-color: #333;
			border-radius: 16rpx;

			.item-state {
				color: #EE7623;
				font-size: 24rpx;
			}
		}

		.item:nth-child(1),
		.item:nth-child(2),
		.item:nth-child(3),
		{
		margin-top: 0 !important;
	}

	.item:nth-child(3n) {
		margin-right: 0 !important;
	}
	}
</style>