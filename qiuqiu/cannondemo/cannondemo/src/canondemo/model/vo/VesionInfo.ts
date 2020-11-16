class VesionInfo {

    public level: number;
    public wxcloudModel: number  //1审核模式2人过审模式；
    public aoutSharemode: boolean //是否开读周末分享模式
    public adshareModel: number  //1广告优先2分享优先；
    public videomaxNum: number;
    public resetlevel: any //重置关卡判断
    public showSkinefficLevel: number//摊开皮肤的关卡
    public shareRatio: any   //分享系数， 登入次数 分享次数需要和分享人数有关
    public msgToast: number
    public starPlayVideo: any
    public needshareToNextLevelArr: Array<number> //需要分享才能进行下一关;
    public levelupneedmunArr: Array<number> //首次升级需要消耗开启
    public endless: any;
    public sharexml: any;
    public onlinegame: any
    public vippanel: any
    public linkplaymap: Array<any>
    public offline: Array<any>
    public sharetime: Array<number>
    public rankarea: Array<string>
    public special: any
 
    
    public meshObj(value: any): void {
        for (var key in value) {
            this[key] = value[key]
        }
   
    }
    public get canUseShareBut(): boolean {
        if (this.shareRatio.open) {
            if (GameData.getStorageSyncNumber("loginnum") > this.shareRatio.minLogin) {
                console.log("登入次数", GameData.getStorageSyncNumber("loginnum"), "分享次数", AllShareMeshVo.shareSkipId, "人数", GameData.haveAdvertiseListLen, "系数", this.shareRatio.num)
                if (GameData.haveAdvertiseListLen >= this.shareRatio.advertisemax) {
                    console.log("已分享邀请成功大于或等于", this.shareRatio.advertisemax)
                    return true;
                }
                if (AllShareMeshVo.shareSkipId > (GameData.haveAdvertiseListLen + 1) * this.shareRatio.num) {
                    //如果 登入次数大于 3 ,分享获取人数+1 * 10  .就关闭分享按钮；
                    console.log("不能使用分享按钮")
                    return false;
                }
            }
        }
        return true
    }


}