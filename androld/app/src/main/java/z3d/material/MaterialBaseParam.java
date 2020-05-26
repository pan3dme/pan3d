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
    //    public  MaterialBaseParam  materialParam;
    public void setData(Material matr,List ary )
    {
        this.material = matr;
        this.dynamicConstList = new ArrayList();
        this.dynamicTexList = new ArrayList<>();
        List<ConstItem> constList  = matr.constList;
        List<TexItem> texList  = matr.texList;

        for (int i = 0; i < ary.size(); i++) {
            JSONObject obj = (JSONObject) ary.get(i);
            try {
                if ( obj.getInt("type")== 0) {
                final    DynamicBaseTexItem texItem = new DynamicBaseTexItem();
                    texItem.paramName = obj.getString("name");
                    for (int j = 0; j < texList.size(); j++) {
                        if (texItem.paramName == texList.get(j).paramName) {
                            texItem.target = texList.get(j);
                            break;
                        }
                    }
                    int mipmap = 0;
                    if (texItem.target!=null) {
                        mipmap = texItem.target.mipmap;
                    }
                    mipmap = 0;
                    TextureManager.getInstance().getTexture( obj.getString("url"), new TexTuresBackFun() {
                        @Override
                        public void Bfun(TextureRes value) {
                            texItem.textureRes = value;
                        }
                    });
                    this.dynamicTexList.add(texItem);
                } else {
                    String targetName = obj.getString("name");
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
                    constItem.setTargetInfo(target, targetName, obj.getInt("type"));
                    List<Float> valArr=new ArrayList<>();
                    if (obj.getInt("type") >= 1) {
                        valArr.add((float) obj.getDouble("x"));
                    }
                    if (obj.getInt("type") >= 2) {
                        valArr.add((float) obj.getDouble("y"));
                    }
                    if (obj.getInt("type") >= 3) {
                        valArr.add((float) obj.getDouble("z"));
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
