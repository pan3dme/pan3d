class RoomUserVo {
    public msRoomUserInfo: MsRoomUserInfo;
    public ready: boolean;
    public dis: linkplay.LinkPlayCanonPrefabSprite
    public pos: Pan3d.Vector3D
}

class MsEngine {
    public static linkplayGamestatus: number = -1 //0在房间列表页面， 1在准备页面，2正在游戏场景中
    private engine: MatchvsEngine = new MatchvsEngine();
    private response: MatchvsResponse = new MatchvsResponse();
    private static _instance: MsEngine;
    public static getInstance(): MsEngine {
        if (!MsEngine._instance) {
            MsEngine._instance = new MsEngine();
        }
        return MsEngine._instance;
    }
    constructor() {
        this.engine = new MatchvsEngine();
        this.response = new MatchvsResponse();
    }
    public roomUserInfoList: Array<RoomUserVo>;
    public getUserByuserId(userID: number): RoomUserVo {
        for (var i: number = 0; i < this.roomUserInfoList.length; i++) {
            if (this.roomUserInfoList[i].msRoomUserInfo.userID == userID) {
                return this.roomUserInfoList[i]
            }
        }
        return null
    }
    public BrokenLine: boolean = false
    public msCreateRoomRsp: MsCreateRoomRsp
    public roomInfo: MsRoomInfo; //房间信息
    public msRegistRsp: MsRegistRsp //自己的信息
    public isRoomOwner(): boolean {
        return this.roomInfo.owner == this.msRegistRsp.userID
    }

