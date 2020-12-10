package com.z3d.material;

import com.z3d.base.Scene_data;
import com.z3d.base.TexTuresBackFun;
import com.z3d.engine.GC;
import com.z3d.filemodel.TextureManager;
import com.z3d.res.MaterialInfoVo;
import com.z3d.scene.Scene3D;

import java.util.ArrayList;
import java.util.List;

public class MaterialBaseParam extends GC {
    public Material material;
    public List<DynamicBaseTexItem> dynamicTexList ;
    public List<DynamicBaseConstItem> dynamicConstList ;

    public Scene3D scene3D;
    public MaterialBaseParam(Scene3D val){
        this.scene3D=val;
    }
    public void setData(Material mater, List<MaterialInfoVo> ary )
    {
        this.material = mater;
        this.dynamicConstList = new ArrayList();
        this.dynamicTexList = new ArrayList<>();
        List<ConstItem> constList  = mater.constList;
        List<TexItem> texList  = mater.texList;
        for (int i = 0; i < ary.size(); i++) {
            try {

                MaterialInfoVo obj = (MaterialInfoVo) ary.get(i);

                int objType= (int) obj.type;
                if (objType== 0) {
                final    DynamicBaseTexItem texItem = new DynamicBaseTexItem(scene3D);
                    texItem.paramName = (String) obj.name;
                    for (int j = 0; j < texList.size(); j++) {
                        if (texItem.paramName.equals(texList.get(j).paramName)) {
                            texItem.target = texList.get(j);
                            break;
                        }
                    }
                    int mipmap = 0;
                    if (texItem.target!=null) {
                        mipmap = texItem.target.mipmap;
                    }
                    mipmap = 0;
                    this.scene3D.textureManager.getTexture(Scene_data.fileRoot+ obj.url, new TexTuresBackFun() {
                        @Override
                        public void Bfun(TextureRes value) {
                            texItem.textureRes = value;
                        }
                    });
                    this.dynamicTexList.add(texItem);
                } else {
                    String targetName = (String)  obj.name;
                    ConstItem target=null ;
                    for (int j = 0; j < constList.size(); j++) {
                        if (targetName.equals( constList.get(j).paramName0)
                                || targetName.equals( constList.get(j).paramName1)
                                || targetName.equals(constList.get(j).paramName2)
                                || targetName .equals(constList.get(j).paramName3)) {

                            target = constList.get(j);
                            break;

                        }
                    }
                    DynamicBaseConstItem constItem = new DynamicBaseConstItem();
                    constItem.setTargetInfo(target, targetName, (int)objType);
                    List<Float> valArr=new ArrayList<>();
                    if (objType>= 1) {
                        valArr.add((float) obj.x);
                    }
                    if (objType >= 2) {
                        valArr.add((float) obj.y);
                    }
                    if (objType >= 3) {
                        valArr.add((float) obj.z);
                    }
                    constItem.setCurrentVal(valArr);
                    this.dynamicConstList.add(constItem);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void update() {
        if (this.material!=null && this.dynamicConstList!=null) {
            for (int i = 0; i < this.dynamicConstList.size(); i++) {
                this.dynamicConstList.get(i).update();
            }
        }
    }
}
