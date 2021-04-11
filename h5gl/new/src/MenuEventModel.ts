
import Vector3D = Pan3d.Vector3D;
import ConstrainSceneView = Pan3d.ConstrainSceneView;
import SceneChar = Pan3d.SceneChar;
import GridLineSprite = Pan3d.GridLineSprite;
import Skill = Pan3d.Skill;

class SceneInfoVo {

    public   text:String;
    public   title:String;
    public   picitem:Array<String>;
    public   sceneinfo:JSON;
    public   type:number;

 

}

class MenuEventModel {

    private static _instance: MenuEventModel;
    public static getInstance(): MenuEventModel {
        if (!this._instance) {
            this._instance = new MenuEventModel();

        }
        return this._instance;
    }
    public selectSceneByJson(value: JSON, sceneView: ConstrainSceneView): void {
        console.log(value);
        var vo:SceneInfoVo=new SceneInfoVo();
        vo.text=  value["text"];
        vo.title=  value["tittle"];
        vo.type=  value["type"];
        vo.picitem=  value["picitem"];
        vo.sceneinfo=  value["sceneinfo"];

 

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
                    sceneView.playParticle(infoStr);
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