    private init() {
        this.response.initResponse = (status: number) => {
            if (status == 200) {
                this.registerUser()
            } else {
                console.log("失败")
            }
        }
        this.response.reconnectResponse = (status: number, roomUserInfoList: Array<MsRoomUserInfo>, roomInfo: MsRoomInfo) => {
            this.BrokenLine = false
            if (MsEngine.linkplayGamestatus == -1) {
                console.log("已退出联机就不再处理联机后续")
                return
            }
            if (status == 200) {
                this.roomInfo = roomInfo
             
                console.log("重连成功,有房间数据")
                if (this.roomInfo.state == 1) { //还没开始游戏
                    this.roomUserInfoList = new Array;
                    for (var i: number = 0; i < roomUserInfoList.length; i++) {
                        var vo: RoomUserVo = new RoomUserVo();
                        vo.msRoomUserInfo = roomUserInfoList[i];
                        this.roomUserInfoList.push(vo);
                    }
                    if (roomInfo.owner == this.msRegistRsp.userID) { //自己是房主
                        this.roomUserInfoList.unshift(this.getSelfRoomUserVo());
                    } else {
                        this.roomUserInfoList.push(this.getSelfRoomUserVo());
                    }
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT))

                } 
                if (this.roomInfo.state == 2) { //在游戏里面
                    console.log("重连接，但已在游戏场景中了")
                    if (MsEngine.linkplayGamestatus != 2) { //如果客户端不是在游戏页面，重连接收到房间关闭状态将视为不能再继续游戏。将执行退出房点
                        MsEngine.getInstance().leaveRoom(() => {
                            if (MsEngine.linkplayGamestatus == 1) {
                                Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.HIDE_LINK_PLAY_START_PANEL));
                            }
                            msgalert.AlertUtil.show("已断开连接", "提示", (value: any) => {
                                if (value == 1) {
                                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                                }
                            }, 2)

                        })

                    }
                } 


            } else if (status == 201) {
                console.log("重连成功,没在房间里")
                if (MsEngine.linkplayGamestatus == 1) {
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                }
                if (MsEngine.linkplayGamestatus == 2) {
                    msgalert.AlertUtil.show("已断开连接返回", "提示", (value: any) => {
                        Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL))
                        Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL))
                    }, 2)
      
                }
            } else {
                console.log("重连接失败")
                this.BrokenLine = true
            }
        }

        
        this.response.joinRoomResponse = (status: number, roomUserInfoList: Array<MsRoomUserInfo>, roomInfo: MsRoomInfo) => {
            if (status == 200) {
                console.log("自己进入房间", roomUserInfoList);
                this.roomInfo = roomInfo;
                this.roomUserInfoList = new Array;
                for (var i: number = 0; i < roomUserInfoList.length; i++) {
                    var vo: RoomUserVo = new RoomUserVo();
                    vo.msRoomUserInfo = roomUserInfoList[i];
                    this.roomUserInfoList.push(vo);
                }
                this.roomUserInfoList.push(this.getSelfRoomUserVo());
          
                Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT))
            } else {
                console.log("加入房间失败");
                msgalert.AlertUtil.show("没进入成功", "提示", (value: any) => {
                    if (value == 1) {
                        Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                    }
                }, 2)
            }
        }
        this.response.joinRoomNotify = (roomUserInfo: MsRoomUserInfo) => {
            console.log("别人加入了房间=>", roomUserInfo);
            var vo: RoomUserVo = new RoomUserVo();
            vo.msRoomUserInfo = roomUserInfo;
            this.roomUserInfoList.push(vo);
            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT))
        }
        this.response.joinOverNotify = (notifyInfo: MsJoinOverNotifyInfo) => {
            console.log("禁止新人加入房间", notifyInfo);
            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_START_ENTER_SCENE_EVET))


        }
        this.response.networkStateNotify = (netnotify: MsNetworkStateNotify) => {
            if (netnotify.state == 1) {
                console.log("有用户掉线，正在重新连接", netnotify)

            } else if (netnotify.state == 2) {
                console.log("用户重新登录了游戏，但是还没有重连进房间", netnotify)
            } else {
                this.roomInfo.owner = netnotify.owner
                this.removeUserByuserID(netnotify.userID)
            }


        }
        
        this.response.errorResponse = (errCode: number, errMsg: string) => {
            console.log("联机错误", errCode, errMsg)
            switch (errCode) {
                case 1001:
                    /*
                    msgalert.AlertUtil.show("短线了请重新连接", "提示", (value: any) => {
                        if (value == 1) {
                          
                        }
                    }, 2)
                    */
                    //自动重连接
                    this.BrokenLine = true
                    Pan3d.TimeUtil.addTimeOut(2000, () => {
                        MsEngine.linkplayGamestatus!=-1
                        {
                            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.SHOW_RECONNECT_TXT))
                            MsEngine.getInstance().reconnect()
                        }
                    })
                    break
                default:
                    console.log("没有处理逻辑", errCode);
                    break

            }

        }
       


         
        this.response.sendEventResponse = (rsp: MsSendEventRsp) => {
            if (rsp.status == 200) {
                //   console.log("发送成功", rsp)
            } else {
                console.log("发送失败")
            }
        };
    

         
        this.response.sendEventNotify = (eventInfo: MsSendEventNotify) => {

     
            GameData.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_CATCH_EVENT_NOTIFY), eventInfo);


        };
        this.response.loginResponse = (login: MsLoginRsp) => {
            console.log("登入成功")
            this.BrokenLine = false
            this._finishFun();

        }
        this.response.joinOverResponse = (rsp: MsJoinOverRsp) => {
            if (rsp.status == 200) {
                console.log("禁示房间成功")
                if (MsEngine.getInstance().isRoomOwner()) {
                    console.log("分配房间坐标")
                    var $kkkk: any = JSON.parse(this.roomInfo.roomProperty)
                    var $posArr: Array<any> = new Array
                    for (var i: number = 0; i < this.roomUserInfoList.length; i++) {
                        var vo: RoomUserVo = this.roomUserInfoList[i];
                        vo.pos = new Pan3d.Vector3D($kkkk.basepos[i].x, $kkkk.basepos[i].y, $kkkk.basepos[i].z)
                        $posArr.push({ userID: vo.msRoomUserInfo.userID, pos: vo.pos });
                    }
                    this.sendEventJason(JSON.stringify({ type: 3, data: $posArr }));
                }
                Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_START_ENTER_SCENE_EVET))
            } else {
                console.log("禁示房间失败")
            }
        }
        this.response.getRoomDetailResponse = (rsp: MsGetRoomDetailRsp) => {
            if (rsp.status == 200) {
                console.log("房主信息", rsp)
                this.roomDetailFun && this.roomDetailFun(rsp)
 
            } else {
 
            }
        }
        
        this.response.leaveRoomResponse = (rsp: MsLeaveRoomRsp) => {
            if (rsp.status == 200) {
                //成功
                console.log("我成功退出了房间")
             
                this.leaveRoomFun && this.leaveRoomFun()
            } else {
                 console.log("我成功退出了房间")
            }
        }
        this.response.leaveRoomNotify = (leaveRoomInfo: MsLeaveRoomNotify) => {
            //leaveRoomInfo.srcUserID 离开房间 leaveRoomInfo.roomID
            console.log("有人离开的房间", leaveRoomInfo)
            console.log(this.roomInfo)
            this.roomInfo.owner = leaveRoomInfo.owner
            this.roomInfo.ownerId = leaveRoomInfo.owner
            this.removeUserByuserID( leaveRoomInfo.userID)
        }
        /*
        this.response.getRoomListResponse = (status: number, roomInfos: Array<MsRoomInfoEx>) => {

            //console.log("房间列表", status, roomInfos)

            //var $ddd: linkplay.LinkPlayRoomEvent = new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT)
            //$ddd.data = roomInfos
            //Pan3d.ModuleEventManager.dispatchEvent($ddd)
        }
        */
        this.response.getRoomListExResponse = (rsp: MsGetRoomListExRsp) => {
            console.log("getRoomListExResponse房间列表",rsp)
            if (rsp.status == 200) {
                //获取成功
 
                GameData.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT), rsp.roomAttrs)
            } else {
                //获取失败
            }
        };
        this.response.createRoomResponse = (roomRsp:MsCreateRoomRsp) => {
            console.log("自己创建了房间", roomRsp)
            this.roomInfo = new MsRoomInfo(roomRsp.roomID, this.roomType, roomRsp.owner, 1)
            this.roomInfo.roomProperty = this.roomProperty
            this.msCreateRoomRsp = roomRsp;
            this.roomUserInfoList = new Array();
            this.roomUserInfoList.push(this.getSelfRoomUserVo());
            Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT))
        }
        
         
        this.response.registerUserResponse = (userInfo: MsRegistRsp) => {
            if (userInfo.status == 0) {
                this.msRegistRsp = userInfo;
                console.log("得到了自己的用户信息", this.msRegistRsp)
               MatchvsLog.closeLog()
                this.login()
     
            } else if (userInfo.status == 200) {
                console.log("login完成")
            } else {
                console.log("失败")
            }
        }
        this.engine.init(this.response, "Matchvs", "alpha", this.gameID);
    }
    private getSelfRoomUserVo(): RoomUserVo {
        var $vo: RoomUserVo = new RoomUserVo()
        $vo.msRoomUserInfo = new MsRoomUserInfo(this.msRegistRsp.userID, this.getSelfInfoTostr())
        return $vo
    }
    private removeUserByuserID(userID: number): void {
        for (var i: number = 0; this.roomUserInfoList && i < this.roomUserInfoList.length; i++) {
            if (this.roomUserInfoList[i].msRoomUserInfo.userID == userID) {
                var vo: RoomUserVo =this.roomUserInfoList[i]
                this.roomUserInfoList.splice(i, 1);
                if (vo.dis) {
                    vo.dis.destory()
                }
            }
        }
 
        Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT))

    }

    private registerUser() {
        
        this.engine.registerUser();
    }
    private gameID: number = 202304
    private appKey: string = "cdc257a229c84d6a910e37d19a93934a"
    private secretKey: string = "55ce63699f6b422490314921af81bf83"
    private login() {
        if (this.msRegistRsp) {
            console.log("请求login")
            this.engine.login(this.msRegistRsp.userID, this.msRegistRsp.token, this.gameID, 1, this.appKey, this.secretKey, "v", 1);
        } else {
            console.log("还没有初始化")
        }
    }
    private _finishFun: Function
    public initMsEngine($fun: Function): void {
        this._finishFun = $fun
        this.init();
    }
    public reconnect(): void {
        this.engine.reconnect()
    }
    public showSelfInfo(): void {
        console.log("自己的=>", this.msRegistRsp)
    }
    public getRoomListEx(): void {
        var filter: MsRoomFilterEx = new MsRoomFilterEx(0, 0, 0, "", 0, 0, 0, 0, 0, 8);
        this.engine.getRoomListEx(filter);
    }
    public joinRandomRoom() {
        //this.engine.joinRandomRoom(4, this.getSelfJonstr());
    }
    public joinRoom(value: MsRoomInfoEx) {
        this.engine.joinRoom(value.roomID, this.getSelfInfoTostr());
       
    }
    private roomDetailFun: Function
    public getRoomDetail(value: MsRoomInfoEx, roomDetailFun: Function = null): void {
        this.roomDetailFun = roomDetailFun
        this.engine.getRoomDetail(value.roomID)
    }
    private leaveRoomFun: Function;
    public leaveRoom($fun: Function = null) {
        this.leaveRoomFun = $fun
        this.engine.leaveRoom(this.roomType);
    }
    private roomType: string ="wudiroom"
    public joinOver() {
        this.engine.joinOver(this.roomType);
    }
    public sendEventJason(value: string): void {
        this.engine.sendEvent(value);
    }
    private roomProperty: string = ""
    public createRoom(value: any): void {
 
        var $msvo: MsCreateRoomInfo = new MsCreateRoomInfo(GameData.getStorageSync("openid"), 4, 1, 2, 1, this.roomType);
        this.roomProperty = JSON.stringify(value);//地图信息
        $msvo.roomProperty = this.roomProperty
        this.engine.createRoom($msvo, this.getSelfInfoTostr())
    }
    private getSelfInfoTostr(): string {
       return   JSON.stringify({ userInfo: GameData.userInfo, skinType: GameData.getStorageSyncNumber("skinType") })
    }

}