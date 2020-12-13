module Pan3d {
    export class DisplayBaseSprite extends Display3D{

        public objData:ObjData
        public shader: Shader3D;
        constructor(value:Scene3D ) {
            super(value);
            this.makeBaseObjData();

            this.scene3D.progrmaManager.registe(DisplayBaseShader.DisplayBaseShader,new DisplayBaseShader(this.scene3D));
            this.shader=this.scene3D.progrmaManager.getProgram(DisplayBaseShader.DisplayBaseShader);
        }
        private makeBaseObjData():void{
            this.objData = new ObjData(this.scene3D);
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0);
            this.objData.vertices.push(1, 0, 0);
            this.objData.vertices.push(1, 1, 0);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 1);

            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);

            this.objData.upToGpu();

        }
 
        public upFrame():void
        {
            super.upFrame();
           
           
            var context3D :Context3D=  this.scene3D.context3D;
            context3D.setProgram(this.shader.program);
            context3D.setVa(0, 3, this.objData.vertexBuffer);
            // context3D.setVa(1, 2, this.objData.uvBuffer);
            // context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
 
        }
 
    }
}