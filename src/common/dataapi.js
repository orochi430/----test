export default {
    reqOrgInfo(_callback) {
        let that = this;
        dsf.http.get(
            "fn/mobileUsedContact/list?syncTimeStamp=0", {}).then(
            function(result) {
                window.GLOBAL.orgInfo = result.data;
                that.type = '0'
                that.initTree(result.data, _callback, that.type);
            }
        );
    },
    requOrgBM(_callback) {
        let that = this;
        dsf.http.get(
            "fn/mobileUsedContact/getDeptUserList", {}).then(
            function(result) {
                window.GLOBAL.orgInfo = result.data;
                that.type = '1'
                that.initTree(result.data, _callback, that.type);
            }
        );
    },
    //获取群组数据
    PrivateGroup(_callback) {
        let self = this
        dsf.http.get("fn/mobileUsedContact/list?syncTimeStamp=0", {}).then(function(result) {
            window.GLOBAL.orgInfo = result.data;
            self.type = '2'
            self.initTree(result.data, _callback, self.type);
        })
    },
    //初始化树
    initTree(result, _callback, type) {
        let that = this;
        let G_ORGANIZE
        let G_ORGUSER
        let G_USERINFO
        if (type == '2') {
            G_ORGANIZE = result.G_USERGROUP.rows
            G_ORGUSER = result.G_USERGROUPUSER.rows
            G_USERINFO = result.G_USERINFO.rows;
        } else {
            G_ORGANIZE = result.G_ORGANIZE.rows;
            G_ORGUSER = result.G_ORGUSER.rows;
            G_USERINFO = result.G_USERINFO.rows;
        }
        let trees = G_ORGANIZE.filter(function(item) {
            return item.PID == G_ORGANIZE[0].PID;
        })[0];
        if (trees) {
            trees["globalid"] = trees.ID;
            trees["glonodes"] = [trees];
        }
        var inM = (node) => {
            let xusers = [];
            let dataArr = G_ORGUSER.filter(function(item) {
                if (type == '2') {
                    if (item.USERGROUPID == node.ID) {
                        return item.USERGROUPID == node.ID;
                    }
                } else {
                    if (item.ORGANIZEID == node.ID) {
                        return item.ORGANIZEID == node.ID;
                    }
                }
            })
            for (var user of dataArr) {
                let userinfo = G_USERINFO.filter(function(item) { return item.ID == user.USERINFOID });
                userinfo.length > 0 ? (() => {
                    user["userinfo"] = userinfo[0];
                    user['ORGANAME'] = node.NAME;
                    xusers.push(user);
                })() : ""
            }
            node["users"] = xusers;
            node["children"] = G_ORGANIZE.filter(function(item) { return item.PID == node.ID; });
            for (var child of node.children) {
                // if(type=='2'){
                //     child['users']=xusers
                // }
                child["globalid"] = node["globalid"] + "," + child.ID;
                child["glonodes"] = [];
                for (var cnode of node["glonodes"]) {
                    child["glonodes"].push(cnode);
                }
                child["glonodes"].push(child);
                inM(child);
            }
        }
        if (trees) {
            inM(trees);
        }
        window.GLOBAL.orgTree = trees;
        if (_callback) {
            _callback();
        }
    }
}