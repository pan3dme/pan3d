var Vector3D = Pan3d.Vector3D;
var Display3D = Pan3d.Display3D;
var ConstrainSceneView = Pan3d.ConstrainSceneView;
var SceneChar = Pan3d.SceneChar;
var GridLineSprite = Pan3d.GridLineSprite;
var Skill = Pan3d.Skill;
var Md5MeshSprite = md5list.Md5MeshSprite;
var Md5MoveSprite = md5list.Md5MoveSprite;
var MenuEventModel = /** @class */ (function () {
    function MenuEventModel() {
    }
    MenuEventModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new MenuEventModel();
        }
        return this._instance;
    };
    MenuEventModel.prototype.selectSceneByJson = function (value, sceneView) {
        var sceneinfo = value;
        for (var key in sceneinfo) {
            var tempInfo = sceneinfo[key];
            var type = tempInfo["type"];
            var textStr = tempInfo["text"];
            //添加测试函数
            if (type == 1) { //场景
                sceneView.loadSceneByUrl(textStr);
            }
            if (type == 2) { //特效
                sceneView.playParticle(textStr);
            }
            if (type == 3) { //角色
                var sc = new SceneChar(sceneView.scene3D);
                this.setParamInfo(sc, tempInfo);
                sc.setRoleUrl(textStr);
                sceneView.scene3D.addMovieDisplay(sc);
                var info = tempInfo["info"];
                if (info) {
                    if (info["addPart"]) {
                        var addPart = info["addPart"];
                        var bindSocket = info["bindSocket"];
                        var model = info["model"];
                        sc.addPart(addPart, bindSocket, getModelUrl(model));
                    }
                    if (info["mount"]) {
                        sc.setMountCharByName("5104");
                    }
                    if (info["action"]) {
                        sc.play(info["action"]);
                        console.log(info["action"]);
                    }
                }
            }
            if (type == 4) { //动画
                sceneView.playFrame3dSprite();
            }
            if (type == 5) {
                var md5MoveSprite = new Md5MoveSprite(sceneView.scene3D);
                md5MoveSprite.setMd5url("pan/expmd5/2/body.md5mesh", "pan/expmd5/2/stand.md5anim", "pan/expmd5/shuangdaonv.jpg");
                sceneView.scene3D.addDisplay(md5MoveSprite);
            }
        }
    };
    MenuEventModel.prototype.setParamInfo = function (dis, val) {
        if (val.hasOwnProperty("param")) {
            var param = val["param"];
            if (param.hasOwnProperty("x")) {
                dis.x = param["x"];
            }
            if (param.hasOwnProperty("y")) {
                dis.y = param["y"];
            }
            if (param.hasOwnProperty("z")) {
                dis.z = param["z"];
            }
            if (param.hasOwnProperty("rotationY")) {
                dis.rotationY = param["rotationY"];
            }
        }
    };
    MenuEventModel.prototype.selectButByValue = function (value, sceneView) {
        var arr = value.split("|");
        var keyStr = arr[0];
        var infoStr = arr.length > 1 ? arr[1] : null;
        switch (keyStr) {
            case "清理":
                if (infoStr == "网格") {
                    sceneView.scene3D.addDisplay(new GridLineSprite(sceneView.scene3D));
                }
                if (infoStr == "所以") {
                    sceneView.clearAll();
                }
                break;
            case "场景":
                if (infoStr == null) {
                }
                else {
                    sceneView.loadSceneByUrl(infoStr);
                }
                break;
            case "frame3d":
                sceneView.playFrame3dSprite();
                break;
            case "角色":
                if (infoStr == null) {
                }
                else {
                    sceneView.addRoleToSceneByUrl(infoStr, new Vector3D(0, 0, 0));
                }
                break;
            case "特效":
                if (infoStr == null) {
                }
                else {
                    sceneView.playParticle("model/" + infoStr + "_lyf.txt");
                }
                break;
            case "坐骑":
                if (infoStr == null) {
                    if (this.mainChar == null) {
                        console.log("加载角色");
                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
                    }
                }
                else {
                    if (this.mainChar != null) {
                        this.mainChar.setMountCharByName("5104");
                        this.mainChar.play("stand_mount");
                        // public static STAND_MOUNT: string = "stand_mount_01";
                        // public static WALK_MOUNT: string = "walk_mount_01";
                        // SceneChar.MOUNT_SLOT
                    }
                }
                break;
            case "武器":
                if (infoStr == null) {
                    if (this.mainChar == null) {
                        console.log("加载角色");
                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
                    }
                }
                else {
                    if (this.mainChar != null) {
                        this.mainChar.addPart(SceneChar.WEAPON_PART, "w_01", getModelUrl("weapon1"));
                    }
                }
                break;
            case "技能":
                if (infoStr == null) {
                    if (this.mainChar == null) {
                        console.log("加载角色");
                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
                    }
                }
                else {
                    var filename = arr[1];
                    var skillname = arr[2];
                    // var skill: Skill = sceneView.scene3D.skillManager.getSkill("skill/jichu_1_byte.txt", "m_skill_01", null);
                    var skill = sceneView.scene3D.skillManager.getSkill("skill/" + filename + "_byte.txt", skillname, null);
                    if (this.mainChar != null) {
                        skill.reset();
                        skill.configFixEffect(this.mainChar, null, null);
                        this.mainChar.playSkill(skill);
                    }
                }
                break;
            default:
                break;
        }
    };
    return MenuEventModel;
}());
//# sourceMappingURL=MenuEventModel.js.map