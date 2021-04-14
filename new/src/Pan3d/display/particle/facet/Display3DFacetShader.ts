module Pan3d {
    export class Display3DFacetShader extends Shader3D {
        static Display3D_Facet_Shader: string = "Display3DFacetShader";
        
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
        }
         
        getVertexShaderString(): string {
            var $str: string = 
                "attribute vec3 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
        
                "uniform mat4 viewMatrix;\n"+
                "uniform mat4 camMatrix;\n"+
                "uniform mat4 modeMatrix;\n"+
                "uniform mat4 rotMatrix;\n"+
                "uniform vec2 uvMove;\n"+

                "varying vec2 v0;\n" +

                "void main(void){\n" +
                "   v0 = v2TexCoord+uvMove  ;\n" +
                "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
                "   gl_Position =viewMatrix*camMatrix*modeMatrix*rotMatrix* vt0;" +
                "}"
            return $str;
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D tex;\n" +
                "varying vec2 v0;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(tex, v0.xy);\n" +
                "gl_FragColor = infoUv;\n" +
                "}"
            return $str;

        }

    }
}