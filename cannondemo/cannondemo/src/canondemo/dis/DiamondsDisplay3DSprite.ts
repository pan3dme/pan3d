module cannondis {
    import ProgrmaManager = Pan3d.ProgrmaManager
    import ObjData = Pan3d.ObjData
    import UIManager = Pan3d.UIManager
    import Vector3D = Pan3d.Vector3D
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import ObjDataManager = Pan3d.ObjDataManager
    import Shader3D = Pan3d.Shader3D
    import Display3DSprite = Pan3d.Display3DSprite
    import TextureRes = Pan3d.TextureRes
    import GroupDataManager = Pan3d.GroupDataManager
    import GroupItem = Pan3d.GroupItem
    import GroupRes = Pan3d.GroupRes
    import BaseRes = Pan3d.BaseRes
    import ShadowModel = shadow.ShadowModel;

    export class DiamondsDisplay3DShader extends Shader3D {
        static DiamondsDisplay3DShader: string = "DiamondsDisplay3DShader";
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
            "attribute vec2 v2CubeTexST; " +
            "attribute vec3 v3Normal; " +
            "varying vec2 v0; " +
            "varying vec3 v1; " +
            "varying vec3 v4; " +
            "uniform mat4 vpMatrix3D; " +
            "uniform mat4 posMatrix3D; " +
            "uniform mat3 rotationMatrix3D; " +
            "void main(void){ " +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y); " +
                "vec4 vt0 = vec4(v3Position, 1.0); " +
                "vt0 = posMatrix3D * vt0; " +
                "v1 = vec3(vt0.x, vt0.y, vt0.z); " +
                "vt0 = vpMatrix3D * vt0; " +
                "v4 = rotationMatrix3D * v3Normal; " +
                "gl_Position = vt0; " +
            "} "
            return $str;
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;" +
                "uniform sampler2D fs0; " +
                "uniform sampler2D fs1; " +
                "uniform samplerCube fs2; " +
                "uniform vec4 fc[2]; " +
                "varying vec2 v0; " +
                "varying vec3 v1; " +
                "varying vec3 v4; " +
                "void main(void){" +
                    "vec4 ft0 = texture2D(fs0, v0); " +
                    "vec4 ft1 = vec4(ft0.xyz, 1.0); " +
                    "vec4 ft2 = vec4(0, 0, 0, 1); " +
                    "ft2.xyz = v4.xyz; " +
                    "vec4 ft3 = vec4(0, 0, 0, 1); " +
                    "ft3.xyz = mix(vec3(fc[1].y, fc[1].y, fc[1].y) * 0.08, ft1.xyz, fc[1].x); " +
                    "vec4 ft4 = vec4(0, 0, 0, 1); " +
                    "ft4.xyz = fc[0].xyz - v1.xyz; " +
                    "ft4.xyz = normalize(ft4.xyz); " +
                    "ft4.y = dot(ft4.xyz, ft2.xyz); " +
                    "ft4.x = 0.5; " +
                    "ft4 = texture2D(fs1, ft4.xy); " +
                    "ft3.xyz = ft3.xyz * ft4.x + ft4.y; " +
                    "ft3.xyz = ft3.xyz * fc[1].y; " +
                    "ft4.xyz = v1.xyz - fc[0].xyz; " +
                    "ft4.xyz = normalize(ft4.xyz); " +
                    "ft4.xyz = reflect(ft4.xyz, ft2.xyz); " +
                    "ft4 = textureCube(fs2, ft4.xyz); " +
                    "ft3.xyz = ft3.xyz * ft4.xyz; " +
                    "ft4.xyz = ft1.xyz * (1.0 - fc[1].x); " +
                    "ft4.xyz = ft4.xyz + ft3.xyz; " +
                    "ft4.w = 1.0; " +
                    "gl_FragColor = ft4; " +

                "}"
            return $str

 
         
     
   

        }

    }


    export class DiamondsDisplay3DSprite extends Display3DSprite {

        constructor() {
            super();
            this.initData()
            this.needScanShadow = false
        }
        public needScanShadow: boolean = true
        protected initData(): void {
            ProgrmaManager.getInstance().registe(DiamondsDisplay3DShader.DiamondsDisplay3DShader, new DiamondsDisplay3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(DiamondsDisplay3DShader.DiamondsDisplay3DShader);
            this.makeTexture();
        }
       
        private makeTexture(): void {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(64, 64, false);
            $ctx.fillStyle = "rgba(128,128,128,1)";
            $ctx.fillRect(0, 0, 64, 64);
            this.baseTexture = TextureManager.getInstance().getCanvasTexture($ctx)
        }
        public update(): void {
            this.rotationY++
       
            if (this.objData && this.sceneVisible ) {

       
                if (game.GameDataModel.centenBall && Math.abs(this.y - game.GameDataModel.centenBall.y) < 300) {
                    this.textHitCentenBall();
                    Scene_data.context3D.setProgram(this.shader.program);
                    Scene_data.context3D.setVcMatrix3fv(this.shader, "rotationMatrix3D", this._rotationData);
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);

                    Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, this.objData.vertexBuffer);

                    Scene_data.context3D.setRenderTexture(this.shader, "fs0", this.baseTexture.texture, 0);
                    Scene_data.context3D.setRenderTexture(this.shader, "fs1", this.baseTexture.texture, 1);

                    if (Scene_data.skyCubeMap) {
                        var cubeTexture: WebGLTexture = Scene_data.skyCubeMap[0];
                        Scene_data.context3D.setRenderTextureCube(this.shader.program, "fs2", cubeTexture, 2);
                    }
                    Scene_data.context3D.setVc4fv(this.shader, "fc", [Scene_data.cam3D.x / 100, Scene_data.cam3D.y / 100, Scene_data.cam3D.z / 100, 0, 1.5, 2.3, 0, 1]);
                    Scene_data.context3D.setVaOffset(0, 3, this.objData.stride, 0);
                    Scene_data.context3D.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
                    Scene_data.context3D.setVaOffset(2, 3, this.objData.stride, this.objData.normalsOffsets);


                    Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

                    Scene_data.context3D.setRenderTexture(this.shader, "fs1", null, 1);
                    Scene_data.context3D.setRenderTexture(this.shader, "fs2", null, 2);
                }

              
            }
        }
        protected textHitCentenBall(): void {
            var $dis: number = Vector3D.distance(new Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z), new Vector3D(this.x, this.y, this.z))
            if ($dis < 20) {
                this.sceneVisible = false
                this.showFinishEfict()
         
                var $num: number = GameData.hasdiamondsHavenum
   
                GameData.hasdiamondsHavenum = $num+1
                GameData.saveDiamondsByKey(this.name);
      
            
                Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
              
                game.GameSoundManager.getInstance().playSoundByName(Pan3d.Scene_data.fileRoot + "sound/" + "getdiamond" + ".mp3")

           
            }
        }
        public showFinishEfict(): void {
            var $v3d: Vector3D = new Vector3D(this.x, this.y+10, this.z)


            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SHOW_SPECIAL_EFFECT),{ pos: $v3d, name: "diamondseffect" });

        }
        public setModelById($str: string): void {
 
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + getModelUrl($str), (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    if (item.types == BaseRes.PREFAB_TYPE) {
                        this.setObjUrl(item.objUrl)
                        this._rotationData = new Float32Array(9)
                
                    }
                }
                this.updateRotationMatrix();
            })


        }

    }

}


