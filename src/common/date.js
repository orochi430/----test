/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
function UTCDate() {
  return new Date(Date.UTC.apply(Date, arguments));
}
var formatType = "standard";
var dates = {
  "zh-CN": {
    days: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期日",
    ],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    monthsShort: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    today: "今日",
    format: "yyyy年mm月dd日",
    weekStart: 1,
    meridiem: [],
  },
};
var DPGlobal = {
  modes: [
    {
      clsName: "days",
      navFnc: "Month",
      navStep: 1,
    },
    {
      clsName: "months",
      navFnc: "FullYear",
      navStep: 1,
    },
    {
      clsName: "years",
      navFnc: "FullYear",
      navStep: 10,
    },
  ],
  isLeapYear: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  parseFormat: function (format, type) {
    type = type || formatType;
    var separators = format.replace(this.validParts(type), ",").split(","),
      parts = format.match(this.validParts(type));
    if (!separators || !separators.length || !parts || parts.length == 0) {
      throw new Error("Invalid date format.");
    }
    return { separators: separators, parts: parts };
  },
  validParts: function (type) {
    if (type == "standard") {
      return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
    } else if (type == "php") {
      return /[dDjlNwzFmMnStyYaABgGhHis]/g;
    } else {
      throw new Error("Invalid format type.");
    }
  },
  nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
};

