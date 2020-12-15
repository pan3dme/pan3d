module Pan3d {

    export class Display3DSprite extends Display3D {
        private shader3D: Shader3D;
        public objData: ObjData;
        private materialParam: MaterialBaseParam;
        constructor(value: Scene3D) {
            super(value);
            this.initData();

        }
        protected initData(): void {
        
        }
        public setObjUrl(value: string) {
            this.scene3D.objDataManager.getObjData(this.scene3D.fileRoot + value, ($obj: ObjData) => {
                this.objData = $obj;
            });

        }
        private lightTextureRes: TextureRes;
        public setLighturl(value: string) {

            console.log("value", value);
            this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + value, (textureRes: TextureRes) => {

                this.lightTextureRes = textureRes;

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
        }

        public upFrame(): void {
            if (this.objData && this.objData.indexBuffer && this.material) {
                var ctx: Context3D = this.scene3D.context3D;
                this.shader3D = this.material.shader;
                ctx.setProgram(this.shader3D.program);
                this.setMaterialVa();
                this.setMaterialTexture(this.material,this.materialParam);
                ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
                ctx.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
                ctx.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        }
       private setMaterialTexture($material: Material, $mp: MaterialBaseParam) {
        var ctx: Context3D = this.scene3D.context3D;
        // if (this.materialParam && this.materialParam.dynamicTexList && this.materialParam.dynamicTexList.length) {
        //     ctx.setRenderTexture(this.shader3D, "fs0", this.materialParam.dynamicTexList[0].texture, 0);
        // }
        var texVec: Array<TexItem> = $material.texList;
            for (var i: number = 0; i < texVec.length; i++) {
                if (texVec[i].type == TexItem.LIGHTMAP) {
                    if(this.lightTextureRes){
                        ctx.setRenderTexture($material.shader, texVec[i].name, this.lightTextureRes.texture, texVec[i].id);
                    }
    
                }
                else {
                    if (texVec[i].texture) {
                        ctx.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
                }
            }
            if ($mp) {
                for (i = 0; i < $mp.dynamicTexList.length; i++) {
                    if ($mp.dynamicTexList[i].target) {
                        ctx.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name,
                            $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                    }
                }
            }
         
        }
        private setMaterialVa(): void {
            var ctx: Context3D = this.scene3D.context3D;
            if (ctx.pushVa(this.objData.vertexBuffer)) {
                return;
            }
            ctx.setVaOffset(0, 3, this.objData.stride, 0);
            ctx.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
            ctx.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
        }


    }
}