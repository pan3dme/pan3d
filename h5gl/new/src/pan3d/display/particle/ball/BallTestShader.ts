module Pan3d {
   
    export class BallTestShader extends Shader3D    {
        static BallTestShader: string = "BallTestShader";
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
                "attribute vec3 u2Texture;" +
                "varying vec2 v_texCoord;" +

                "uniform mat4 viewMatrix;\n"+
                "uniform mat4 camMatrix;\n"+
                "uniform mat4 modeMatrix;\n"+

                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position =viewMatrix*camMatrix*modeMatrix* vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =vec4(1.0,0.0,0,1.0);\n" +
                "}"
            return $str
        }
    }
}