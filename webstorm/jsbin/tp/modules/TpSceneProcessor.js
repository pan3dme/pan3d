var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TpSceneModule = /** @class */ (function (_super) {
    __extends(TpSceneModule, _super);
    function TpSceneModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TpSceneModule.prototype.getModuleName = function () {
        return "TpSceneModule";
    };
    TpSceneModule.prototype.listProcessors = function () {
        return [new TpSceneProcessor()];
    };
    return TpSceneModule;
}(Pan3d.Module));
var TpSceneEvent = /** @class */ (function (_super) {
    __extends(TpSceneEvent, _super);
    function TpSceneEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //展示面板
    TpSceneEvent.SHOW_TP_SCENE_EVENT = "SHOW_TP_SCENE_EVENT";
    TpSceneEvent.ENTER_SCENE_EVENT = "ENTER_SCENE_EVENT";
    return TpSceneEvent;
}(Pan3d.BaseEvent));
var TpSceneProcessor = /** @class */ (function (_super) {
    __extends(TpSceneProcessor, _super);
    function TpSceneProcessor() {
        var _this = _super.call(this) || this;
        _this.skillFileName = "jichu_1";
        _this.charIdstr = "50001";
        _this.weaponNum = 50011;
        _this.skipId = 1;
        _this.skillEffectItem = ["skill_01", "skill_02", "skill_03", "m_skill_01", "m_skill_02", "m_skill_03"];
        return _this;
    }
    TpSceneProcessor.prototype.getName = function () {
        return "TpSceneProcessor";
    };
    TpSceneProcessor.prototype.receivedModuleEvent = function ($event) {
        if ($event instanceof TpSceneEvent) {
            var $tpMenuEvent = $event;
            if ($tpMenuEvent.type == TpSceneEvent.SHOW_TP_SCENE_EVENT) {
                this.addGridLineSprite();
                if (!getUrlParam("id")) {
                    window.location.href = "index.html?id=" + random(10);
                }
                else {
                    this.makeUrlParam();
                    this.makeMainChar();
                    Pan3d.Scene_data.cam3D.distance = 250;
                }
            }
        }
    };
    TpSceneProcessor.prototype.makeUrlParam = function () {
        this.paramId = Number(getUrlParam("id"));
        if (isNaN(this.paramId)) {
            this.paramId = 0;
        }
        this.paramId = Math.floor(this.paramId);
        this.paramId = this.paramId % 6 + 1;
        if (this.paramId <= 0 || this.paramId > 6) {
            this.paramId = 1;
        }
        if (this.paramId == 3 || this.paramId == 4) {
            this.makeAttackChar();
        }
        this.skillFileName = "jichu_" + (Math.ceil(this.paramId / 2));
        this.charIdstr = "5000" + this.paramId;
        this.weaponNum = 50010 + this.paramId;
    };
    TpSceneProcessor.prototype.makeAttackChar = function () {
        var $sc = new Pan3d.SceneChar();
        $sc.z = 100;
        $sc.setRoleUrl(getRoleUrl("7001"));
        Pan3d.SceneManager.getInstance().addMovieDisplay($sc);
        this.attackTarget = $sc;
        this.attackTarget.x = random(50) + 30;
        this.attackTarget.z = random(50) + 30;
    };
    TpSceneProcessor.prototype.makeMainChar = function () {
        var _this = this;
        Pan3d.SkillManager.getInstance().preLoadSkill(getSkillUrl(this.skillFileName));
        var $sc = new SkillSceneChar();
        $sc.setRoleUrl(getRoleUrl(this.charIdstr));
        Pan3d.SceneManager.getInstance().addMovieDisplay($sc);
        this.mainChar = $sc;
        $sc.changeActionFun = function () { _this.playSkill(); };
        $sc.loadFinishFun = function () {
            Pan3d.ResManager.getInstance().loadSkillRes(Pan3d.Scene_data.fileRoot + getSkillUrl(_this.skillFileName), function ($skillRes) {
                Pan3d.SkillManager.getInstance().preLoadSkill(getSkillUrl(_this.skillFileName));
                Pan3d.TimeUtil.addTimeOut(1000, function () { _this.playSkill(); });
                console.log(Pan3d.TimeUtil.getTimer());
            });
        };
    };
    TpSceneProcessor.prototype.playSkill = function () {
        var $effectName = this.skillEffectItem[this.skipId % this.skillEffectItem.length];
        var $skill = Pan3d.SkillManager.getInstance().getSkill(getSkillUrl(this.skillFileName), $effectName);
        if ($skill.keyAry) {
            if (this.textPlaySkillFun) {
                Pan3d.TimeUtil.removeTimeTick(this.textPlaySkillFun);
                this.textPlaySkillFun = null;
            }
        }
        else {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        if (this.paramId == 3 || this.paramId == 4) {
            if ($effectName == "skill_01" || $effectName == "skill_02" || $effectName == "skill_03") {
                // $skill.configTrajectory(this.mainChar, this.attackTarget);
                $skill.configFixEffect(this.mainChar);
            }
            else {
                if ($effectName == "m_skill_01") {
                    $skill.configFixEffect(this.mainChar);
                }
                else {
                    this.attackTarget.x = random(50) + 30;
                    this.attackTarget.z = random(50) + 30;
                    var $tempPos = new Pan3d.Vector3D(this.attackTarget.x, this.attackTarget.y, this.attackTarget.z);
                    var $hitPosItem = new Array();
                    $hitPosItem.push($tempPos);
                    $skill.configFixEffect(this.mainChar, null, $hitPosItem);
                }
            }
            this.mainChar.watch(this.attackTarget, true);
        }
        else {
            $skill.configFixEffect(this.mainChar);
        }
        this.mainChar.playSkill($skill);
        this.skipId++;
    };
    TpSceneProcessor.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        Pan3d.SceneManager.getInstance().addDisplay($GridLineSprite);
        Pan3d.SceneManager.getInstance().ready = true;
    };
    TpSceneProcessor.prototype.listenModuleEvents = function () {
        return [
            new TpSceneEvent(TpSceneEvent.SHOW_TP_SCENE_EVENT),
        ];
    };
    return TpSceneProcessor;
}(Pan3d.BaseProcessor));
//# sourceMappingURL=TpSceneProcessor.js.map