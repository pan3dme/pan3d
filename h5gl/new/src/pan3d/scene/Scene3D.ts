module Pan3d {
    export class Scene3D {
        public context3D:Context3D;
        public progrmaManager:ProgrmaManager;
        protected _displayList: Array<DisplayBaseSprite>;
        constructor(value: WebGLRenderingContext) {
            this.context3D=new Context3D(value)
            this.progrmaManager=new ProgrmaManager(this);
            this._displayList=new Array();
            this.addTestModel();
        }
        private addTestModel():void
        {
             

        }
        public upFrame(): void {
            var gl: WebGLRenderingContext = this.context3D.webGlRender;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clearColor(60 / 255, 60 / 255, 60/ 255, 1.0);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            gl.disable(gl.CULL_FACE);


            for(var i:number=0;i<this._displayList.length;i++){
                this._displayList[i].update();
            }
        }

    }
}