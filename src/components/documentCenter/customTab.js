// const users=JSON.parse(sessionStorage.getItem("user")||{})
const tabsConfig=[
  {
    key:"Note",
    remark:"便签模块",
    tabslist:[
      {
          "name": "收件箱",
          "icon": "",
          "apiurl":"",
          "goRoute": "",
          "listId":"1807271502471mZfA8mah6Q3fprnIVz",
          "params":{
            "moduleId":"180725205942uc2zjrqnTt5sg7ReWmV",
            "formId":"1807271502471mZfA8mah6Q3fprnIVz",
            "receiveUserId":"[userid]",
          },
          "isBadge":true,
          "badgeUrl":"fn/mobileNote/getBadge?type=5",
          "count":""
      },
      {
        "name": "发件箱",
        "icon": "",
        "apiurl":"",
        "goRoute": "",
        "listId":"180727104749mEj2tlzumG5xILtyWoR",
        "params":{
          "moduleId":"180725205942uc2zjrqnTt5sg7ReWmV",
          "formId":"180727104749mEj2tlzumG5xILtyWoR",
          "status":1,
          "actionType":1,
          "userId":"[userid]"
        },
        "isBadge":false,
        "badgeUrl":"fn/mobileNote/getBadge?type=1",
        "count":""
      },
      {
        "name": "草稿箱",
        "icon": "",
        "apiurl":"",
        "goRoute": "",
        "listId":"180726211007WCqjA6vmt7HaNaInl7U",
        "params":{
          "moduleId":"180725205942uc2zjrqnTt5sg7ReWmV",
          "formId":"180726211007WCqjA6vmt7HaNaInl7U",
          "userId":"[userid]",
          "actionType":1,
          "status":0
        },
        "isBadge":false,
        "badgeUrl":"fn/mobileNote/getBadge?type=3",
        "count":""
      }
    ]
  }
]
export {
  tabsConfig
}