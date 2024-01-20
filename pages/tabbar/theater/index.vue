<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar isTab :borderBottom="false" i18n isSlot>
			<view class="w-100 d-flex a-center search pl-2 pr-2">
				<u-image width="212.26rpx" height="56rpx" src="/static/img/common/logo-h.png"></u-image>
				<view class="w-100 position-relative ml-2">
					<view class="position-absolute top-0 right-0 left-0 bottom-0 index-5"
						@click="$tools.Navigate.navigateTo('/pages-common/search/index')">
					</view>
					<!-- 搜索框 -->
					<u-search bgColor="rgba(255,255,255,0.2)" :placeholder="$t('请输入关键词')" height="60rpx" disabled
						:showAction="false"></u-search>
				</view>
			</view>
		</m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y isTab :isLoading="isLoading" i18n :load="load" :scrollStyle="scrollStyle" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<u-swiper bgColor="transparent" :list="swiperList" keyName="src" circular :loading="swiperLoading"
				@click="swiperClick" radius="0" height="350rpx" imgMode="aspectFill"></u-swiper>
			<view class="px-2">
				<view class="d-flex py-3 a-center j-sb">
					<view class="menu-item d-flex a-center j-center flex-column" v-for="(item, i) in gridList" :key="i"
						@click="$tools.Navigate.navigateTo(item.page)">
						<u-image width="80rpx" height="80rpx" :src="item.icon"></u-image>
						<view class="text-white line-h my-1">{{$t(item.name)}}</view>
					</view>
				</view>
				<view class="p-3 popular">
					<view class="d-flex a-center j-sb">
						<text style="font-weight: 500;color: #fff;font-size: 32rpx;">{{$t('流行热剧')}}</text>
						<view class="ml-auto d-flex a-center" @click="refresh">
							<span class="more main-text-color">{{$t('换一换')}}</span>
							<u-icon :class="isRote ? 'uicon' : ''" name="reload" size="20" color="#EE7623"></u-icon>
						</view>
					</view>
					<view class="list mt-2 d-flex flex-wrap j-sb">
						<view v-for="(item, i) in popularList" :key="i" class="item d-flex flex-column mt-2"
							@click="get_detail(item.id)">
							<view class="position-relative hidden" style="height: 264rpx;border-radius: 12rpx;">
								<u-image width="100%" height="264rpx" radius="5" :src="item.full_img" :lazy-load="true">
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
							<view class="item-title line-h-md mt-1 text-white text-ellipsis2">{{ item.name }}</view>
						</view>
					</view>
				</view>
				<view class="p-3 mt-3 hold">
					<view class="d-flex a-center j-sb">
						<text style="font-weight: 500;color: #fff;font-size: 32rpx;">{{$t('最新热门')}}</text>
					</view>
					<view class="list mt-2 d-flex flex-wrap">
						<view v-for="(item, i) in list" :key="i" class="list-item d-flex flex-column mt-4"
							@click="get_detail(item.id)">
							<view class="position-relative hidden" style="height: 420rpx;border-radius: 12rpx;">
								<u-image width="100%" height="420rpx" radius="5" :src="item.full_img" :lazy-load="true">
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
							<view class="item-title font-md line-h-md mt-2 text-white text-ellipsis2">{{ item.name }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import {
		getHomeHotList,
		getSwiperList,
		getPopularList
	} from '@/utils/request/api/get.js'
	import loadingIcon from '../../../uni_modules/uview-ui/libs/config/props/loadingIcon'
	export default {
		data() {
			return {
				isLoading: true,
				load: 0,
				query: {
					page: 1,
					limit: 20
				},
				list: [],
				total: 0,
				istrig: true,
				swiperLoading: true,
				swiperList: [],
				popularList: [],
				gridList: [{
						icon: '/static/img/theater/menu1.png',
						name: 'page.分类筛选',
						page: '/pages-common/category/index'
					},
					{
						icon: '/static/img/theater/menu2.png',
						name: 'page.新剧专区',
						page: '/pages-common/new/index'
					},
					{
						icon: '/static/img/theater/menu3.png',
						name: 'page.热门排行',
						page: '/pages-common/ranking/index'
					},
					{
						icon: '/static/img/theater/menu4.png',
						name: 'page.免费专区',
						page: '/pages-common/free/index'
					},
				],
				isRote: false,
				popularPage: 1
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getBannerList()
				this.getPopularList()
				this.getData()
			},
			// 获取轮播图
			async getBannerList() {
				let {
					data,
					code
				} = await getSwiperList()
				if (code == 200) {
					this.swiperLoading = false
					this.swiperList = data
				}
			},
			// 获取流行的
			async getPopularList() {
				this.isRote = true
				let {
					data,
					code
				} = await getPopularList()
				if (code == 200) {
					this.popularList = data
				}
				let time = setTimeout(() => {
					this.isRote = false
					clearTimeout(time)
				}, 1000)
			},
			// 获取数据
			async getData(e) {
				let {
					data,
					code
				} = await getHomeHotList(this.query)
				if (code == 200) {
					if (e) { // 加载更多
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
						this.total = data.total
					}
					if (this.query.page * this.query.limit >= this.total) {
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
			// 加载更多
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
			// 进入搜索界面
			openSearch() {
				this.$tools.Navigate.navigateTo('/pages-common/search/index')
			},
			// 进入详情页
			get_detail(i) {
				this.$tools.Navigate.navigateTo('/pages-common/detail/index', i)
			},
			// banner点击事件
			swiperClick(e) {
				if (this.swiperList[e].interior == 1 && this.swiperList[e].url) {
					// #ifdef APP-PLUS
					plus.runtime.openURL(this.swiperList[e].url)
					// #endif
					// #ifdef H5
					location.href = this.swiperList[e].url
					// #endif
				} else if (this.swiperList[e].interior == 0 && this.swiperList[e].url) {
					uni.navigateTo({
						url: this.swiperList[e].url
					})
				}
			},
			// 换一换
			refresh() {
				this.popularPage++
				this.getPopularList()
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px - ${this.$store.state.statusHeight}px - ${this.$store.state.browserFitHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		/deep/ .u-search__content__input {
			background-color: transparent !important;
		}

		.menu-item {
			width: 162rpx;
			height: 156rpx;
			background: #333333;
			border-radius: 16rpx;
		}

		.list-item {
			width: 48.5%;
			margin-right: 3%;
		}

		.list-item:nth-child(1),
		.list-item:nth-child(2),
		{
		margin-top: 0 !important;
	}

	.list-item:nth-child(2n) {
		margin-right: 0 !important;
	}

	.item {
		width: 31.5%;
		margin-right: 2.75%;

		.item-state {
			color: #ddd;
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

	.item-state {
		color: #ddd;
		font-size: 24rpx;
	}

	.popular {
		background: #333333;
		border-radius: 16rpx;
	}

	.hold {
		background: #333333;
		border-radius: 16rpx;
	}

	.uicon {
		animation: rotate 0.5s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(720deg);
		}
	}
	}
</style>