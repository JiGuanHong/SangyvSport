import { ref } from 'vue'
import { defineStore } from 'pinia';
// import { useUserStore } from './user';

const STORAGE_KEY_BODY_DATA = 'bodyData';
const STORAGE_KEY_SPORT_DATA = 'sportData';
const STORAGE_KEY_SPORT_PLAN = 'sportPlan';
const STORAGE_KEY_SPORT_VIDEO_ARR = 'videoArr';
const STORAGE_KEY_TODAY_SPORT_DATA = 'todaySportData'

const db = uniCloud.database();

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      userBodyData: uni.getStorageSync(STORAGE_KEY_BODY_DATA) || {},
      userSportData: uni.getStorageSync(STORAGE_KEY_SPORT_DATA) || {},
      userSportPlan: uni.getStorageSync(STORAGE_KEY_SPORT_PLAN) || {},
      userSportVideoArr: uni.getStorageSync(STORAGE_KEY_SPORT_VIDEO_ARR) || [],
      userTodaySportData: uni.getStorageSync(STORAGE_KEY_TODAY_SPORT_DATA) || {},
      todayIndex: 0
    }
  },
  getters: {
    /**
     * 计算视频数量
     */
    calculateVideoAmount(state) {
      if (state.userSportVideoArr.length === 0) {
        const res = 0
        return res;
      }
      const res = state.userSportVideoArr.length;
      return res;
    },
    /**
     * 计算用户本周需运动天数
     */
    calculateWeekTotalSportDays(state) {
      // if (state.userBodyData == undefined) {
      //   return 0;
      // }
      if (Object.keys(state.userBodyData).length == 0) {
        return 0;
      }
      const res = state.userBodyData._date.length;
      return res;
    },
    /**
     * 计算用户本周需运动次数
     */
    calculateWeekTotalSportTimes() {
      const res = this.calculateVideoAmount * this.calculateWeekTotalSportDays;
      return res;
    },
    /**
     * 计算用户本周已运动次数
     */
    calculateWeekFinSportTimes(state) {
      // if (state.userSportData === undefined ) {
      //   return 0
      // }
      if (Object.keys(state.userSportData).length == 0) {
        return 0;
      }
      const res = state.userSportData.user_sport_info.fin_hexin_times_this_week + state.userSportData.user_sport_info.fin_tuntui_times_this_week + state.userSportData.user_sport_info.fin_beiji_times_this_week + state.userSportData.user_sport_info.fin_xiongji_times_this_week;
      return res;
    },
    /**
     * 计算用户本日所需运动时长
     */
    calculateTodaySportTime() {
      if (Object.keys(this.userSportPlan).length != 0 && Object.keys(this.userSportPlan[this.todayIndex][0]).length != 0) {
        const videoArr = this.userSportVideoArr;
        let res = 0;
        videoArr.forEach(e => {
          res += e.video_length;
        })
        // console.log(res);
        return res;
      }
      return 0;
    },
    /**
     * 获取 todayIndex
     */
    getTodayIndex() {
      return (currentIndex) => {
        return this.todayIndex = currentIndex
      }
    }
  },
  actions: {
    /**
     * 初始化用户身体数据
     */
    async initUserBodyData() {
      const res1 = await db.collection('sangyv_user_body').add({
        user_id: db.getCloudEnv('$cloudEnv_uid'),
        user_weight: 0,
        user_video_category_id: [],
        _date: [],
        user_body_level: {
          "0": 0,
          "1": 0,
          "2": 0,
          "3": 0
        },
        user_level: "青铜",
        user_exp: 0
      });
      console.log("用户身体数据初始化结果", res1);
      const res2 = await db.collection('sangyv_user_body').where("'user_id' == $cloudEnv_uid").get();
      this.userBodyData = res2.result.data[0];
    },
    /**
     * 获取用户身体数据
     */
    async getUserBodyData() {
      const res = await db.collection('sangyv_user_body').where("'user_id' == $cloudEnv_uid").get();
      console.log('用户身体数据获取结果', res.result.data[0]);
      this.userBodyData = res.result.data[0];
      this.saveUserBodyDataToStorage();
    },
    /**
     * 在本地更新用户身体数据
     */
    async updateUserBodyDataInLocal(currentIndex) {
      this.userBodyData._date[this.userBodyData._date.length] = currentIndex;
      console.log("本地用户身体数据更新结果", this.userBodyData);
      this.updateUserBodyDataInDataBase();
      this.saveUserBodyDataToStorage();
    },
    /**
     * 在数据库更新用户身体数据
     */
    async updateUserBodyDataInDataBase() {
      const res = await db.collection("sangyv_user_body").where("'user_id' == $cloudEnv_uid").update({
        _date: this.userBodyData._date,
        user_exp: this.userBodyData.user_exp
      });
      console.log("数据库用户身体数据更新结果", res);
    },
    /**
     * 保存用户身体数据到 storage
     */
    saveUserBodyDataToStorage() {
      uni.setStorage({
        key: STORAGE_KEY_BODY_DATA,
        data: this.userBodyData
      })
    },
    /**
     * 在 storage 删除用户身体数据
     */
    deleteUserBodyDataInStorage() {
      uni.removeStorageSync(STORAGE_KEY_BODY_DATA);
      this.userBodyData = {}
    },
    /**
     * 初始化用户运动数据
     */
    async initUserSportData() {
      const res1 = await db.collection('sangyv_user_sport').add({
        user_id: db.getCloudEnv('$cloudEnv_uid'),
        last_sport_day: "0",
        sport_days_this_week: 0,
        user_sport_info: {
          sport_time_last_week: 0,
          sport_time_this_week: 0,
          sport_consume_last_week: 0,
          sport_consume_this_week: 0,
          fin_hexin_times_total: 0,
          fin_hexin_times_this_week: 0,
          fin_tuntui_times_total: 0,
          fin_tuntui_times_this_week: 0,
          fin_beiji_times_total: 0,
          fin_beiji_times_this_week: 0,
          fin_xiongji_times_toal: 0,
          fin_xiongji_times_this_week: 0
        },
        plan_object: {},
        video_arr: [],
        user_today_data: {}
      });
      console.log("用户运动数据初始化结果", res1);
      this.initUserTodaySportData();
      this.getUserSportData();
    },
    /**
     * 获取用户运动数据
     */
    async getUserSportData() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").field("last_sport_day,sport_days_this_week,user_sport_info").get();
      console.log("用户运动数据获取结果", res.result.data[0]);
      this.userSportData = res.result.data[0];
      this.saveUserSportDataToStorage();
    },
    /**
     * 保存用户运动数据到 storage
     */
    saveUserSportDataToStorage() {
      uni.setStorage({
        key: STORAGE_KEY_SPORT_DATA,
        data: this.userSportData
      })
    },
    /**
     * 在 storage 删除用户运动数据
     */
    deleteUserSportDataInStorage() {
      uni.removeStorageSync(STORAGE_KEY_SPORT_DATA);
      this.userSportData = {}
    },
    /**
     * 初始化用户运动计划
     */
    async initUserSportPlan() {
      const arrTemp = [];
      for (let i = 0; i < 7; i++) {
        this.userSportPlan[i] = [{}];
      }
      for (let i = 0; i < 4; i++) {
        let sWhere = `('video_level' == ${this.userBodyData.user_body_level[i]} && 'category_id' == '${this.userBodyData.user_video_category_id[i]}')`;
        const res = await db.collection("sangyv_admin_video").where(sWhere).get();
        arrTemp.push(...res.result.data);
      }
      this.userSportVideoArr = arrTemp;
      this.userSportVideoArr.forEach(e => {
        // console.log(parseInt(this.userBodyData.user_weight * e.video_length * e.video_cost * 0.0167));
        e.user_consume = parseInt(this.userBodyData.user_weight * e.video_length * e.video_cost * 0.0167);
      })
      // this.saveUserSportVideoArrToStorage();
      for (let i = 0; i < this.userBodyData._date.length; i++) {
        this.userSportPlan[this.userBodyData._date[i]] = arrTemp;
      }
      console.log("用户运动计划初始化结果", this.userSportPlan);
      const res = await db.collection('sangyv_user_sport').where("'user_id' == $cloudEnv_uid").update({
        // user_id: db.getCloudEnv('$cloudEnv_uid'),
        plan_object: this.userSportPlan,
        video_arr: this.userSportVideoArr
      });
      console.log('用户运动计划添加结果', res)
      // this.saveUserSportPlanToStorage();
      // this.updateUserSportPlanToDataBase();
      // this.updateUserSportVideoArrToDataBase();
      this.getUserSportPlan();
    },
    /**
     * 从数据库获取用户运动计划
     */
    async getUserSportPlan() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").field("plan_object,video_arr").get();
      console.log("用户运动计划获取结果", res.result.data[0].plan_object);
      console.log("用户运动视频数组获取结果", res.result.data[0].video_arr);
      this.userSportPlan = res.result.data[0].plan_object;
      this.userSportVideoArr = res.result.data[0].video_arr;
      this.saveUserSportPlanToStorage();
      this.saveUserSportVideoArrToStorage();
    },
    /**
     * 上传用户运动计划到数据库
     */
    async updateUserSportPlanToDataBase() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").update({
        plan_object: this.userSportPlan
      })
      console.log("用户运动计划上传结果", res);
    },
    /**
     * 上传用户运动视频数组到数据库
     */
    async updateUserSportVideoArrToDataBase() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").update({
        video_arr: this.userSportVideoArr
      })
      console.log("用户运动视频数组上传结果", res);
    },
    /**
     * 在本地更新用户运动计划
     */
    async updateUserSportPlanInLocal(currentIndex) {
      this.userSportPlan[currentIndex] = this.userSportVideoArr;
      console.log("本地用户运动计划更新结果", this.userSportPlan);
      this.updateUserSportPlanToDataBase();
      this.saveUserSportPlanToStorage();
    },
    /**
     * 保存用户运动计划到 storage
     */
    saveUserSportPlanToStorage() {
      uni.setStorage({
        key: STORAGE_KEY_SPORT_PLAN,
        data: this.userSportPlan
      })
    },
    /**
     * 保存用户运动视频数组到 storage
     */
    saveUserSportVideoArrToStorage() {
      uni.setStorage({
        key: STORAGE_KEY_SPORT_VIDEO_ARR,
        data: this.userSportVideoArr
      })
    },
    /**
     * 删除用户运动计划
     */
    deleteUserSportPlanInStorage() {
      uni.removeStorageSync(STORAGE_KEY_SPORT_PLAN);
      this.userSportPlan = {}
    },
    /**
     * 删除用户运动视频数组
     */
    deleteUserSportVideoArrInStorage() {
      uni.removeStorageSync(STORAGE_KEY_SPORT_VIDEO_ARR);
      this.userSportVideoArr = [];
    },
    /**
     * 添加运动完成状态到用户运动计划
     */
    addFinStateToUserSportPlan(currentIndex, index) {
      this.userSportPlan[currentIndex][index].isFin = true;
      console.log("用户运动完成状态", this.userSportPlan);
      this.saveUserSportPlanToStorage();
      this.updateUserSportPlanToDataBase();
    },
    /**
     * 初始化用户今日运动数据
     */
    async initUserTodaySportData() {
      // if (this.userSportData.last_sport_day == this.userTodaySportData.today) {
      //   console.log(this.userTodaySportData);
      //   return;
      // }
      this.userTodaySportData.usedTime = 0;
      this.userTodaySportData.sportConsume = 0;
      const res = await db.collection('sangyv_user_sport').where("'user_id' == $cloudEnv_uid").update({
        // user_id: db.getCloudEnv('$cloudEnv_uid'),
        user_today_data: this.userTodaySportData
      })
      // this.saveUserTodaySportDataToStorage();
      this.getUserTodaySportData();
      // this.updateUserTodaySportDataInDataBase();
      console.log("用户今日运动数据初始化结果", res);
    },
    /**
     * 重置用户今日运动数据
     */
    resetUserTodaySportData() {
      this.userTodaySportData.usedTime = 0;
      this.userTodaySportData.sportConsume = 0;
      console.log("用户运动计划重置结果", this.userTodaySportData);
      this.saveUserTodaySportDataToStorage();
      this.updateUserTodaySportDataInDataBase();
    },
    /**
     * 获取用户今日运动数据
     */
    async getUserTodaySportData() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").field("user_today_data").get();
      this.userTodaySportData = res.result.data[0].user_today_data;
      console.log("用户今日运动数据获取结果", res.result.data[0].user_today_data)
      this.saveUserTodaySportDataToStorage();
    },
    /**
     * 在本地更新用户今日运动数据
     */
    updateUserTodaySportDataInLocal(usedTime, consume) {
      this.userTodaySportData.usedTime += parseInt(usedTime);
      this.userTodaySportData.sportConsume += parseInt(consume);
      this.saveUserTodaySportDataToStorage();
      this.updateUserTodaySportDataInDataBase();
    },
    /**
     * 在数据库更新用户今日运动数据
     */
    async updateUserTodaySportDataInDataBase() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").update({
        user_today_data: this.userTodaySportData
      });
      console.log("用户今日运动数据上传结果", res);
    },
    /**
     * 保存用户今日运动数据到 storage
     */
    saveUserTodaySportDataToStorage() {
      uni.setStorage({
        key: STORAGE_KEY_TODAY_SPORT_DATA,
        data: this.userTodaySportData
      })
    },
    /**
     * 在 storage 中删除用户今日运动数据
     */
    deleteUserTodaySportDataInStorage() {
      uni.removeStorageSync(STORAGE_KEY_TODAY_SPORT_DATA);
      this.userTodaySportData = {};
    },
    /**
     * 在本地更新用户最后一次运动时间
     */
    updateUserLastSportDayInLocal() {
      if (this.userTodaySportData.today != this.userSportData.last_sport_day) {
        this.userSportData.last_sport_day = this.userTodaySportData.today;
        this.userSportData.sport_days_this_week += 1;
        this.saveUserSportDataToStorage();
        this.updateUserLastSportDayToDataBase();
        console.log("用户运动时间更新结果", this.userSportData);
        return;
      }
      return;
    },
    /**
     * 在数据库更新用户最后一次运动时间
     */
    async updateUserLastSportDayToDataBase() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").update({
        last_sport_day: this.userSportData.last_sport_day,
        sport_days_this_week: this.userSportData.sport_days_this_week
      });
      console.log("用户运动时间更新结果", res);
    },
    /**
     * 在本地更新用户运动数据
     */
    async updateUserSportDataInLocal(usedTime, consume, categoryId, level) {
      this.userSportData.user_sport_info.sport_consume_this_week += parseInt(consume);
      this.userSportData.user_sport_info.sport_time_this_week += parseInt(usedTime);
      if (categoryId == 1) {
        this.userSportData.user_sport_info.fin_hexin_times_this_week++;
        this.userSportData.user_sport_info.fin_hexin_times_total++;
        if (level == 1 || level == 2 || level == 3) {
          this.userBodyData.user_exp += 10;
        } else if (level == 4 || level == 5 || level == 6 || level == 7 || level == 8) {
          this.userBodyData.user_exp += 15;
        }
      } else if (categoryId == 2) {
        this.userBodyData.user_sport_info.fin_tuntui_times_this_week++;
        this.userSportData.user_sport_info.fin_tuntui_times_total++
        if (level == 1 || level == 2 || level == 3) {
          this.userBodyData.user_exp += 10;
        } else if (level == 4 || level == 5 || level == 6 || level == 7 || level == 8) {
          this.userBodyData.user_exp += 15;
        }
      } else if (categoryId == 3) {
        this.userBodyData.user_sport_info.fin_beiji_times_this_week++;
        this.userSportData.user_sport_info.fin_beiji_times_total++
        if (level == 1 || level == 2 || level == 3) {
          this.userBodyData.user_exp += 10;
        } else if (level == 4 || level == 5 || level == 6 || level == 7 || level == 8) {
          this.userBodyData.user_exp += 15;
        }
      } else {
        this.userSportData.user_sport_info.fin_xiongji_times_this_week++;
        this.userSportData.user_sport_info.fin_xiongji_times_total++
        if (level == 1 || level == 2 || level == 3) {
          this.userBodyData.user_exp += 10;
        } else if (level == 4 || level == 5 || level == 6 || level == 7 || level == 8) {
          this.userBodyData.user_exp += 15;
        }
      }
      this.saveUserSportDataToStorage();
      this.updateUserSportDataToDataBase();
      this.updateUserBodyDataInDataBase();
    },
    /**
     * 在数据库更新用户运动数据
     */
    async updateUserSportDataToDataBase() {
      const res = await db.collection("sangyv_user_sport").where("'user_id' == $cloudEnv_uid").update({
        user_sport_info: {
          sport_consume_this_week: this.userSportData.user_sport_info.sport_consume_this_week,
          sport_time_this_week: this.userSportData.user_sport_info.sport_time_this_week,
          fin_hexin_times_this_week: this.userSportData.user_sport_info.fin_hexin_times_this_week,
          fin_hexin_times_total: this.userSportData.user_sport_info.fin_hexin_times_total,
          fin_tuntui_times_this_week: this.userSportData.user_sport_info.fin_tuntui_times_this_week,
          fin_tuntui_times_total: this.userSportData.user_sport_info.fin_tuntui_times_total,
          fin_beiji_times_this_week: this.userSportData.user_sport_info.fin_beiji_times_this_week,
          fin_beiji_times_total: this.userSportData.user_sport_info.fin_beiji_times_total,
          fin_xiongji_times_this_week: this.userSportData.user_sport_info.fin_xiongji_times_this_week,
          fin_xiongji_times_total: this.userSportData.user_sport_info.fin_xiongji_times_total,
        }
      });
      console.log("用户运动数据更新结果", res);
    }
  }
})