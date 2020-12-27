module Pan3d {

    export class Display3DSprite extends Display3D {
        public setPicUrl(url: any) {
            // throw new Error("Method not implemented.");
        }
        protected shader3D: Shader3D;
        public objData: ObjData;
        public time:number ;
        public dynamic: boolean = false;
        public _rotationData:Float32Array;
        private materialParam: MaterialBaseParam;
        public bindMatrix: Matrix3D;
        public bindTarget: IBind;
        public bindSocket: string;
        constructor(value: Scene3D) {
            super(value);
            this.time=0;
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
                if (this.material.usePbr || this.material.directLight) {
                    this._rotationData = new Float32Array(9);
                  
                }

            }, null, true, MaterialShader.MATERIAL_SHADER, MaterialShader);
        }

        public upFrame(): void {
            this.updateMatrix();
            if (this.objData && this.objData.indexBuffer && this.material) {
                var ctx: Context3D = this.scene3D.context3D;
                this.shader3D = this.material.shader;
                ctx.setProgram(this.shader3D.program);
                this.updateBind();
                this.setMaterialVa();
                this.setMaterialTexture(this.material,this.materialParam);
                this.setMaterialVc(this.material, this.materialParam);
                this.setVc();
                ctx.drawCall(this.objData.indexBuffer, this.objData.treNum);

               
            }
        }
        public updateBind(): void {
            if (this.bindTarget) {

                this.posMatrix.identity();
                this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
                this.bindTarget.getSocket(this.bindSocket, this.bindMatrix)
                this.posMatrix.append(this.bindMatrix);
             
            }
        }
        protected setVc ():void
        {
            var ctx: Context3D = this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);

            if (this.material.usePbr || this.material.directLight) {
                ctx.setVcMatrix3fv(this.material.shader, "rotationMatrix3D", this._rotationData);
    
            }
        }
        public setMaterialVc($material: Material, $mp: MaterialBaseParam = null): void {
            if ($material.fcNum <= 0) {
                return;
            }
            var t: number = 0;
            if ($material.hasTime) {
                t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
            }
            $material.update(t);
            if ($mp) {
                $mp.update();
            }
            var ctx: Context3D = this.scene3D.context3D;
            ctx.setVc4fv($material.shader, "fc", $material.fcData);
       
        }
        public setBind($bindTarget: IBind, $bindSocket: string): void {
            this.bindTarget = $bindTarget;
            this.bindSocket = $bindSocket;
            this.bindMatrix = new Matrix3D();
        }

       protected setMaterialTexture($material: Material, $mp: MaterialBaseParam) {
        var ctx: Context3D = this.scene3D.context3D;
        var texVec: Array<TexItem> = $material.texList;
            for (var i: number = 0; i < texVec.length; i++) {
                if (texVec[i].type == TexItem.LIGHTMAP) {
                    if(this.lightTextureRes){
                        ctx.setRenderTexture($material.shader, texVec[i].name, this.lightTextureRes.texture, texVec[i].id);
                    }
    
                }else if (texVec[i].type == TexItem.CUBEMAP) {
                    if ($material.useDynamicIBL) {// && _reflectionTextureVo) {
                        //_context.setTextureAt(texVec[i].id, _reflectionTextureVo.texture);
                    } else {
                        var index: number = Math.floor($material.roughness * 5);
                        if (this.scene3D.skyCubeMap) {
                            var cubeTexture: WebGLTexture = this.scene3D.skyCubeMap[index];
                            ctx.setRenderTextureCube($material.shader.program, texVec[i].name, cubeTexture, texVec[i].id);
                        
                        }

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
            if (!(this.material.directLight || this.material.noLight)) {
                ctx.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
            }
        }


    }
}