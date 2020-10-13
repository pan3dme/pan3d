package z3d.material;

import java.util.ArrayList;
import java.util.List;

import z3d.display.Display3D;
import z3d.vo.Vector2D;

public class MaterialParam {

    public Material material ;
    public String materialUrl  ;
    public List<Object> dynamicTexList;
    public List<Object>  dynamicConstList ;



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

}
