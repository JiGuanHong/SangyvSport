<template>
	<view class="sport-fin-container">
		<view class="img-box">
			<image class="img"
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5053d75a-bd16-4d61-b214-ac4396bc71bc/5ec7be3c-98bb-4087-80e8-2538e49f1a68.png"
				mode="scaleToFill" />
		</view>
		<view class="fin-box" :style="{
			height: this.boxHeight + 'px'
		}">
			<view class="top-box">
				<view class="title-box">
					<view class="title">{{video.video_name}}</view>
					<view class="level">{{video.video_level}}级</view>
				</view>
				<view class="txt">恭喜您已完成本次训练！</view>
				<view class="line"></view>
			</view>
			<view class="middle-box">
				<fin-sport-info :usedTime="usedTime" :consume="consume"></fin-sport-info>
			</view>
			<view class="bottom-box">
				<view class="tip-box">
					<fin-tip :videoName="userSportVideoArr[xIndex].video_name" :videoLevel="userSportVideoArr[xIndex].video_level"
						:diff="diff"></fin-tip>
				</view>
				<view class="btn-box">
					<fin-btn :diff="diff" @backClick="onBackClick" @nextClick="onNextClick" @finClick="onFinClick"></fin-btn>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { useDataStore } from '@/store/data';

export default {
	data() {
		return {
			index: 0,
			xIndex: 0,
			currentIndex: 0,
			boxHeight: 0,
			video: {},
			diff: 0,
			usedTime: 0,
			consume: 0
		};
	},
	setup() {
		const dataStore = useDataStore();
		const userSportVideoArr = dataStore.userSportVideoArr;

		return {
			dataStore,
			userSportVideoArr
		}
	},
	onLoad(options) {
		this.index = options.index;
		this.currentIndex = options.currentIndex;
		this.calculateLastVideo();
		this.video = this.userSportVideoArr[this.index];
		// console.log(this.index);
		// console.log(this.videoAmount)
		this.usedTime = parseInt(options.usedTime);
		this.consume = parseInt(options.consume);
		console.log(options);

		// console.log(sysInfo);

		// console.log(this.screenHeight)
		// console.log(this.diff);
	},
	onReady() {
		this.getWindowHeight();
	},
	methods: {
		/**
		 * 获取窗口高度
		 */
		getWindowHeight() {
			const sysInfo = uni.getWindowInfo();
			const windowHeight = sysInfo.windowHeight;
			const query = uni.createSelectorQuery().in(this);
			query.select('.fin-box').boundingClientRect((res) => {
				// console.log(res);
				this.boxHeight = windowHeight - res.top;
				// console.log(this.boxHeight)
			}).exec()
		},
		/**
		 * 计算当前是否是最后一个视频
		 */
		calculateLastVideo() {
			if (this.index == this.dataStore.calculateVideoAmount - 1) {
				this.xIndex = parseInt(this.index);
				// console.log(this.xIndex);
				this.diff = 0;
				return;
			}
			this.xIndex = parseInt(this.index) + 1;
			this.diff = this.dataStore.calculateVideoAmount - this.xIndex;
			// console.log(this.xIndex)
		},
		/**
		 * 休息按钮点击事件
		 */
		onBackClick() {
			uni.switchTab({ url: '../../../pages/sangyv-plan/sangyv-plan' });
		},
		/**
		 * 继续训练按钮点击事件
		 */
		onNextClick() {
			uni.redirectTo({ url: `../../pages/video-detail/video-detail?index=${this.xIndex}&currentIndex=${this.currentIndex}` })
		},
		/**
		 * 完成按钮点击事件
		 */
		onFinClick() {
			uni.switchTab({ url: '../../../pages/sangyv-plan/sangyv-plan' });
		}
	}
}
</script>

<style lang="scss" scoped>
.sport-fin-container {
	position: relative;
	width: 100%;

	.img-box {
		.img {
			width: 100%;
			height: 250px;
		}
	}

	.fin-box {
		width: 100%;
		background: #ffffff;
		border-radius: 30px 30px 0px 0px;
		position: absolute;
		top: 50%;
		box-sizing: border-box;
		padding: 15px 20px;
		// display: flex;
		// justify-content: center;
		text-align: center;

		.top-box {
			.title-box {
				margin-bottom: 10px;

				.title {
					display: inline-block;
					font-size: 28px;
					font-weight: 700;
					margin-right: 10px;
				}

				.level {
					display: inline-block;
					width: 35px;
					height: 18px;
					line-height: 18px;
					background: #21b121;
					color: #ffffff;
				}
			}

			.txt {
				margin-bottom: 10px;
			}

			.line {
				width: 100%;
				height: 2px;
				background-color: #e8e7e9;
			}
		}

		.middle-box {
			margin-top: 25%;
		}

		.bottom-box {
			position: relative;
			top: 15%;
			// bottom: 10%;
			// display: flex;
			// justify-content: center;
			// align-items: center;

			.tip-box {
				margin-bottom: 15px;
			}
		}

		// .box {
		// 	width: 100%;

		// 	.title-box {

		// 		.title {
		// 			font-size: 28px;
		// 			font-weight: 700;
		// 			display: inline-block;
		// 			margin-right: 10px;
		// 		}

		// 		.level {
		// 			display: inline-block;
		// 			width: 35px;
		// 			height: 18px;
		// 			line-height: 18px;
		// 			background: #21b121;
		// 			color: #ffffff;
		// 		}
		// 	}

		// 	.txt {
		// 		font-size: 16px;
		// 		font-weight: 400;
		// 		color: #8b878f;
		// 	}

		// 	.line {
		// 		width: 100%;
		// 		height: 1px;
		// 		background-color: #e8e7e9;
		// 	}

		// 	.time-box {
		// 		.txt {
		// 			font-size: 20px;
		// 		}

		// 		.time {
		// 			font-size: 51px;
		// 		}
		// 	}

		// 	.consume-box {
		// 		margin-bottom: 100px;

		// 		.txt {
		// 			font-size: 20px;
		// 		}

		// 		.consume {
		// 			font-size: 51px;
		// 		}
		// 	}

		// 	.bottom-box {
		// 		position: absolute;
		// 		bottom: 15%;

		// 		.tip-box {
		// 			width: 100%;
		// 			height: 55px;
		// 			background: rgba(255, 153, 0, 0.15);
		// 			display: flex;
		// 			justify-content: center;
		// 			align-items: center;
		// 			color: #ff9900;
		// 			margin-bottom: 10px;
		// 		}

		// 		.btn-box {
		// 			.btn-1-box {
		// 				.btn-1 {
		// 					display: inline-block;
		// 					width: 150px;
		// 					height: 55px;
		// 					border-radius: 55px;
		// 					border: 1px solid #000000;
		// 					line-height: 55px;
		// 					margin-right: 10px;
		// 				}

		// 				.btn-2 {
		// 					display: inline-block;
		// 					width: 150px;
		// 					height: 55px;
		// 					border-radius: 55px;
		// 					border: 1px solid #000000;
		// 					line-height: 55px;
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}
}
</style>
