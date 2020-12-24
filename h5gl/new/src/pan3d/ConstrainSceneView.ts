
import DisplayBaseSprite = Pan3d.DisplayBaseSprite;

import Context3D = Pan3d.Context3D;

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
            // this.loadSceneByUrl();
            this.scene3D.camera3D.distance = 200;

            this.addEvents();
      

        }
        private addEvents():void
        {
           

            GameMouseManager.getInstance().uiBlankStage.addEventListener(InteractiveEvent.Down, this.onDown, this);
        }
        protected onDown(event: InteractiveEvent): void {
            // this.playParticle("10018");
            this.playParticle("10017");
            // this.playParticle("levelup");
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
            var stageWidth: number = document.body.clientWidth;
            var stageHeight: number = document.body.clientHeight;
            this.canvas3D.width = stageWidth;
            this.canvas3D.height = stageHeight;
            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
            this.canvas3D.style.position = "absolute";
            this.canvas3D.style.left = "0px";
            this.canvas3D.style.top = "0px";
        }
        public upFrame(): void {
            this.scene3D.upFrame();

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