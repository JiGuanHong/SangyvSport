<template>
  <view class="sangyv-tabs-container">
    <!-- <view class="calendar-tabs-box">
      <view class="week-box">
        <block v-for="(item, index) in calendarData" :key="index">
          <text class="week-txt">{{ item.weekdayName }}</text>
        </block>
      </view>
      <view class="date-box">
        <block v-for="(item, index) in calendarData" :key="index">
          <view
            class="date-txt"
            :class="{ 'date-txt-active': activeIndex === item.dateIndex,'date-txt-plan': !!listData[index]}"
            @click="tabClick(index)"
            >{{
              // activeIndex === item.dateIndex && item.now ? "今" : 
							item.text
            }}</view
          >
        </block>
      </view>
    </view> -->
    <view class="calendar-tabs-box" v-for="(item,index) in calendarData" :key="index"
      :class="{'calendar-tabs-box-active': activeIndex === item.dateIndex}" @click="tabClick(index)">
      <view class="week-name-box">
        <text class="week-name-txt" :class="{'week-name-txt-active': activeIndex === item.dateIndex}">{{item.weekdayName}}</text>
      </view>
      <view class="date-box">
        <text class="date-txt" :class="{'date-txt-active': activeIndex === item.dateIndex}">{{item.text}}</text>
      </view>
    </view>
  </view>
</template>
    
<script>
export default {
  name: "sangyv-calendar",
  props: {
    calendarData: {
      type: Array,
      deafult: () => {
        return []
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    listData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeIndex: -1,
    };
  },
  watch: {
    defaultIndex: {
      handler(val) {
        this.activeIndex = val;
      },
      immediate: true,
    },
  },
  methods: {
    tabClick(index) {
      this.activeIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.sangyv-tabs-container {
  display: flex;
  justify-content: center;

  .calendar-tabs-box {
    width: 35px;
    height: 57px;
    background-color: #ffffff;
    display: inline-block;
    border-radius: 81px;
    text-align: center;
    margin: auto;
    background-color: #ebebeb;

    &-active {
      background-color: #ff9900;
    }

    // line-height: 57px;
    .week-name-box {
      width: 100%;
      height: 21px;
      margin-bottom: 5px;

      .week-name-txt {
        font-size: 12px;
        line-height: 21px;
        &-active {
          color: #ffffff;
        }
      }
    }

    .date-box {
      width: 100%;
      height: 21px;

      .date-txt {
        font-size: 16px;
        line-height: 21px;

        &-active {
          color: #ffffff;
        }
      }

    }
  }
}
</style>