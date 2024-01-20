<template>
	<view class="page">
		<!-- 顶部信息 -->
		<m-navbar :borderBottom="false" i18n value="page.余额明细"></m-navbar>
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<u-empty class="pt-5" v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="/static/img/common/empty.png">
			</u-empty>
			<view v-if="list.length != 0" class="px-2">
				<view class="item bg-white rounded-1 d-flex a-center j-sb p-2 mt-2" v-for="(item, i) in list" :key="i">
					<view class="left d-flex a-center">
						<u-image radius="10" width="100rpx" height="100rpx" src="/static/img/my/balance.png"></u-image>
						<view class="info ml-2 d-flex flex-column j-sb">
							<view class="info-title text-white">
								{{amountName(item)}}
							</view>
							<view class="info-time text-light-muted">
								{{item.createtime | date('dd/mm/yyyy')}}
							</view>
						</view>
					</view>
					<view class="d-flex a-center line-h" :class="item.de_type == 1 ? 'main-text-color' : 'text-light-muted'">
						{{item.de_type == 1 ? '+' : '-'}}{{item.money}} <u-image width="30rpx" height="30rpx" src="/static/img/my/coin.png"></u-image>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import {
		getWalletDetail
	} from '@/utils/request/api/get.js'
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
				} = await getWalletDetail(this.query)
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
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			amountName() {
				return (item) => {
					let str = ''
					if (item.de_type == 1) { // 加
						switch (item.sr_type) {
							case 0:
								str = '其他'
								break;
							case 1:
								str = '充值'
								break;
						}
						return str
					} else { // 减
						switch (item.zc_type) {
							case 0:
								str = '其他'
								break;
							case 1:
								str = '购买视频'
								break;
							case 2:
								str = '购买VIP'
								break;
						}
						return str
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		.item {
			background-color: #191919;
		}
	}
</style>