<template>
	<view class="video-detail-container">
		<!-- <button @click="test">测试</button> -->
		<view class="video-box">
			<video id="sportVideo" class="video" :src="video.video_file.url" autoplay @ended="onVideoEnd"></video>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import 'dayjs/locale/zh-cn';
	import {
		useDataStore
	} from '@/store/data'
	dayjs.locale('zh-cn');

	// const db = uniCloud.database();
	// const userSportInfo = db.collection("sangyv_user_sport_info");
	const uniIdCo = uniCloud.importObject("uni-id-co");


	export default {
		data() {
			return {
				index: 0,
				currentIndex: 0,
				video: {},
				// countTime: {
				// 	startTime: 0,
				// 	finTime: 0,
				// 	usedTime: 0,
				// 	nowaday: ""
				// },
				sportConsume: 0
			};
		},
		setup() {
			const dataStore = useDataStore();
			const userBodyData = dataStore.userBodyData;
			const userSportData = dataStore.userSportData;
			const userSportVideoArr = dataStore.userSportVideoArr;

			return {
				dataStore,
				userBodyData,
				userSportData,
				userSportVideoArr
			}
		},
		onLoad(options) {
			this.index = options.index;
			this.currentIndex = options.currentIndex
			this.video = this.userSportVideoArr[this.index];
			this.refreshToken();
			console.log(options);
		},
		onReady() {
			this.videoContext = uni.createVideoContext('sportVideo');
			this.intoFullScreen();
			// this.countTime.startTime = dayjs();
		},
		methods: {
			/**
			 * 刷新 token
			 */
			async refreshToken() {
				const res = await uniIdCo.refreshToken();
				console.log(res)
			},
			/**
			 * 进入全屏
			 */
			intoFullScreen() {
				// console.log(this.videoContext);
				this.videoContext.requestFullScreen({
					direction: 90
				})
			},
			/**
			 * 视频播放完毕事件
			 */
			onVideoEnd() {
				// this.countTime.finTime = dayjs();
				// this.countTime.usedTime = dayjs(this.countTime.finTime).diff(this.countTime.startTime, 'second');
				// console.log(this.countTime.usedTime);
				// this.dataStore.updateUserLastSportDayInLocal();
				this.updateUserSportInfo();
				this.dataStore.addFinStateToUserSportPlan(this.currentIndex, this.index);
				setTimeout(() => {
					uni.redirectTo({
						url: `../../pages/sport-fin/sport-fin?index=${this.index}&videoName=${this.video.video_name}&videoLevel=${this.video.video_level}&usedTime=${this.video.video_length}&consume=${this.sportConsume}&currentIndex=${this.currentIndex}`
					})
				}, 1000)
			},
			/**
			 * 更新用户运动数据 
			 */
			async updateUserSportInfo() {
				this.dataStore.updateUserLastSportDayInLocal();
				this.sportConsume = this.video.video_cost * this.userBodyData.user_weight * this.video.video_length *
					0.0167;
				console.log(this.video.video_cost);
				this.dataStore.updateUserTodaySportDataInLocal(this.video.video_length, this.sportConsume);
				console.log("用户今日运动数据更新", this.dataStore.userTodaySportData);
				this.dataStore.updateUserSportDataInLocal(this.video.video_length, this.sportConsume, this.video
					.category_id);
			},
		}
	}
</script>

<style lang="scss">
	.video-detail-container {
		.video-box {
			background-color: #ffffff;
			position: sticky;
			top: 0;
			z-index: 9;

			.video {
				width: 100%;
				height: 230px;
			}
		}
	}
</style>
