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
var SceneCollection = /** @class */ (function (_super) {
    __extends(SceneCollection, _super);
    function SceneCollection() {
        var _this = _super.call(this) || this;
        _this._currentOprateState = false;
        return _this;
    }
    SceneCollection.prototype.showBlood = function ($colorType) {
        if ($colorType === void 0) { $colorType = 0; }
    };
    // public fixAstartData(pos: Vector2D): void {
    //     super.fixAstartData(pos);
    //     this.setOprateState();
    // }
    SceneCollection.prototype.setSpecialType = function ($type) {
        this._specialType = $type;
        // if ($type == 1) {//宝箱
        //     this.setOprateState();
        // }
    };
    /**是否为宝箱 */
    SceneCollection.prototype.isBx = function () {
        return this._specialType == 1;
    };
    // /**设置操作按钮状态 */
    // private setOprateState(): void {
    //     if (GuidData.map && GuidData.map.getMapID() != 0) {
    //         var bossInfo: any = this.applyOprateState(true);
    //         var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.SHOW_CHEST_EVENT);
    //         evt.data = bossInfo;
    //         ModuleEventManager.dispatchEvent(evt);
    //     }
    // }
    SceneCollection.prototype.getBossInfo = function (isAddTime) {
        var bossInfo = GuidData.globelValue.getCurrentBossInfo();
        var $time = GameInstance.getGameSecond(bossInfo.time) * 1000;
        console.log("boss时间-------------------" + $time);
        bossInfo.outTime = $time;
        // if ($time > 0) {
        //     if (GuidData.player.getGuid() == bossInfo.owner) {
        //         this.showOprateState();
        //     } else {
        //         if(isAddTime){
        //             TimeUtil.addTimeOut($time, () => { this.changeState() })
        //         }
        //     }
        // } else {
        //     this.showOprateState();
        // }
        return bossInfo;
    };
    SceneCollection.prototype.setOprateState = function (tf) {
        var pickName = this.unit.getPickName();
        var myName = GameInstance.mainChar.unit.getName();
        var resultState = false;
        if (tf) { //在范围内
            if (pickName != "") {
                if (myName != pickName) {
                    //攻击
                    resultState = false;
                }
                else {
                    //采集
                    resultState = true;
                }
            }
            else {
                //采集
                resultState = true;
            }
        }
        else { //不在范围内
            //攻击
            resultState = false;
        }
        if (resultState != this._currentOprateState) {
            if (resultState) {
                this.showOprateState();
            }
            else {
                this.hideOprateState();
            }
            this._currentOprateState = resultState;
        }
    };
    SceneCollection.prototype.changeState = function () {
        var pickName = this.unit.getPickName();
        var myName = GameInstance.mainChar.unit.getName();
        // if (pickName != "") {
        //     if (myName != pickName) {
        //         this.hideOprateState();
        //     }
        // } else {
        //     this.getBossInfo(false);
        //     //this.showOprateState();
        // }
        console.log("当前正在采集:" + pickName + "当前名字：" + myName);
        var time = this.unit.getPickTime();
        console.log("采集时间:" + time);
        time = 5000;
    };
    SceneCollection.prototype.showOprateState = function () {
    };
    SceneCollection.prototype.hideOprateState = function () {
    };
    SceneCollection.prototype.destory = function () {
        _super.prototype.destory.call(this);
        if (this._specialType == 1) {
            this.hideOprateState();
        }
    };
    return SceneCollection;
}(SceneChar));
