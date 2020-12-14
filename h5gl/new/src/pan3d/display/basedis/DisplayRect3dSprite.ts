module Pan3d {
   
    export class DisplayRect3dSprite  extends Display3D  {
        private shader3D:Shader3D;
        constructor(value: Scene3D) {
          super(value);
          this.initData();
          this.scene3D.progrmaManager.registe(DisplayRect3dShader.DisplayRect3dShader,new DisplayRect3dShader(this.scene3D));
          this.shader3D=  this.scene3D.progrmaManager.getProgram(DisplayRect3dShader.DisplayRect3dShader);
        }
        private objData: ObjData;
        private initData(): void {
 
            this.objData = new ObjData(this.scene3D);
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0.5);
            this.objData.vertices.push(100, 0, 0.5);
            this.objData.vertices.push(100, 100,100);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.upToGpu()

            this.posMatrix.identity();
            this.posMatrix.appendScale(0.2,0.2,1);
        }
        public upFrame(): void {
            if (this.objData && this.objData.indexBuffer) {
                var context3D:Context3D=this.scene3D.context3D;
                context3D.setProgram(this.shader3D.program);
                context3D.setVa(0, 3, this.objData.vertexBuffer);
                context3D.setVa(1, 2, this.objData.uvBuffer);
                context3D.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
                context3D.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
          
                context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            
            }
        }
        



    }
}