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


        if (keyStr.indexOf("MaterialShadercontent/materialinstance/jiemianwuqi/staticstand_byte.txttrue_")!=-1&&true) {
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

        shader.vertex= "attribute vec3 vPosition;\n"+

                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "gl_Position = vpMatrix3D*posMatrix*vec4(vPosition*0.1,1);\n"+

                "}";

        shader.fragment="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "varying vec4 vDiffuse;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(0.0,0.0,1.0,1.0);\n"+
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
