<!-- 产品 -->
<template>
	<view class="page">
		<m-navbar isTab i18n :borderBottom="false" value="page.追剧">
			<view v-if="list.length != 0" slot="right"
				class="position-absolute top-half border rounded-1 line-h px-2 py-1"
				style="right: 20rpx; transform: translateY(-50%);"
				:class="isEdit ? 'main-text-color main-border-color' : 'text-white'" @click="switchManageClick">
				{{isEdit ? $t('取消') : $t('编辑')}}
			</view>
		</m-navbar>
		<view v-if="!$store.state.token" class="d-flex a-center flex-column j-center" :style="scrollStyle">
			<view class="text-light-muted text-center px-5">
				{{$t('您还未登录。立即登录，享受更多特权！')}}
			</view>
			<view class="text-white mt-3 px-2 py main-bg-color rounded-1" @click="$tools.Navigate.navigateTo('/pages-common/account/login/index')">
				{{$t('前往登录')}} ->
			</view>
		</view>
		<m-scroll-y v-else :isLoading="isLoading" :load="load" i18n :scrollStyle="scrollStyle" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<u-empty class="pt-5" v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="/static/img/common/empty.png">
			</u-empty>
			<view v-if="list.length != 0" class="list px-2 d-flex flex-wrap">
				<view class="item mt-3 d-flex flex-column position-relative" v-for="(item, i) in list" :key="i"
					@click.stop="itemClick(item)">
					<image class="item-img" :src="item.videolist.full_img" mode=""></image>
					<view class="item-name flex-1 line-h mt-2 text-white initial text-ellipsis2">
						{{item.videolist.name}}
					</view>
					<view v-if="isEdit" style="background: #11111180;"
						class="position-absolute index-3 d-flex a-center j-center top-0 right-0 left-0 bottom-0 index-5"
						@click.stop="checkClick(item.videolist.id)">
						<view class="position-relative w-100 h-100">
							<view class="position-absolute" style="top: 20rpx; right: 20rpx;">
								<view class="check-icon d-flex a-center j-center"
									:class="item.check ? 'check-active': ''">
									<u-image v-if="item.check" width="18" height="18"
										src="/static/img/common/task.svg"></u-image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
		<view v-if="isEdit && list.length != 0" class="settlement d-flex j-sb a-center" :style="{bottom: `${$store.state.tabbarHeight}px`}">
			<view class="d-flex a-center" @click="openAllCheck">
				<view class="check-icon d-flex a-center j-center" :class="allChecked ? 'check-active': ''">
					<u-image v-if="allChecked" width="18" height="18" src="/static/img/common/task.svg"></u-image>
				</view>
				<view class="ml-1" :class="allChecked ? 'main-text-color' : 'text-white'">
					{{$t('全选')}}
				</view>
			</view>
			<view class="btn d-flex text-white j-center a-center" @click="deleteSubmit">
				{{$t('移除')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCollectList
	} from '@/utils/request/api/get.js'
	import {
		delVideo
	} from '@/utils/request/api/post.js'
	export default {
		data() {
			return {
				ids: [],
				allChecked: false,
				isLoading: true,
				list: [],
				query: {
					page: 1,
					limit: 20
				},
				load: 0,
				isEdit: false,
				istrig: true,
				islongPress: false
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getCollectList()
			},
			async getCollectList(e) {
				let { code, data } = await getCollectList(this.query)
				if (code == 200) {
					data.list.forEach((item) => {
						item.check = false
					})
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
				this.getCollectList()
			},
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getCollectList('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			itemClick(i) {
				let obj = {
					vid: i.vid,
					mid: i.video.id
				}
				this.$tools.Navigate.navigateTo('/pages-common/detail/index', obj)
			},
			// 单选
			checkClick(i) {
				let ids = []
				let bool = true
				this.list.forEach((item) => {
					if (item.videolist.id == i) {
						item.check = !item.check
					}
					if (!item.check) {
						bool = item.check
					} else {
						ids.push(item.videolist.id)
					}
				})
				this.allChecked = bool
				this.ids = ids
			},
			// 管理开关
			switchManageClick() {
				this.ids = []
				this.allChecked = false
				this.list.forEach((item) => {
					item.check = false
				})
				this.isEdit = !this.isEdit
			},
			// 全选
			openAllCheck() {
				this.allChecked = !this.allChecked
				if (!this.allChecked) {
					this.list.forEach((item) => {
						item.check = this.allChecked
					})
					return this.ids = []
				}
				let ids = []
				this.list.forEach((item) => {
					item.check = this.allChecked
					ids.push(item.videolist.id)
				})
				this.ids = ids
			},
			// 删除
			async deleteSubmit() {
				let { code } = await delVideo({vid: this.ids.join()})
				if (code == 200) {
					this.ids = []
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.$t("移除成功")
					});
					this.onRefresh()
				}
			},
			openTabs(i) {
				this.list = []
				this.isLoading = true
				this.load = 0
				this.tabActive = i
				this.isEdit = false
				this.onRefresh()
			}
		},
		computed: {
			scrollStyle() {
				let size = this.isEdit ? '100rpx' : '0rpx'
				return {
					height: `calc(100vh - ${size} - 80rpx - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px - ${this.$store.state.browserFitHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.check-icon {
			width: 45rpx;
			height: 45rpx;
			padding: 6rpx;
			border: 4rpx solid #fff;
			border-radius: 10rpx;
		}

		.check-active {
			border: 4rpx solid #EE7623;
		}

		.tabs {
			height: 80rpx;
			border-bottom: 1rpx solid #333;
		}

		.settlement {
			position: fixed;
			left: 0;
			width: 100%;
			height: 100rpx;
			background: #111;
			padding: 0 25rpx;
			border-top: 1rpx solid #EE762380;

			.btn {
				width: 150rpx;
				height: 58rpx;
				background: #EE7623;
				border-radius: 30rpx;
				font-weight: 500;
				font-size: 25rpx;
				margin-left: 25rpx;
			}

			.btn:active {
				background: #EE762399;
			}
		}

		.active {
			border: 2rpx solid #EE7623;
			background: rgba(255, 211, 0, 0.1);
			font-weight: 500;
			font-size: 30rpx;
			color: #EE7623;
			border-radius: 50rpx;
			height: 60rpx;
		}

		.default {
			color: #595C65;
			font-weight: 500;
			font-size: 30rpx;
		}

		.list {
			.item {
				width: 31.3%;
				margin-right: 20rpx;

				.item-img {
					height: 284rpx;
					border-radius: 8rpx;
					background-color: #888;
				}

				.item-name {
					font-size: 28rpx;
				}

				.item-desc {
					color: #999;
					font-size: 24rpx;
					white-space: normal;
				}
			}

			.item:nth-child(3n) {
				margin-right: 0;
			}
			.item:nth-child(1),
			.item:nth-child(2),
			.item:nth-child(3){
				margin-top: 10rpx;
			}
		}
	}
</style>