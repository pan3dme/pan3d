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
        if (keyStr.indexOf("particleresources/materials/m_ef_ver_byte")!=-1) {
            this.outShader(shader.vertex,"vertex");
            this.outShader(shader.fragment,"fragment");
//            this._changeShader(shader);

        }

        shader.encodeVstr(shader.vertex,shader.fragment);
        this.dic.put(keyStr,shader);
        return shader;

    }



    private void _changeShader(Shader3D shader) {
        shader.vertex=
                "attribute vec3 v3Position;"+
                        "attribute vec2 v2TexCoord;"+
                        "uniform mat4 viewMatrix;"+
                        "uniform mat4 camMatrix;"+
                        "uniform mat4 modeMatrix;"+
                        "uniform mat4 rotMatrix;"+
                        "varying vec2 v0;"+
                        "void main(){v0=v2TexCoord;"+
                        "vec4 vPos = vec4(v3Position.xyz,1.0);"+
                        "gl_Position =   (viewMatrix*camMatrix)*(modeMatrix*rotMatrix*vPos);"+
                        "}";
        shader.fragment=
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
    }

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
