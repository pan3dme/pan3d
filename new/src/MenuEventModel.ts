
import Vector3D = Pan3d.Vector3D;
import ConstrainSceneView = Pan3d.ConstrainSceneView;
import SceneChar = Pan3d.SceneChar;
import GridLineSprite = Pan3d.GridLineSprite;
import Skill = Pan3d.Skill;
import Md5MeshSprite = md5list.Md5MeshSprite;
import Md5MoveSprite = md5list.Md5MoveSprite;



class MenuEventModel {

    private static _instance: MenuEventModel;
    public static getInstance(): MenuEventModel {
        if (!this._instance) {
            this._instance = new MenuEventModel();

        }
        return this._instance;
    }
    public selectSceneByJson(value: JSON, sceneView: ConstrainSceneView): void {
        

        var sceneinfo: JSON = value ;

        for (var key in sceneinfo) {

            var tempInfo: any = sceneinfo[key];
            var type: number = tempInfo["type"];
            var textStr: string = tempInfo["text"];

            if (type == 1) { //场景
                sceneView.loadSceneByUrl(textStr);
            }
            if (type == 2) {//特效
                sceneView.playParticle(textStr);
            }
            if (type == 3) {//角色
                var sc: SceneChar = new SceneChar(sceneView.scene3D);
                sc.setRoleUrl(textStr);
                sceneView.scene3D.addMovieDisplay(sc);
                var info: JSON = tempInfo["info"];

                if (info) {
                    if (info["addPart"]) {
                        var addPart: string = info["addPart"];
                        var bindSocket: string = info["bindSocket"];
                        var model: string = info["model"];
                        sc.addPart(addPart, bindSocket, getModelUrl(model));
                    }
                    if (info["mount"]) {
                        sc.setMountCharByName("5104");
                    }
                    if (info["action"]) {
                        sc.play(info["action"]);
                        console.log(info["action"])
                    }

                }

 

            }
            if (type == 4) {//动画
                sceneView.playFrame3dSprite();
            }

            if (type == 5) {//md5
                           // $sc.setMd5url("pan/expmd5/2/body.md5mesh", "pan/expmd5/2/stand.md5anim", "pan/expmd5/shuangdaonv.jpg");

                // var md5mesh:  Md5MeshSprite = new  Md5MeshSprite(sceneView.scene3D);
                // md5mesh.setMd5BodyUrl("pan/expmd5/2/body.md5mesh");
                // sceneView.scene3D.addDisplay(md5mesh)

                var md5MoveSprite:  Md5MoveSprite = new Md5MoveSprite(sceneView.scene3D);
                md5MoveSprite.setMd5url("pan/expmd5/2/body.md5mesh", "pan/expmd5/2/stand.md5anim", "pan/expmd5/shuangdaonv.jpg")
                sceneView.scene3D.addDisplay(md5MoveSprite)
            }
        }



    }

    private mainChar: SceneChar;
    public selectButByValue(value: String, sceneView: ConstrainSceneView): void {

        var arr: Array<string> = value.split("|");
        var keyStr: string = arr[0];
        var infoStr: string = arr.length > 1 ? arr[1] : null;
        switch (keyStr) {
            case "清理":
                if (infoStr == "网格") {
                    sceneView.scene3D.addDisplay(new GridLineSprite(sceneView.scene3D));
                }
                if (infoStr == "所以") {
                    sceneView.clearAll();
                }
                break
            case "场景":
                if (infoStr == null) {

                } else {

                    sceneView.loadSceneByUrl(infoStr);
                }
                break
            case "frame3d":
                sceneView.playFrame3dSprite();
                break
            case "角色":
                if (infoStr == null) {

                } else {
                    sceneView.addRoleToSceneByUrl(infoStr, new Vector3D(0, 0, 0));
                }

                break
            case "特效":
                if (infoStr == null) {

                } else {
                    sceneView.playParticle("model/" + infoStr + "_lyf.txt");
                }

                break
            case "坐骑":
                if (infoStr == null) {
                    if (this.mainChar == null) {
                        console.log("加载角色");
                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
                    }
                } else {
                    if (this.mainChar != null) {

                        this.mainChar.setMountCharByName("5104");
                        this.mainChar.play("stand_mount");

                        // public static STAND_MOUNT: string = "stand_mount_01";
                        // public static WALK_MOUNT: string = "walk_mount_01";
                        // SceneChar.MOUNT_SLOT

                    }
                }

                break
            case "武器":
                if (infoStr == null) {
                    if (this.mainChar == null) {
                        console.log("加载角色");
                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
                    }
                } else {
                    if (this.mainChar != null) {
                        this.mainChar.addPart(SceneChar.WEAPON_PART, "w_01", getModelUrl("weapon1"));

                    }
                }

                break
            case "技能":

                if (infoStr == null) {
                    if (this.mainChar == null) {
                        console.log("加载角色");
                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
                    }
                } else {

                    var filename: string = arr[1];
                    var skillname: string = arr[2];

                    // var skill: Skill = sceneView.scene3D.skillManager.getSkill("skill/jichu_1_byte.txt", "m_skill_01", null);
                    var skill: Skill = sceneView.scene3D.skillManager.getSkill("skill/" + filename + "_byte.txt", skillname, null);
                    if (this.mainChar != null) {
                        skill.reset();
                        skill.configFixEffect(this.mainChar, null, null);
                        this.mainChar.playSkill(skill);
                    }
                }

                break
            default:
                break
        }
    }

}