
import Vector3D = Pan3d.Vector3D;
import ConstrainSceneView = Pan3d.ConstrainSceneView;
import SceneChar = Pan3d.SceneChar;
import GridLineSprite = Pan3d.GridLineSprite;
import Skill = Pan3d.Skill;

class MenuEventModel {

    private static _instance: MenuEventModel;
    public static getInstance(): MenuEventModel {
        if (!this._instance) {
            this._instance = new MenuEventModel();

        }
        return this._instance;
    }

    private mainChar: SceneChar;
    public selectButByValue(value: String, sceneView: ConstrainSceneView): void {

        var arr: Array<string> = value.split("|");
        var keyStr: string = arr[0];
        var infoStr: string = arr.length > 1 ? arr[1] : null;
        switch (keyStr) {
            case "清理":
                if(infoStr=="网格"){
                    sceneView.scene3D.addDisplay(new GridLineSprite( sceneView.scene3D));
                } 
                if(infoStr=="所以"){
                    sceneView.clearAll();
                } 
                break
            case "场景":
                if (infoStr == null) {

                } else {
                    //10002
                    sceneView.loadSceneByUrl(infoStr);
                }

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
            case "技能":

                if (infoStr == null) {
                    if (this.mainChar == null) {
                        console.log("加载角色");
                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
                    }
                } else {
                    var skill: Skill = sceneView.scene3D.skillManager.getSkill("skill/jichu_1_byte.txt", "m_skill_01", null);
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