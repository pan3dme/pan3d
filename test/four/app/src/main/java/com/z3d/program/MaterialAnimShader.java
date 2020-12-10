package com.z3d.program;

import com.z3d.scene.Scene3D;

public class MaterialAnimShader extends Shader3D {
    public  static  String shaderNameStr="MaterialAnimShader";

    public MaterialAnimShader(Scene3D val) {
        super(val);
    }

    public String getVertexShaderString() {

        String vertex= "attribute vec3 pos;\n"+
                "attribute vec2 v2Uv;\n"+
                "attribute vec4 boneID;\n"+
                "attribute vec4 boneWeight;\n"+
                "uniform vec4 boneQ[54];\n"+
                "uniform vec3 boneD[54];\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+
                "varying vec2 v0;\n"+
                "varying vec4 outcolor;\n"+



                "vec4 qdv(vec4 q,vec3 d, vec3 v ){\n"+
                    "vec3 t = 2.0 * cross(q.xyz, v);\n"+
                    "vec3 f = v + q.w * t + cross(q.xyz, t);\n"+
                    "return  vec4(f.x+d.x,f.y+d.y,f.z+d.z,1.0);\n"+
                "}\n"+
                "vec4 getQDdata(vec3 vdata){\n"+
                    "vec4 tempnum = qdv(boneQ[int(boneID.x)],boneD[int(boneID.x)],vdata) * boneWeight.x;\n"+
                    "tempnum += qdv(boneQ[int(boneID.y)],boneD[int(boneID.y)],vdata) * boneWeight.y;\n"+
                    "tempnum += qdv(boneQ[int(boneID.z)],boneD[int(boneID.z)],vdata)* boneWeight.z;\n"+
                    "tempnum += qdv(boneQ[int(boneID.w)],boneD[int(boneID.w)],vdata) * boneWeight.w;\n"+
                    "tempnum.x = tempnum.x*-1.0;\n"+
                    "return  tempnum;\n"+
                "}\n"+
                "vec4 qdvNrm(vec4 q, vec3 v ){\n"+
                    "vec3 t = 2.0 * cross(q.xyz, v);\n"+
                    "vec3 f = v + q.w * t + cross(q.xyz, t);\n"+
                    "return  vec4(f.x,f.y,f.z,1.0);\n"+
                "}\n"+
                "vec4 getQDdataNrm(vec3 vdata){\n"+
                    "vec4 tempnum = qdvNrm(boneQ[int(boneID.x)],vdata) * boneWeight.x;\n"+
                    "tempnum += qdvNrm(boneQ[int(boneID.y)],vdata) * boneWeight.y;\n"+
                    "tempnum += qdvNrm(boneQ[int(boneID.z)],vdata)* boneWeight.z;\n"+
                    "tempnum += qdvNrm(boneQ[int(boneID.w)],vdata) * boneWeight.w;\n"+
                    "tempnum.x = tempnum.x*-1.0;\n"+
                    "tempnum.xyz = normalize(tempnum.xyz);\n"+
                    "return  tempnum;\n"+
                "}\n"+
                "void main(){\n"+

                    "v0=v2Uv;\n"+
                    "vec4 vt0 = getQDdata(vec3(pos.x,pos.y,pos.z));\n"+
                    "gl_Position =vpMatrix3D*posMatrix *vec4(vt0.xyz,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "uniform sampler2D fs0;\n"+
                "varying vec2 v0;\n"+
                "varying vec4 outcolor;\n"+
                "void main() {\n"+
                    "vec4 infoUvf =texture2D(fs0,v0);\n"+
                    "if (infoUvf.w <= 0.5) {\n"+
                         "discard;\n"+
                    "};\n"+
                    "gl_FragColor= infoUvf;\n"+
                "}";

        return fragment;
    }
}

