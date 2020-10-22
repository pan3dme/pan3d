package z3d.program;

import android.content.Context;
import android.util.Log;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import z3d.base.ResGC;
import z3d.display.particle.CombineParticleData;
import z3d.display.particle.locus.Display3DLocusShader;
import z3d.material.Material;

public class ProgrmaManager extends  ResGC {


    private static final String TAG = "ProgrmaManager";
    private static ProgrmaManager _instance;

    public static ProgrmaManager getInstance() {
        if (ProgrmaManager._instance==null) {
            ProgrmaManager._instance = new ProgrmaManager();
        }
        return ProgrmaManager._instance;
    }
    public ProgrmaManager( ){
        super();
    }

    public   void  registe(String name,Shader3D shader3d)
    {
        if (!this.dic.containsKey(name)) {
            shader3d.encode();
            this.dic.put(name,shader3d);
        }
    }
    public   Shader3D getProgram(String name)
    {
        if (this.dic.containsKey(name)) {
            return (Shader3D)this.dic.get(name);
        }

        return null;
    }
    public Shader3D getMaterialProgram(String key, Shader3D shaderCls, Material material, List<Boolean> paramAry,Boolean parmaByFragmet)
    {
        String keyStr =key+material.url;
        if (paramAry!=null) {
            for (int i = 0; i < paramAry.size(); i++) {
                keyStr += "_" + paramAry.get(i);
            }
            if (parmaByFragmet) {
                keyStr += "true_";
            } else {
                keyStr += "false_";
            }
        }
        if (this.dic.containsKey(keyStr)) {
            return (Shader3D)this.dic.get(keyStr);
        }
        if (parmaByFragmet) {
            paramAry= new ArrayList<Boolean>(Arrays.asList((Boolean)material.usePbr,(Boolean) material.useNormal,(Boolean) material.hasFresnel,
                    (Boolean)material.useDynamicIBL, (Boolean)material.lightProbe, (Boolean)material.directLight,
                    (Boolean)  material.noLight,  material.fogMode==1));

        }
        Shader3D  shader=shaderCls;
        shader.paramAry = paramAry;
        shader.vertex=shader.vertexStr();
        shader.fragment = material.shaderStr;

        //轨迹粒子

        if (keyStr.indexOf("content/particleresources/materials/ef_path_byte.txt")!=-1) {
//            this.outShader(shader.vertex,"vertex");
//            this.outShader(shader.fragment,"fragment");
//             this._changeLocusShader(shader);
        }
        //椭球粒子
        if (keyStr.indexOf("content/particleresources/materials/m_ef_par_byte.txt")!=-1) {
//            this.outShader(shader.vertex,"vertex");
//            this.outShader(shader.fragment,"fragment");
//            this._changeBallShader(shader);
        }

        if (keyStr.indexOf("Display3DBallPartilceShader")!=-1) {
//            this.outShader(shader.vertex,"vertex");
//            this.outShader(shader.fragment,"fragment");
//            this._changeBallShader(shader);
        }
        if (keyStr.indexOf("MaterialShader")!=-1) {
            this.outShader(shader.vertex,"vertex");
            this.outShader(shader.fragment,"fragment");
            this._changeShader(shader);
            Log.d(TAG, "-----------");

        }

        shader.encodeVstr(shader.vertex,shader.fragment);
        this.dic.put(keyStr,shader);
        return shader;

    }

/*
 "attribute vec3 v3Position;"+
    "attribute vec2 v2CubeTexST;"+
    "varying vec2 v0;"+
    "attribute vec2 v2lightuv;"+
    "varying vec2 v2;"+
    "varying vec3 v1;"+
    "uniform mat4 vpMatrix3D;"+
    "uniform mat4 posMatrix3D;"+
    "uniform mat3 rotationMatrix3D;"+
    "void main(void){"+
    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);"+
    "vec4 vt0= vec4(v3Position, 1.0);"+
    "vt0 = vt0*posMatrix3D   ;"+
    "v2 = vec2(v2lightuv.x, v2lightuv.y);"+
    "v1 = vec3(vt0.x,vt0.y,vt0.z);"+
    "vt0 = vt0*vpMatrix3D ;"+
    "gl_Position = vt0; }";
 */

    private void _changeShader(Shader3D shader) {
        shader.vertex=
                "attribute vec3 v3Position;\n"+
                        "attribute vec2 v2CubeTexST;\n"+
                        "attribute vec2 v2lightuv;\n"+
                        "uniform mat4 vpMatrix3D;\n"+
                        "uniform mat4 posMatrix;\n"+
                        "varying vec2 v0;"+
                        "varying vec2 v2;"+
                        "varying vec3 v1;"+
                        "void main(){\n"+
                        "v0=v2CubeTexST;\n"+
                        "v2 = v2lightuv;\n"+
                        "gl_Position = vpMatrix3D*vec4(v3Position*0.1,1);\n"+
                        "}";
        shader.fragment=
                "precision mediump float;\n"+
                        "uniform sampler2D fs0;"+
                        "uniform sampler2D fs1;"+
                        "uniform vec4 fc[3];"+
                        "varying vec2 v0;"+
                        "varying vec2 v2;"+
                        "varying vec3 v1;"+
                        "void main()"+
                        "{"+
                        "vec4 ft0 = texture2D(fs0,v0);"+
                        "vec4 ft1 = texture2D(fs1,v2);"+
                        "gl_FragColor =vec4(ft1);\n"+
                        "}";
    }
    /*
    "uniform sampler2D fs0;"+
    "uniform sampler2D fs1;"+
    "uniform vec4 fc[3];"+
    "varying vec2 v0;"+
    "varying vec2 v2;"+
    "varying vec3 v1;"+
    "void main(void){"+
    "vec4 ft0 = texture2D(fs0,v0);"+
    "vec4 ft1 = texture2D(fs1,v2);"+
    "ft1.xyz = ft1.xyz * 2.0;"+
    "ft1.xyz = ft1.xyz * ft0.xyz;"+
    "vec4 ft2 = vec4(0,0,0,1);"+
    "ft2.xyz = ft1.xyz;"+
    "ft2.w = 1.0;"+
    "ft1.x = distance(v1.xyz*0.01,fc[1].xyz)*100.0;"+
    "ft1.x = ft1.x - fc[0].z;"+
    "ft1.x = fc[0].w * ft1.x;"+
    "ft1.x = clamp(ft1.x,0.0,1.0);"+
    "ft2.xyz = mix(ft2.xyz,fc[2].xyz,ft1.x);"+
    "gl_FragColor = ft2;"+
    "}";
     */

    public static void outShader(String value,String typeStr) {

        String[] item = value.split("\n");
        String outStr="";
        outStr+="\n";
        outStr+= "以下内容请复制"+typeStr;
        outStr+="";
        for (int i=0; i<item.length; i++) {
            String  tempStr=item[i];
            if(tempStr.length()>0){
                outStr+="\n";
                outStr+="\"";
                outStr+= tempStr;

                if(i<item.length-1){
                    outStr+="\"+";

                }else{
                    outStr+="\";";
                }
            }
        }
        Log.d(TAG, outStr);
        Log.d(TAG, "-----------");

    }
}
