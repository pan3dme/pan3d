module Pan3d {
   
    export class LineDisplaySprite  extends Display3D  {
        private shader3D:Shader3D;
        private objData: ObjData;
        private lineVecPos: Array<number>;
        private lineColor: Array<number>
        private lineIndex: Array<number>
        protected baseColor: Vector3D = new Vector3D(1, 0, 0)
        constructor(value: Scene3D) {
          super(value);
          this.scene3D.progrmaManager.registe(LineDisplayShader.LineDisplayShader,new LineDisplayShader(this.scene3D));
          this.shader3D=  this.scene3D.progrmaManager.getProgram(LineDisplayShader.LineDisplayShader);
          this.initData();
    
        }
        protected initData():void
        {

            this.makeLineMode(new Vector3D(0,0,0),new Vector3D(100,0,0),new Vector3D(1,0,0));
            this.upToGpu();
        }
        protected upToGpu():void
        {
            this.objData.upToGpu();
        }
        protected makeLineMode(a: Vector3D, b: Vector3D, $color: Vector3D = null): void {
            if (!this.lineVecPos || !this.lineIndex) {
                this.clear()
            }
            if ($color) {
                this.baseColor = $color
            }
            this.lineVecPos.push(a.x, a.y, a.z);
            this.lineVecPos.push(b.x, b.y, b.z);
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z)
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z)
            this.lineIndex.push(this.lineIndex.length + 0, this.lineIndex.length + 1)
            if(this.objData==null){
                this.objData=new ObjData(this.scene3D);
            }
            this.objData.treNum = this.lineIndex.length
            this.objData.vertices =  this.lineVecPos;
            this.objData.normals = this.lineColor;
            this.objData.indexs =  this.lineIndex;

        }
     
        public clear(): void {
            this.lineVecPos = new Array;
            this.lineIndex = new Array
            this.lineColor = new Array
 
        }

        public upFrame(): void {
            if (this.objData && this.objData.indexBuffer) {
                var context3D:Context3D=this.scene3D.context3D;
                context3D.setProgram(this.shader3D.program);
                context3D.setVa(0, 3, this.objData.vertexBuffer);
                context3D.setVa(1, 3, this.objData.normalsBuffer);
                context3D.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
                context3D.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
                context3D.drawLine(this.objData.indexBuffer, this.objData.treNum);
            
            }
        }
        



    }
}