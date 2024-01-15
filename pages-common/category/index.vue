<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar :borderBottom="false" i18n isSlot>
			<view class="w-100 d-flex a-center search pl-10 pr-2">
				<view class="w-100 position-relative">
					<view class="position-absolute top-0 right-0 left-0 bottom-0 index-5" @click="$tools.Navigate.navigateTo('/pages-common/search/index')">
					</view>
					<!-- 搜索框 -->
					<u-search bgColor="rgba(255,255,255,0.2)" :placeholder="$t('请输入关键词')" height="60rpx" disabled
						:showAction="false"></u-search>
				</view>
			</view>
		</m-navbar>
		<view class="p-2">
			<m-tabs :textStyle="{color: '#96989C'}" :chooseTextStyle="{color: '#fff'}" :itemStyle="itemStyle"
				chooseBgColor="#ED6824" scrollBgColor="transparent" bgColor="#353A47" :tabs="$store.state.allType"
				@changeTab="changeTab" :chooseIndex="chooseIndex" slideNum="1">
			</m-tabs>
		</view>
		<m-scroll-y :isLoading="isLoading" i18n :load="load" :scrollStyle="scrollStyle" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<u-empty class="pt-5" v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="/static/img/common/empty.png">
			</u-empty>
			<view v-if="list.length != 0" class="lists px-2 main d-flex flex-wrap">
				<view v-for="(item, i) in list" :key="i" class="lists-item pb-2 hidden d-flex flex-column mt-3"
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
					<view class="item-title px-2 line-h-md mt-2 text-white text-ellipsis2">{{ item.name }}</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import MTabs from '@/main_modules/main-ui/m-tabs/index.vue'
	import {
		getCategoryList,
		getVideoCategory
	} from '@/utils/request/api/get.js'
	export default {
		components: {
			MTabs
		},
		data() {
			return {
				isLoading: true,
				load: 0,
				istrig: true,
				chooseIndex: 0,
				tabs: [{
					id: 0,
					name: this.$t('全部')
				}],
				query: {
					page: 1,
					limit: 20,
					cate_id: 0
				},
				itemStyle: {
					borderRadius: '10rpx',
					marginRight: '28rpx'
				},
				list: []
			}
		},
		onLoad() {
			this.getTabs()
		},
		methods: {
			get_detail(i) {
				this.$tools.Navigate.navigateTo('/pages-common/detail/index', i)
			},
			changeTab(i) {
				this.load = 0
				this.isLoading = true
				this.list = []
				this.current = i.index
				this.query.cate_id = i.id
				this.onRefresh()
			},
			async getList(e) {
				let {code, data} = await getCategoryList(this.query)
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
				this.getList()
			},
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getList('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			async getTabs() {
				let {
					code,
					data
				} = await getVideoCategory()
				if (code == 200) {
					data.unshift({
						id: 0,
						name: this.$t('全部')
					})
					this.$store.commit('updateAllType', data)
					uni.setStorageSync('allType', data)
					this.getList()
				}
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - 110rpx - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px - ${this.$store.state.navbarHeight}px - ${this.$store.state.browserFitHeight}px)`
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
	}

	.lists {

		.lists-item {
			width: 48.5%;
			margin-right: 3%;
			background-color: #333;
			border-radius: 16rpx;

			.item-title {
				font-size: 28rpx;
				font-weight: 500;
			}
			
			.item-state {
				color: #ED6824;
				font-size: 26rpx;
			}

		}

		.lists-item:nth-child(1),
		.lists-item:nth-child(2),
		{
			margin-top: 0 !important;
		}
		
		.lists-item:nth-child(2n) {
			margin-right: 0 !important;
		}
	}
</style>