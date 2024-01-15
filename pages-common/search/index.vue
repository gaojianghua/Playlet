<template>
	<view class="page">
		<m-navbar :borderBottom="false" :bgColor="$store.state.bgColor" isSlot>
			<view class="w-100 d-flex a-center search py-2 pl-10 pr-2">
				<!-- 搜索框 -->
				<u-search color="#fff" bgColor="rgba(255,255,255,0.2)" @change="searchChange" v-model="query.name" focus
					:placeholder="$t('请输入关键词')" height="60rpx" :showAction="false" @search="getSearchText"
					@clear="search_status=false"></u-search>
			</view>
		</m-navbar>
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<view v-if="!isSearchResult && $store.state.recommList.length != 0" class="content p-3">
				<view class="recomm">
					<view class="recomm-title text-white d-flex a-center j-sb">
						<span>{{$t('搜索历史')}}</span>
						<u-icon name="trash" size="22" color="#EE7623" @click="clearRecommList"></u-icon>
					</view>
					<view class="recomm-list d-flex flex-wrap">
						<view class="recomm-item d-flex a-center j-center mt-2 mr-2"
							v-for="(item, i) in $store.state.recommList" :key="i" @click="openSearch(item)">
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<!-- <view v-if="!isSearchResult" class="content p-2">
				<view class="recomm">
					<view class="recomm-title d-flex a-center text-white">
						<u-image width="36.25rpx" height="42.76rpx" src=""></u-image>
						<view class="line-h ml-1">
							{{$t('热门搜索')}}
						</view>
					</view>
					<view class="list">
						<u-empty v-if="hotsList.length == 0" mode="list" :text="$t('暂无数据')"
							icon="/static/img/common/white-empty.png">
						</u-empty>
						<view v-if="hotsList.length != 0" class="d-flex flex-wrap">
							<view class="item d-flex flex-column mt-3" v-for="(item, i) in hotsList" :key="i"
								@click="itemClick(item)">
								<u-image radius="6" width="100%" height="270rpx" :src="item.src"></u-image>
								<view class="mt-2 text-white line-h">
									{{item.name}}
								</view>
								<view class="item-school line-h mt-2">
									{{$t('最近更新')}}: {{item.update}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<view v-if="isSearchResult" class="list">
				<view class="item">
					<u-empty class="pt-5" v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
						icon="/static/img/common/empty.png">
					</u-empty>
					<view class="px-2 mt-2" v-if="list && list.length != 0">
						<view class="d-flex mt-2" v-for="(item,index) in list" :key="index" @click="get_detail(item.id)">
							<u-image radius="6" width="215rpx" height="260rpx" :src="item.full_img"></u-image>
							<view class="d-flex ml-2 flex-column" style="height: 260rpx;">
								<view class="item-title line-h-md text-white text-ellipsis1">{{ item.name }}</view>
								<view class="item-state line-h-md text-ellipsis5 mt-auto">
									{{item.story}}
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
	import {
		getSearchList
	} from '@/utils/request/api/get.js'
	export default {
		data() {
			return {
				list: [],
				isLoading: false,
				load: 0,
				query: {
					page: 1,
					limit: 10,
					name: ''
				},
				total: 0,
				istrig: true,
				isSearchResult: false
			}
		},
		onLoad() {

		},
		methods: {
			openDetail(i) {
				uni.navigateTo({
					url: '/pages-common/detail/index?id=' + i
				})
			},
			openSearch(e) {
				this.query.name = e
				this.isLoading = true
				this.getSearchText()
			},
			// 搜索内容变化
			searchChange(e) {
				if (!e) {
					this.isSearchResult = false
				}
			},
			// 清空历史记录
			clearRecommList() {
				this.$store.commit('updateRecommList', [])
				uni.setStorageSync('recommList', [])
			},
			get_detail(i) {
				this.$tools.Navigate.navigateTo('/pages-common/detail/index', i)
			},
			getSearchText(e) {
				if (!this.query.name || this.query.name.trim() === '') {
					return uni.showToast({
						title: this.$t('请输入关键词'),
						icon: 'none'
					});
				}

				let arr = this.$store.state.recommList
				if (!arr.includes(this.query.name)) {
					arr.push(this.query.name)
				}
				this.$store.commit('updateRecommList', arr)
				uni.setStorageSync('recommList', arr)
				this.get_cartoon_list()

				this.isSearchResult = true
			},

			async get_cartoon_list(e) {
				let {
					data,
					code
				} = await getSearchList(this.query)
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
				this.isLoading = true
				this.query.page = 1
				this.get_cartoon_list()
			},
			// 加载更多
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				// this.isLoading = true
				let time = setTimeout(() => {
					this.get_cartoon_list('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px - ${this.$store.state.browserFitHeight}px)`
				}
			}
		},
		watch: {
			isSearchResult: {
				handler(nv, ov) {
					nv ? this.isLoading = true : this.isLoading = false
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		/deep/ .u-search__content__input {
			background-color: transparent !important;
		}

		.list {
			.item {
				.item-state {
					color: #EE7623;
					font-size: 24rpx;
				}
			}

			.item:first-child {
				margin-top: 0 !important;
			}
		}
		.recomm {
			.recomm-title {
				font-size: 32rpx;
				font-weight: 500;
			}

			.recomm-list {
				.recomm-item {
					background: #1F2430;
					color: #ddd;
					font-size: 26rpx;
					padding: 2rpx 22rpx;
					border-radius: 4rpx;
				}

				.rank-item {
					height: 330rpx;

					.caed-c {
						height: 70rpx;
						width: 2rpx;
						background-color: #EE7623;
					}

					.caed {
						height: 106rpx;
						bottom: 0;
						background-color: #222443;
						border-radius: 8rpx;
						padding-left: 276rpx;
					}
				}

				.rank-item:first-child {
					margin-top: 0 !important;
				}
			}
		}
	}
</style>