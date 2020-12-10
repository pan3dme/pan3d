package com.z3d.program;

import android.util.Log;

import com.z3d.scene.Scene3D;

public class MaterialShader extends  Shader3D {
    private static final String TAG ="MaterialShader" ;
    public  static  String shaderNameStr="MaterialShader";

    public MaterialShader(Scene3D val) {
        super(val);
    }

    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec2 vTextCoord;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 v0;\n"+
                "void main(){\n"+
                "v0=vTextCoord;\n"+
                "gl_Position = vpMatrix3D*vec4(vPosition*0.1,1);\n"+

                "}";

        if(this.paramAry!=null){

            Boolean usePbr    = this.paramAry.get(0);
            Boolean useNormal = this.paramAry.get(1);
            Boolean hasFresnel = this.paramAry.get(2);
            Boolean useDynamicIBL = this.paramAry.get(3);
            Boolean lightProbe = this.paramAry.get(4);
            Boolean directLight = this.paramAry.get(5);
            Boolean noLight= this.paramAry.get(6);
            Boolean fogMode = this.paramAry.get(7);

            String addstr;
            String str=
                    "attribute vec3 v3Position;\n"+
                            "attribute vec2 v2CubeTexST;\n"+
                            "varying vec2 v0;\n";

            if (directLight) {
                addstr= "varying vec3 v2;\n";
                str=  str +addstr;
            } else if (noLight) {

            } else {
                addstr=
                        "attribute vec2 v2lightuv;\n"+
                                "varying vec2 v2;\n";
                str=  str +addstr;
            }
            if (usePbr) {
                addstr=
                        "attribute vec3 v3Normal;\n"+
                                "varying vec3 v1;\n";
                str=  str +addstr;
                if (!useNormal) {
                    addstr=  "varying vec3 v4;\n";
                    str=  str +addstr;
                } else {
                    addstr= "varying mat3 v4;\n";
                    str=  str +addstr;
                }
            } else if (fogMode ) {
                addstr=
                        "varying vec3 v1;\n";
                str=  str +addstr;
            }
            if (useNormal) {
                addstr=
                        "attribute vec3 v3Tangent;\n"+
                                "attribute vec3 v3Bitangent;\n";
                str=  str +addstr;
            }
            if (directLight) {
                if (!usePbr) {
                    addstr=
                            "attribute vec3 v3Normal;\n";
                    str=  str +addstr;
                }
                addstr=
                        "uniform vec3 sunDirect;\n"+
                                "uniform vec3 sunColor;\n"+
                                "uniform vec3 ambientColor;\n";
                str=  str +addstr;
            }
            addstr=
                    "uniform mat4 vpMatrix3D;\n"+
                            "uniform mat4 posMatrix3D;\n"+
                            "uniform mat3 rotationMatrix3D;\n";
            str=  str +addstr;
            addstr=
                    "void main(void){\n"+
                            "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n"+
                            "vec4 vt0= vec4(v3Position, 1.0);\n"+
                            "vt0 =posMatrix3D* vt0   ;\n";
            str=  str +addstr;
            if (!(directLight || noLight)) {
                addstr=  "v2 = vec2(v2lightuv.x, v2lightuv.y);\n";
                str=  str +addstr;
            }
            if (usePbr || fogMode ) {
                addstr=
                        "v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
                str=  str +addstr;
            }
            addstr=
                    "vt0 = vpMatrix3D*vt0 ;\n";
            str=  str +addstr;
            if (usePbr) {
                if (!useNormal) {
                    addstr=  "v4 =v3Normal* rotationMatrix3D ;\n";
                    str=  str +addstr;
                } else {
                    addstr=
                            "v4 = mat3(v3Tangent*rotationMatrix3D  ,v3Bitangent*rotationMatrix3D ,v3Normal* rotationMatrix3D );\n";
                    str=  str +addstr;
                }
            }
            if (directLight) {
                if (!usePbr) {
                    addstr=
                            "vec3 n = v3Normal*rotationMatrix3D ;\n"+
                                    "float suncos = dot(n.xyz,sunDirect.xyz);\n";
                    str=  str +addstr;
                } else {
                    addstr=
                            "float suncos = dot(v4.xyz,sunDirect.xyz);\n";
                    str=  str +addstr;
                }

                addstr=
                        "suncos = clamp(suncos,0.0,1.0);\n"+
                                "v2 = sunColor * suncos + ambientColor;";
                str=  str +addstr;

            }
            addstr= "gl_Position = vt0; }";
            str=  str +addstr;


            //  Log.d(  "str=>", str);

            Log.d(TAG, str);


            ProgrmaManager.outShader(str,"MaterialShader 顶点");
            return str;
        }



        return vertex;
    }
    public String getFragmentShaderString() {
        /*
        precision mediump float;
    uniform sampler2D fs0;
    uniform sampler2D fs1;
    uniform vec4 fc[3];
    varying vec2 v0;
    varying vec2 v2;
    varying vec3 v1;
    void main(void){

    vec4 ft0 = texture2D(fs0,v0);
    vec4 ft1 = texture2D(fs1,v2);
    ft1.xyz = ft1.xyz * 2.0;
    ft1.xyz = ft1.xyz * ft0.xyz;
    vec4 ft2 = vec4(0,0,0,1);
    ft2.xyz = ft1.xyz;
    ft2.w = 1.0;
    ft1.x = distance(v1.xyz*0.01,fc[1].xyz)*100.0;
    ft1.x = ft1.x - fc[0].z;
    ft1.x = fc[0].w * ft1.x;
    ft1.x = clamp(ft1.x,0.0,1.0);
    ft2.xyz = mix(ft2.xyz,fc[2].xyz,ft1.x);
    gl_FragColor = ft2;
         */
        String fragment ="precision mediump float;\n"+
                "varying vec2 v0;\n"+
                "uniform sampler2D fs0;\n"+
                "uniform sampler2D fs1;\n"+
                "void main() {\n"+

                "vec4 aa =texture2D(fs0,v0);\n"+
                "vec4 bb =texture2D(fs1,v0);\n"+
                "vec4 qq =vec4(0,0,0,1);\n"+

                "gl_FragColor=aa;\n"+
                "}";


        Log.d("fs=>", this.fragment);


        return fragment;
    }
}