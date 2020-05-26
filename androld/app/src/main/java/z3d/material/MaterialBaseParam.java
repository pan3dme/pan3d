package z3d.material;

import java.util.List;

import z3d.engine.GC;

public class MaterialBaseParam extends GC {
    public Material material;
    public List<DynamicTexItem> dynamicTexList ;
    public List dynamicConstList ;



//    public  MaterialBaseParam  materialParam;
    public void setData(Material material,List arr )
    {
        this.material = material;

/*

        this.dynamicConstList = new Array;
        this.dynamicTexList = new Array;

        var constList: Array<ConstItem> = $material.constList;
        var texList: Array<TexItem> = $material.texList;

        for (var i: number = 0; i < $ary.length; i++) {
        var obj: any = $ary[i];
        if (obj.type == 0) {
            var texItem: DynamicBaseTexItem = new DynamicBaseTexItem();
            texItem.paramName = obj.name;


            for (var j: number = 0; j < texList.length; j++) {
                if (texItem.paramName == texList[j].paramName) {
                    texItem.target = texList[j];
                    break;
                }
            }
            var mipmap: number = 0
            if (texItem.target) {
                mipmap = texItem.target.mipmap;
            }
            mipmap = 0

            TextureManager.getInstance().getTexture(Scene_data.fileRoot + obj.url, ($textres: TextureRes) => {
                texItem.textureRes = $textres;
            }, 0, null, 0, mipmap);
            this.dynamicTexList.push(texItem);



        } else {
            var targetName: string = obj.name;

            var target: ConstItem = null;
            for (var j: number = 0; j < constList.length; j++) {

                if (targetName == constList[j].paramName0
                        || targetName == constList[j].paramName1
                        || targetName == constList[j].paramName2
                        || targetName == constList[j].paramName3) {

                    target = constList[j];

                    break;

                }

            }
            var constItem: DynamicBaseConstItem = new DynamicBaseConstItem();
            constItem.setTargetInfo(target, targetName, obj.type);

            if (obj.type == 1) {
                constItem.setCurrentVal(obj.x);
            } else if (obj.type == 2) {
                constItem.setCurrentVal(obj.x, obj.y);
            } else {
                constItem.setCurrentVal(obj.x, obj.y, obj.z);
            }

            this.dynamicConstList.push(constItem);

        }
    }

*/

    }

}
