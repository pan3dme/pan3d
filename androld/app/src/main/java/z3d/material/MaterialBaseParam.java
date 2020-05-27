package z3d.material;

import android.util.Log;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.MathCore;
import z3d.base.TexTuresBackFun;
import z3d.engine.GC;
import z3d.filemodel.TextureManager;

public class MaterialBaseParam extends GC {
    public Material material;
    public List dynamicTexList ;
    public List dynamicConstList ;


    public void setData(   Material mater,  List ary )
    {
        this.material = mater;
        this.dynamicConstList = new ArrayList();
        this.dynamicTexList = new ArrayList<>();
        List<ConstItem> constList  = mater.constList;
        List<TexItem> texList  = mater.texList;

        for (int i = 0; i < ary.size(); i++) {
            HashMap obj =(HashMap) ary.get(i);
            try {

                int objType=(int)obj.get("type");

                if (objType== 0) {
                final    DynamicBaseTexItem texItem = new DynamicBaseTexItem();
                    texItem.paramName = (String) obj.get("name");
                    String paramNameC=(String)obj.get("name");

                    for (int j = 0; j < texList.size(); j++) {

                          String paramNameA=texItem.paramName;
                            String paramNameB=texList.get(j).paramName;
                        if (paramNameB=="param0") {
                            texItem.target = texList.get(j);
                            break;
                        }

                    }
                    int mipmap = 0;
                    if (texItem.target!=null) {
                        mipmap = texItem.target.mipmap;
                    }
                    mipmap = 0;
                    TextureManager.getInstance().getTexture( (String) obj.get("url"), new TexTuresBackFun() {
                        @Override
                        public void Bfun(TextureRes value) {
                            texItem.textureRes = value;
                        }
                    });
                    this.dynamicTexList.add(texItem);
                } else {
                    String targetName =(String) obj.get("name");
                    ConstItem target=null ;
                    for (int j = 0; j < constList.size(); j++) {

                        if (targetName == constList.get(j).paramName0
                                || targetName == constList.get(j).paramName1
                                || targetName == constList.get(j).paramName2
                                || targetName == constList.get(j).paramName3) {

                            target = constList.get(j);
                            break;

                        }
                    }
                    DynamicBaseConstItem constItem = new DynamicBaseConstItem();
                    constItem.setTargetInfo(target, targetName, objType);
                    List<Float> valArr=new ArrayList<>();
                    if (objType>= 1) {
                        valArr.add((float) obj.get("x"));
                    }
                    if (objType >= 2) {
                        valArr.add((float) obj.get("y"));
                    }
                    if (objType >= 3) {
                        valArr.add((float) obj.get("z"));
                    }
                    constItem.setCurrentVal(valArr);
                    this.dynamicConstList.add(constItem);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
