package z3d.res;



import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;

import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.GroupItem;
import z3d.base.RoleBackFun;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;

public class GroupRes extends BaseRes {

    public List<GroupItem> dataAry ;
    private GroupBackFun groupBackFun;
    private  String TAG="baseres";
    public  void  load(String url,final CallBackFun backFun)
    {
        LoadManager.getInstance().loadUrl(url,LoadManager.BYTE_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){

                    ByteArray temp=(ByteArray)dic.get("byte");
                    Log.d(TAG, "bfun");

                    loadComplete((ByteArray) dic.get("byte"), new GroupBackFun() {
                        @Override
                        public void Bfun(GroupRes value) {
                            backFun.StateChange(true);
                        }
                    });



                }else{
                    Log.d(TAG, "bfun: 角色地址错误");
                }


            }
        },null);

    }
    public void  loadComplete(ByteArray buff, GroupBackFun bfun)
    {

        this.groupBackFun=bfun;
        this._byte =buff;

        this.version = this._byte.readInt();
        Log.d("GroupRes ->",   this.version+"===> " );
        this.read(new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                readNext();
            }
        });//img
    }

    private void   readNext() {
        this.read();//obj
        this.read();//material
        this.read();//particle;

        boolean isGroup = this._byte.readBoolean();

        if (isGroup) {
            int length = this._byte.readInt();
            for (int i = 0; i < length; i++) {
                this.readItem(true);
            }
        } else {
            this.readItem(false);

        }
        this.groupBackFun.Bfun(this);
    }
    private void readItem(boolean isG)
    {
        this.dataAry=new ArrayList<>();
        int types = this._byte.readInt();
        GroupItem item = new GroupItem();
        item.isGroup = isG;

        if (isG) {
            item.x = this._byte.readFloat();
            item.y = this._byte.readFloat();
            item.z = this._byte.readFloat();
            item.scaleX = this._byte.readFloat();
            item.scaleY = this._byte.readFloat();
            item.scaleZ = this._byte.readFloat();
            item.rotationX = this._byte.readFloat();
            item.rotationY = this._byte.readFloat();
            item.rotationZ = this._byte.readFloat();
        }
        if (types == BaseRes.PREFAB_TYPE) {
            item.objUrl = this._byte.readUTF();
            item.materialUrl = this._byte.readUTF();
            item.materialInfoArr = this.readMaterialInfo();
            item.types = BaseRes.PREFAB_TYPE;

        } else if (types == BaseRes.SCENE_PARTICLE_TYPE) {
            item.particleUrl = this._byte.readUTF();
            item.types = BaseRes.SCENE_PARTICLE_TYPE;
        }

        this.dataAry .add(item);

    }
}
