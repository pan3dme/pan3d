
function getWxAvatar64UrlByUrl(value: string): string {
    return value
}
function getWxAvatar132UrlByUrl(value: string): string {
    return value
}
class EveryDataSync {
    public num: number;;
    public daystr: string;
    public isget: boolean
    public constructor($daystr: string, $num: number, $isget: boolean = false) {
        this.daystr = $daystr
        this.num = $num
        this.isget = $isget
    }
}
class GameData {
    public static _gameType: number = 1  //1为关卡模式，2.为无尽模式，5特殊关卡副本//
    public static get gameType(): number {
        return this._gameType;
    }
    public static set gameType(value: number) {
        this._gameType = value;
    }
    public static devicetypepc: boolean = true                 //true是pc ，false是微信
 
    public static needDrawWxpublicTexture: boolean;
    public static wx_public_cavans_texture: WebGLTexture;
    public static skinType: number = 1;
    public static diamondsconfigRes: any;
    public static storageSession: any;

    public static onLaunchRes: any;
    public static onshowRes: any;
    public static helpinfo: HelpOtherVo
    public static userInfo: any;
    public static severinfo: VesionInfo;
    public static webuserInfo: any;
    public static pixelRatio: number = 2
    public static SystemInfo: any

    public static maxLevel: number = 55; //游戏可玩的最大等级;
    public static version: number = 65;

 
    public static helpBeforSelfLevel: number;
    public static SELF_MAX_LEVEL: string = "SELF_MAX_LEVEL";
    public static loginTime: number;

    public static intervalLoginTm: number; //离上次登入间隔时间


    public static isHitColone: boolean;

    public static webseverurl: string

    public static getSeverTime(bfun: Function = null): number {
        if (isNaN(this.loginTime)) {
            GameData.loginTime = Pan3d.TimeUtil.START_TIME;//先等于本地时间
            GameData.WEB_SEVER_EVENT_AND_BACK("get_server_time", "", (res: any) => {
                if (res && res.data && res.data.success) {
                    GameData.loginTime = res.data.time*1000;
                    console.log("服务器时间", GameData.loginTime)
                }  
                bfun && bfun()
            })
        } else {
            bfun && bfun()
        }
        return this.loginTime + Pan3d.TimeUtil.getTimer();
    }
    public static getDiamodsConfigByLevel(value: number): Array<any> {
        for (var key in GameData.diamondsconfigRes.tabels) {
            if (GameData.diamondsconfigRes.tabels[key]&&GameData.diamondsconfigRes.tabels[key].name == String(value)) {
                return GameData.diamondsconfigRes.tabels[key].list;
            }
        }
        return null
    }
    public static getBaoxiangConfigByLevelStr(value: string): Array<any> {
        for (var key in GameData.diamondsconfigRes.baoxiang) {
            if (GameData.diamondsconfigRes.baoxiang[key]&&GameData.diamondsconfigRes.baoxiang[key].mapstr == value) {
                return GameData.diamondsconfigRes.baoxiang[key].list;
            }
        }
        return null
    }
    public static getNeedDiamodsResetPlayByLevel(value: number): number {
        for (var key in GameData.diamondsconfigRes.restpaly) {
            if (GameData.diamondsconfigRes.restpaly[key].level == String(value)) {
                return GameData.diamondsconfigRes.restpaly[key].num;
            }
        }
    }

    public static get hasWinPanel(): boolean {
        for (var i: number = 0; i < Pan3d.UIManager.getInstance()._containerList.length; i++) {
            if (Pan3d.UIManager.getInstance()._containerList[i].interfaceUI == false) {
                var $clas: any = Pan3d.UIManager.getInstance()._containerList[i];
                if ($clas instanceof msgalert.OnlyTopTxt) {

                } else {
                    return true
                }
            }
        }
        return false
    }

    public static lookVideoFinishAdd(): void {
        var tempData: EveryDataSync = GameData.getEveryDataSyncByName("todaylookvideonum");
        GameData.setEveryDataSyncByName("todaylookvideonum", tempData.num + 1);
        console.log("今天已观看过了", tempData.num+1)
    }
    private static isCanLookVidel: boolean = true
    public static isLookVideoErr(): void {
        console.log("视屏加载错误");
        var tempData: EveryDataSync = GameData.getEveryDataSyncByName("todaylookvideonum");
        this.isCanLookVidel = false
    }
    public static get isCanUseLookVideoBut(): boolean {
        if (!this.isCanLookVidel) {
            return false
        }
        var tempData: EveryDataSync = GameData.getEveryDataSyncByName("todaylookvideonum");
        console.log("今天已观看过了", tempData.num);
        if (tempData.num > 10) {
            return false
        } else {
            return true
        }
  
    }
 
