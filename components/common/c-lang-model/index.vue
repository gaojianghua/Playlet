<template>
	<m-modal :show="show" i18n title="切换语言" @cancel="close" @confirm="confirmSwitch">
		<view class="d-flex a-center pb-2 flex-column">
			<view class="lang border-2 py-1 mt-2 d-flex a-center j-center" :class="lang == item.code ? 'active text-white' : 'default main-text-color'"
				v-for="(item, i) in $store.state.langList" :key="i"
				@click="openLang(i)">
				{{item.title}}
			</view>
		</view>
	</m-modal>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			}
		},
		data() {
			return {
				lang: ''
			}
		},
		created() {
			this.lang = this.$store.state.lang
		},
		methods: {
			// 确认
			confirmSwitch() {
				this.$emit('confirmSwitch', this.lang)
			},
			// 取消
			close() {
				this.$emit('close')
			},
			// 选择语言
			openLang(i) {
				this.lang = this.$store.state.langList[i].code
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lang {
		width: 80%;
		border-radius: 12rpx;
	}
	
	.active {
		border-color: #EE7623;
		background-color: #EE7623;
	}
	
	.default {
		border-color: #EE7623;
		background-color: #fff;
	}
</style>