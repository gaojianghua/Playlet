<template>
	<view class="page">
		<m-navbar :borderBottom="false" value="page.我的收藏" i18n></m-navbar>
		<m-scroll-y :isLoading="isLoading" i18n :load="load" :scrollStyle="scrollStyle" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<view class="list px-2 pt-2">
				<u-empty pt-5 v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
					icon="/static/img/common/empty.png">
				</u-empty>
				<view v-if="list.length != 0" class="d-flex flex-wrap">
					<view class="item d-flex flex-column mt-3" v-for="(item, i) in list" :key="i"
						@click="itemClick(item)">
						<u-image radius="6" width="100%" height="420rpx" :src="item.src"></u-image>
						<view class="mt-2 text-white line-h">
							{{item.name}}
						</view>
						<view class="item-school line-h mt-2">
							{{$t('最近更新')}}: {{item.update}}
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import {
		getComicData
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
				let code = 200
				let data = {
					list: [{
							name: '黄五点四十',
							update: '100集',
							src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/goods/goods1.jpg',
							text: '但是哒哒哒哒哒哒送达哒哒哒哒哒哒打打达到算得上是少时诵诗书飒飒飒飒飒飒飒飒飒'
						},
						{
							name: '黄五点四十',
							update: '100集',
							src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/goods/goods1.jpg',
							text: '但是哒哒哒哒哒哒送达哒哒哒哒哒哒打打达到算得上是少时诵诗书飒飒飒飒飒飒飒飒飒'
						},
						{
							name: '黄五点四十',
							update: '100集',
							src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/goods/goods1.jpg',
							text: '但是哒哒哒哒哒哒送达哒哒哒哒哒哒打打达到算得上是少时诵诗书飒飒飒飒飒飒飒飒飒'
						},
						{
							name: '黄五点四十',
							update: '100集',
							src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/goods/goods1.jpg',
							text: '但是哒哒哒哒哒哒送达哒哒哒哒哒哒打打达到算得上是少时诵诗书飒飒飒飒飒飒飒飒飒'
						},
						{
							name: '黄五点四十',
							update: '100集',
							src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/goods/goods1.jpg',
							text: '但是哒哒哒哒哒哒送达哒哒哒哒哒哒打打达到算得上是少时诵诗书飒飒飒飒飒飒飒飒飒'
						},
						{
							name: '黄五点四十',
							update: '100集',
							src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/goods/goods1.jpg',
							text: '但是哒哒哒哒哒哒送达哒哒哒哒哒哒打打达到算得上是少时诵诗书飒飒飒飒飒飒飒飒飒'
						},
						{
							name: '黄五点四十',
							update: '100集',
							src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/goods/goods1.jpg',
							text: '但是哒哒哒哒哒哒送达哒哒哒哒哒哒打打达到算得上是少时诵诗书飒飒飒飒飒飒飒飒飒'
						}
					]
				}
				// let {
				// 	data,
				// 	code
				// } = await getComicData(result)
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
				uni.navigateTo({
					url: '/pages-common/detail/index?id=' + i.id
				})
			},
			// 搜索提交
			getSearchText() {
				
			},
			// 搜索变化
			searchChange(e) {
				
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - ${this.$store.state.browserFitHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
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
			width: 48.5%;
			margin-right: 3%;
			
			.item-school {
				color: #EE7623;
				font-size: 24rpx;
			}
		}

		.item:nth-child(1),
		.item:nth-child(2),
		{
			margin-top: 0 !important;
		}
		
		.item:nth-child(2n) {
			margin-right: 0 !important;
		}
	}
</style>