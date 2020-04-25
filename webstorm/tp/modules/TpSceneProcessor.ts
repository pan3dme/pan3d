
class TpSceneModule extends Pan3d.Module {
    public getModuleName(): string {
        return "TpSceneModule";
    }
    protected listProcessors(): Array<Pan3d.Processor> {
        return [new TpSceneProcessor()];
    }
}
class TpSceneEvent extends Pan3d.BaseEvent {
    //展示面板
    public static SHOW_TP_SCENE_EVENT: string = "SHOW_TP_SCENE_EVENT";
    public static ENTER_SCENE_EVENT: string = "ENTER_SCENE_EVENT";
    
    public mapId: number

}
class TpSceneProcessor extends Pan3d.BaseProcessor {

    public constructor() {
        super();
    }
    public getName(): string {
        return "TpSceneProcessor";
    }
    protected receivedModuleEvent($event: Pan3d.BaseEvent): void {
        if ($event instanceof TpSceneEvent) {
            var $tpMenuEvent: TpSceneEvent = <TpSceneEvent>$event;
            if ($tpMenuEvent.type == TpSceneEvent.SHOW_TP_SCENE_EVENT) {
                this.addGridLineSprite();

                if (!getUrlParam("id")) {
                    window.location.href = "index.html?id=" + random(10);
                } else {
                    this.makeUrlParam()
                 //   this.makeMainChar();
                    this.makeTestScene();
                    Pan3d.Scene_data.cam3D.distance = 250;
                }

            }
        }
    }
    private  makeTestScene():void
    {
        var $sc: SkillSceneChar = new SkillSceneChar();
        $sc.setRoleUrl(getRoleUrl("erchiyuan001"));
        Pan3d. SceneManager.getInstance().addMovieDisplay($sc);

    }

    private paramId: number;
    private makeUrlParam(): void
    {
        this.paramId = Number(getUrlParam("id"));
        if (isNaN(this.paramId)) {
            this.paramId=0
        }
        this.paramId = Math.floor(this.paramId);
        this.paramId = this.paramId % 6+1;
        if (this.paramId<=0 || this.paramId>6) {
            this.paramId = 1;
        }
        if (this.paramId == 3 || this.paramId == 4) {
            this.makeAttackChar();
        }
        this.skillFileName = "jichu_" + (Math.ceil(this.paramId / 2));
        this.charIdstr = "5000" + this.paramId;
        this.weaponNum = 50010 + this.paramId;
    }
    private attackTarget: Pan3d. SceneChar
    private makeAttackChar(): void {
        var $sc: Pan3d. SceneChar = new Pan3d.SceneChar();
        $sc.z = 100
        $sc.setRoleUrl(getRoleUrl("7001"));
        Pan3d.SceneManager.getInstance().addMovieDisplay($sc);
        this.attackTarget = $sc;
        this.attackTarget.x = random(50) + 30;
        this.attackTarget.z = random(50) + 30;
    }
    private skillFileName: string = "jichu_1";
    private charIdstr: string = "50001";
    private weaponNum: number = 50011;
    private makeMainChar(): void
    {

        Pan3d.SkillManager.getInstance().preLoadSkill(getSkillUrl(this.skillFileName));  
        var $sc: SkillSceneChar = new SkillSceneChar();
        $sc.setRoleUrl(getRoleUrl(this.charIdstr));
        Pan3d. SceneManager.getInstance().addMovieDisplay($sc);
 
        this.mainChar = $sc;

     
        $sc.changeActionFun = () => { this.playSkill() }
        $sc.loadFinishFun = () => {
            Pan3d.ResManager.getInstance().loadSkillRes(Pan3d.Scene_data.fileRoot + getSkillUrl(this.skillFileName), ($skillRes: Pan3d.SkillRes) => {
                Pan3d.SkillManager.getInstance().preLoadSkill(getSkillUrl(this.skillFileName));
                Pan3d.TimeUtil.addTimeOut(1000, () => { this.playSkill() });
                console.log(Pan3d.TimeUtil.getTimer())
            })
        };
    
    }


    private textPlaySkillFun: Function
    private mainChar: SkillSceneChar;
    private skipId: number = 1;
    private skillEffectItem: Array<string> = ["skill_01", "skill_02", "skill_03", "m_skill_01", "m_skill_02", "m_skill_03"]
    private playSkill(): void
    {
        var $effectName: string = this.skillEffectItem[this.skipId % this.skillEffectItem.length];
        var $skill: Pan3d.Skill = Pan3d. SkillManager.getInstance().getSkill(getSkillUrl(this.skillFileName), $effectName);
        if ($skill.keyAry) {
            if (this.textPlaySkillFun) {
                Pan3d. TimeUtil.removeTimeTick(this.textPlaySkillFun);
                this.textPlaySkillFun = null
            }
        } else {
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
            } else {
               
                if ($effectName == "m_skill_01") {
                    $skill.configFixEffect(this.mainChar);
                } else {
                    this.attackTarget.x = random(50) + 30;
                    this.attackTarget.z = random(50) + 30;
                    var $tempPos: Pan3d.Vector3D = new Pan3d.Vector3D(this.attackTarget.x, this.attackTarget.y, this.attackTarget.z)
                    var $hitPosItem: Array<Pan3d.Vector3D> = new Array()
                    $hitPosItem.push($tempPos)
                    $skill.configFixEffect(this.mainChar, null, $hitPosItem);
    
                }
            }
            this.mainChar.watch(this.attackTarget, true);
        } else {
            $skill.configFixEffect(this.mainChar);
        }

        this.mainChar.playSkill($skill);
        this.skipId++;
    }
    private addGridLineSprite(): void
    {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite: Pan3d. GridLineSprite = new Pan3d.GridLineSprite();
        Pan3d.SceneManager.getInstance().addDisplay($GridLineSprite);
        Pan3d.SceneManager.getInstance().ready = true;
    }
    protected listenModuleEvents(): Array<Pan3d.BaseEvent> {
        return [
            new TpSceneEvent(TpSceneEvent.SHOW_TP_SCENE_EVENT),
        ];
    }




}
