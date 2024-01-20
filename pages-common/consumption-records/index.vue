<template>
	<view class="page">
		<!-- 顶部信息 -->
		<m-navbar :borderBottom="false" i18n value="page.消费记录"></m-navbar>
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore" bgColor="transparent"
			@onRefresh="onRefresh">
			<u-empty class="pt-5" v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="/static/img/common/empty.png">
			</u-empty>
			<view v-if="list.length != 0" class="px-2">
				<view class="item bg-white rounded-1 d-flex a-center p-2 mt-2"
					v-for="(item, i) in list" :key="i" @click="openDetail(item)">
					<u-image radius="6" width="148rpx" height="192rpx" :src="item.full_img"></u-image>
					<view class="info flex-1 ml-2 d-flex flex-column j-sb" style="height: 192rpx;">
						<view class="info-title text-white font-weight">
							{{item.name}}
						</view>
						<view class="info-time font-md main-text-color">
							{{item.lx == 1 ? $t('已购买全集') : $t('已购买单集')}}
						</view>
						<view class="d-flex a-end">
							<view class="time font text-light-muted line-h">
								{{item.ftime | date('dd/mm/yyyy hh:MM:ss')}}
							</view>
							<view class="d-flex a-center ml-auto">
								<u-image width="40rpx" height="40rpx" src="/static/img/my/icon.png"></u-image>
								<view class="main-text-color d-flex a-center font-weight font-md line-h">
									{{item.zprice}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import { getConsumptionList } from '@/utils/request/api/get.js'
	export default {
		data() {
			return {
				load: 0,
				isLoading: true,
				query: {
					page: 1,
					limit: 10
				},
				list: [],
				total: 0
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getData()
			},
			// 获取数据
			async getData(e) {
				let {
					data,
					code
				} = await getConsumptionList(this.query)
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
			// 去详情页
			openDetail(i) {
				let obj = {
					vid: i.sid,
					mid: i.smid
				}
				this.$tools.Navigate.navigateTo('/pages-common/detail/index', obj)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px - ${this.$store.state.browserFitHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.item{
			background-color: #191919;
		}
	}
</style>