
import Vector3D = Pan3d.Vector3D;
import ConstrainSceneView = Pan3d.ConstrainSceneView;
import SceneChar = Pan3d.SceneChar;
import Skill = Pan3d.Skill;
class MenuEventModel {

    private static _instance: MenuEventModel;
    public static getInstance(): MenuEventModel {
        if (!this._instance) {
            this._instance = new MenuEventModel();

        }
        return this._instance;
    }
    private mainChar:SceneChar;
    public selectButByValue(value: String,sceneView: ConstrainSceneView): void {
        switch (value) {
            case "场景":
                sceneView.loadSceneByUrl();
                break
            case "角色":
                sceneView.addRoleToSceneByUrl("50011",new Vector3D(0,0,0));
                break
            case "特效":
                sceneView.playParticle("levelup");
                break
            case "技能":
                if(this.mainChar==null){
                    this.mainChar=  sceneView.addRoleToSceneByUrl("50011",new Vector3D(0,0,0));

                } 
                var skill: Skill =  sceneView.scene3D.skillManager.getSkill("skill/jichu_1_byte.txt","m_skill_01",null);
                if(this.mainChar!=null){
                    skill.reset();
                    skill.configFixEffect(this.mainChar,null,null);
                    this.mainChar.playSkill(skill);
                }
    

                break
            default:
                break
        }
    }

}