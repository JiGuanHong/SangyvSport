<template>
	<view class="item-container" v-if="hasLogin">
		<view class="item-box" v-if="Object.keys(listData).length != 0" :class="{'item-box-fin': listData.isFin}">
			<!-- <view class="box-left">
				<image class="img" src="/static/images/finish.png" mode="scaleToFill" />
			</view> -->
			<view class="box-middle">
				<view class="title" :class="{'title-fin': listData.isFin}">{{listData.video_name}}</view>
				<view class="level">{{listData.video_level}}级</view>
				<view class="item-desc-box">
					<text class="type" :class="{'fin': listData.isFin}">自行训练</text>
					<text class="time" :class="{'fin': listData.isFin}">{{listData.video_length}}分钟</text>
					<text class="consume" :class="{'fin': listData.isFin}">{{listData.user_consume}}千卡</text>
				</view>
			</view>
			<view class="box-right">
				<text class="start-btn" @click="$emit('click')" v-if="!listData.isFin">开始运动</text>
				<view class="fin-box" v-else>
					<image src="@/static/images/fin.png" mode="scaleToFill" />
					<text class="fin-txt">已完成</text>
				</view>
			</view>
		</view>
		<view class="item-null" v-else>
			<view class="box">
				<view class="txt" v-if="!today">非训练日</view>
				<view class="txt" v-if="!today">如有需要，当天可调整为训练日</view>
				<view class="btn" v-if="today" @click="$emit('btnClick')">调整今天为训练日</view>
			</view>
		</view>
	</view>
</template>

<script>
import { useUserStore } from '@/store/user'
export default {
	name: "sangyv-list-item",
	props: {
		listData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		today: {
			type: Boolean,
			default: true
		},
		hasLogin: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			
		};
	}
}
</script>

<style lang="scss" scoped>
.item-container {
	width: 100%;
	margin: 10px 0;
	// padding: 0 10px;
	box-sizing: border-box;

	.item-box {
		width: 100%;
		height: 100px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		// margin: 0 10px;
		padding: 0 20px;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
		position: relative;
		background: linear-gradient(90deg, #ff8946 70%, rgba(255, 134, 96, 0.21) 110%);
		border: 1px solid #e8e7e9;
		border-radius: 16px;

		&-fin {
			background: #ffffff;
		}

		// .box-left {
		// 	display: inline-block;
		// 	margin-right: 10px;

		// 	.img {
		// 		width: 32px;
		// 		height: 32px;
		// 	}
		// }

		.box-middle {
			display: inline-block;
			
			.title {
				height: 22px;
				line-height: 22px;
				display: inline-block;
				margin-right: 10px;
				color: #ffffff;
				font-size: 18px;
				font-weight: 700;
				&-fin {
					color: #000000;
				}
			}

			.level {
				width: 25px;
				height: 15px;
				text-align: center;
				line-height: 15px;
				background-color: #21b121;
				display: inline-block;
				font-size: 10px;
				font-weight: 700;
				border-radius: 3px;
				color: #ffffff;
			}

			.item-desc-box {
				margin-top: 5px;

				// background-color: #ffd8c2;
				text {
					display: inline-block;
					width: 45px;
					height: 18px;
					margin-right: 10px;
					background-color: #ffd8c2;
					font-size: 10px;
					font-weight: 400;
					line-height: 18px;
					text-align: center;
				}

				.fin {
					color: #8b878f;
					background: #ebebeb;
				}
			}
		}

		.box-right {
			width: 85px;
			height: 35px;
			position: absolute;
			left: 70%;
			right: 7%;
			background-color: #ffffff;
			border-radius: 50px;
			text-align: center;
			line-height: 35px;

			.start-btn {
				font-size: 15px;
				color: #ff8947;
				// text-align: center;

				font-weight: 700;
			}

			.fin-box {
				image {
					width: 20px;
					height: 15px;
					margin-right: 5px;
				}
				.fin-txt {
					font-size: 15px;
					font-weight: 700;
					color: #180f20;
				}
			}
		}
	}

	.item-null {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.box {
			margin-top: 30px;
			.txt {
				text-align: center;
				color: #888888;
				// margin: auto;
				// margin-bottom: 10px;
				font-size: 16px;
				font-weight: 400;
			}

			.btn {
				width: 210px;
				height: 50px;
				margin: auto;
				margin-top: 20px;
				text-align: center;
				color: #ff9900;
				background: rgba(255, 153, 0, 0.15);
				border: 1px solid #ff9900;
				border-radius: 50px;
				line-height: 50px;
				font-size: 16px;
				font-weight: 400;
			}
		}

	}
}
</style>