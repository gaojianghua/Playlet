<template>
	<view class="page">
		<m-navbar :borderBottom="false" :textStyle="$store.state.navbarTextStyle" :bgColor="$store.state.bgColor" i18n value="page.观看历史">
			<view v-if="list.length != 0" slot="right" class="position-absolute top-half border rounded-1 line-h px-2 py-1" style="right: 20rpx; transform: translateY(-50%);" 
			:class="isEdit ? 'main-text-color main-border-color' : 'text-white'" @click="isEdit = !isEdit">
				{{isEdit ? $t('取消') : $t('编辑')}}
			</view>
		</m-navbar>
		<m-scroll-y isTab :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load"
			@loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
			<u-empty class="pt-5" v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="/static/img/common/empty.png">
			</u-empty>
			<view v-if="list.length != 0" class="list px-2">
				<view class="item d-flex a-center j-sb rounded mt-2"
					v-for="(item, i) in list" :key="i" @click="isEdit ? ()=>{return} : itemClick(item)">
					<u-image radius="6" width="180rpx" height="220rpx" :src="item.videolist.full_img"></u-image>
					<view class="item-r ml-2 d-flex flex-1 j-sb flex-column" style="height: 220rpx;">
						<view class="title text-white text-ellipsis1">
							{{item.videolist.name}}
						</view>
						<view class="news  main-text-color">
							{{$t('已观看至')}}：{{item.video.name}}
						</view>
						<view class="desc text-white d-flex a-center">
							<view class="item-type">
								<!-- {{item.type}} · {{item.state == 1 ? $t('连载中') : $t('已完结')}} -->
								{{item.createtime | date('dd/mm/yyyy')}}
							</view>
							<view v-if="isEdit" @click.stop="checkClick(item.videolist.id)" class="check-icon d-flex a-center j-center ml-auto" :class="item.check ? 'check-active': ''">
								<u-image v-if="item.check" width="18" height="18" src="/static/img/common/task.svg"></u-image>
							</view>
							<!-- <view v-else-if="!item.is_fav" class="btns ml-auto text-white line-h d-flex a-center j-center" @click.stop="addBookshelf(item)">
								+ {{$t('page.追剧')}}
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
		<view v-if="isEdit && list.length != 0" class="settlement border-top main-border-color px-3 w-100 position-fixed bottom-0 left-0 d-flex a-center">
			<view class="d-flex a-center" @click="openAllCheck">
				<view class="check-icon d-flex a-center j-center" :class="allChecked ? 'check-active': ''">
					<u-image v-if="allChecked" width="18" height="18" src="/static/img/common/task.svg"></u-image>
				</view>
				<view class="ml-1 line-h" :class="allChecked ? 'main-text-color' : 'text-white'">
					{{$t('全选')}}
				</view>
			</view>
			<view class="btn ml-auto text-white py px-3 d-flex j-center a-center" @click="deleteSubmit">
				{{$t('移除')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPlayRecords
	} from '@/utils/request/api/get.js'
	import {
		delVideoLog
	} from '@/utils/request/api/post.js'
	export default {
		data() {
			return {
				isEdit: false,
				isLoading: true,
				tabActive: 0,
				list: [],
				query: {
					page: 1,
					limit: 20
				},
				load: 0,
				allChecked: false,
				istrig: true
			}
		},
		onLoad() {
			this.getHistory()
		},
		methods: {
			async getHistory(e) {
				let {code, data} = await getPlayRecords(this.query)
				if (code == 200) {
					if(data.list.length == 0) {
						this.isEdit = false
					}else {
						data.list.forEach((item) => {
							item.check = false
						})
					}
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
				this.getHistory()
			},
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getHistory('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			openTabs(i) {
				this.list = []
				this.isLoading = true
				this.load = 0
				this.tabActive = i
				this.allChecked = false
				this.list.forEach((item) => {
					item.check = false
				})
				this.isEdit = false
				this.onRefresh()
			},
			// 进入阅读页
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
			// 删除
			async deleteSubmit(i) {
				let {code, data} = await delVideoLog({vid: this.ids.join()})
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
			// 全选
			openAllCheck() {
				this.allChecked = !this.allChecked
				this.list.forEach((item) => {
					item.check = this.allChecked
				})
				this.allChecked ? this.ids = this.list.map((item)=>item.videolist.id) : this.ids = []
			},
			// 加入书架
			async addBookshelf(i) {
				let {code, data} = await addNovelShelf({
					id: i.id
				})
				if (code == 200) {
					this.onRefresh()
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.$t("收藏成功")
					});
				}
			}
		},
		computed: {
			scrollStyle() {
				let size = this.isEdit ? '100rpx' : '0rpx'
				return {
					height: `calc(100vh - ${size} - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px - ${this.$store.state.navbarHeight}px - ${this.$store.state.browserFitHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs{
		height: 80rpx;
		border-bottom: 1rpx solid #333;
	}
	.default{
		
	}
	.active{
		border-color: #EE7623;
		color: #EE7623;
	}
	.page{
		.item{
			.item-r{
				height: 250rpx;
				.title{
					font-size: 32rpx;
				}
				.news{
					font-size: 28rpx;
					line-height: 34rpx;
				}
				.desc{
					height: 55rpx;
					.state{
						font-size: 26rpx;
					}
					.btns{
						border-radius: 10rpx;
						font-size: 26rpx;
						padding: 12rpx 22rpx;
						background-color: #EE7623;
					}
				}
				.item-type {
					color: #eee;
					font-size: 24rpx;
				}
				
				.item-info {
					color: #FA9C3E;
					font-size: 28rpx;
				}
				
				.item-school {
					color: #eee;
					line-height: 32rpx;
					font-size: 24rpx;
				}
			}
			
		}
		.settlement{
			height: 100rpx;
			.btn{
				border-radius: 16rpx;
				background-color: #EE7623;
			}
		}
		.check-icon{
			width: 45rpx;
			height: 45rpx;
			padding: 6rpx;
			border: 4rpx solid #fff;
			border-radius: 10rpx;
		}
		.check-active{
			border: 4rpx solid #EE7623;
		}
	}
</style>