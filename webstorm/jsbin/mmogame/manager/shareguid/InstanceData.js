"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var InstanceData = /** @class */ (function (_super) {
    __extends(InstanceData, _super);
    function InstanceData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstanceData.prototype.onBaseCreated = function () {
        var _this = this;
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        // this.AddListen(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, ($binlog: any) => { this.instanceIntFieldTrialSweep() });
    };
    InstanceData.prototype.dataUpdate = function ($intMask, $strMask) {
    };
    /** 已挑战次数 */
    InstanceData.prototype.getHasChallengeNum = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, 0);
    };
    /** 今日连胜记录 */
    InstanceData.prototype.getwinningstreakrecord = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_COMBATWIN, 0);
    };
    /** 首胜最高记录 */
    InstanceData.prototype.getvictoryrecord = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_MAX_RANK);
    };
    /** 已可购买挑战次数 */
    InstanceData.prototype.getCanbuyChallengeNum = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, 1);
    };
    /** 斗剑台挑战CD时间戳 */
    InstanceData.prototype.getDJcdtime = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIGHT_CD);
    };
    /** 首胜奖励领取情况vo */
    InstanceData.prototype.getFirstvictoryList = function () {
        var $aryflag = new Array;
        for (var i = 0; i < 20; i++) {
            var vo = new FirstvictoryVo();
            //是否达到该名次
            var a = this.GetBit(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_GET, i + 1);
            if (a) {
                //达到
                //是否领取
                var b = this.GetBit(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_REWARD, i + 1);
                if (b) {
                    vo.state = 2;
                }
                else {
                    vo.state = 0;
                }
            }
            else {
                //未达到
                vo.state = 1;
            }
            vo.data = tb.TB_doujiantai_first.get_TB_doujiantai_firstById(i + 1);
            $aryflag.push(vo);
        }
        $aryflag.sort(function (a, b) {
            if (a.state == b.state) {
                return a.data.id - b.data.id;
            }
            else {
                return a.state - b.state;
            }
        });
        return $aryflag;
    };
    InstanceData.prototype.FirstvictoryrewardChange = function () {
    };
    InstanceData.prototype.instanceIntFieldTrialSweep = function () {
    };
    InstanceData.prototype.getInstanceIntFieldVipSatrt = function () {
        var $arr = new Array();
        for (var i = SharedDef.INSTANCE_INT_FIELD_VIP_START; i < SharedDef.INSTANCE_INT_FIELD_VIP_END; i++) //FIXME
         {
            //vip副本开始	每个信息4个byte[0:预留, 1:预留, 2:挑战次数, 3:购买次数]
            var idx = i;
            var passed = this.GetByte(idx, 1);
            var num = this.GetByte(idx, 2);
            var buys = this.GetByte(idx, 3);
            $arr.push({ num: num, passed: passed, buys: buys });
        }
        return $arr;
    };
    InstanceData.prototype.getInstanceIntFieldResSatrt = function () {
        var $arr = new Array();
        for (var i = SharedDef.INSTANCE_INT_FIELD_RES_START; i < SharedDef.INSTANCE_INT_FIELD_RES_END; i++) //FIXME
         {
            //vip副本开始	 每个信息4个byte[0:挑战次数,1:是否通关,2:预留,3:预留]
            var idx = i;
            var num = this.GetByte(idx, 0);
            var passed = this.GetByte(idx, 1);
            $arr.push({ num: num, passed: passed });
        }
        console.log("===$arr==", $arr);
        return $arr;
    };
    InstanceData.prototype.getInstanceIntFieldTrialPassed = function () {
        //(0:今日可扫荡层数,1:历史通关层数)
        var sweepCurrent = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_PASSED_SHORT, 0);
        var trialCurrent = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_PASSED_SHORT, 1);
        //var sweepCurrent: number = 1
        //var trialCurrent: number = 1
        return [sweepCurrent, trialCurrent];
        // console.log({ sweepCurrent: sweepCurrent, trialCurrent: trialCurrent })
        // return { sweepCurrent: sweepCurrent, trialCurrent: trialCurrent }
    };
    InstanceData.prototype.getInstanceIntFieldXianfuDayTimes = function () {
        //仙府使用次数
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_XIANFU_DAY_TIMES);
    };
    InstanceData.prototype.getInstanceIntFieldTrialSweep = function () {
        // (0:扫荡次数,1:可购买扫荡次数)
        var sweepNum = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, 0);
        var canBuyNum = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, 1);
        // var sweepNum: number = 1
        // var canBuyNum: number = 1
        //console.log({ sweepNum: sweepNum, canBuyNum: canBuyNum })
        //return { sweepNum: sweepNum, canBuyNum: canBuyNum }
        return [sweepNum, canBuyNum];
    };
    /**活动次数 */
    InstanceData.prototype.getActivityNum = function ($idx) {
        return this.GetUInt32($idx);
    };
    /**通过ID活动次数 */
    InstanceData.prototype.getActivityNumByID = function ($id) {
        var idx = $id - 1 + SharedDef.INSTANCE_INT_FIELD_ACTIVE_START;
        return this.GetUInt32(idx);
    };
    /**活跃度数值 */
    InstanceData.prototype.getActivity = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_ACTIVE);
    };
    //3v3参与次数
    InstanceData.prototype.getInstanceIntField3V3Times0 = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, 0);
    };
    //3v3购买次数
    InstanceData.prototype.getInstanceIntField3V3Times1 = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, 1);
    };
    //3v3每日奖励
    InstanceData.prototype.getInstanceIntField3V3DayReward = function () {
        var $arr = new Array;
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 0));
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 1));
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 2));
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 3));
        console.log($arr);
        return $arr;
    };
    /**活跃度奖励领取状态 */
    InstanceData.prototype.getActivityRewardState = function () {
        var ary = new Array;
        for (var i = 0; i < SharedDef.MAX_ACTIVE_COUNT; i++) {
            var idx = i * 2 + 2;
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, idx));
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, idx + 1));
        }
        return ary;
    };
    InstanceData.prototype.get1v1Records = function () {
        var ret = new Array;
        var cursor = this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIANTAI_CURSOR);
        var last = (cursor - 1) % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        var start = cursor % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        if (last < start) {
            last += SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        }
        console.log(start, last);
        for (var i = start; i <= last; ++i) {
            var indx = i % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
            var str = this.GetStr(SharedDef.INSTANCE_STR_FIELD_DOUJIANTAI_RECORD_START + indx);
            console.log(str);
            if (str) {
                ret.push(str);
            }
        }
        return ret;
    };
    /**
     * 当日组队副本挑战次数购买次数
     */
    InstanceData.prototype.getBuyTeamCopyNum = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_BUY_COUNT);
    };
    /**
     * 组队副本剩余挑战次数
     */
    InstanceData.prototype.getTeamCopyNum = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_CHALLENGE_COUNT);
    };
    //排位赛胜利额外可领取奖励
    InstanceData.prototype.getQualifyExtra = function () {
        var ary = new Array;
        for (var i = 0; i < 3; i++) {
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA, i));
        }
        return ary;
    };
    //排位赛胜利额外已领取奖励
    InstanceData.prototype.getQualifyExtraPicked = function () {
        var ary = new Array;
        for (var i = 0; i < 3; i++) {
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA_PICKED, i));
        }
        return ary;
    };
    //排位赛每天次数
    InstanceData.prototype.getQualifyDailyTimes = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_DAILY_TIMES);
    };
    // 排位赛购买次数
    InstanceData.prototype.getQualifyBuyTimes = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_BUY_TIMES);
    };
    //排位赛记录
    InstanceData.prototype.getQualify1Log = function () {
        var ret = new Array;
        var cursor = this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_CURSOR);
        var last = (cursor - 1) % SharedDef.MAX_QUALIFY_RECORD_COUNT;
        var start = cursor % SharedDef.MAX_QUALIFY_RECORD_COUNT;
        if (last < start) {
            last += SharedDef.MAX_QUALIFY_RECORD_COUNT;
        }
        console.log(start, last);
        for (var i = start; i <= last; ++i) {
            var indx = i % SharedDef.MAX_QUALIFY_RECORD_COUNT;
            var str = this.GetStr(SharedDef.INSTANCE_STR_FIELD_QUALIFY_RECORD_START + indx);
            if (str) {
                ret.push(str);
            }
        }
        return ret;
    };
    /**
     * 个人boss次数回复时间戳
     */
    InstanceData.prototype.getPersonbosstime = function () {
        var aa = new Array;
        for (var i = SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_START; i < SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_END; i++) {
            aa.push(this.GetUInt32(i));
        }
        return aa;
    };
    return InstanceData;
}(GuidObject));
