
module cannondis {
    
    import Display3DSprite = Pan3d.Display3DSprite;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = Pan3d.SceneManager;
    import TextureManager = Pan3d.TextureManager;
    import TextureRes = Pan3d.TextureRes;
    import DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;

    import ObjData = Pan3d.ObjData;
    import ProgrmaManager = Pan3d.ProgrmaManager

    import Scene_data = Pan3d.Scene_data;
    import Shader3D = Pan3d.Shader3D;
    import ShadowModel = shadow.ShadowModel;

    export class MainNoShadowShader extends Shader3D {
        static MainNoShadowShader: string = "MainNoShadowShader";
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
                "attribute vec3 v3Normal;" +

                "varying vec2 v0; " +
                "varying vec3 v2;" +
                "varying vec3 ambientColorF;" +

                "uniform vec3 sunDirect;" +
                "uniform vec3 sunColor;" +
                "uniform vec3 ambientColor;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
   

                "uniform mat3 rotationMatrix3D;" +
                "void main(void){;" +
                    "ambientColorF =ambientColor;" +
                    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y); " +
                    "gl_Position= vpMatrix3D * posMatrix3D *vec4(v3Position, 1.0);" +
      
                    "vec3 n = rotationMatrix3D * v3Normal;" +
                    "float suncos =  clamp(dot(n.xyz,sunDirect.xyz),0.0,1.0);" +
                    "v2 = sunColor * suncos ;" +
                "}"
            return $str;
        }

        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D fs0; " +
                "varying vec2 v0; " +
                "varying vec3 v2;" +
  
                "varying vec3 ambientColorF;" +
                "void main(void)\n" +
                "{\n" +

                    "vec4 ft0 = texture2D(fs0, v0); " +
                    "vec4 colorend =vec4((v2.xyz+ambientColorF.xyz)*ft0.xyz, 1); " +

                    "gl_FragColor = colorend; " +


                "}"
            return $str

        }

    }
    export class MainDirectShadowDisplay3DSprite extends DirectShadowDisplay3DSprite {
        constructor() {
            super();
            this.renderType = 0
            ProgrmaManager.getInstance().registe(MainNoShadowShader.MainNoShadowShader, new MainNoShadowShader);
            this.noShadowShder = ProgrmaManager.getInstance().getProgram(MainNoShadowShader.MainNoShadowShader);
        }
        protected noShadowShder: Shader3D
        private skinTexture: TextureRes
        public setOtherPic($str: string): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + $str, ($texture: TextureRes) => {
                this.skinTexture=$texture
            });

        }
        public renderType: number;
        private drawBaseSunColor($dis: Display3DSprite): void {
     
            var $objdata: ObjData = $dis.objData;
            var $shader: Shader3D
            if (shadow.ShadowModel.visible) {
                $shader = this.modelShder;
            } else {
                $shader = this.noShadowShder;
            }
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);
                var $numr: Vector3D = new Vector3D(0.5, 0.6, -0.7);
                $numr.normalize()
                var mGamA: Matrix3D = new Matrix3D;
                mGamA.appendRotation(-game.GameDataModel.gameAngle, Vector3D.Y_AXIS);
                $numr = mGamA.transformVector($numr)
                Scene_data.context3D.setVc3fv($shader, "sunDirect", [$numr.x, $numr.y, $numr.z]);
                Scene_data.context3D.setVc3fv($shader, "sunColor", [0.8, 0.8, 0.8]);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", [0.2, 0.2, 0.2]);

     
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);

                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);

                if (this.skinTexture) {
                    Scene_data.context3D.setRenderTexture($shader, "fs0", this.skinTexture.texture, 0);
                } else {
                    Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                }
                if (shadow.ShadowModel.visible) {
                    Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
                    Scene_data.context3D.setRenderTexture($shader, "fs1", (<scene3d.OverrideSceneManager>this._scene).fbo.texture, 1);
                }
                Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
            }

        }
        protected drawTemp($dis: Display3DSprite): void {
            if (this.renderType == 0) {
                this.drawBaseSunColor($dis)
            } else if (this.renderType == 1) {
                super.drawTemp($dis);
            }
        }

    }
}