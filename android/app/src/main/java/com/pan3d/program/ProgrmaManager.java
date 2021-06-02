package com.pan3d.program;

import android.util.Log;

import com.pan3d.base.ResGC;
import com.pan3d.material.Material;
import com.pan3d.scene.Scene3D;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProgrmaManager extends ResGC {


    private static final String TAG = "ProgrmaManager";


    public ProgrmaManager(Scene3D val) {

        super(val);
    }

    public   void  registe(String name, Shader3D shader3d)
    {
        if (!this.dic.containsKey(name)) {
            shader3d.encode();
            this.dic.put(name,shader3d);
        }
    }
    public Shader3D getProgram(String name)
    {
        if (this.dic.containsKey(name)) {
            return (Shader3D)this.dic.get(name);
        }

        return null;
    }
    private  List<Shader3D> _waitArr=new ArrayList<>();
    public void  addWaitArr(Shader3D val){
        _waitArr.add(val);
    }
    public   void upDataProgramWaitIng(){
        while (_waitArr.size()>0){
            Shader3D shader3D=   _waitArr.remove(0);
            shader3D.program= Shader3D.uCreateGlProgram( shader3D.vertex, shader3D.fragment);
        }
    }
    public Shader3D getMaterialProgram(String key, Shader3D shaderCls, Material material, List<Boolean> paramAry, Boolean parmaByFragmet)
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
                    (Boolean)  material.noLight,  material.fogMode!=0));

        }
        Shader3D shader=shaderCls;
        shader.paramAry = paramAry;
        shader.vertex=shader.vertexStr();
        shader.fragment = material.shaderStr;


        if (keyStr.indexOf("Display3DBoneShadercontent/particleresources/materials/m_ef_ver_byte.txt_true_true_true_truefalse_")!=-1&&true) {
            Log.d(TAG, keyStr);
            this.outShader(shader.vertex,"vertex");
            this.outShader(shader.fragment,"fragment");

            this._changeShader(shader);

        }
        shader.encodeVstr(shader.vertex,shader.fragment);
        this.dic.put(keyStr,shader);
        return shader;

    }



    private void _changeShader(Shader3D shader) {
        /*
        "attribute vec3 v3Position;"+
                "attribute vec2 v2CubeTexST;"+
                "varying vec2 v0;"+
                "attribute vec3 v3Normal;"+
                "varying vec3 v1;"+
                "varying vec3 v4;"+
                "uniform mat4 vpMatrix3D;"+
                "uniform mat4 posMatrix3D;"+
                "uniform mat3 rotationMatrix3D;"+
                "void main(void){"+
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);"+
                "vec4 vt0= vec4(v3Position, 1.0);"+
                "vt0 =posMatrix3D* vt0   ;"+
                "v1 = vec3(vt0.x,vt0.y,vt0.z);"+
                "vt0 = vpMatrix3D*vt0 ;"+
                "v4 =v3Normal* rotationMatrix3D ;"+
                "gl_Position = vt0; }";
        */

//        shader.vertex=

/*
"precision mediump float;"+
    "uniform sampler2D fs0;"+
    "uniform sampler2D fs1;"+
    "uniform samplerCube fs2;"+
    "uniform vec4 fc[2];"+
    "varying vec2 v0;"+
    "varying vec3 v1;"+
    "varying vec3 v4;"+
    "void main(void){"+
    "vec4 ft0 = texture2D(fs0,v0);"+
    "vec4 ft1 = vec4(ft0.xyz,1.0);"+
    "vec4 ft2 = vec4(0,0,0,1);"+
    "ft2.xyz = v4.xyz;"+
    "vec4 ft3 = vec4(0,0,0,1);"+
    "ft3.xyz = mix(vec3(fc[1].y,fc[1].y,fc[1].y) * 0.08,ft1.xyz,fc[1].x);"+
    "vec4 ft4 = vec4(0,0,0,1);"+
    "ft4.xyz = fc[0].xyz - v1.xyz;"+
    "ft4.xyz = normalize(ft4.xyz);"+
    "ft4.y= dot(ft4.xyz,ft2.xyz);"+
    "ft4.x = fc[1].z;"+
    "ft4 = texture2D(fs1,ft4.xy);"+
    "ft3.xyz = ft3.xyz * ft4.x + ft4.y;"+
    "ft3.xyz = ft3.xyz * fc[1].y;"+
    "ft4.xyz = v1.xyz - fc[0].xyz;"+
    "ft4.xyz = normalize(ft4.xyz);"+
    "ft4.xyz = reflect(ft4.xyz,ft2.xyz);"+
    "ft4 = textureCube(fs2,ft4.xyz);"+
    "ft3.xyz = ft3.xyz * ft4.xyz;"+
    "ft4.xyz = ft1.xyz * (1.0-fc[1].x);"+
    "ft4.xyz = ft4.xyz + ft3.xyz;"+
    "ft4.w = 1.0;"+
    "gl_FragColor = ft4;"+
    "}";

 */

        shader.fragment= "precision mediump float;"+
                "uniform sampler2D fs0;"+
                "uniform vec4 fc[1];"+
                "varying vec2 v0;"+
                "void main(void){"+


                "gl_FragColor = vec4(1,0,0,1);"+
                "}";;




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
