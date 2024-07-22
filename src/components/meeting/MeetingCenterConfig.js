export const partakeData = {
  dataValue: {
    bt: '已按要求做好相关工作,请毅松、志强、联姘同志阅示',
    fqr: '张三',
    dh: '1231231231',
    sj: '05-04到05-08',
    dd: '综合楼A308教室'
  },
  buttons: {
    commonButton: [
      {
        icon: 'iconguanzhu',
        action: 'gz',
        name: '关注',
      },
      {
        icon: 'iconzhiding',
        action: 'zd',
        name: '置顶'
      }
    ],
    mainButtons: [
      {
        action: 'qj',
        name: '请假',
        showIndex: 1,
      },
      {
        action: 'bm',
        name: '报名',
        showIndex: 0,
      }
    ]
  }
};
export const partakeColumns = [
  {
    "showCategory": "mainTitle",
    "showMetaColumn": "bt",
  },
  {
    "showCategory": "subTitle",
    "showMetaColumn": "fqr",
    "icon": "iconyaoqingcanyuren",
  },
  {
    "showCategory": "subTitle",
    "showMetaColumn": "dh",
    "icon": "icongoutong"
  },
  {
    "showCategory": "subTitle",
    "showMetaColumn": "xxxxx",
    "icon": "",
  },
  {
    "showCategory": "content",
    "showMetaColumn": "sj",
    "icon": "iconshijian",
    "showRows": 1
  },
  {
    "showCategory": "content",
    "showMetaColumn": "dd",
    "icon": "iconyijian",
    "showRows": 1
  }
];
export const adminData = {
  dataValue: {
    bt: '已按要求做好相关工作,请毅松、志强、联姘同志阅示',
    wjlx: '文件类型',
    wks: '未开始',
    date: '4天',
    sj: '05-04到05-08',
    dd: '综合楼A308教室'
  },
  buttons: {
    commonButton: [
      {
        icon: 'iconguanzhu',
        action: 'gz',
        name: '关注',
      },
      {
        icon: 'iconzhiding',
        action: 'zd',
        name: '置顶'
      }
    ],
    mainButtons: [
      {
        action: 'th',
        name: '退回',
        showIndex: 1,
      },
      {
        action: 'cb',
        name: 'DING催办',
        showIndex: 0,
      }
    ]
  }
};
export const adminColumns = {
  1: [
    {
      "showCategory": "mainTitle",
      "showMetaColumn": "bt",
    },
    {
      "showCategory": "subTitle",
      "showMetaColumn": "wjlx",
      "icon": "iconwenjianleixing",
    },
    {
      "showCategory": "subTitle",
      "showMetaColumn": "wks",
      "icon": "iconzhuangtai",
      "color": "#3296FA"
    },
    {
      "showCategory": "subTitle",
      "showMetaColumn": "date",
      "icon": "iconriqi",
      "color": "#76C64F"
    },
    {
      "showCategory": "content",
      "showMetaColumn": "sj",
      "icon": "iconshijian",
      "showRows": 1
    },
    {
      "showCategory": "content",
      "showMetaColumn": "dd",
      "icon": "iconyijian",
      "showRows": 1
    }
  ],
  2: [
    {
      "showCategory": "mainTitle",
      "showMetaColumn": "bt",
    },
    {
      "showCategory": "subTitle",
      "showMetaColumn": "wjlx",
      "icon": "iconwenjianleixing",
    },
    {
      "showCategory": "subTitle",
      "showMetaColumn": "wks",
      "icon": "iconzhuangtai",
      "color": "#3296FA"
    },
    {
      "showCategory": "subTitle",
      "showMetaColumn": "date",
      "icon": "iconriqi",
      "color": "#76C64F"
    },
    {
      "showCategory": "content",
      "showMetaColumn": "sj",
      "icon": "iconshijian",
      "showRows": 1
    },
    {
      "showCategory": "content",
      "showMetaColumn": "dd",
      "icon": "iconyijian",
      "showRows": 1
    }
  ]
};
