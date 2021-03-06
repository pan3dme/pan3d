package com.pan3d.material;

import com.pan3d.program.Shader3D;

import java.util.HashMap;

public class MaterialLoad {

    public MaterialBackFun fun;
    public HashMap info;
    public String url;
    public boolean autoReg;
    public String regName;
    public Shader3D shader3D;

    public MaterialLoad(MaterialBackFun $fun, HashMap $info, String $url, boolean $autoReg, String $regName, Shader3D $shader3D) {
        this.fun = $fun;
        this.info = $info;
        this.url = $url;
        this.autoReg = $autoReg;
        this.regName = $regName;
        this.shader3D = $shader3D;

    }
}
