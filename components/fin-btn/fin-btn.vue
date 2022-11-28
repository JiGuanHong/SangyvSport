<template>
	<view class="container">
		<view class="btn-box">
			<view class="btn-1" v-if="diff != 0">
				<view class="btn-1-1" @click="$emit('backClick')">休息一会再练</view>
				<view class="btn-1-2" @click="$emit('nextClick')">继续训练</view>
			</view>
			<view class="btn-2" v-else>
				<view class="btn" @click="$emit('finClick')">完成</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "fin-btn",
	props: {
		diff: {
			type: Number,
			default: -1
		},
		xIndex: {
			type: String,
			default: ""
		},
		currentIndex: {
			type: String,
			default: ""
		}
	},
	data() {
		return {

		};
	},
	methods: {
		// btnClick1() {
		// 	uni.redirectTo({ url: '../../../pages/sangyv-plan/sangyv-plan' });
		// },
		// btnClick2() {
		// 	uni.redirectTo({ url: `../../pages/video-detail/video-detail?index=${this.xIndex}&currentIndex=${this.currentIndex}` })
		// },
		// btnClick3() {
		// 	uni.redirectTo({ url: '../../../pages/sangyv-plan/sangyv-plan' });
		// }
	}
}
</script>

<style lang="scss" scoped>
.container {
	.btn-box {
		.btn-1 {
			.btn-1-1 {
				display: inline-block;
				box-sizing: border-box;
				width: 150px;
				height: 55px;
				border-radius: 55px;
				border: 1px solid #000000;
				line-height: 55px;
				margin-right: 10px;
			}

			.btn-1-2 {
				display: inline-block;
				width: 150px;
				height: 55px;
				border-radius: 55px;
				border: 1px solid #ff9900;
				background: #ff9900;
				line-height: 55px;
				color: #ffffff;
			}
		}

		.btn-2 {
			width: 100%;
			height: 55px;

			.btn {
				background: #ff9900;
				border: 1px solid #ff9900;
				border-radius: 16px;
				line-height: 55px;
				color: #ffffff;
				font-size: 20px;
				font-weight: 700;
			}
		}
	}
}
</style>