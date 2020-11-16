class AllShareMeshVo {
    public bfun: Function;  
    public shareTm: number;
    public mustNeedTm: number;
    public sharetype: number;
    public id: number;
    public static shareSkipId: number = 0

    public static type1: number = 1  //转盘
    public static type2: number = 2  //邀请
    public static type3: number = 3  //必须邀请的通关 暂时没用到
    public static type4: number = 4  //魔法球
    public static type5: number = 5  //离线领取双位奖励
    public static type6: number = 6  //原来复活
    public static type7: number = 7  //任务获取
    public static type8: number = 8  //时间礼物，现在还没用上
    public static type9: number = 9   //进入神秘关卡
    public static type10: number = 10   //复活点复活
    public static type11: number = 11 //开起宝箱
    public static type12: number = 12 //vip

    public constructor(value: Function, $type: number = 0) {
        this.sharetype = $type
        this.bfun = value;
        this.id = GameData.getStorageSyncNumber("userShareNum");
        GameData.setStorageSync("userShareNum", this.id + 1);
        AllShareMeshVo.shareSkipId = this.id;
 
    }


}