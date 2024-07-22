//会议查询--明日会议
(function () {
    const exportObj = {};

    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
        vueData.$router.push({
            path:`/commonForm/190121161348OthBI4s3sEhvfuDJ5FD/${pk}`,
            query:{
                listId:"210607181937YJxUC5fve4y7q3SH5hJ",
                method: "pageCheckInfo",
                validateByList: '1',
                pk:pk
            }
        })

    };

    window.spListJS = exportObj;
})();
