class VesionInfo {

    public level: number;
    public wxcloudModel: number  //1审核模式2人过审模式；
    public adshareModel: number  //1广告优先2分享优先；
    public videomaxNum: number;
    public resetleveltm: number //离最后一次登入重置时间；
    public msgToast: number
 
    public needshareToNextLevelArr: Array<number> //需要分享才能进行下一关;
    
    public endless: any;
    public sharexml: any;
    public onlinegame: any
 
    public linkplaymap: Array<any>
    public offline: Array<any>

 

    public sharetime: Array<number>
    public rankarea: Array<string>
    public special: any
 
    
    public meshObj(value: any): void {
        this.level = value.level;
        this.wxcloudModel = value.wxcloudModel;
        this.adshareModel = value.adshareModel;
        this.videomaxNum = value.videomaxNum;
        this.msgToast = value.msgToast;
        this.needshareToNextLevelArr = value.needshareToNextLevelArr;
    
 
 
        this.resetleveltm = value.resetleveltm; //重置关卡间隔时间为秒
        this.onlinegame = value.onlinegame;
        this.endless = value.endless;
        this.special = value.special;
        this.offline = value.offline;
    
        this.sharexml = value.sharexml;
        this.sharetime = value.sharetime;
 
 
        this.linkplaymap = value.linkplaymap;
        this.rankarea = value.rankarea;
    }


}