    public static getNeedTimeResetPlayByLevel(value: number): number {
        for (var key in GameData.diamondsconfigRes.restpaly) {
            if (GameData.diamondsconfigRes.restpaly[key].level == value) {
                return GameData.diamondsconfigRes.restpaly[key].waittime;
            }
        }
    }
    public static getNeedDiamondsReviveByLevel(value: number): number {
        for (var key in GameData.diamondsconfigRes.restpaly) {
            if (GameData.diamondsconfigRes.restpaly[key].level == value) {
                if (GameData.diamondsconfigRes.restpaly[key].revivenum) {
                    return GameData.diamondsconfigRes.restpaly[key].revivenum;
                }
            }
        }
        return 2
    }
    public static getDiamodsByShareInput(value: number): number {
        for (var key in GameData.diamondsconfigRes.shareinput) {
            if (GameData.diamondsconfigRes.shareinput[key].level == String(value)) {
                return GameData.diamondsconfigRes.shareinput[key].num;
            }
        }
    }
    public static getFristLevelUpByLevel(value: number): number {
        for (var key in GameData.diamondsconfigRes.fristreward) {
            if (GameData.diamondsconfigRes.fristreward[key].level == String(value)) {
                return GameData.diamondsconfigRes.fristreward[key].num;
            }
        }
        return 0
    }
    public static getDayStr(): string {
 
       return Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000)

 
   
    }
    public static saveUseClikInfo($key: string): void {
        if (GameData.webuserInfo) {
            console.log(GameData.webuserInfo.info);
            if (GameData.webuserInfo.info && GameData.webuserInfo.info.length) {
            } else {
                GameData.webuserInfo.info = "{}";
            }
            var $obj: any = JSON.parse(GameData.webuserInfo.info);
            var keyname: string = "r" + $key;
            if (!Boolean($obj[keyname])) {
                $obj[keyname] = 0;
            }
            $obj[keyname] += 1;
            GameData.webuserInfo.info = JSON.stringify($obj);
        
            this.changeWebUserInfo("info", GameData.webuserInfo.info)

        }
    }
    public static changeWebUserInfo($key: string, $value: string): void {
        //user_update_info (openid,user_key,user_value) key["avatar","name","area","gender","enter_type"]
        var $postStr: string = "";
        $postStr += "openid=" + GameData.getStorageSync("openid");
        $postStr += "&user_key=" + $key
        $postStr += "&user_value=" + $value
        GameData.WEB_SEVER_EVENT_AND_BACK("user_update_info", $postStr)
    }
    //如果是首
    public static clearFristLevelUp($level: number): void {
        var $str: string = GameData.getStorageSync("fristlevelupdata");
        if ($str) {
            var $arr: Array<any> = JSON.parse($str);
            for (var i: number = 0; i < $arr.length; i++) {
                if ($arr[i] == $level) {
                    $arr.splice(i, 1);
                    GameData.setStorageSync("fristlevelupdata", JSON.stringify($arr));
                    return
                }
            }
        }
    }
    public static saveFristLevelUp($level: number): boolean {
        var $str: string = GameData.getStorageSync("fristlevelupdata");
        var $arr: Array<any>
        if (!$str) {
            console.log("第一次获取钻石")
            $arr = new Array;
        } else {
            $arr = JSON.parse($str);
        }
        var $isTrue: boolean = true
        for (var i: number = 0; i < $arr.length; i++) {
            if ($arr[i] == $level) {
                $isTrue = false
            }
        }
        if ($isTrue) {
            $arr.push($level);
            GameData.setStorageSync("fristlevelupdata", JSON.stringify($arr));
        }
        return $isTrue
    }
   
    //记录收集过的钻石
    public static saveDiamondsByKey($name: string): void {
        var $str: string = GameData.getStorageSync("hasDiamonds")
        var $arr: Array<any>
        if (!$str) {
            console.log("第一次获取钻石")
            $arr = new Array;
        } else {
            $arr = JSON.parse($str);
        }
        $arr.push({ name: $name, time: Date.now().toString() })
        GameData.setStorageSync("hasDiamonds", JSON.stringify($arr))
    }
    private static advertiseList: Array<any>;
    private static lastGetAdvertiseTm: number
    public static get haveAdvertiseListLen(): number {
        //1分钟可以更新一次
        if (this.lastGetAdvertiseTm < Pan3d.TimeUtil.getTimer() - 60 * 1000) {
             this.getAdvertiseList();
        }
        if (this.advertiseList) {
            return this.advertiseList.length;
        } else {
            return 0;
        }


    }
    public static getAdvertiseList( ): Array<any>  {
        //获取所有邀请列表
        if (!this.advertiseList) {
            this.advertiseList = new Array;
        }
        this.lastGetAdvertiseTm = Pan3d.TimeUtil.getTimer()
        var $postStr: string = "";
        $postStr += "openid=" + GameData.getStorageSync("openid");
        $postStr += "&time=" + 0;
        $postStr += "&type=" + 99;

        console.log("$postStr", $postStr)
        GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, (res: any) => {
            if (res && res.data && res.data.list && res.data.list.length) {
                this.advertiseList = res.data.list;
                console.log("获取了全部邀请", this.advertiseList )
            }
        })
        return this.advertiseList;

    }
    public static sendFailToWeb($level: number): void {
        var useTim: number = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
        var $postStr: string = "";
        $postStr += "level=" + $level
        $postStr += "&openid=" + GameData.getStorageSync("openid") //自己的
        if (GameData.userInfo && GameData.userInfo.nickName) {
            $postStr += "&info=" + GameData.userInfo.nickName + "_" + String(GameData.hasdiamondsHavenum) + "-v-" + GameData.version + "-u-" + GameData.haveAdvertiseListLen;
        } else {
            $postStr += "&info=" + "没名-" + "_" + String(GameData.hasdiamondsHavenum);
        }
        if (GameData.isOtherPlay()) {
            GameData.WEB_SEVER_EVENT_AND_BACK("add_fail", $postStr)
        }
    }

    public static sendSuccessToWeb(value: number): void {
        var useTim: number = Pan3d.TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
        var $postStr: string = "";
        $postStr += "level=" + value
        $postStr += "&openid=" + GameData.getStorageSync("openid");
        $postStr += "&time=" + useTim;
        if (GameData.isOtherPlay()) {
            if (GameData.userInfo && GameData.userInfo.nickName) {

                $postStr += "&info=" + GameData.userInfo.nickName + "_" + String(GameData.hasdiamondsHavenum) + "-v-" + GameData.version + "-u-" + GameData.haveAdvertiseListLen ;
            } else {
                var $addStrinfo: string = ""
                if (GameData.userInfo) {
                    $addStrinfo = String(GameData.userInfo.nickName)
                }
                $postStr += "&info=" + "没名-" + $addStrinfo + "_" + String(GameData.hasdiamondsHavenum);
            }
            console.log("成功发送参数", $postStr)
            GameData.WEB_SEVER_EVENT_AND_BACK("add_success", $postStr)
        }
       
    }

    private static gameStorageKey: string = "qiuqiu20181112"
    private static makeWebUserInfo(): void {
        GameData.userInfo = GameData.getStorageSync("userInfo");
        if (!GameData.userInfo) {
            GameData.userInfo = {};
            GameData.userInfo.avatarUrl = GameData.emptyiconUrl
            GameData.userInfo.city = "未确定";
            GameData.userInfo.country = "China";
            GameData.userInfo.gender = 1;
            GameData.userInfo.language = "zh_CN";
            GameData.userInfo.nickName = "未授权名";
            GameData.userInfo.province = "Beijin";
            console.log("没有自己的省份，准备杜撰")
            GameData.setStorageSync("userInfo", GameData.userInfo);
        }
    }
    public static initGameGetAllSync(bfun: Function): void {
        GameData.getStorageWxAndBase(this.gameStorageKey, ($str: string) => {
            GameData.storageSession = JSON.parse($str ? $str : "{}");
            this.makeWebUserInfo();
            GameData.userInfo = GameData.getStorageSync("userInfo");
            console.log("登入进来得到userInfo", GameData.userInfo)
            var openid: string = GameData.getStorageSync("openid");
            if (!openid) {
                openid = "id" + Date.now() + "_" + random(9999);
                GameData.setStorageSync("openid", openid);
                console.log("新人创建openid", openid)
                var $postStr: string = "";
                $postStr += "level=" + 0;
                $postStr += "&openid=" + GameData.getStorageSync("openid");
                $postStr += "&time=" + 0;
                $postStr += "&info=" + "新用户首次进来";
                GameData.WEB_SEVER_EVENT_AND_BACK("add_success", $postStr, (res: any) => {
                    console.log("进来的第一次", res)
                })
            }
            bfun();
        });
    }
    public static clearStorageSync(): void {
        this.clearStorageWxAndBase()
        GameData.storageSession = {};

    }
    public static get hasdiamondsHavenum(): number {
        var $num: number = Number(GameData.getStorageSync("diamondsHavenum"))
        return isNaN($num) ? 0 : $num
    }
    public static set hasdiamondsHavenum(value: number) {
        if (isNaN(value) || value > 10000 || value < 0) {
            value=0
        }
 
        GameData.setStorageSync("diamondsHavenum", value)
        Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.DIAMONDS_CHANGE_EVENT));
    }
    public static setStorageSync(key: string, value: any): void {
        if (GameData.storageSession) {
            GameData.storageSession[key] = value;
            this.setStorageWxAndBase(this.gameStorageKey, JSON.stringify(GameData.storageSession));

        }

    }
    public static getStorageSync(key: string, ): any {
        if (GameData.storageSession) {
            return GameData.storageSession[key];
        } else {
            return null
        }
    
    }
    //获取每日的数据，如果当前没有，就为空
    public static getEveryDataSyncByName($keystr: string): EveryDataSync {
        var dayStr: string = GameData.getDayStr();
        var $keyData: any = GameData.getStorageSync($keystr);
        if (!$keyData || $keyData.daystr != dayStr) {
            $keyData = { daystr: dayStr, num: 0 }
        }
        GameData.setStorageSync($keystr, $keyData)
        return new EveryDataSync($keyData.daystr, $keyData.num, $keyData.isget);
    }
    //保存每日数据
    public static setEveryDataSyncByName($keystr: string, $num: number): void {
        var dayStr: string = GameData.getDayStr();
        var $keyData: any = GameData.getStorageSync($keystr);
        if (!$keyData || $keyData.daystr != dayStr) {
            $keyData = { daystr: dayStr, num: 0 }
        }
        $keyData.num = $num;
        GameData.setStorageSync($keystr, $keyData)
        return $keyData;
    }
    public static getStorageSyncNumber(key: string, ): number { //返回数值，空的时候为0
        if (!GameData.storageSession) {
            return 0;
        }
        return isNaN(Number(GameData.storageSession[key])) ? 0 : Number(GameData.storageSession[key]);
    }
    private static getStorageWxAndBase(key: string, bfun: Function): void {
        bfun(sessionStorage.getItem(key));
    }
    private static setStorageWxAndBase(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }
    private static clearStorageWxAndBase(): void {
        sessionStorage.clear();
    }
    public static isOtherPlay(): boolean {
        return true
    }
    public static dispatchToLevel($toLevenNum: number): void {
        GameData.gameType = 1
 

        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL), $toLevenNum)
        GameData.setStorageSync("gameLevel", $toLevenNum)

    }
    public static GET_USER_INFO_LIST($arr: Array<string>, $fun: Function): void {
       //get_user_info_list (list)
  
        var $postStr: string ="list="+ JSON.stringify($arr);
        GameData.WEB_SEVER_EVENT_AND_BACK("get_user_info_list", $postStr, (res: any) => {
            console.log("get_user_info_list===>", res)
            if (res && res.data && res.data.list && res.data.list.length ) {
                $fun(res.data.list)
            } else {
                $fun(null)
            }
    
        })

    }
    public static WEB_SEVER_EVENT_AND_BACK(webname: string, postStr: string, $bfun: Function = null): void {

        webname=  webname.replace(/\s+/g, "");
        var $obj: any = new Object();
        $obj.webname = webname;
        $obj.postStr = postStr.replace(/\s+/g, "");
        $obj.fun = $bfun;
        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WEB_SEVER_EVENT_AND_BACK), $obj);

        this.isPostWeboffwx(webname, postStr, $bfun)
    }

    //网页模式的WEB请求
    private static isPostWeboffwx(webname: string, postStr: string, $bfun: Function = null) {
        var ajax: XMLHttpRequest = new XMLHttpRequest();
        var url: string = GameData.webseverurl+ webname

        let timestamp: string = String( Pan3d.TimeUtil.getTimer());
        let keystr: string = "ABC"
        let self_sign: string = hex_md5(postStr + timestamp + keystr)

        ajax.open("post", url, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.setRequestHeader("timestamp", timestamp)
        ajax.setRequestHeader("sign", self_sign)
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    $bfun ? $bfun({ data: JSON.parse(ajax.responseText) }) : null
                }
                else {
                    console.log("HTTP请求错误！错误码：" + ajax.status);
                    $bfun ? $bfun(null) : null
                }
            }

        }
        ajax.send(postStr);
    }
    public static WEB_SAVE_SAMPE_FILE_BACK_NAME($clasName: string, $byte: Pan3d.Pan3dByteArray, $bfun: Function ): void {

        if (GameData.devicetypepc) {

            var fileObj: File = new File([$byte.buffer], "talkfile.mp3");
            var url = "https://api.h5key.com/api/" + $clasName; // 接收上传文件的后台地址 
            var form = new FormData(); // FormData 对象
            form.append("mf", fileObj); // 文件对象
            var xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        $bfun ? $bfun({ data: JSON.parse(xhr.responseText) }) : null
                        console.log("发送成功", JSON.parse(xhr.responseText));
                    }
                    else {
                        console.log("HTTP请求错误！错误码：" + xhr.status);
                        $bfun ? $bfun(null) : null
                    }
                }
            }
            xhr.send(form); //开始上传，发送form数据

        } else {
            var $obj: any = new Object();
            $obj.clasName = $clasName;
            $obj.fun = $bfun;
            $obj.data = $byte;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WEB_SAVE_SAMPE_FILE_BACK_NAME), $obj)
        }
    

       
 
 
    
    }

    public static WEB_SAVE_VIDEO_FILE($clasName: string, byte: Pan3d.Pan3dByteArray, time: number, $bfun: Function = null): void {

        var $evt: game.SceneEvent = new game.SceneEvent(game.SceneEvent.SAVE_VIDEO_FILE_TO_WEB);
        var $obj: any = new Object();
        $obj.clasName = $clasName;
        $obj.fun = $bfun;
        $obj.data = byte;
        $obj.time = time
        $obj.openid = GameData.getStorageSync("openid")
        $obj.level = game.GameDataModel.levelNum
        $evt.data = $obj;
        Pan3d.ModuleEventManager.dispatchEvent($evt);
        this.isWebSaveVideoFile($clasName,byte, time);

    }
    public static emptyiconUrl: string = "https://commcdn.chiji-h5.com/wdqq/emptyicon.jpg"

    private static isWebSaveVideoFile($clasName: string, $byte: Pan3d.Pan3dByteArray, time: number): void {
        //$data.levelStartTm = GameDataModel.levelStartTm;
        //$data.byte = GameVideoManager.ItemFrameByte;
        //$data.time = Pan3d.TimeUtil.getTimer() - GameDataModel.levelStartTm
 
        var fileObj: File = new File([$byte.buffer], "jek.txt");
        var url = GameData.webseverurl + $clasName; // 接收上传文件的后台地址 
        var form = new FormData(); // FormData 对象
        form.append("level", String(game.GameDataModel.levelNum)); // 文件对象
        form.append("time", String(time)); // 文件对象
        form.append("openid", GameData.getStorageSync("openid")); // 文件对象
        form.append("mf", fileObj); // 文件对象
        var xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.send(form); //开始上传，发送form数据

    }


    public static sendToWebCallHelp(): void {
        let nickName: string = "无名失者";
        var picUrl: string = GameData.emptyiconUrl
        if (GameData.userInfo) {
            nickName = GameData.userInfo.nickName;
            picUrl = GameData.userInfo.avatarUrl;
        }
        console.log("发送帮助后的图片", picUrl)
        var $postStr: string = "";
        $postStr += "level=" + game.GameDataModel.levelNum
        $postStr += "&openid=" + GameData.getStorageSync("openid");
        $postStr += "&user_info=" + nickName + "|" + picUrl;
        GameData.WEB_SEVER_EVENT_AND_BACK("call_help", $postStr, (res: any) => {

            Pan3d.ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.CHECK_SELF_HELP_INFO));
        })
     
    }

    public static WX_ON_SHARE_APP_MESSAGE($title: string, $query: string, $bfun: Function = null, $drawBmp: boolean = false): void {
        var $evtA: game.SceneEvent = new game.SceneEvent(game.SceneEvent.ON_SHARE_APP_MESSAGE);
        var $info: any = {};
        $info.title = $title;
        $info.query = $query;
        $info.bfun = $bfun;
        $info.drawBmp = $drawBmp;
        $evtA.data = $info;
        Pan3d.ModuleEventManager.dispatchEvent($evtA);
        this.isShareOffWx($title, $query, $bfun)
    }
    //在网页中，分享成功
    private static isShareOffWx($title: string, $query: string, $bfun: Function = null): void {
        $bfun ? $bfun({}) : null
    }

    public static localFileItem: Array<string>;
    private static addFileNameToItem(value: string): void {
        this.localFileItem.push(value);
    }
    public static loadImgByPicUrl($url: string, $fun: Function): void {
        //在这里先统一用这个方法加载图片，需要找到原因，现在只是实现
        if ($url && $url.length>10) {
            $url = GameData.getLoadFileIsLocalUrl($url)
            Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.IMG_TYPE,
                ($img: any) => {
                    $fun($img)
                });
        }
    }
    public static WX_RECORDER_START_EVENT($fun: Function) {
        if (GameData.devicetypepc) {
            $fun({ "success": true ,"data":"1"})
        } else {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_RECORDER_START_EVENT), $fun)
        }
      
    }
    public static WX_RECORDER_END_EVENT($fun: Function=null) {
        if (GameData.devicetypepc) {
            if ($fun) {
                var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
                $byte.writeUTF("录音内容")
                GameData.WEB_SAVE_SAMPE_FILE_BACK_NAME("upload_voice", $byte, (res: any) => {
                    if (res.data && res.data.success) {
                        $fun && $fun({ "success": true, "filename": "webtest11111111.mp3" }) //先固定给个文件
                    }
                })
            }
        } else {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_RECORDER_END_EVENT), $fun)
        }
      
    }
    public static changeLocalUrlByArr($arr: Array<string>): void {
        this.localFileItem = new Array();
        for (var i: number = 0; i < $arr.length; i++) {
 
            this.addFileNameToItem($arr[i]);
        }
    }

    public static getLoadFileIsLocalUrl(value: string): string {
        if (!this.localFileItem) {
            this.localFileItem = new Array();
        }
        for (var i: number = 0; i < this.localFileItem.length; i++) {
            if (value.search(this.localFileItem[i]) != -1) {
               // console.log("本地", "res/" + this.localFileItem[i])
                return "res/" + this.localFileItem[i];
            }
        }
        if (value.indexOf("com/fish") == -1 && value.indexOf("//picconfig") == -1) {
            console.log("web文件", value);
        }
        return value

    }

    public static clearPandaOrInof($type: number, $key: number): void {
       
        var obj: rightpanda.PandaMeshData = new rightpanda.PandaMeshData();
        obj.type = $type; //清理求助
        obj.key = $key; //清理求助

        GameData.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.CLEAR_PANDA_INFO), obj);

    }

    public static addShareToWeb($type: number=0, $num: number=0): void {  //0和1
        var $postAddShare: string = "";
        $postAddShare += "openid=" + GameData.getStorageSync("openid");
        if (GameData.userInfo && GameData.userInfo.nickName) {
            var $addStr: string = "u_" + GameData.haveAdvertiseListLen + "m_" + GameData.hasdiamondsHavenum;
            $postAddShare += "&info=" + GameData.userInfo.nickName + $addStr;
        } else {
            $postAddShare += "&info=" + "没授权用户";
        }
        $postAddShare += "&type=" + $type;
        $postAddShare += "&num=" + $num;
        $postAddShare += "&level=" + game.GameDataModel.levelNum;
        GameData.WEB_SEVER_EVENT_AND_BACK("add_share", $postAddShare)

        GameData.setStorageSync("shareSuccessNum", GameData.getStorageSyncNumber("shareSuccessNum")+1);
    }

    public static dispatchEvent(evt: Pan3d.BaseEvent, data: any): void {
        evt.data = data
        Pan3d.ModuleEventManager.dispatchEvent(evt)


    }

 
}
