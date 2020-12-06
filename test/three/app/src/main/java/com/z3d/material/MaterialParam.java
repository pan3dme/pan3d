package com.z3d.material;

import java.util.ArrayList;
import java.util.List;

import com.z3d.program.Shader3D;
import com.z3d.vo.ParamDataConVo;
import com.z3d.vo.ParamDataVo;

public class MaterialParam {

    private static final String TAG = "MaterialParam";
    public Material material ;
    public String materialUrl  ;
    public Shader3D shader3D;
    public List<DynamicTexItem> dynamicTexList;
    public List<DynamicConstItem>  dynamicConstList ;



    public void setMaterial(Material val) {
        this.material = val;
        this.materialUrl =val.url;
        this.dynamicTexList = new ArrayList<>();
        this.dynamicConstList =new ArrayList<>();
        this.setTexList();
        this.setConstList();
    }

    private void setConstList() {
        List<ConstItem> constList = this.material.constList;
        for (int i = 0; i < constList.size(); i++) {
            ConstItem constItem  = constList.get(i);
            DynamicConstItem dyCon ;
            if (constItem.param0Type != 0) {
                dyCon = new DynamicConstItem();
                dyCon.setTargetInfo(constItem, constItem.paramName0, constItem.param0Type);
                this.dynamicConstList.add(dyCon);
            }
            if (constItem.param1Type != 0) {
                dyCon = new DynamicConstItem();
                dyCon.setTargetInfo(constItem, constItem.paramName1, constItem.param1Type);
                this.dynamicConstList.add(dyCon);
            }
            if (constItem.param2Type != 0) {
                dyCon = new DynamicConstItem();
                dyCon.setTargetInfo(constItem, constItem.paramName2, constItem.param2Type);
                this.dynamicConstList.add(dyCon);
            }
            if (constItem.param3Type != 0) {
                dyCon = new DynamicConstItem();

                dyCon.setTargetInfo(constItem, constItem.paramName3, constItem.param3Type);
                this.dynamicConstList.add(dyCon);
            }
        }
    }

    protected void setTexList() {
        List<TexItem> texList  = this.material.texList;
        for (int i = 0; i < texList.size(); i++) {
            DynamicTexItem dyTex ;
            TexItem texItem= texList.get(i);
            if (texItem.isParticleColor) {
                dyTex = new DynamicTexItem();
                dyTex.target = texItem;
                dyTex.paramName =texItem.paramName;
                dyTex.initCurve(4);
                this.dynamicTexList.add(dyTex);
                dyTex.isParticleColor = true;
            } else if (texItem.isDynamic) {
                dyTex = new DynamicTexItem();
                dyTex.target = texItem;
                dyTex.paramName = texItem.paramName;
                this.dynamicTexList.add(dyTex);
            }

        }
    }

    public void setLife(float life) {
        for (int i = 0; i < this.dynamicTexList.size(); i++) {
            if (this.dynamicTexList.get(i).isParticleColor) {
                this.dynamicTexList.get(i).life =life;
            }
        }
    }

    public void setTextObj(List<ParamDataVo> ary) {
        for (int i = 0; i < ary.size(); i++) {
            ParamDataVo obj =(ParamDataVo) ary.get(i);
            for (int j = 0; j < this.dynamicTexList.size(); j++) {
                DynamicTexItem dynamicTexItem=    this.dynamicTexList.get(j);
                if (dynamicTexItem.paramName.equals(obj.paramName)) {
                    if (dynamicTexItem.isParticleColor) {
                        dynamicTexItem.curve.setData(obj.curve);
                    } else {
                        dynamicTexItem.url = obj.url;
                    }
                    break;
                }
            }
        }

    }

    public void setConstObj(List<ParamDataConVo> ary) {
        for (int i = 0; i < ary.size(); i++) {
            ParamDataConVo obj = ary.get(i);
            for (int j = 0; j < this.dynamicConstList.size(); j++) {
                DynamicConstItem dynamicConstItem=    this.dynamicConstList.get(j);
                if (dynamicConstItem.paramName.equals(obj.paramName)) {
                    dynamicConstItem.curve.setData(obj.curve);
                    break;
                }
            }
        }


    }

}
