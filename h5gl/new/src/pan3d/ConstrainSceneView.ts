
import DisplayBaseSprite = Pan3d.DisplayBaseSprite;

import Context3D = Pan3d.Context3D;
import Display3dMovie = Pan3d.Display3dMovie;

module Pan3d {
    export class ConstrainSceneView {
        public renderContext: WebGLRenderingContext;
        public canvas3D: HTMLCanvasElement;
        public scene3D: Scene3D;


        constructor(value: HTMLCanvasElement) {
            this.canvas3D = value;
            var gl: any = this.canvas3D.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
                || this.canvas3D.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false });

            this.renderContext = gl;
            this.scene3D = new Scene3D(this.renderContext);
          
            this.scene3D.camera3D.distance = 200;
            this.scene3D.camera3D.rotationX =-30;
            this.scene3D.camera3D.rotationY=45;

            this.addEvents();
            this.addRoleToSceneByUrl("50011",new Vector3D(0,0,0));
      

        }
        private addEvents():void
        {
           

            GameMouseManager.getInstance().uiBlankStage.addEventListener(InteractiveEvent.Down, this.onDown, this);
        }
        protected onDown(event: InteractiveEvent): void {
            // this.playParticle("10018");
            // this.playParticle("10017");
            // this.playParticle("levelup");
              // this.loadSceneByUrl();

              this.playSkillByName()

          
        }
        private playSkillByName():void
        {
           var skill: Skill =  this.scene3D.skillManager.getSkill("skill/jichu_1_byte.txt","m_skill_01",null);
            if(this.mainChar!=null){
                skill.reset();
                skill.configFixEffect(this.mainChar,null,null);
                this.mainChar.playSkill(skill);
            }

            
        }
        private loadSceneByUrl(): void {
            this.scene3D.camera3D.distance = 1500;
            var sceneRes: SceneRes = new SceneRes(this.scene3D);
            //10002
            //2014
            sceneRes.load("10002", () => {
                var buildAry: Array<any> = sceneRes.sceneData.buildItem;
                for (var i: number = 0; i < buildAry.length; i++) {
                    var itemObj: any = buildAry[i];
                    if (itemObj.type == BaseRes.PREFAB_TYPE) {

                        if (itemObj.id != 3) {
                            // continue;
                        }
                        var itemDisplay: Display3DSprite = this.getBuildSprite(itemObj);
                        this.scene3D.addDisplay(itemDisplay);
                    } else if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {

                    }
                }


            }, () => {

            }, () => {

            });
        }
        private getBuildSprite(value: any): Display3DSprite {
            var itemDisplay: Display3DSprite = new Display3DSprite(this.scene3D);
            itemDisplay.setObjUrl(value.objsurl);
            itemDisplay.setMaterialUrl(value.materialurl, value.materialInfoArr);

            if (value.lighturl) {
                itemDisplay.setLighturl(value.lighturl);
            }

            itemDisplay.scaleX = value.scaleX;
            itemDisplay.scaleY = value.scaleY;
            itemDisplay.scaleZ = value.scaleZ;

            itemDisplay.x = value.x;
            itemDisplay.y = value.y;
            itemDisplay.z = value.z;

            itemDisplay.rotationX = value.rotationX;
            itemDisplay.rotationY = value.rotationY;
            itemDisplay.rotationZ = value.rotationZ;

            itemDisplay.updateMatrix();


            return itemDisplay;
        }
        public resetSize(): void {
            var mixNum:number=Math.min(document.body.clientWidth,document.body.clientHeight);
            var stageWidth: number = mixNum;
            var stageHeight: number =mixNum;
            this.canvas3D.width = stageWidth;
            this.canvas3D.height = stageHeight;
            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
            // this.canvas3D.style.position = "absolute";
            // this.canvas3D.style.left = "0px";
            // this.canvas3D.style.top = "0px";

            /*
            var mixNum:number=400;
            var stageWidth: number = mixNum;
            var stageHeight: number =mixNum;
            this.canvas3D.width = stageWidth;
            this.canvas3D.height = stageHeight;
            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
            */
       
        }
        public upFrame(): void {
            this.scene3D.upFrame();

        }
        private   mainChar:SceneChar;
        public  addRoleToSceneByUrl(  val:String ,pos:Vector3D ):void
        {
           
           
           var sc: SceneChar =new SceneChar(this.scene3D);
            sc.setRoleUrl("role/"+val+".txt");
         
          
            sc.x=pos.x;
            sc.y=pos.y;
            sc.z=pos.z;

            this.scene3D.addMovieDisplay(sc);

            this.mainChar=sc;
            this.mainChar.addPart(SceneChar.WEAPON_PART ,SceneChar.WEAPON_DEFAULT_SLOT,"model/50011.txt" );
           
        }
        public playParticle(name: string): void {
            //"model/"+str +"_lyf.txt"
            var url:string = "model/" + name + "_lyf.txt";
            // url = "model/" + "10017" + "_lyf.txt";
            this.scene3D.groupDataManager.getGroupData(this.scene3D.fileRoot+ url, (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    var posV3d: Vector3D;
                    var rotationV3d: Vector3D;
                    var scaleV3d: Vector3D;
                    if (item.isGroup) {
                        posV3d = new Vector3D(item.x, item.y, item.z);
                        rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                        scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                    }
    
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                       
                      
                        var particle: CombineParticle =  this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + item.particleUrl);
                        this.scene3D.particleManager.addParticle(particle);
                      
                    }  
    
                }
            })
        }
    }
}