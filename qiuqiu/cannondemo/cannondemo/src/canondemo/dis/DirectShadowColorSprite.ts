module cannondis {
    import Display3DSprite = Pan3d.Display3DSprite;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = Pan3d.SceneManager;

    import Scene_data = Pan3d.Scene_data;
    import ObjDataManager = Pan3d.ObjDataManager;
    import ObjData = Pan3d.ObjData;
    import Shader3D = Pan3d.Shader3D;
    import ProgrmaManager = Pan3d.ProgrmaManager;
    import DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    import ShadowModel = shadow.ShadowModel;
    import GameDataModel = game.GameDataModel;


    export class NoShadowShader extends Shader3D {
        static NoShadowShader: string = "NoShadowShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            $context.bindAttribLocation(this.program, 2, "v3Normal");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 v2CubeTexST;" +

                "varying vec3 v2;" +
                "varying float heighty;" +
                "varying vec3 ambientColorF;" +

                "attribute vec3 v3Normal;" +
                "uniform vec3 sunDirect;" +
                "uniform vec3 sunColor;" +
                "uniform vec3 ambientColor;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
     

                "uniform mat3 rotationMatrix3D;" +
                "void main(void){;" +
                    "ambientColorF =ambientColor;" +
                    "gl_Position= vpMatrix3D * posMatrix3D *vec4(v3Position, 1.0);" +
                    "vec4 vt1= posMatrix3D * vec4(v3Position, 1.0);" +
                    "heighty = vt1.y;" +
                    "vec3 n = rotationMatrix3D * v3Normal;" +
                    "float suncos =  clamp(dot(n.xyz,sunDirect.xyz),0.0,1.0);" +
                    "v2 = sunColor * suncos ;" +
                "}"
            return $str;
        }

        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform vec4 focus3d;" +
                "uniform vec3 toColor;" +
                "varying vec3 v2;" +
                "varying float heighty;" +
                "varying vec3 ambientColorF;" +
                "void main(void)\n" +
                "{\n" +

                    "float  a=  focus3d.w-heighty; " +
                    "a =a/100.0; " +
                    "a = clamp(a, 0.0, 1.0); " +

                    "vec4 colorend =vec4(v2.xyz+ambientColorF.xyz, 1); " +

                    "colorend.xyz=colorend.xyz+(toColor.xyz-colorend.xyz)*a; " +

                    "gl_FragColor = colorend; " +


                "}"
            return $str

        }

    }

    
    export class DirectShadowColorShader extends Shader3D {
        static DirectShadowColorShader: string = "DirectShadowColorShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            $context.bindAttribLocation(this.program, 2, "v3Normal");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 v2CubeTexST;" +
                "varying vec2 v0;" +
                "varying vec3 v_PositionFromLight;" +
                "varying vec3 v2;" +
                "varying float heighty;" +

                "varying float cosTheta;" +
                "varying float onsunFace;" +


                "varying vec3 ambientColorF;" +

                "attribute vec3 v3Normal;" +
                "varying vec3 outNorm;" +
                "uniform vec3 sunDirect;" +
                "uniform vec3 sunColor;" +
                "uniform vec3 ambientColor;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "uniform mat4 shadowViewMatx3D;" +

                "uniform mat3 rotationMatrix3D;" +
                "void main(void){;" +
                "ambientColorF =ambientColor;" +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y); " +
                "vec4 vt0= vec4(v3Position, 1.0);" +
                "vt0 = posMatrix3D * vt0;" +
                "vt0 = vpMatrix3D * vt0;" +
                "   outNorm =v3Normal;" +
                "   vec4 vt1= vec4(v3Position, 1.0);" +
                "   vt1 = posMatrix3D * vt1;" +
                "   heighty = vt1.y;" +
                "   vt1 = shadowViewMatx3D * vt1;" +
                "   v_PositionFromLight = vec3(vt1.x, vt1.y,vt1.z);" +


                "vec3 n = rotationMatrix3D * v3Normal;" +
                "float suncos = dot(n.xyz,sunDirect.xyz);" +
                "onsunFace = suncos;" +
                "cosTheta =1.0-abs(suncos);" +


                "suncos = clamp(suncos,0.0,1.0);" +


                "v2 = sunColor * suncos ;" +
                "gl_Position = vt0;" +
                "}"
            return $str;
        }

        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "uniform sampler2D fs1;\n" +
               
                "uniform vec4 focus3d;" +
                "uniform vec3 toColor;" +
                "varying vec3 outNorm;" +
                "varying vec2 v0;\n" +
                "varying vec3 v_PositionFromLight;\n" +
                "varying vec3 v2;" +

                "varying float heighty;" +
                "varying float cosTheta;" +
                "varying float onsunFace;" +
                "varying vec3 ambientColorF;" +

                "void main(void)\n" +
                "{\n" +
                "vec4 ft5 = texture2D(fs1, v_PositionFromLight.xy); " +   //深度图采样
                "float  bias  = 0.01*cosTheta; " +
                "bias = clamp(bias, 0.003, 0.01); " +

                "float visibility = (v_PositionFromLight.z > ft5.x + bias) ? 0.9 : 1.0;\n" +    //深度判断
                "visibility =onsunFace<0.0?1.0:visibility ; " +


                "vec4 ft0 = texture2D(fs0, v0); " +    //正常纹理采样

                "float  a=  focus3d.w-heighty; " + 
                "a =a/100.0; " +
                "a = clamp(a, 0.0, 1.0); " +

                "vec4 ft1 = vec4(v2.xyz, 1.0); " +       //法线值
              //   "ft0.xyz = ft1.xyz*ft0.xyz; " +
                "vec4 ft2 = vec4(1, 1, 1, 1); " +

                "float isalp = (ft5.z >0.1254) ? 1.0 : 0.2;\n" +    //深度判断1254=  1236

                "vec4 colorend =vec4((ft1.xyz*visibility+ambientColorF.xyz)*ft0.rgb , 1.0); " +

                "colorend.xyz=colorend.xyz+(toColor.xyz-colorend.xyz)*a; " +

                "gl_FragColor = colorend; " +

             "gl_FragColor =  vec4(outNorm.xyz,  1); " +

     

                "}"
            return $str

        }

    }

    export class DirectShadowColorSprite extends DirectShadowDisplay3DSprite {

 


        protected noShadowShder: Shader3D
        protected initData(): void {
            ProgrmaManager.getInstance().registe(DirectShadowColorShader.DirectShadowColorShader, new DirectShadowColorShader);
            this.modelShder = ProgrmaManager.getInstance().getProgram(DirectShadowColorShader.DirectShadowColorShader);

            ProgrmaManager.getInstance().registe(NoShadowShader.NoShadowShader, new NoShadowShader);
            this.noShadowShder = ProgrmaManager.getInstance().getProgram(NoShadowShader.NoShadowShader);
        }
     
        protected drawTemp($dis: Display3DSprite): void {

            
            var $objdata: ObjData = $dis.objData;
            var $shader: Shader3D 
            if (shadow.ShadowModel.visible) {
                $shader = this.modelShder;
            } else {
                $shader = this.noShadowShder;
            }
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);

                Scene_data.context3D.setVc3fv($shader, "sunDirect", (<scene3d.OverrideSceneManager>this._scene).light.sunDirect);
                Scene_data.context3D.setVc3fv($shader, "sunColor", (<scene3d.OverrideSceneManager>this._scene).light.sunColor);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", (<scene3d.OverrideSceneManager>this._scene).light.ambientColor);


                Scene_data.context3D.setVc4fv($shader, "focus3d", [GameDataModel.focus3d.x, GameDataModel.focus3d.y, GameDataModel.focus3d.z, this.y + 0]);
                Scene_data.context3D.setVc3fv($shader, "toColor", [GameDataModel.useColor.modelcolor.x, GameDataModel.useColor.modelcolor.y, GameDataModel.useColor.modelcolor.z]);


         
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);


                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);


                if (shadow.ShadowModel.visible) {
                    Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
                    Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                    Scene_data.context3D.setRenderTexture($shader, "fs1", (<scene3d.OverrideSceneManager>this._scene).fbo.texture, 1);
                }
            
                if (this.y > (GameDataModel.focus3d.y + 180) || this.y < (GameDataModel.focus3d.y - 450)) {
                } else {
                    Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
                }
                var $nu = Math.abs(this.y - GameDataModel.focus3d.y);
                if ($nu<100) {
                    this.needScanShadow = true
                } else {
                    this.needScanShadow = false
                }
            }
        }
        public setModelInfoData(itemObj: any): void {
            this.groupItem = new Array()
            var $dis: Display3DSprite = new Display3DSprite();
            $dis.setObjUrl(itemObj.objsurl)
            $dis._rotationData = new Float32Array(9)
            this.groupItem.push($dis);
            if (itemObj.materialInfoArr && itemObj.materialInfoArr.length) {
                this.setPicUrl(itemObj.materialInfoArr[0].url);
            } else {
                console.log("没有指定贴图")
            }
            this.updateRotationMatrix();
        }
    }

}