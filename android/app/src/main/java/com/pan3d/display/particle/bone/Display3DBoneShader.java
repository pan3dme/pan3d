package com.pan3d.display.particle.bone;

import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;

public class Display3DBoneShader extends Shader3D {
    public  static  String shaderNameStr="Display3DBoneShader";

    public Display3DBoneShader(Scene3D val) {
        super(val);
    }

    public String getVertexShaderString() {

        String vertex=
                "attribute vec3 pos;" +
                        "attribute vec2 v2Uv;" +
                        "attribute vec4 boneID;" +
                        "attribute vec4 boneWeight;" +
                        "varying vec2 v0;" +
                        "uniform vec4 boneQ[54];" +
                        "uniform vec3 boneD[54];" +
                        "uniform mat4 vpMatrix3D;" +
                        "uniform mat4 modeMatrix;" +

                        "vec4 qdv(vec4 q, vec3 d, vec3 v ){" +
                        "   vec3 t = 2.0 * cross(q.xyz, v);" +
                        "   vec3 f = v + q.w * t + cross(q.xyz, t);" +
                        "   return vec4(f.x + d.x, f.y + d.y, f.z + d.z, 1.0);" +
                        " }" +
                        "vec4 getQDdata(vec3 vdata){" +
                        "   vec4 tempnum = qdv(boneQ[int(boneID.x)], boneD[int(boneID.x)], vdata) * boneWeight.x;" +
                        "   tempnum += qdv(boneQ[int(boneID.y)], boneD[int(boneID.y)], vdata) * boneWeight.y;" +
                        "   tempnum += qdv(boneQ[int(boneID.z)], boneD[int(boneID.z)], vdata) * boneWeight.z;" +
                        "   tempnum += qdv(boneQ[int(boneID.w)], boneD[int(boneID.w)], vdata) * boneWeight.w;" +
                        "   tempnum.x = tempnum.x * -1.0;" +
                        "   return tempnum;" +
                        " }" +


                        " void main(void){" +
                        "    v0 = v2Uv;" +
                        "    vec4 vt0 = getQDdata(vec3(pos.x, pos.y, pos.z));" +

                        "    vt0 = modeMatrix * vt0;" +
                        "    vt0 = vpMatrix3D * vt0;" +
                        "    gl_Position = vt0;\n" +
                        "  }";
        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment =
                "precision mediump float;"+
                        "uniform sampler2D fs0;"+
                        "uniform vec4 fc[1];"+
                        "varying vec2 v0;"+
                        "void main(void){"+
                        "vec4 ft0 = texture2D(fs0,v0);"+
                        "ft0.xyz *= ft0.w;"+
                        "vec4 ft1 = ft0 * fc[0];"+
                        "ft0.xyz = ft1.xyz;"+
                        "ft0.w = ft1.w;"+
                        "ft0.xyz = ft0.xyz * ft0.w;"+
                        "gl_FragColor = ft0;"+
                        "}";

        return fragment;
    }
}
