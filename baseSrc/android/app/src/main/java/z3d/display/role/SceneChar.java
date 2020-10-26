package z3d.display.role;

import z3d.scene.Scene3D;
import z3d.skill.Skill;
import z3d.skill.SkillManager;

public class SceneChar extends Display3dMovie {

    public static String WEAPON_PART="weapon";
    public static String WEAPON_DEFAULT_SLOT="w_01";
    public static String MOUNT_SLOT="mount_01";
    public static String WING_SLOT="wing_01";
    public static String SEL_PART="select";
    public static String NONE_SLOT="none";

    public static String CharAction_stand         ="stand";
    public static String CharAction_walk          ="walk";
    public static String CharAction_jump          ="jump";
    public static String CharAction_death         ="death";
    public static String CharAction_injured       ="injured";
    public static String CharAction_stand_mount      ="stand_mount";
    public static String CharAction_walk_mount      ="walk_mount";


    public static String CharAction_stand_mount_01         ="stand_mount_01";
    public static String CharAction_walk_mount_01          ="walk_mount_01";

    public MountChar mountChar;
    public SceneChar(Scene3D val) {
        super(val);
    }
    public void setMountById(String mountName) {

        if(this.mountChar==null){
            this.mountChar=new MountChar(this.scene3d);
            this.scene3d.addMovieDisplay(this.mountChar);
            this.setBind(this.mountChar,SceneChar.MOUNT_SLOT);
        }
        this.mountChar.setRoleUrl("role/"+mountName+".txt");
        this.changeMountAction();
        this.refrishmountPos();
    }

    @Override
    public void upData() {
        refrishmountPos();
        super.upData();
    }
    public boolean play(String action,int complete,boolean needFollow){
        boolean  temp=super.play(action,complete,needFollow);
        if(this.mountChar!=null){
            changeMountAction();
        }
        return temp;
    }
    private void refrishmountPos() {
        if(this.mountChar!=null){
            this.mountChar.x=this.x;
            this.mountChar.y=this.y;
            this.mountChar.z=this.y;
            this.mountChar.rotationY=this.rotationY;
        }
    }
    private void changeMountAction() {
        String action=this.curentAction;
        if(this.mountChar!=null){
            if( action.equals(CharAction_stand)||action.equals(CharAction_stand_mount_01)){
                this.curentAction=CharAction_stand_mount;
                this.mountChar.curentAction=CharAction_stand;
            }
        else if(action.equals(CharAction_walk)||action.equals(CharAction_walk_mount_01)){
                this.curentAction=CharAction_walk_mount;
                this.mountChar.curentAction=CharAction_walk;
            }else{
                this.mountChar.curentAction=CharAction_stand;
            }


        }
    }

    public void playSkill(Skill skill) {
        SkillManager.getInstance().playSkill(skill);
    }
}
