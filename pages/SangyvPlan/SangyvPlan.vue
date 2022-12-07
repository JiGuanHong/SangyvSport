<template>
	<view class="sangyv-plan-container">
		<view class="avatar-box">
			<my-avatar :hasLogin="userStore.data.hasLogin" :userInfo="userStore.data.userInfo" @click="onAvatarClick">
			</my-avatar>
		</view>
		<view class="sport-info-box">
			<my-sport-info :hasLogin="userStore.data.hasLogin" :showTodayData="true"
				:todaySportData="dataStore.userTodaySportData" :todaySportTime="dataStore.calculateTodaySportTime"
				:weekSportData="dataStore.userSportData" :weekFinSportTimes="dataStore.calculateWeekFinSportTimes"
				:weekTotalSportTimes="dataStore.calculateWeekTotalSportTimes"
				:weekTotalSportDays="dataStore.calculateWeekTotalSportDays"></my-sport-info>
		</view>
		<view class="calendar-box">
			<sangyv-tabs :defaultIndex="currentIndex" :calendarData="calendarData" @tabClick="tabClick"
				:listData="dataStore.userSportPlan"></sangyv-tabs>
		</view>
		<view>
			<view class="txt">今日训练</view>
			<view class="tip" v-if="!userStore.data.hasLogin">登录后查看运动计划</view>
		</view>
		<!-- <button @click="t">dianji</button> -->
		<view class="item-box" v-if="userStore.data.hasLogin">
			<view class="not-today" :style="{width: this.boxWidth + 'px',height: this.boxHeight + 'px'}" v-if="showBox">
				<text>训练日当天才会解锁哦</text>
			</view>
			<uni-load-more status="loading" v-if="isLoading" />
			<view v-else>
				<sangyv-list-item class="item" v-for="(item, index) in dataStore.userSportPlan[currentIndex]"
					:key="index" :listData="item" @click="onItemClick(currentIndex,index,item)"
					@btnClick="onBtnClick(currentIndex)" :today="today" :hasLogin="userStore.data.hasLogin"
					:userWeight="dataStore.userBodyData.user_weight">
				</sangyv-list-item>
			</view>
		</view>
		<!-- <view>
			<view>非训练日</view>
			<view>如有需要，当天可调整为训练日</view>
		</view> 
		:todaySportData="dataStore.userTodaySportData"
				:weekSportDays="dataStore.calculateTotalSportDays" 
				:weekSportTimes="dataStore.calculateTotalSportTimes"
				:weekFinSportTimes="dataStore.calculateFinSportTimes" 
				:currentIndex="currentIndex"
				:todaySportTime="dataStore.calculateTodaySportTime" 
				:showTodayData="true" 
				:hasLogin="userStore.data.hasLogin"-->
	</view>
</template>

