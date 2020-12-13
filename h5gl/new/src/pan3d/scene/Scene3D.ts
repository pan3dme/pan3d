module Pan3d {
    export class Scene3D {
        public context3D:Context3D;
        public progrmaManager:ProgrmaManager;
        protected _displayList: Array<Display3D>;
        constructor(value: WebGLRenderingContext) {
            this.context3D=new Context3D(value)
            this.progrmaManager=new ProgrmaManager(this);
            this._displayList=new Array();
            this.addTestModel();
        }
        private displayBaseSprite:DisplayBaseSprite;
        private addTestModel():void
        {
             
            this.displayBaseSprite=new DisplayBaseSprite( this.context3D.webGlRender);
        }
        public upFrame(): void {
            this.context3D.setBaseRender();
            for(var i:number=0;i<this._displayList.length;i++){
                this._displayList[i].upFrame();
            }
           this.displayBaseSprite? this.displayBaseSprite.upFrame():null;
        }

    }
}