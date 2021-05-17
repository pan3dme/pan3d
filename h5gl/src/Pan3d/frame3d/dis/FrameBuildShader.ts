module Pan3d {
   
    export class FrameBuildShader extends Shader3D    {
        static FrameBuildShader: string = "FrameBuildShader";
        constructor(value:Scene3D) {
           super(value);
        }
        binLocation(gl: WebGLRenderingContext): void {
            gl.bindAttribLocation(this.program, 0, "v3Position");
            gl.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +

                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "uniform sampler2D fs0;" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(fs0, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}"
            return $str
        }
    }
}