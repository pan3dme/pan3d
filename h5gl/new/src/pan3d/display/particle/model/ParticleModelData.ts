module Pan3d {
    export class ParticleModelData extends ParticleData {
        public _maxAnimTime: number;
        public _depthMode: number
        public getParticle(): Display3DParticle {
            return new Display3DModelPartilce(this.scene3D);
        }

        public setAllByteInfo($byte: Pan3dByteArray): void {
            this.objData = new ObjData(this.scene3D);
            this._maxAnimTime = $byte.readFloat()
            var vLen: number = $byte.getInt();
            var dataWidth = 5;
            var len: number = vLen * dataWidth * 4;
            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);
            BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4);//vertices
            BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth, 4);//uv
            var iLen: number = $byte.readInt();
            for (var k: number = 0; k < iLen; k++) {
                this.objData.indexs.push($byte.readInt())
            }
            this.objData.stride = dataWidth * 4;

            if (this.version >= 36) {
                this._depthMode=$byte.readInt()//新加模型特效深度信息
            }
            super.setAllByteInfo($byte);

       
            var ctx:Context3D=this.scene3D.context3D;
            this.objData.vertexBuffer =ctx.uploadBuff3DArrayBuffer(arybuff);
            this.objData.indexBuffer =ctx.uploadIndexBuff3D(this.objData.indexs);
            this.objData.treNum = this.objData.indexs.length;

        }
 
        public uploadGpu(): void {
            var ctx:Context3D=this.scene3D.context3D;
            this.objData.vertexBuffer = ctx.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = ctx.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = ctx.uploadIndexBuff3D(this.objData.indexs);
            this.objData.treNum = this.objData.indexs.length;
        }

        public regShader(): void {
        
            this.materialParam.shader = this.scene3D.progrmaManager.getMaterialProgram(Display3DFacetShader.Display3D_Facet_Shader,
                Display3DFacetShader, this.materialParam.material);
        
        }

      
    }
}