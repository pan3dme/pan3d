module Pan3d {
    export class Display3DLocusShader extends Shader3D {
        static Display3D_Locus_Shader: string = "Display3DLocusShader";
      
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
            if (this.paramAry[0]) {
                $context.bindAttribLocation(this.program, 2, "v3Normal");
            }
        }
        public static shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, posMatrix3D: 2 };
        public static shader_vec4 = { uvMove: [3, 0], camPos: [3, 1], isUv: [3, 2] };
        public getMat4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_mat4[key] + "]";
        }
        public getVec4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_vec4[key][0] + "][" + Display3DLocusShader.shader_vec4[key][1] + "]";
        }
        public static getVcSize(): number {
            return 4;
        }
        getVertexShaderString(): string {
            var isWatchEye: boolean = this.paramAry[0];
            var isUV: boolean = this.paramAry[1];
            var hasParticleColor: boolean = this.paramAry[2];

            var defineBaseStr: string =
            "attribute vec4 v3Position;\n"+
            "attribute vec2 v2TexCoord;\n"+
            "attribute vec4 v3Normal;\n"+
            "uniform mat4 viewMatrix;\n"+
            "uniform mat4 camMatrix;\n"+
            "uniform mat4 modeMatrix;\n"+
            "uniform vec3 vcmat30;\n"+
            "varying vec2 v0;\n"+
            "varying vec4 v2;\n"+
            "varying vec2 v1;\n";
            if(isWatchEye){//面向视角需要有镜头
                defineBaseStr+= "uniform vec4 v3CamPos;\n";
            }
            var mainBaseStr:string= 

            "   vec2 tempv0 = v2TexCoord;\n"+
        "   tempv0.x -= vcmat30.x;\n"+
        "   float alpha = tempv0.x/vcmat30.y;\n"+
        "   alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n"+
        "   float kill = -tempv0.x;\n"+
        "   kill *= tempv0.x - vcmat30.z;\n"+
        "   v2 = vec4(kill,0.0,0.0,alpha);\n"+
        "   v1 = v2TexCoord;\n"+
        "   v0 = tempv0;\n"+
 
            "   vec4 tempPos = modeMatrix* v3Position;\n"+
            "   vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"+
            "   vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n";

            if(isWatchEye){//面向视角需要有镜头算法
                mainBaseStr+="   mulPos = normalize(vec3(v3CamPos.xyz) - mulPos);\n";
            }
            mainBaseStr+= "   mulPos = cross(mulPos, normals);\n"+
            "   mulPos = normalize(mulPos);\n"+
            "   mulPos *= v3Normal.w;\n"+
            "   tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"+
            "   gl_Position = viewMatrix  * camMatrix * modeMatrix* tempPos;\n" ;
 
            var resultStr: string = defineBaseStr+
            "void main(void){\n"+
            mainBaseStr+
            "}";
            

            return resultStr;

        }
        getFragmentShaderString(): string {
            var $str: string =
            "precision mediump float;\n"+
             "uniform sampler2D fs0;\n"+
             "uniform sampler2D fs1;\n"+
             "uniform vec4 fc[1];\n"+
             "varying vec2 v0;\n"+
             "varying vec4 v2;\n"+
             "varying vec2 v1;\n"+
             "void main(void){\n"+
             "\n"+
             "vec4 ft0 = texture2D(fs0,v0);\n"+
     
             "vec4 ft1 = texture2D(fs1,v1);\n"+
           
             "gl_FragColor = vec4(1,0,0,1);\n"+
             "\n"+
             "}";
       
            return $str;

        }

    }
}