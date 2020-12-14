 
import DisplayBaseSprite=Pan3d.DisplayBaseSprite;
 
import Context3D=Pan3d.Context3D;
 
module Pan3d {
    export class ConstrainSceneView {
        public renderContext: WebGLRenderingContext;
        public canvas3D: HTMLCanvasElement;
        public scene3D:Scene3D;

    
        constructor(value: HTMLCanvasElement) {
            this.canvas3D = value;
            var gl: any = this.canvas3D.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
                || this.canvas3D.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false });

            this.renderContext = gl;
            this.scene3D=new Scene3D(this.renderContext);
            this.loadSceneByUrl();
     
        }
        private loadSceneByUrl():void
        {
            var sceneRes:SceneRes=new SceneRes(this.scene3D);
            sceneRes.load("10002",( ) => {
               var buildAry:Array<any>= sceneRes.sceneData.buildItem;
               for (var i: number = 0; i < buildAry.length; i++) {
                var itemObj: any = buildAry[i];
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    var itemDisplay: Display3DSprite =this.getBuildSprite(itemObj);
                    this.scene3D.addDisplay(itemDisplay);
                } else if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
               
                }
            }

               
            },( ) => {
               
            },( ) => {
               
            });
        }
        private getBuildSprite(value:any):Display3DSprite
        {
            var itemDisplay: Display3DSprite =   new Display3DSprite(this.scene3D);
            itemDisplay.setObjUrl(value.objsurl);
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
    }
}