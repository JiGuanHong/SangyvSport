<template>
	<view class="sport-info-container" v-if="hasLogin">
		<view class="today-sport-info-box" v-if="showTodayData">
			<image class="img" src="@/static/images/ic_cal.png" mode="scaleToFill" />
			<view class="title">今日运动</view>
			<view class="time">
				<text class="now">{{todaySportData.usedTime}}</text>
				<text class="plan">/{{todaySportTime}}</text>
				<text class="txt">分钟</text>
			</view>
			<view class="consume">
				<text class="now">{{todaySportData.sportConsume}}</text>
				<text class="txt">千卡</text>
			</view>
		</view>
		<view class="week-goal-box" v-if="showTodayData">
			<image class="img" src="@/static/images/ic_steps.png" mode="scaleToFill" />
			<view class="title">本周计划</view>
			<view class="goal">
				<text class="now">{{weekFinSportTimes}}</text>
				<text class="plan">/{{weekTotalSportTimes}}</text>
				<text class="txt">节训练</text>
			</view>
			<view class="day">
				<text class="now">{{weekSportData.sport_days_this_week}}</text>
				<text class="plan">/{{weekTotalSportDays}}</text>
				<text class="txt">天</text>
			</view>
		</view>
		<view class="total-time-box" v-if="showTotalData">
			<view class="title">累计运动时长</view>
			<view class="time-box">
				<text class="time">{{totalSportData.user_sport_info.sport_time_this_week}}</text>
				<text class="txt">分钟</text>
			</view>
		</view>
		<view class="line"></view>
		<view class="total-consume-box" v-if="showTotalData">
			<view class="title">累计热量消耗</view>
			<view class="consume-box">
				<text class="consume">{{totalSportData.user_sport_info.sport_consume_this_week}}</text>
				<text class="txt">千卡</text>
			</view>
		</view>
	</view>
</template>

<script>
import { useDataStore } from '@/store/data.js';
import { useUserStore } from '@/store/user.js'
import { objGet } from '../../uni_modules/uni-forms/components/uni-forms/utils';
export default {
	name: "my-sport-info",
	props: {
		// sportData: {
		// 	type: Object,
		// 	default: () => {
		// 		return {}
		// 	}
		// },
		// todaySportData: {
		// 	type: Object,
		// 	default: () => {
		// 		return {}
		// 	}
		// },
		// weekSportDays: {
		// 	type: Number,
		// 	default: 0
		// },
		// weekSportTimes: {
		// 	type: Number,
		// 	default: 0
		// },
		// weekFinSportTimes: {
		// 	type: Number,
		// 	default: 0
		// },
		// currentIndex: {
		// 	type: Number,
		// 	default: 0
		// },
		// todaySportTime: {
		// 	type: Number,
		// 	default: 0
		// },
		// showTodayData: {
		// 	type: Boolean,
		// 	default: false
		// },
		// showTotalData: {
		// 	type: Boolean,
		// 	default: false
		// },
		// totalSportTime: {
		// 	type: Number,
		// 	default: 0
		// },
		// totalSportConsume: {
		// 	type: Number,
		// 	default: 0
		// },
		// hasLogin: {
		// 	type: Boolean,
		// 	default: false
		// }
		hasLogin: {
			type: Boolean,
			default: false
		},
		showTodayData: {
			type: Boolean,
			default: false
		},
		showTotalData: {
			type: Boolean,
			default: false
		},
		todaySportData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		todaySportTime: {
			type: Number,
			default: 0
		},
		weekSportData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		weekFinSportTimes: {
			type: Number,
			default: 0
		},
		weekTotalSportTimes: {
			type: Number,
			default: 0
		},
		weekTotalSportDays: {
			type: Number,
			default: 0
		},
		totalSportData: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	// setup() {
	// 	const dataStore = useDataStore();
	// 	const sportData = dataStore.userSportData;
	// 	// const userStore = useUserStore();

	// 	return {
	// 		dataStore,
	// 		sportData
	// 	}
	// },
	data() {
		return {
			// todaySportTime: 0
		};
	}
}
</script>

<style lang="scss" scoped>
.sport-info-container {
	display: flex;
	justify-content: center;

	.today-sport-info-box {
		width: 170px;
		height: 150px;
		background-color: #ffffff;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		padding: 15px 10px;
		border-radius: 17px;
		box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
		margin: auto;

		.img {
			width: 16px;
			height: 21px;
		}

		.title {
			color: #888888;
			font-size: 12px;
			margin-bottom: 5px;
		}

		.time {
			width: 100%;
			height: 27px;

			.now {
				font-weight: 700;
				font-size: 20px;
				color: #000000;
				margin-right: 5px;
			}

			.plan {
				font-weight: 700;
				font-size: 12px;
			}

			.txt {
				font-weight: 700;
				font-size: 12px;
			}
		}

		.consume {
			width: 100%;
			height: 27px;

			.now {
				font-weight: 700;
				font-size: 20px;
				color: #000000;
				margin-right: 5px;
			}

			.txt {
				font-weight: 700;
				font-size: 12px;
			}
		}
	}

	.week-goal-box {
		width: 170px;
		height: 150px;
		background-color: #ffffff;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		padding: 15px 10px;
		border-radius: 17px;
		box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
		margin: auto;

		.img {
			width: 15px;
			height: 20px;

		}

		.title {
			color: #888888;
			font-size: 12px;
			margin-bottom: 5px;
		}

		.goal {
			width: 100%;
			height: 27px;

			.now {
				font-weight: 700;
				font-size: 20px;
				color: #000000;
				margin-right: 5px;
			}

			.plan {
				font-weight: 700;
				font-size: 12px;
			}

			.txt {
				font-weight: 700;
				font-size: 12px;
			}
		}

		.day {
			width: 100%;
			height: 27px;

			.now {
				font-weight: 700;
				font-size: 20px;
				color: #000000;
				margin-right: 5px;
			}

			.plan {
				font-weight: 700;
				font-size: 12px;
			}

			.txt {
				font-weight: 700;
				font-size: 12px;
			}
		}
	}
	.total-time-box {
		margin: auto;
		text-align: center;
		.title {
			font-size: 20px;
			color: #000000;
			font-weight: 400;
		}
		.time-box {
			color: #f5620f;
			.time {
				font-size: 51px;
				font-weight: 400;
			}
			.txt {
				font-weight: 400;
			}
		}
	}
	// .line {

	// }
	.total-consume-box {
		margin: auto;
		text-align: center;
		.title {
			font-size: 20px;
			font-weight: 400;
			color: #000000;
		}
		.consume-box {
			color: #f5620f;
			.consume {
				font-size: 51px;
				font-weight: 400;
			}
			.txt {
				font-weight: 400;
			}
		}
	}
}
</style>