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
    var SceneChar = /** @class */ (function (_super) {
        __extends(SceneChar, _super);
        function SceneChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneChar.prototype.playSkill = function ($skill) {
            this.scene3D.skillManager.playSkill($skill);
            this.skillVo = $skill;
        };
        SceneChar.prototype.addPart = function ($key, $bindSocket, $url) {
            var _this = this;
            if (this._partUrl[$key] == $url) { //如果相同则返回
                return;
            }
            else if (this._partUrl[$key]) { //如果不同则先移除
                this.removePart($key);
            }
            if (!this._partDic[$key]) {
                this._partDic[$key] = new Array;
            }
            this._partUrl[$key] = $url;
            var ary = this._partDic[$key];
            this.scene3D.groupDataManager.getGroupData(this.scene3D.fileRoot + $url, function (groupRes) {
                _this.loadPartRes($bindSocket, groupRes, ary);
            });
        };
        SceneChar.prototype.play = function ($action, $completeState, needFollow) {
            if ($completeState === void 0) { $completeState = 0; }
            if (needFollow === void 0) { needFollow = true; }
            var tf = _super.prototype.play.call(this, $action, $completeState, needFollow);
            if (this.mountChar != null) {
                this.changeMountAction();
            }
            return tf;
        };
        SceneChar.prototype.changeMountAction = function () {
            var action = this.curentAction;
            if (this.mountChar != null) {
                if (action == SceneChar.CharAction_stand || action == SceneChar.CharAction_stand_mount) {
                    this.curentAction = SceneChar.CharAction_stand_mount;
                    this.mountChar.curentAction = SceneChar.CharAction_stand;
                }
                else if (action == SceneChar.CharAction_walk || action == SceneChar.CharAction_walk_mount) {
                    this.curentAction = SceneChar.CharAction_walk_mount;
                    this.mountChar.curentAction = SceneChar.CharAction_walk;
                }
                else {
                    this.mountChar.curentAction = SceneChar.CharAction_stand;
                }
            }
        };
        SceneChar.prototype.setMountCharByName = function (val) {
            var sc = new Pan3d.Display3dMovie(this.scene3D);
            sc.setRoleUrl("role/" + val + ".txt");
            sc.x = this.x;
            sc.y = this.y;
            sc.z = this.z;
            this.mountChar = sc;
            this.scene3D.addMovieDisplay(sc);
            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
        };
        SceneChar.prototype.loadPartRes = function ($bindSocket, groupRes, ary) {
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                var posV3d;
                var rotationV3d;
                var scaleV3d;
                if (item.isGroup) {
                }
                if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                }
                else if (item.types == Pan3d.BaseRes.PREFAB_TYPE) {
                    var display = new Pan3d.Display3DSprite(this.scene3D);
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    this.scene3D.addDisplay(display);
                    if (item.isGroup) {
                        // display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
            }
            this.applyVisible();
        };
        SceneChar.prototype.applyVisible = function () {
            // throw new Error("Method not implemented.");
        };
        SceneChar.prototype.removePart = function ($key) {
            throw new Error("Method not implemented.");
        };
        SceneChar.WEAPON_PART = "weapon";
        SceneChar.WEAPON_DEFAULT_SLOT = "w_01";
        SceneChar.MOUNT_SLOT = "mount_01";
        SceneChar.WING_SLOT = "wing_01";
        SceneChar.SEL_PART = "select";
        SceneChar.QUEST_ICON = "questicon";
        SceneChar.NONE_SLOT = "none";
        SceneChar.CharAction_stand = "stand";
        SceneChar.CharAction_walk = "walk";
        SceneChar.CharAction_jump = "jump";
        SceneChar.CharAction_death = "death";
        SceneChar.CharAction_injured = "injured";
        SceneChar.CharAction_stand_mount = "stand_mount";
        SceneChar.CharAction_walk_mount = "walk_mount";
        return SceneChar;
    }(Pan3d.Display3dMovie));
    Pan3d.SceneChar = SceneChar;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SceneChar.js.map