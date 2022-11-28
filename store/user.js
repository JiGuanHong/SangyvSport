import {
	ref
} from 'vue'
import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			data: uni.getStorageSync('uni-id-pages-user') || {},
		}
		// uni.getStorageSync('uni-id-pages-userInfo')||{}
	},
	getters: {

	},
	actions: {
		updateUserInfo() {
			this.data = uni.getStorageSync('uni-id-pages-user') || {};
			// console.log('用户数据',this.data);
		},
		deleteUserInfo() {
			uni.removeStorageSync('uni-id-pages-user');
			this.data = {
				userInfo: {},
				hasLogin: false
			};
		}
	}
})
















// import { ref } from 'vue';
// import { defineStore } from 'pinia';

// const STORAGE_KEY_BODY = 'bodyInfo';
// const STORAGE_KEY_SPORT_INFO = 'sportInfo';
// const STORAGE_KEY_SPORT_PLAN = 'sportPlan'

// const db = uniCloud.database();
// const bodyInfo = db.collection("sangyv_user_info");
// const userSportInfo = db.collection("sangyv_user_sport_info");
// const video = db.collection("sangyv_admin_video");

// export const useUserStore = defineStore('user', () => {
//   const userBodyInfo = ref(uni.getStorageSync(STORAGE_KEY_BODY) || {})
//   const userSportInfo = ref(uni.getStorageSync(STORAGE_KEY_SPORT_INFO) || {})
//   const userSportPlan = ref(uni.getStorageSync(STORAGE_KEY_SPORT_PLAN) || {})

//   /**
//     * 获取用户身体数据
//     */
//   async function getUserBodyInfo() {
//     const res = await userBodyInfo.where("'user_id' == $cloudEnv_uid").field("user_weight,user_video_category_id,_date,user_body_level").get();
//     userBodyInfo = res.result.data[0];
//     saveUserBodyInfoToStorage();
//     console.log(this.userBodyInfo);
//     this.getUserSportPlan();
//   }
//   /**
//     * 保存身体数据到 storage
//     */
//   function saveUserBodyInfoToStorage() {
//     uni.setStorage({
//       key: STORAGE_KEY_BODY,
//       data: this.userBodyInfo
//     })
//   }
//   return { userBodyInfo, userSportInfo, userSportPlan, getUserBodyInfo }


//   //   /**
//   //    * 获取用户运动数据
//   //    */
//   //   async getUserSportInfo() {
//   //     const res = await userSportInfo.where("'user_id' == $cloudEnv_uid").field("user_sport_info,last_sport_day,total_sport_day").get();
//   //     this.userSportInfo = res.result.data[0];
//   //     this.saveUserSportInfoToStorage();
//   //     console.log(this.userSportInfo);
//   //   },
//   //   /**
//   //    * 保存用户运动数据到 storage
//   //    */
//   //    saveUserSportInfoToStorage() {
//   //     uni.setStorage({
//   //       key: STORAGE_KEY_SPORT_INFO,
//   //       data: this.userSportInfo
//   //     })
//   //   },
//   //   /**
//   //    * 获取用户运动计划
//   //    */
//   //   async getUserSportPlan() {
//   //     const arrTemp = [];
//   //     for (let i = 0; i < 4; i++) {
//   //       let sWhere = `('video_level' == ${this.userBodyInfo.user_body_level[i]} && 'category_id' == '${this.userBodyInfo.user_video_category_id[i]}')`
//   //       const res = await video.where(sWhere).get();
//   //       arrTemp.push(...res.result.data)
//   //     }
//   //     for (let i = 0; i < 7; i++) {
//   //       if (this.userBodyInfo._date[i]) {
//   //         this.userSportPlan[this.userBodyInfo._date[i]] = arrTemp;
//   //       }
//   //     }
//   //     this.saveUserSportPlanToStorage();
//   //     console.log(this.userSportPlan);
//   //   },
//   //   /**
//   //    * 保存用户运动计划到 storage
//   //    */
//   //   saveUserSportPlanToStorage() {
//   //     uni.setStorage({
//   //       key: STORAGE_KEY_SPORT_PLAN,
//   //       data: this.userSportPlan
//   //     })
//   //   }
// }
// )
