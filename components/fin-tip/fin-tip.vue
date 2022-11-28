<template>
	<view class="container">
		<view class="tip-box">
			<view class="tip-1" v-if="diff != 0">
				<view>距离完成今日训练还差{{diff}}节训练</view>
				<view>下一节：{{videoName}}{{videoLevel}}级</view>
			</view>
			<view class="tip-2" v-else>
				<view>太棒啦！您已经完成今日所有训练计划！</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "fin-tip",
	props: {
		diff: {
			type: Number,
			default: 0
		},
		videoName: {
			type: String,
			default: ""
		},
		videoLevel: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {

		};
	}
}
</script>

<style lang="scss" scoped>
.container {
	.tip-box {
		width: 100%;
		height: 55px;
		background: rgba(255, 153, 0, 0.15);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ff9900;
	}
}
</style>