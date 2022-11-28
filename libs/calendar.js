import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from 'dayjs/plugin/weekday';

dayjs.locale('zh-cn');
dayjs.extend(weekday);

/**
 * 创建日历
 * TODO：
 * 使用闭包改造方法，使其能够自定义生成任意长度的日历
 */
export function createCalendar() {
  const today = dayjs().format("d");
  const startOfWeek = dayjs().startOf("week");
  // 创建一个以天数为长度的数组
  // 通过 keys() 方法返回包含该数组 key 值的可迭代对象并存储到新数组中
  // 再使用 map() 方法对数组里的每一个元素执行属性赋值等操作
  // TODO：使用闭包改造为
  let days = [...new Array(7).keys()].map((i) => {
    let n = i;
    let text = dayjs(startOfWeek).add(n, "day").format("DD");
    let _today = dayjs(startOfWeek).add(n, "day").format('d');
    let dateIndex = dayjs().weekday(n).$W === 0 ? 6 : dayjs().weekday(n).$W - 1;
    let weekdayName = dayjs(startOfWeek).add(n, "day").format("dd");
    let now = !!(dayjs(_today).diff(today, "day") === 0);
    return {
      text, 
      dateIndex,
      weekdayName,
      now,
    };
  });
  const calendar = [...days];
  return calendar;
}