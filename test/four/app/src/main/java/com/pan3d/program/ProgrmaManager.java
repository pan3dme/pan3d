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


        if (keyStr.indexOf("Display3DLocusShader")!=-1&&false) {
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

//        shader.vertex=  "attribute vec3 v3Position;"+
//                "attribute vec2 v2CubeTexST;"+
//                "varying vec2 v0;"+
//                "attribute vec2 v2lightuv;"+
//                "varying vec2 v2;"+
//                "varying vec3 v1;"+
//                "uniform mat4 vpMatrix3D;"+
//                "uniform mat4 posMatrix3D;"+
//                "uniform mat3 rotationMatrix3D;"+
//                "void main(void){"+
//                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);"+
//                "vec4 vt0= vec4(v3Position, 1.0);"+
//                "vt0 =posMatrix3D* vt0   ;"+
//                "v2 = vec2(v2lightuv.x, v2lightuv.y);"+
//                "v1 = vec3(vt0.x,vt0.y,vt0.z);"+
//                "vt0 = vpMatrix3D*vt0 ;"+
//                "gl_Position = vt0; }";

        shader.fragment=
                "precision mediump float;"+
                        "uniform sampler2D fs0;"+
                        "uniform sampler2D fs1;"+
                        "uniform vec4 fc[1];"+
                        "varying vec2 v0;"+
                        "varying vec4 v2;"+
                        "varying vec2 v1;"+
                        "void main(void){"+
                        "vec4 ft0 = texture2D(fs0,v1);"+
                        "ft0.xyz *= ft0.w;"+
                        "vec4 ft1 = texture2D(fs1,v1);"+
//                        "ft1.xyz = ft1.xyz * ft1.w;"+
//                        "vec4 ft2 = ft0 * ft1;"+
//                        "ft0 = ft2 * v2.w;"+
//                        "ft1.xyz = ft0.xyz;"+
//                        "ft1.w = ft0.w;"+
                        "if(v2.x<fc[0].x){discard;}"+
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
