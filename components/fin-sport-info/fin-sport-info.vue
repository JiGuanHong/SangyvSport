<template>
	<view class="container">
		<view class="box">
			<view class="time-box">
				<text class="txt">共花费</text>
				<text class="time">{{usedTime}}</text>
				<text class="txt">分钟</text>
			</view>
			<view class="consume-box">
				<text class="txt">消耗热量</text>
				<text class="consume">{{consume}}</text>
				<text class="txt">千卡</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "fin-sport-info",
	props: {
		usedTime: {
			type: Number,
			default: 0
		},
		consume: {
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
	width: 100%;

	.box {
		.time-box {
			height: 75px;
			line-height: 75px;
			.txt {
				font-size: 20px;
				margin: 0 20px;
			}

			.time {
				font-size: 51px;
				font-weight: 400;
			}
		}

		.consume-box {
			height: 75px;
			line-height: 75px;
			.txt {
				font-size: 20px;
				margin: 0 20px;
				font-weight: 400;
			}

			.consume {
				font-size: 51px;
			}
		}
	}
}
</style>