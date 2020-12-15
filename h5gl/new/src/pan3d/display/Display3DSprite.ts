module Pan3d {

    export class Display3DSprite extends Display3D {

        private shader3D: Shader3D;
        private materialParam: MaterialBaseParam;
        constructor(value: Scene3D) {
            super(value);
            this.initData();

        }
        public objData: ObjData;
        protected initData(): void {
            this.scene3D.progrmaManager.registe(Display3DShader.Display3DShader, new Display3DShader(this.scene3D));
            this.shader3D = this.scene3D.progrmaManager.getProgram(Display3DShader.Display3DShader);

            /*
            this.objData = new ObjData(this.scene3D);
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0);
            this.objData.vertices.push(100, 0, 0);
            this.objData.vertices.push(100, 0,100);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.upToGpu()
            */


        }
        public setObjUrl(value: any) {

            this.scene3D.objDataManager.getObjData(this.scene3D.fileRoot + value, ($obj: ObjData) => {
                this.objData = $obj;
            });

        }
        public baseTexture: TextureRes
        public setPicUrl($str: string): void {

            this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + $str, ($texture: TextureRes) => {
                this.baseTexture = $texture
            });
        
        }
        private material: Material;
        public setMaterialUrl(value: string, $paramData: Array<any> = null): void {
            value = value.replace("_byte.txt", ".txt")
            value = value.replace(".txt", "_byte.txt")
            this.scene3D.materialManager.getMaterialByte(this.scene3D.fileRoot + value, ($material: Material) => {
                this.material = $material;
                if ($paramData) {
                    this.materialParam = new MaterialBaseParam(this.scene3D);
                    this.materialParam.setData(this.material, $paramData);
                }
 
            }, null, true, MaterialShader.MATERIAL_SHADER, MaterialShader);

            this.setPicUrl("content/finalscens/checkpoint/bamboo forest/dae/glound.jpg");

        }

        public upFrame(): void {
            if (this.objData && this.objData.indexBuffer && this.material) {
                var context3D: Context3D = this.scene3D.context3D;
                context3D.setProgram(this.shader3D.program);
                this.setMaterialVaCompress();
                for (var i: number = 0; i < this.material.texList.length; i++) {
                    if (this.material.texList[i].isMain) {
                        context3D.setRenderTexture(this.shader3D, "baseTexture", this.material.texList[i].texture, 0);
                 
                        if(this.materialParam&& this.materialParam.dynamicTexList&& this.materialParam.dynamicTexList.length){
                   

                           context3D.setRenderTexture(this.shader3D, "baseTexture", this.materialParam.dynamicTexList[0].texture, 0);
                        }
                       
                    }
                }
        

                context3D.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
                context3D.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
                context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        }

        private setMaterialVaCompress(): void {
            var context3D: Context3D = this.scene3D.context3D;
            if (context3D.pushVa(this.objData.vertexBuffer)) {
                return;
            }
            context3D.setVaOffset(0, 3, this.objData.stride, 0);
            context3D.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
        }


    }
}