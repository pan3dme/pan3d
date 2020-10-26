package scene.dis;

import z3d.program.Shader3D;

public class TwoTextureShader extends Shader3D {

    public  static  String shaderNameStr="TwoTextureShader";
    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec2 vTextCoord;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 v0;\n"+
                "void main(){\n"+
                "v0=vTextCoord;\n"+
                "gl_Position = vpMatrix3D*posMatrix*vec4(vPosition*0.1,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "varying vec2 v0;\n"+
                "uniform sampler2D fs0;\n"+
                "uniform sampler2D fs1;\n"+

                "void main() {\n"+
                "vec4 infoUvfa =texture2D(fs0,v0);\n"+
                "vec4 infoUvfb =texture2D(fs1,v0);\n"+
//                "gl_FragColor= vec4(1,0,0,1);\n"+
                "gl_FragColor= infoUvfa*infoUvfb;\n"+
                "}";

        return fragment;
    }
}
