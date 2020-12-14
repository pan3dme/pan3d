module Pan3d {
    export class Scene3D {
      
        public context3D:Context3D;
        public camera3D:Camera3D;
        public progrmaManager:ProgrmaManager;
        public objDataManager:ObjDataManager;
        public fileRoot:String;
        public supportBlob:boolean;
        protected _displayList: Array<Display3D>;
        constructor(value: WebGLRenderingContext) {
            this.fileRoot= "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
            this.supportBlob=true;
            this.context3D=new Context3D(value)
            this.camera3D=new Camera3D();
            this.progrmaManager=new ProgrmaManager(this);
            this.objDataManager=new ObjDataManager(this);
            this._displayList=new Array();
            this.addDisplay(new GridLineSprite( this));
        }
        private displayBaseSprite:DisplayBaseSprite;
        private addTestModel():void
        {
         
             
            // this.displayBaseSprite=new DisplayBaseSprite( this.context3D.webGlRender);
         
            // this.addDisplay(new Display3DSprite( this));
         
    
        }
        public addDisplay(itemDisplay: Display3D) {
            this._displayList.push(itemDisplay)
        }
        public upFrame(): void {
            this.camera3D.upFrame();
            this.camera3D.rotationY++;
            this.context3D.setBaseRender();
            for(var i:number=0;i<this._displayList.length;i++){
                this._displayList[i].upFrame();
            }
           this.displayBaseSprite? this.displayBaseSprite.upFrame():null;
         
        }

    }
}