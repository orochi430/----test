const cards = [
  {
    name: "代表大会会议",
    value: "deputy",
    img: require("static/images/peopleCongress/img_meeting1.png")
  },
  {
    name: "常委会会议",
    value: "committee",
    img: require("static/images/peopleCongress/img_meeting2.png")
  },
  {
    name: "主任会议",
    value: "director",
    img: require("static/images/peopleCongress/img_meeting3.png")
  }
];

const meetings = {
  deputy: {
    meetingInfo: {
      title: "江西省第十三届人民代表大会第五次会议",
      time: "08-12 至 08-18  共7天"
    },
    files: [
      {
        title: "预备会议文件",
        type: "folder",
        children: [
          {
            title: "1.  江西省第十三届人民代表大会第五次会议预备会议程序",
            type: "folder",
            children: [
              {
                title: "关于《江西省乡村振兴促进条例（草案）》的说明.pdf",
                type: "pdf",
                children: [],
                checkNum: 32
              },
              {
                title:
                  "（三）江西省2020年全省和省级预算执行情况与2021年全省和省级预算.doc",
                type: "doc",
                children: [],
                checkNum: 32
              }
            ]
          },
          {
            title:
              "2.  江西省第十三届人民代表大会第五次会议开幕式（第一次全体会议）程序",
            type: "folder",
            children: [
              {
                title: "关于《江西省乡村振兴促进条例（草案）》的说明.pdf",
                type: "pdf",
                children: [],
                checkNum: 32
              }
            ]
          }
        ]
      },
      {
        title: "会议文件",
        type: "folder",
        children: [
          {
            title: "1.  江西省第十三届人民代表大会第五次会议预备会议程序",
            type: "folder",
            children: [
              {
                title: "关于《江西省乡村振兴促进条例（草案）》的说明.pdf",
                type: "pdf",
                children: [],
                checkNum: 32
              },
              {
                title:
                  "（三）江西省2020年全省和省级预算执行情况与2021年全省和省级预算.doc",
                type: "doc",
                children: [],
                checkNum: 32
              }
            ]
          },
          {
            title:
              "2.  江西省第十三届人民代表大会第五次会议开幕式（第一次全体会议）程序",
            type: "folder",
            children: [
              {
                title: "关于《江西省乡村振兴促进条例（草案）》的说明.pdf",
                type: "pdf",
                children: [],
                checkNum: 32
              }
            ]
          }
        ]
      }
    ],
    schedules: [
      {
        day: "08-16",
        children: [
          {
            time: "上午 09:00",
            title: "各代表团活动",
            content: `一、 各代表团全体会议
          1. 推选团长、副团长
          2. 审议大会主席团和秘书长名单草案
          3. 审议大会议程草案
          二、 各代表团召开中共党员会议，成立临时党支部`
          },
          {
            time: "下午 15:00",
            title: "省会议中心大会堂举行预备会议",
            content: `刘奇同志主持
          1. 选举大会主席团和秘书长
          2. 表决大会议程草案`
          }
        ]
      },
      {
        day: "08-17",
        children: [
          {
            time: "上午 09:00",
            title: "各代表团活动",
            content: `一、 各代表团全体会议
          1. 推选团长、副团长
          2. 审议大会主席团和秘书长名单草案
          3. 审议大会议程草案
          二、 各代表团召开中共党员会议，成立临时党支部`
          },
          {
            time: "下午 15:00",
            title: "省会议中心大会堂举行预备会议",
            content: `刘奇同志主持
          1. 选举大会主席团和秘书长
          2. 表决大会议程草案`
          }
        ]
      }
    ]
  },
  committee: {
    meetingInfo: null
  }
};
const news = [
  {
    title: "大会联络组成员及联络图信息",
    time: "2021-08-16",
    content: "",
    images: []
  },
  {
    title: "您有新的会议安排，请按时参会。",
    time: "2021-08-16",
    content: "您有新的会议文件，请及时查看。",
    images: []
  }
];
export { cards, meetings, news };