//分钟转秒
function minutesToSeconds(startDate, endDate) {
  startDate = startDate.getTime();
  endDate = endDate.getTime();
  var totalSeconds = parseInt((endDate - startDate) / 1000);
  return totalSeconds;
}
import calendar from "./calendar.js";
export default {
  // 是否节假日-------返回的是festAndTerm
  isFestival(slotDate, slotData) {
    let solarDayArr = slotData.split("-");
    // 将阳历的年月日根据-转化为阳历日期的数组
    let lunarDay = calendar.solar2lunar(
      solarDayArr[0],
      solarDayArr[1],
      solarDayArr[2]
    );
    // console.log(lunarDay);
    // 公历节日\农历节日\农历节气
    let festAndTerm = [];
    festAndTerm.push(lunarDay.festival == null ? "" : " " + lunarDay.festival);
    festAndTerm.push(
      lunarDay.lunarFestival == null ? "" : "" + lunarDay.lunarFestival
    );
    festAndTerm.push(lunarDay.Term == null ? "" : "" + lunarDay.Term);
    festAndTerm = festAndTerm.join("");
    // festAndTerm是节日或者二十四节气，是一个字符串
    return festAndTerm != "";
  },
  // 公历转农历
  solarToLunar(slotDate, slotData) {
    let solarDayArr = slotData.split("-");
    let lunarDay = calendar.solar2lunar(
      solarDayArr[0],
      solarDayArr[1],
      solarDayArr[2]
    );
    // 公历转为农历的代码

    // 农历日期
    // let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn
    let lunarMD = lunarDay.IDayCn;
    // 拼接月份和日期

    // 公历节日\农历节日\农历节气
    let festAndTerm = [];
    festAndTerm.push(lunarDay.festival == null ? "" : " " + lunarDay.festival);
    festAndTerm.push(
      lunarDay.lunarFestival == null ? "" : "" + lunarDay.lunarFestival
    );
    festAndTerm.push(lunarDay.Term == null ? "" : "" + lunarDay.Term);
    festAndTerm = festAndTerm.join("");

    return festAndTerm == "" ? lunarMD : festAndTerm;
    // 若节日或者节气为空，就返回拼接的日期，不为空就返回节日
  },
  getDateRange(startDate, endDate, type) {
    let dateSpan = 7;
    if (!startDate) {
      startDate = new Date();
      startDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1,
        0,
        0,
        0
      );
    }
    if (endDate) {
      dateSpan = Math.abs(startDate - endDate) / (24 * 3600 * 1000) + 1;
    }
    if (type) {
      return [
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1,
          0,
          0,
          0
        ),
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + dateSpan,
          0,
          0,
          0
        ),
      ];
    } else {
      return [
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() - dateSpan,
          0,
          0,
          0
        ),
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() - 1,
          0,
          0,
          0
        ),
      ];
    }
  },
  //日期字符转日期对象
  parse(date, format, language, type) {
    type = type || formatType;
    language = language || "zh-CN";
    if (date instanceof Date) {
      var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
      dateUTC.setMilliseconds(0);
      return dateUTC;
    } else if (date) {
      if (!format) {
        if (/^\d{4}$/.test(date)) {
          format = DPGlobal.parseFormat("yyyy", type);
        }
        if (/^\d{4}\-\d{1,2}$/.test(date)) {
          format = DPGlobal.parseFormat("yyyy-mm", type);
        }
        if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
          format = DPGlobal.parseFormat("yyyy-mm-dd", type);
        }
        if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
          format = DPGlobal.parseFormat("yyyy-mm-dd hh:ii", type);
        }
        if (
          /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}:\d{1,2}(\.\d{1,3})?$/.test(
            date
          )
        ) {
          format = DPGlobal.parseFormat("yyyy-mm-dd hh:ii:ss", type);
        }
        if (
          /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(
            date
          )
        ) {
          format = DPGlobal.parseFormat("yyyy-mm-dd hh:ii:ss", type);
        }

        // liya添加，对小时分钟处理，开始
        if (/^\d{1,2}\:\d{1,2}$/.test(date)) {
          format = DPGlobal.parseFormat("hh:ii", type);
        }
        // 添加结束
      } else {
        format = DPGlobal.parseFormat(format, type);
      }
    }
    var parts = (date && date.match(DPGlobal.nonpunctuation)) || [],
      date = new Date(0, 0, 0, 0, 0, 0, 0),
      parsed = {},
      setters_order = [
        "hh",
        "h",
        "ii",
        "i",
        "ss",
        "s",
        "yyyy",
        "yy",
        "M",
        "MM",
        "m",
        "mm",
        "D",
        "DD",
        "d",
        "dd",
        "H",
        "HH",
        "p",
        "P",
      ],
      setters_map = {
        hh: function (d, v) {
          return d.setHours(v);
        },
        h: function (d, v) {
          return d.setHours(v);
        },
        HH: function (d, v) {
          return d.setHours(v == 12 ? 0 : v);
        },
        H: function (d, v) {
          return d.setHours(v == 12 ? 0 : v);
        },
        ii: function (d, v) {
          return d.setMinutes(v);
        },
        i: function (d, v) {
          return d.setMinutes(v);
        },
        ss: function (d, v) {
          return d.setSeconds(v);
        },
        s: function (d, v) {
          return d.setSeconds(v);
        },
        yyyy: function (d, v) {
          return d.setFullYear(v);
        },
        yy: function (d, v) {
          return d.setFullYear(2000 + v);
        },
        m: function (d, v) {
          v -= 1;
          while (v < 0) v += 12;
          v %= 12;
          d.setUTCMonth(v);
          while (d.getMonth() != v) d.setDate(d.getDate() - 1);
          return d;
        },
        d: function (d, v) {
          return d.setDate(v);
        },
        p: function (d, v) {
          return d.setHours(v == 1 ? d.getHours() + 12 : d.getHours());
        },
      },
      val,
      filtered,
      part;
    setters_map["M"] = setters_map["MM"] = setters_map["mm"] = setters_map["m"];
    setters_map["dd"] = setters_map["d"];
    setters_map["P"] = setters_map["p"];
    for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
      val = parseInt(parts[i], 10);
      part = format.parts[i];
      if (isNaN(val)) {
        switch (part) {
          case "MM":
            filtered = $(dates[language].months).filter(function () {
              var m = this.slice(0, parts[i].length),
                p = parts[i].slice(0, m.length);
              return m == p;
            });
            val = $.inArray(filtered[0], dates[language].months) + 1;
            break;
          case "M":
            filtered = $(dates[language].monthsShort).filter(function () {
              var m = this.slice(0, parts[i].length),
                p = parts[i].slice(0, m.length);
              return m == p;
            });
            val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
            break;
          case "p":
          case "P":
            val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
            break;
        }
      }
      parsed[part] = val;
    }
    for (var i = 0, s; i < setters_order.length; i++) {
      s = setters_order[i];
      if (s in parsed && !isNaN(parsed[s])) setters_map[s](date, parsed[s]);
    }
    return date;
  },
  //日期对象格式化字符串
  format(date, format, language, type) {
    type = type || formatType;
    language = language || "zh-CN";
    if (date == null) {
      return "";
    }
    if (typeof date == "string") {
      try {
        date = this.parse(date);
      } catch (ex) {
        return "";
      }
    } else if (typeof date == "number") {
      try {
        date = new Date(date);
        date = this.parse(date);
      } catch (ex) {
        return "";
      }
    }
    format = DPGlobal.parseFormat(format, type);
    var val;
    if (type == "standard") {
      val = {
        // year
        yy: date.getFullYear().toString().substring(2),
        yyyy: date.getFullYear(),
        // month
        m: date.getMonth() + 1,
        M: date.getMonth() + 1,
        MM: dates[language].months[date.getMonth()],
        // day
        d: date.getDate(),
        D: date.getDate(),
        DD: date.getDate(),
        p:
          dates[language].meridiem.length == 2
            ? dates[language].meridiem[date.getHours() < 12 ? 0 : 1]
            : "",
        // hour
        h: date.getHours(),
        // minute
        i: date.getMinutes(),
        // second
        s: date.getSeconds(),
      };
      val.H = val.h % 12 == 0 ? 12 : val.h % 12;
      val.HH = (val.H < 10 ? "0" : "") + val.H;
      val.P = val.p.toUpperCase();
      val.hh = (val.h < 10 ? "0" : "") + val.h;
      val.ii = (val.i < 10 ? "0" : "") + val.i;
      val.ss = (val.s < 10 ? "0" : "") + val.s;
      val.dd = (val.d < 10 ? "0" : "") + val.d;
      val.mm = (val.m < 10 ? "0" : "") + val.m;
    } else {
      throw new Error("Invalid format type.");
    }
    var date = [],
      seps = dsf.mix([], format.separators);
    for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
      if (seps.length) {
        date.push(seps.shift());
      }
      date.push(val[format.parts[i]]);
    }
    if (seps.length) {
      date.push(seps.shift());
    }
    return date.join("");
  },
  //获取当前指定日期为星期几？周日做特殊处理为7
  getWeekDay(d) {
    var weekday = d.getDay();
    weekday = weekday == 0 ? 7 : weekday;
    return weekday;
  },
  getCalendar(year, month) {
    var currentMonth_firstDay = new Date(year, month, 1);
    var currentMonth_lastDay = new Date(year, month + 1, 0);
    var weekFirst = 1,
      weekLast = 7;
    var weekday = this.getWeekDay(currentMonth_firstDay);
    var offset_before = weekday - weekFirst;
    weekday = this.getWeekDay(currentMonth_lastDay);
    var offset_after = weekLast - weekday;
    var totalDays = currentMonth_lastDay.getDate();

    totalDays = totalDays + offset_before + offset_after;
    var rows = [];
    var rowsLength = totalDays / 7;
    for (var i = 0; i < rowsLength; i++) {
      var arr = [];
      for (var n = 1; n <= 7; n++) {
        var date = i * 7 + n;
        var d = new Date(year, month, date - offset_before);
        arr.push({
          date: d,
          offset: d.getMonth() != month ? true : false,
        });
      }
      rows.push(arr);
    }
    return rows;
  },
  addDate(date, days) {
    if (days == undefined || days == "") {
      days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    return date;
  },
  //获取一个月的第一天
  getMonthFirstDay(targetDate) {
    var y, m, d;
    if (targetDate) {
      y = targetDate.getFullYear();
      m = targetDate.getMonth();
      d = 1;
    } else {
      var nowDate = new Date();
      var fullYear = nowDate.getFullYear();
      var month = nowDate.getMonth();
      y = fullYear;
      m = month;
      d = 1;
    }
    return new Date(y, m, d);
  },
  //获取一个月的最后一天
  getMonthLastDay(targetDate) {
    var y, m, d;
    if (targetDate) {
      var fullYear = targetDate.getFullYear();
      var month = targetDate.getMonth();
      var endOfMonth = new Date(fullYear, month + 1, 0).getDate();
      y = fullYear;
      m = month;
      d = endOfMonth;
    } else {
      var nowDate = new Date();
      var fullYear = nowDate.getFullYear();
      var month = nowDate.getMonth();
      var endOfMonth = new Date(fullYear, month + 1, 0).getDate();
      y = fullYear;
      m = month;
      d = endOfMonth;
    }
    return new Date(y, m, d);
  },
  getMonthWeek(year, month, day) {
    // 当前日期是这个月的第几周
    var date = new Date(year, month, day);
    day = date.getDate();
    // 当月第一天的日期
    var monthFirstDayDate = new Date(year, month, 1);
    // 当月第一天的星期
    var monthFirstDayOfWeek = monthFirstDayDate.getDay();
    if (monthFirstDayOfWeek == 0) {
      monthFirstDayOfWeek = 7;
    }
    // 计算补全第一天第一周相差天数
    day = day + (monthFirstDayOfWeek - 1);
    return Math.ceil(day / 7);
  },
  getMonthWeekDate(year, month, day) {
    // 获取这个星期7天的时间
    var list = this.getCalendar(year, month) || [];
    var monthWeek = this.getMonthWeek(year, month, day) || 0;
    return {
      week: monthWeek,
      year: year,
      month: month,
      list: list[monthWeek - 1] || [],
    };
  },
  getBeforDate(year, month, day, dayDiff) {
    // 往前dayDiff天，dayDiff默认为上一周
    dayDiff = dayDiff || 7;
    day = parseInt(day) - parseInt(dayDiff);
    return new Date(year, month, day);
  },
  getAfterDate(year, month, day, dayDiff) {
    // 往后dayDiff天，dayDiff不填则为下一周
    dayDiff = dayDiff || 7;
    day = parseInt(day) + parseInt(dayDiff);
    return new Date(year, month, day);
  },
  diffDays(date1, date2) {
    if (typeof date1 == "string") date1 = this.parse(date1);
    if (typeof date2 == "string") date2 = this.parse(date2);
    let dateSpan = date2 - date1;
    dateSpan = Math.abs(dateSpan);
    let iDays = dateSpan / (24 * 3600 * 1000); // Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays;
  },
  toDay() {
    var d = new Date();
    return dsf.date.parse(dsf.date.format(d, "yyyy-mm-dd"));
  },
  now() {
    return new Date();
  },
  formatRangeDateTime(sd, ed) {
    var result = "";
    if (sd && ed) {
      var sd = dsf.date.parse(sd);
      var ed = dsf.date.parse(ed);
      if (
        sd.getFullYear() == ed.getFullYear() &&
        sd.getMonth() == ed.getMonth() &&
        sd.getDate() == ed.getDate()
      ) {
        result =
          dsf.date.format(sd, "yyyy-mm-dd") +
          " " +
          dsf.date.format(sd, "hh:ii") +
          "-" +
          dsf.date.format(ed, "hh:ii");
      } else {
        result =
          dsf.date.format(sd, "yyyy-mm-dd hh:ii") +
          "-" +
          dsf.date.format(ed, "yyyy-mm-dd hh:ii");
      }
    }

    return result;
  },
  //秒转天：时:分：秒s
  secondsToTime(s) {
    let totalSeconds = s;
    if (!totalSeconds || totalSeconds < 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    // 天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = Math.ceil(modulo % 60);
    //输出到页面
    days = ((days || 0) + 100).toString().substr(1);
    hours = ((hours || 0) + 100).toString().substr(1);
    minutes = ((minutes || 0) + 100).toString().substr(1);
    seconds = ((seconds || 0) + 100).toString().substr(1);
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  },
  timeDown(date1, date2) {
    let totalSeconds = minutesToSeconds(date1, date2);
    return secondsToTime(totalSeconds);
  },
};
