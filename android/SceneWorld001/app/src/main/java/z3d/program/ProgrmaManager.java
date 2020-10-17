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

        if (keyStr.indexOf("content/particleresources/materials/ef_path_byte.txt")!=-1) {
            this.outShader(shader.vertex,"vertex");
            this.outShader(shader.fragment,"fragment");
            this.changeShader(shader);

        }
        shader.encodeVstr(shader.vertex,shader.fragment);
        this.dic.put(keyStr,shader);
        return shader;

    }

    private void changeShader(Shader3D shader) {
        shader.vertex=
                "attribute vec3 v3Position;\n"+
                        "attribute vec2 v2TexCoord;\n"+
                        "attribute vec4 v3Normal;\n"+
                        "uniform mat4 viewMatrix;\n"+
                        "uniform mat4 camMatrix;\n"+
                        "uniform mat4 modeMatrix;\n"+
                        "uniform vec4 vcmat30;\n"+
                        "uniform vec4 v3CamPos;\n"+
                        "varying vec2 v0;\n"+
                        "varying vec2 v1;\n"+
                        "varying vec4 v2;\n"+
                        "void main(){\n"+

                        "vec2 tempv0 = v2TexCoord;\n"+
                        "tempv0.x -= vcmat30.x;\n"+
                        "float alpha = tempv0.x/vcmat30.y;\n"+
                        "alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n"+
                        "float kill = -tempv0.x;\n"+
                        "kill *= tempv0.x - vcmat30.z;\n"+
                        "v2 = vec4(kill,0.0,0.0,alpha);\n"+
                        "v1 = v2TexCoord;\n"+
                        "v0 = tempv0;\n"+



                        "vec4 tempPos = modeMatrix * vec4(v3Position.xyz,1.0);\n"+
                        "vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"+
                        "vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n"+
                        "mulPos = normalize(vec3(v3CamPos.xyz) - mulPos);\n"+
                        "mulPos = cross(mulPos, normals);\n"+
                        "mulPos = normalize(mulPos);\n"+
                        "mulPos *= v3Normal.w*2.0  ;\n"+
                        "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"+

                        "gl_Position =viewMatrix*camMatrix*modeMatrix* tempPos ;\n"+


                        "}";
        shader.fragment=
                "precision mediump float;\n"+
                "uniform sampler2D fs0;"+
                "uniform sampler2D fs1;"+
                "uniform vec4 fc[1];"+
                "varying vec2 v0;\n"+
                "varying vec2 v1;\n"+
                "varying vec4 v2;\n"+
                "void main() {\n"+

                "vec4 ft0 = texture2D(fs0,v0);"+
                "ft0.xyz *= ft0.w;"+
                "vec4 ft1 = texture2D(fs1,v1);"+
                "ft1.xyz = ft1.xyz * ft1.w;"+
                "vec4 ft2 = ft0 * ft1;"+
                "ft0 = ft2 * v2.w;"+
                "ft1.xyz = ft0.xyz;"+
                "ft1.w = ft0.w;"+
                "if(v2.x<fc[0].x){discard;}"+
                "gl_FragColor = vec4(1,0,0,1);"+

                "}";
    }

    private void outShader(String value,String typeStr) {

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
