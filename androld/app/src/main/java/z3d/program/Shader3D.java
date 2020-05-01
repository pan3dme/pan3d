package z3d.program;


import android.opengl.GLES20;



public class Shader3D {

    public int program;


    public boolean encode() {

        String vertex= "attribute vec3 vPosition;\n"+

                "uniform mat4 vMatrix;\n"+
                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "gl_Position = vMatrix*vec4(vPosition*0.1,1);\n"+

                "}";


        String fragment ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "varying vec4 vDiffuse;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(1.0,0.0,0.0,1.0);\n"+
                "}";

        this.program= uCreateGlProgram(vertex,fragment);


        return true;

    }
    public boolean  encodeVstr(String vertex,String fragment)
    {
        this.program= uCreateGlProgram(vertex,fragment);


        return true;
    }

    //创建GL程序
    public static int uCreateGlProgram(String vertexSource, String fragmentSource){



        int vertex=uLoadShader(GLES20.GL_VERTEX_SHADER,vertexSource);
        if(vertex==0)return 0;
        int fragment=uLoadShader(GLES20.GL_FRAGMENT_SHADER,fragmentSource);
        if(fragment==0)return 0;
        int program= GLES20.glCreateProgram();
        if(program!=0){
            GLES20.glAttachShader(program,vertex);
            GLES20.glAttachShader(program,fragment);
            GLES20.glLinkProgram(program);

        }
        return program;
    }

    //加载shader
    public static int uLoadShader(int shaderType, String source){
        int shader= GLES20.glCreateShader(shaderType);
        if(0!=shader){
            GLES20.glShaderSource(shader,source);
            GLES20.glCompileShader(shader);
        }
        return shader;
    }


    private String getVertexShaderString() {
        return "";
    }
    private String getFragmentShaderString() {
        return "";
    }
    public void destory() {

    }
}
