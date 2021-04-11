package com.pan3d.filemodel;


import com.example.four.Display3DSpriteModelBase;
import com.pan3d.base.CallBackFun;
import com.pan3d.base.GroupBackFun;
import com.pan3d.base.GroupItem;
import com.pan3d.base.ResGC;
import com.pan3d.base.Scene_data;
import com.pan3d.res.BaseRes;
import com.pan3d.res.GroupRes;
import com.pan3d.scene.Scene3D;

public class GroupDataManager extends ResGC {


    public GroupDataManager(Scene3D val) {
        super(val);
    }

    public void getGroupData(final String url, final GroupBackFun bfun)
    {

        if(this.dic.containsKey(url)){
            bfun.Bfun((GroupRes)this.dic.get(url));
        }else{
            final GroupRes groupRes=new GroupRes( scene3D);
            groupRes.load(Scene_data.fileRoot + url, new CallBackFun() {
                @Override
                public void StateChange(boolean State) {
                    dic.put(url,groupRes);
                    bfun.Bfun((GroupRes)dic.get(url));
                }
            });
        }


    }
    public void addModelSpriteByUrl(Scene3D scene3D){

        scene3D.groupDataManager.getGroupData( "model/50011.txt", new GroupBackFun() {
            @Override
            public void Bfun(GroupRes groupRes) {
                for (int i = 0; i < groupRes.dataAry.size(); i++) {
                    GroupItem item   = groupRes.dataAry.get(i);
                    if (item.isGroup) {
                    }
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {

                    } else if (item.types == BaseRes.PREFAB_TYPE) {
                        Display3DSpriteModelBase display   = new Display3DSpriteModelBase(scene3D);
                        display.setObjUrl(item.objUrl);
                        display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                        scene3D.addSpriteDisplay(display);
                    }
                }
            }
        });
    }




}
