module Pan3d {
    export class Scene3D {
        public context3D:Context3D;
        public camera3D:Camera3D;
        public progrmaManager:ProgrmaManager;
        protected _displayList: Array<Display3D>;
        constructor(value: WebGLRenderingContext) {
            this.context3D=new Context3D(value)
            this.camera3D=new Camera3D();
            this.progrmaManager=new ProgrmaManager(this);
            this._displayList=new Array();
            this.addTestModel();
        }
        private displayBaseSprite:DisplayBaseSprite;
 
     
        private addTestModel():void
        {
             
            // this.displayBaseSprite=new DisplayBaseSprite( this.context3D.webGlRender);
       

            this._displayList.push(new GridLineSprite( this))
            this._displayList.push(new Display3DSprite( this))

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