<script>
	import {
		createCalendar
	} from '../../libs/calendar';
	import {
		useDataStore
	} from '@/store/data';
	import {
		useUserStore
	} from '@/store/user';
	import dayjs from 'dayjs';
	import 'dayjs/locale/zh-cn';
	dayjs.locale('zh-cn');

	const db = uniCloud.database();

	export default {
		data() {
			return {
				hasLogin: false,
				isLoading: false,
				calendarData: [],
				currentIndex: 0,
				today: true,
				// dataStore.userSportVideoArr: [],
				boxWidth: 0,
				boxHeight: 0,
				// todaySportTime: 0,
				showBox: false
			};
		},
		setup() {
			const userStore = useUserStore();
			const dataStore = useDataStore();

			return {
				userStore,
				dataStore,
			}
		},
		onLoad() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			this.loadCalendar();
			this.getTodayIndex();
			this.userStore.updateUserInfo();
			if (this.userStore.data.hasLogin) {
				this.getUserData();
				console.log('用户登录状态', this.userStore.data.hasLogin);
			}
			// console.log("load")
		},
		methods: {
			/**
			 * 加载日历
			 */
			loadCalendar() {
				this.calendarData = createCalendar();
				// this.getUserInfo();
			},
			/**
			 * 获取当前日期的 index
			 */
			getTodayIndex() {
				setTimeout(() => {
					for (let i = 0; i < this.calendarData.length; i++) {
						if (this.calendarData[i].now) {
							this.currentIndex = this.calendarData[i].dateIndex;
						}
					}
					this.dataStore.getTodayIndex(this.currentIndex);
					// this.todaySportTime = this.dataStore.calculateTodaySportTime
				})
			},
			/**
			 * 日历 item 项点击事件
			 */
			tabClick(index) {
				this.currentIndex = index;
				this.isToday();
				// console.log(this.today)
				// console.log(this.dataStore.userSportPlan[this.currentIndex][0]);
				this.showBox = Object.keys(this.dataStore.userSportPlan[this.currentIndex][0]).length != 0 && !this.today;
				// console.log(showBox);
				if (!this.today) {
					// console.log('hello')
					setTimeout(async () => {
						this.boxWidth = await this.getListWidth();
						this.boxHeight = await this.getListHeight();
						// console.log(this.boxHeight);
						// console.log(this.boxWidth)
					})

					// this.getListHeight()
				}
			},
			/**
			 * 判断是否为今天
			 */
			isToday() {
				// console.log(this.currentIndex);
				if (this.calendarData[this.currentIndex].now) {
					this.today = true;
					return;
				}
				this.today = false;
				return;
			},
			/**
			 * 获取用户数据
			 */
			async getUserData() {
				try {
					this.dataStore.userTodaySportData.today = dayjs().format("YYYY-MM-DD");
					// this.userStore.updateUserInfo();
					const res = await db.collection('sangyv_user_sport').where("'user_id' == $cloudEnv_uid").get();
					// console.log(res);
					if (this.userStore.data.hasLogin) {
						await this.dataStore.getUserBodyData();
						await this.dataStore.getUserSportData();
						if (this.dataStore.userSportData.last_sport_day != this.dataStore.userTodaySportData.today) {
							this.dataStore.resetUserTodaySportData();
						} else {
							this.dataStore.getUserTodaySportData();
						}
						if (this.dataStore.userBodyData._date.length != 0 && Object.keys(res.result.data[0]
								.plan_object).length === 0) {
							this.dataStore.initUserSportPlan()
						} else {
							this.dataStore.getUserSportPlan()
						}
					} else {
						this.deleteUserData();
					}
				} catch {
					this.deleteUserData();
					this.userStore.deleteUserInfo();
					uni.showModal({
						title: "提示",
						content: "您的登录状态已过期，请问是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
								})
							}
						},
						fail() {
							console.log("接口调用失败");
						},
						complete() {
							console.log("接口调用完成")
						}
					})
					console.log("error");
				}
			},
			/**
			 * 删除用户数据
			 */
			deleteUserData() {
				this.dataStore.deleteUserBodyDataInStorage();
				this.dataStore.deleteUserSportDataInStorage();
				this.dataStore.deleteUserSportPlanInStorage();
				this.dataStore.deleteUserSportVideoArrInStorage();
				this.dataStore.deleteUserTodaySportDataInStorage();
			},
			/**
			 * 头像点击事件
			 */
			onAvatarClick() {
				if (!this.userStore.data.hasLogin) {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
					})
				} else {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true'
					})
				}
			},
			/**
			 * 视频列表项点击事件
			 */
			onItemClick(currentIndex, index, item) {
				uni.navigateTo({
					url: `/subpkg/pages/video-detail/video-detail?&index=${index}&currentIndex=${currentIndex}`
				});
			},
			/**
			 * 设置训练日按钮点击事件
			 */
			async onBtnClick(currentIndex) {
				this.isLoading = true;
				// console.log("hell")
				uni.showModal({
					title: '提示',
					content: '是否确认设置今天为训练日',
					showCancel: true,
					success: async ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							this.dataStore.updateUserBodyDataInLocal(currentIndex);
							this.dataStore.updateUserSportPlanInLocal(currentIndex);
							this.dataStore.getTodayIndex(this.currentIndex);
							// this.todaySportTime = this.dataStore.calculateTotalSportTime
							this.isLoading = false;
						}
						if (cancel) {
							this.isLoading = false;
							return
						}
					}
				})
			},
			/**
			 * 获取列表宽度
			 */
			getListWidth() {
				return new Promise((resolve) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.item').boundingClientRect(res => {
						// console.log(res);
						const width = res.width;
						resolve(width);
					}).exec()
				})
				// const query = uni.createSelectorQuery().in(this);
				// query.select('.item').boundingClientRect((res) => {
				// 	this.boxWidth = res.width;
				// }).exec();
				// query.select('.item-box').boundingClientRect(res => {
				// 	this.boxHeight = res.height;
				// }).exec()
			},
			/**
			 * 获取列表高度
			 */
			getListHeight() {
				return new Promise((resolve) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.item-box').boundingClientRect(res => {
						// console.log(res);
						const height = res.height;
						resolve(height);
					}).exec()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sangyv-plan-container {
		// .avatar-box {}

		.sport-info-box {
			margin-bottom: 15px;
		}

		.calendar-box {
			margin-bottom: 15px;
		}

		.txt {
			width: 100%;
			height: 30px;
			font-size: 24px;
			box-sizing: border-box;
			padding: 0 15px;
			font-weight: 700;
			line-height: 30px;
		}

		.tip {
			height: 200px;
			width: 100%;
			text-align: center;
			line-height: 200px;
			font-size: 20px;
		}

		.item-box {
			position: relative;
			padding: 0 10px;

			.not-today {
				// width: 100%;
				position: absolute;
				background: rgba(0, 0, 0, 0.65);
				border-radius: 16px;
				// height: 300px;
				z-index: 9;

				// height: 1000px;
				text {
					position: absolute;
					color: #ffffff;
					font-size: 20px;
					font-weight: 400;
					text-align: center;
					top: 50%;
					left: 20%;
					z-index: 9;
				}
			}
		}
	}
</style>
