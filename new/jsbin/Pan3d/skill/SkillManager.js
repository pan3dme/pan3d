var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var SkillManager = /** @class */ (function (_super) {
        __extends(SkillManager, _super);
        function SkillManager(value) {
            var _this = 
            //this.dic = new Object();
            _super.call(this, value) || this;
            _this._time = 0;
            _this._skillDic = new Object;
            _this._loadDic = new Object;
            _this._skillAry = new Array;
            _this._preLoadDic = new Object;
            return _this;
        }
        SkillManager.prototype.update = function () {
            var _tempTime = Pan3d.TimeUtil.getTimer();
            var t = _tempTime - this._time;
            for (var i = 0; i < this._skillAry.length; i++) {
                this._skillAry[i].update(t);
            }
            this._time = _tempTime;
        };
        SkillManager.prototype.preLoadSkill = function ($url) {
            var _this = this;
            if (this.dic[$url] || this._preLoadDic[$url]) {
                return;
            }
            this.scene3D.resManager.loadSkillRes(this.scene3D.fileRoot + $url, function ($skillRes) {
                var skillData = new Pan3d.SkillData(_this.scene3D);
                skillData.data = $skillRes.data;
                skillData.useNum++;
                _this.dic[$url] = skillData;
                _this.addSrc($url, skillData);
            });
            this._preLoadDic[$url] = true;
        };
        //public fengbaonum:number = 0;
        SkillManager.prototype.getSkill = function ($url, $name, $callback) {
            var _this = this;
            if ($callback === void 0) { $callback = null; }
            var skill;
            var key = $url + $name;
            // if(key == "skill/jichu_1_byte.txtm_skill_04"){
            //     console.log("添加技能风暴");
            //     this.fengbaonum++;
            // }
            var ary = this._skillDic[key];
            if (ary) {
                for (var i = 0; i < ary.length; i++) {
                    skill = ary[i];
                    if (skill.isDeath && skill.useNum == 0) {
                        skill.reset();
                        skill.isDeath = false;
                        return skill;
                    }
                }
            }
            skill = new Pan3d.Skill(this.scene3D);
            skill.name = $name;
            skill.isDeath = false;
            if (!this._skillDic[key]) {
                this._skillDic[key] = new Array;
            }
            this._skillDic[key].push(skill);
            if (this.dic[$url]) {
                skill.setData(this.dic[$url].data[skill.name], this.dic[$url]);
                skill.key = key;
                this.dic[$url].useNum++;
                return skill;
            }
            if (this._loadDic[$url]) {
                var obj = new Object;
                obj.name = $name;
                obj.skill = skill;
                obj.callback = $callback;
                this._loadDic[$url].push(obj);
                return skill;
            }
            this._loadDic[$url] = new Array;
            var obj = new Object;
            obj.name = $name;
            obj.skill = skill;
            obj.callback = $callback;
            this._loadDic[$url].push(obj);
            this.scene3D.resManager.loadSkillRes(this.scene3D.fileRoot + $url, function ($skillRes) {
                _this.loadSkillCom($url, $skillRes);
            });
            return skill;
        };
        SkillManager.prototype.loadSkillCom = function ($url, $skillRes) {
            var skillData = new Pan3d.SkillData(this.scene3D);
            skillData.data = $skillRes.data;
            for (var i = 0; i < this._loadDic[$url].length; i++) {
                var obj = this._loadDic[$url][i];
                if (!obj.skill.hasDestory) {
                    obj.skill.setData(skillData.data[obj.name], skillData);
                    obj.skill.key = $url + obj.name;
                    skillData.useNum++;
                }
            }
            this.dic[$url] = skillData;
            this.addSrc($url, skillData);
            for (var i = 0; i < this._loadDic[$url].length; i++) {
                var obj = this._loadDic[$url][i];
                if (obj.callback) {
                    obj.callback();
                }
            }
            this._loadDic[$url].length = 0;
            this._loadDic[$url] = null;
        };
        SkillManager.prototype.addSrc = function ($url, skillData) {
            for (var key in skillData.data) {
                var skill = new Pan3d.Skill(this.scene3D);
                skill.name = key;
                skill.isDeath = true;
                skill.src = true;
                skill.setData(skillData.data[key], skillData);
                skillData.addSrcSkill(skill);
                //skillData.useNum++;
                var dkey = $url + key;
                if (!this._skillDic[dkey]) {
                    this._skillDic[dkey] = new Array;
                }
                this._skillDic[dkey].push(skill);
            }
        };
        SkillManager.prototype.playSkill = function ($skill) {
            this._skillAry.push($skill);
            $skill.play();
        };
        SkillManager.prototype.removeSkill = function ($skill) {
            var index = this._skillAry.indexOf($skill);
            if (index != -1) {
                this._skillAry.splice(index, 1);
            }
        };
        SkillManager.prototype.gcSkill = function (skill) {
            for (var key in this._skillDic) {
                var ary = this._skillDic[key];
                var idx = ary.indexOf(skill);
                if (idx != -1) {
                    ary.splice(idx, 1);
                }
            }
        };
        SkillManager.prototype.gc = function () {
            //super.gc();
            for (var key in this.dic) {
                var rc = this.dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;
                    if (rc.idleTime >= Pan3d.ResCount.GCTime && rc.testDestory()) {
                        //console.log("清理 -" + key);
                        rc.destory();
                        delete this.dic[key];
                    }
                }
            }
            for (var key in this._skillDic) {
                var ary = this._skillDic[key];
                for (var i = ary.length - 1; i >= 0; i--) {
                    if (ary[i].isDeath && ary[i].useNum <= 0) {
                        ary[i].idleTime++;
                        if (ary[i].idleTime >= Pan3d.ResCount.GCTime) {
                            if (!ary[i].src) {
                                ary[i].destory();
                                ary.splice(i, 1);
                            }
                        }
                    }
                }
                if (ary.length == 0) {
                    //console.log("清理 -" + key);
                    delete this._skillDic[key];
                }
            }
        };
        return SkillManager;
    }(Pan3d.ResGC));
    Pan3d.SkillManager = SkillManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillManager.js.map