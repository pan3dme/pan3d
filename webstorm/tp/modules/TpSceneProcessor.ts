import instantiate = WebAssembly.instantiate;

class TpSceneModule extends Module {
    public getModuleName(): string {
        return "TpSceneModule";
    }
    protected listProcessors(): Array<Processor> {
        return [new TpSceneProcessor()];
    }
}
class TpSceneEvent extends BaseEvent {
    //展示面板
    public static SHOW_TP_SCENE_EVENT: string = "SHOW_TP_SCENE_EVENT";
    public static ENTER_SCENE_EVENT: string = "ENTER_SCENE_EVENT";
    
    public  mapId: number




}
class TpSceneProcessor extends BaseProcessor {

    public constructor() {
        super();
    }
    public getName(): string {
        return "TpSceneProcessor";
    }
    private onMouseDown($evt: InteractiveEvent): void {

        //  this.playLyf("model/diamondseffect_lyf.txt")
        //  this.playLyf("model/reviveeff_lyf.txt")
       //  this.playLyf("model/levelup_lyf.txt")
       // this.playLyf("model/skin001_lyf.txt")
      //  this.playLyf("model/10018_lyf.txt")




        var tabIdx=3;


        if(tabIdx==3){
            this.playLyf("model/10018_lyf.txt");
        }
        if(tabIdx==1){
            if(this.mainChar){

                var $skill: Skill = SkillManager.getInstance().getSkill(getSkillUrl(this.skillFileName), "m_skill_01");
                $skill.configFixEffect(this.mainChar);
                this.mainChar.playSkill($skill);
                console.log("jiiii");
                return;
            }

            SkillManager.getInstance().preLoadSkill(getSkillUrl(this.skillFileName));
            this.mainChar= new SkillSceneChar();
            this.mainChar.setRoleUrl(getRoleUrl("50001"));
            SceneManager.getInstance().addMovieDisplay(  this.mainChar);

        }
 



    }
    private  isFrishtClik:boolean=true;
    private yezhu: SceneBaseChar;

    protected playLyf(url:string)
    {
        GroupDataManager.getInstance().getGroupData(  Scene_data.fileRoot +url, (groupRes: GroupRes) => {

            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item:GroupItem = groupRes.dataAry[i];
                if (item.types ==BaseRes.SCENE_PARTICLE_TYPE) {
                    var $particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);

                    ParticleManager.getInstance().addParticle($particle);

                } else {
                    console.log("播放的3不是3单纯特效");
                }
            }

        })
    }
    protected receivedModuleEvent($event: BaseEvent): void {
        if ($event instanceof TpSceneEvent) {
            var $tpMenuEvent: TpSceneEvent = <TpSceneEvent>$event;
            if ($tpMenuEvent.type == TpSceneEvent.SHOW_TP_SCENE_EVENT) {
              this.addGridLineSprite();
                Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
                /*
                if (!getUrlParam("id")) {
                    window.location.href = "index.html?id=" + random(10);
                } else {
                    this.makeUrlParam()
                    this.makeMainChar();
                    Scene_data.cam3D.distance = 250;
                }
                */
                console.log("233");
                Scene_data.supportBlob=true;

            }
        }

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
    private attackTarget: SceneChar
    private makeAttackChar(): void {
        var $sc: SceneChar = new SceneChar();
        $sc.z = 100
        $sc.setRoleUrl(getRoleUrl("7001"));
        SceneManager.getInstance().addMovieDisplay($sc);
        this.attackTarget = $sc;
        this.attackTarget.x = random(50) + 30;
        this.attackTarget.z = random(50) + 30;
    }
    private skillFileName: string = "jichu_1";
    private charIdstr: string = "50001";
    private weaponNum: number = 50011;
    private makeMainChar(): void
    {

        SkillManager.getInstance().preLoadSkill(getSkillUrl(this.skillFileName));  
        var $sc: SkillSceneChar = new SkillSceneChar();
        $sc.setRoleUrl(getRoleUrl(this.charIdstr));
        SceneManager.getInstance().addMovieDisplay($sc);
        $sc.setWeaponByAvatar(this.weaponNum);
        this.mainChar = $sc;

     
        $sc.changeActionFun = () => { this.playSkill() }
        $sc.loadFinishFun = () => {
            ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + getSkillUrl(this.skillFileName), ($skillRes: SkillRes) => {
                SkillManager.getInstance().preLoadSkill(getSkillUrl(this.skillFileName));
                TimeUtil.addTimeOut(1000, () => { this.playSkill() });
                console.log(TimeUtil.getTimer())
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
        var $skill: Skill = SkillManager.getInstance().getSkill(getSkillUrl(this.skillFileName), $effectName);
        if ($skill.keyAry) {
            if (this.textPlaySkillFun) {
                TimeUtil.removeTimeTick(this.textPlaySkillFun);
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
                $skill.configTrajectory(this.mainChar, this.attackTarget);
            } else {
               
                if ($effectName == "m_skill_01") {
                    $skill.configFixEffect(this.mainChar);
                } else {
                    this.attackTarget.x = random(50) + 30;
                    this.attackTarget.z = random(50) + 30;
                    var $tempPos: Vector3D = new Vector3D(this.attackTarget.x, this.attackTarget.y, this.attackTarget.z)
                    var $hitPosItem: Array<Vector3D> = new Array()
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
        ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
        var $GridLineSprite: GridLineSprite = new GridLineSprite();
        SceneManager.getInstance().addDisplay($GridLineSprite);
        SceneManager.getInstance().ready = true;
    }
    protected listenModuleEvents(): Array<BaseEvent> {
        return [
            new TpSceneEvent(TpSceneEvent.SHOW_TP_SCENE_EVENT),
        ];
    }
}
