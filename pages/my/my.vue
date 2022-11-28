<template>
	<view class="my-container">
		<view class="avatar-box">
			<my-avatar :userInfo="userStore.data.userInfo" :hasLogin="userStore.data.hasLogin" :showMy="true"
				@click="onAvatarClick">
			</my-avatar>
		</view>
		<view class="my-sport-info-box">
			<my-sport-info :totalSportData="dataStore.userSportData" :showTotalData="true"
				:hasLogin="userStore.data.hasLogin"></my-sport-info>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '../../store/user';
	import {
		useDataStore
	} from '../../store/data';

	// const db = uniCloud.database();

	export default {
		data() {
			return {

			};
		},
		setup() {
			const userStore = useUserStore();
			const dataStore = useDataStore();

			return {
				userStore,
				dataStore
			}
		},
		// onShow() {
		// 	db.collection("uni-id-users").where("'_id' == $cloudEnv_uid").field("nickname").get().then(res => {
		// 		// console.log("success")
		// 		this.userStore.updateUserInfo();
		// 		this.isUserLogin();
		// 	}).catch(err => {
		// 		// console.log("error")
		// 		// this.deleteUserData();
		// 		this.userStore.deleteUserInfo();
		// 		this.isUserLogin();
		// 	});
		// },
		methods: {
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
			// /**
			//  * 判断用户登录状态
			//  */
			//  isUserLogin() {
			// 	this.hasLogin = Object.keys(this.userStore.hostUserInfo).length != 0;
			// 	if (!this.hasLogin) {
			// 		// this.hostUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
			// 		console.log('用户登录状态', this.hasLogin);
			// 		this.deleteUserData();
			// 		this.isLoading = false;
			// 	} else {
			// 		console.log('用户登录状态', this.hasLogin);
			// 		this.getUserData();
			// 		if (this.dataStore.userTodaySportData.today != this.dataStore.userSportData.last_sport_day) {
			// 			this.dataStore.initUserTodaySportData();
			// 		} else if (this.dataStore.userTodaySportData.usedTime === 0 && this.dataStore.userTodaySportData.sportConsume === 0) {
			// 			this.dataStore.getUserTodaySportData();
			// 		} else {
			// 			return;
			// 		}
			// 	}
			// },
			// /**
			//  * 获取用户数据
			//  */
			//  async getUserData() {
			// 	if (this.hasLogin && Object.keys(this.dataStore.userBodyData).length == 0) {
			// 		this.isLoading = true;
			// 		console.log("正在获取用户身体数据");
			// 		await this.dataStore.getUserBodyData();
			// 		this.isLoading = false;
			// 	}
			// 	if (this.hasLogin && Object.keys(this.dataStore.userSportData).length == 0) {
			// 		console.log('正在获取用户运动数据')
			// 		await this.dataStore.getUserSportData();
			// 	}
			// 	if (Object.keys(this.dataStore.userBodyData).length != 0 || Object.keys(this.dataStore.userSportData).length != 0) {
			// 		console.log("本地已缓存数据");
			// 	}
			// 	if (this.hasLogin && this.dataStore.userTodaySportData.usedTime == 0) {
			// 		console.log("正在获取用户今日运动数据");
			// 		await this.dataStore.getUserTodaySportData();
			// 	}
			// },
			// /**
			//  * 删除用户数据
			//  */
			// deleteUserData() {
			// 	if (Object.keys(this.dataStore.userBodyData).length != 0 || Object.keys(this.dataStore.userSportData).length != 0 || Object.keys(this.dataStore.userSportPlan) != 0 || this.dataStore.userSportVideoArr.length != 0) {
			// 		console.log("删除用户数据");
			// 		this.dataStore.deleteUserBodyDataInStorage();
			// 		this.dataStore.deleteUserSportDataInStorage();
			// 		this.dataStore.deleteUserSportPlanInStorage();
			// 		this.dataStore.deleteUserSportVideoArrInStorage();
			// 		this.dataStore.deleteUserTodaySportDataInStorage();
			// 	}
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.my-container {
		.avatar-box {
			margin-bottom: 45px;
		}
	}
</style>
