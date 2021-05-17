module Pan3d {
   
    export class LineDisplayShader extends Shader3D    {
        static LineDisplayShader: string = "LineDisplayShader";
        constructor(value:Scene3D) {
           super(value);
        }
        binLocation(gl: WebGLRenderingContext): void {
            gl.bindAttribLocation(this.program, 0, "v3Position");
            gl.bindAttribLocation(this.program, 1, "v3Colors");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;\n"+
                "attribute vec3 v3Colors;\n"+

                "varying vec3 v_colors;\n"+

                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "void main(void)" +
                "{" +
                "   v_colors = v3Colors;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "varying vec3 v_colors;\n" +
                "void main(void)\n" +
                "{\n" +

                     "gl_FragColor =vec4(v_colors,1.0);\n" +

                "}"
            return $str
        }
    }
}