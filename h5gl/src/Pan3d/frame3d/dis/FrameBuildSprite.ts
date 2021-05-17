module Pan3d {
    export class FrameBuildSprite extends Display3D {
        public groupItem: Array<Display3DSprite>
        private shader3D:Shader3D;
        public setFrameNodeUrl($vo: FrameNodeVo): void {
            this.groupItem = new Array()
            var $dis: Display3DSprite = new Display3DSprite(this.scene3D);
            $dis._rotationData = new Float32Array(9)
            $dis.setObjUrl($vo.resurl)
            $dis.setLighturl($vo.materialInfoArr[0].url)
            $dis.sceneVisible = false
            this.groupItem.push($dis);
        }
        public constructor(value:Scene3D){
            super(value);
            this.scene3D.progrmaManager.registe(FrameBuildShader.FrameBuildShader,new FrameBuildShader(this.scene3D));
            this.shader3D=  this.scene3D.progrmaManager.getProgram(FrameBuildShader.FrameBuildShader);
        }
     
        public upFrame():void
        {
            for (var i: number = 0; this.groupItem && i < this.groupItem.length; i++) {
                if (this.groupItem[i] as Display3DSprite) {
                    this.drawTemp(this.groupItem[i]);
                }
            }

        }
        private drawTemp(dis: Display3DSprite) {
            if(!dis.lightTextureRes||!dis.objData){
                return
            }
         
            this.updateMatrix();
            var tempObjData=dis.objData;
            var ctx:Context3D=this.scene3D.context3D;
            var gl:WebGLRenderingContext=ctx.webGlRender;
            ctx.setProgram(this.shader3D.program);
      


           gl.bindBuffer(gl.ARRAY_BUFFER, tempObjData.vertexBuffer);

             ctx.setVaOffset(0, 3, tempObjData.stride, 0);
            ctx.setVaOffset(1, 2, tempObjData.stride, tempObjData.uvsOffsets);

            ctx.setRenderTexture(this.shader3D, "fs0", dis.lightTextureRes.texture, 0);
            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
      
            ctx.drawCall(tempObjData.indexBuffer, tempObjData.treNum);

            console.log(dis.lightTextureRes.texture)

            

        }

    }
}