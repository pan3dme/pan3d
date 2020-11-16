module cannondis {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    import ObjData = Pan3d.ObjData;
    import ProgrmaManager = Pan3d.ProgrmaManager;
    import UIManager = Pan3d.UIManager;
    import TextureManager = Pan3d.TextureManager;
    import TextureRes = Pan3d.TextureRes;
    import Scene_data = Pan3d.Scene_data;

    import GameDataModel = game.GameDataModel;

    export class GameBgShader extends Shader3D {
        static GameBgShader: string = "GameBgShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "varying vec3 posv3d;" +

                "void main(void)" +
                "{" +

                "   posv3d= v3Position;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +

                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +

                "uniform vec3 colortop;" +
                "uniform vec3 colorbottom;" +
                "varying vec3 posv3d;" +

                "void main(void)\n" +
                "{\n" +
                    "vec3 tempcolor=colortop;" +
                    "tempcolor=colortop+(colorbottom-colortop)*(posv3d.y+1.0)/2.0;" +
                    "gl_FragColor =vec4(tempcolor,1.0);\n" +
                "}"
            return $str

        }

    }

    export class GameBgSprite extends Display3D {

        constructor() {
            super();
            this.initData()
        }
        protected initData(): void {
            ProgrmaManager.getInstance().registe(GameBgShader.GameBgShader, new GameBgShader);
            this.shader = ProgrmaManager.getInstance().getProgram(GameBgShader.GameBgShader);
            this.program = this.shader.program;

            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-1, -1,0.999);
            this.objData.vertices.push(1, -1, 0.999);
            this.objData.vertices.push(1, 1, 0.999);
            this.objData.vertices.push(-1, 1, 0.999);


            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);


            this.upToGpu();
        }

        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }
        public update(): void {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.setProgram(this.program);


                Scene_data.context3D.setVc3fv(this.shader, "colortop", [GameDataModel.useColor.bgTop.x, GameDataModel.useColor.bgTop.y, GameDataModel.useColor.bgTop.z]);
                Scene_data.context3D.setVc3fv(this.shader, "colorbottom", [GameDataModel.useColor.bgBottom.x, GameDataModel.useColor.bgBottom.y, GameDataModel.useColor.bgBottom.z]);

                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }


        }



    }
}