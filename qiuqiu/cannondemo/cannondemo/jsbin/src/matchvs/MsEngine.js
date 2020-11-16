var MsEngine = /** @class */ (function () {
    function MsEngine() {
    }
    MsEngine.init = function () {
        var _this = this;
        if (!this.isInit) {
            this.response.initResponse = function (status) {
                if (status == 200) {
                    _this.registerUser();
                }
                else {
                    console.log("失败");
                }
            };
            this.engine.init(this.response, "Matchvs", "alpha", this.gameID);
        }
        this.isInit = true;
    };
    MsEngine.registerUser = function () {
        var _this = this;
        this.response.registerUserResponse = function (userInfo) {
            if (userInfo.status == 0) {
                _this.msRegistRsp = userInfo;
                console.log("----", _this.msRegistRsp);
                MatchvsLog.closeLog();
            }
            else {
                console.log("失败");
            }
        };
        this.engine.registerUser();
    };
    MsEngine.login = function () {
        this.response.registerUserResponse = function (login) {
            console.log("login", login);
        };
        this.engine.login(this.msRegistRsp.userID, this.msRegistRsp.token, this.gameID, 1, this.appKey, this.secretKey, "v", 0);
        //  engine.login(userID: number, token: string, gameID: number, gameVersion: number, appKey: string, secretKey: string, deviceID: string, gatewayID: number): number
    };
    MsEngine.showInfo = function () {
        console.log("自己的=>", this.msRegistRsp);
    };
    MsEngine.joinRoom = function () {
        this.response.joinRoomResponse = function (status, roomUserInfoList, roomInfo) {
            if (status == 200) {
                //成功
                console.log("自己进入房间", roomUserInfoList);
                console.log("自己房间信息", roomInfo);
            }
            else {
                //失败
                console.log("加入房间失败");
            }
        };
        this.response.joinRoomNotify = function (roomUserInfo) {
            //roomUserInfo.userID 加入房间
            console.log("别人加入了房间=>", roomUserInfo);
        };
        this.response.joinOverNotify = function (notifyInfo) {
            //notifyInfo.srcUserID 关闭房间 notifyInfo.roomID
            console.log("别人退出了房间", notifyInfo);
        };
        this.response.sendEventResponse = function (rsp) {
            if (rsp.status == 200) {
                console.log("发送成功", rsp);
            }
            else {
                console.log("发送失败");
            }
        };
        this.response.sendEventNotify = function (eventInfo) {
            //eventInfo.srcUserID 发送数据 eventInfo.cpProto
            console.log("发送数据", eventInfo);
        };
        this.engine.joinRandomRoom(3, "hello matchvs");
    };
    MsEngine.outRoom = function () {
        this.response.joinOverResponse = function (rsp) {
            if (rsp.status == 200) {
                console.log("退出房间成功");
            }
            else {
                console.log("退出房间失败");
            }
        };
        this.response.joinOverNotify = function (notifyInfo) {
            //notifyInfo.srcUserID 关闭房间 notifyInfo.roomID
        };
        this.engine.joinOver("hello matchvs");
    };
    MsEngine.sendEventEx = function () {
        //这里发给其他用户和 gameServer
        this.engine.sendEvent("这就是我发过来的");
    };
    MsEngine.engine = new MatchvsEngine();
    MsEngine.response = new MatchvsResponse();
    MsEngine.isInit = false;
    MsEngine.gameID = 202304;
    MsEngine.appKey = "cdc257a229c84d6a910e37d19a93934a";
    MsEngine.secretKey = "55ce63699f6b422490314921af81bf83";
    return MsEngine;
}());
//# sourceMappingURL=MsEngine.js.map