/*
 * 
             "precision mediump float;" +
            "uniform sampler2D fs0; " +
            "uniform sampler2D fs1; " +
            "uniform samplerCube fs2; " +
            "uniform vec4 fc[2]; " +
            "varying vec2 v0; " +
            "varying vec3 v1; " +
            "varying vec3 v4; " +
            "void main(void){" +
                "vec4 ft0 = texture2D(fs0, v0); " +
                "vec4 ft1 = vec4(ft0.xyz, 1.0); " +
                "vec4 ft2 = vec4(0, 0, 0, 1); " +
                "ft2.xyz = v4.xyz; " +
                "vec4 ft3 = vec4(0, 0, 0, 1); " +
                "ft3.xyz = mix(vec3(fc[1].y, fc[1].y, fc[1].y) * 0.08, ft1.xyz, fc[1].x); " +
                "vec4 ft4 = vec4(0, 0, 0, 1); " +
                "ft4.xyz = fc[0].xyz - v1.xyz; " +
                "ft4.xyz = normalize(ft4.xyz); " +
                "ft4.y = dot(ft4.xyz, ft2.xyz); " +
                "ft4.x = 0.5; " +
                "ft4 = texture2D(fs1, ft4.xy); " +
                "ft3.xyz = ft3.xyz * ft4.x + ft4.y; " +
                "ft3.xyz = ft3.xyz * fc[1].y; " +
                "ft4.xyz = v1.xyz - fc[0].xyz; " +
                "ft4.xyz = normalize(ft4.xyz); " +
                "ft4.xyz = reflect(ft4.xyz, ft2.xyz); " +
                "ft4 = textureCube(fs2, ft4.xyz); " +
                "ft3.xyz = ft3.xyz * ft4.xyz; " +
                "ft4.xyz = ft1.xyz * (1.0 - fc[1].x); " +
                "ft4.xyz = ft4.xyz + ft3.xyz; " +
                "ft4.w = 1.0; " +
                "gl_FragColor = ft4; " +

            "}"
 * */