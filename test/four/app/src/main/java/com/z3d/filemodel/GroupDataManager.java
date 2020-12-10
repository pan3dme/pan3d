package com.z3d.filemodel;


import com.z3d.base.CallBackFun;
import com.z3d.base.GroupBackFun;
import com.z3d.base.ResGC;
import com.z3d.base.Scene_data;
import com.z3d.res.GroupRes;
import com.z3d.scene.Scene3D;

public class GroupDataManager extends ResGC {


    public GroupDataManager(Scene3D val) {
        super(val);
    }

    public void getGroupData(final String url, final GroupBackFun bfun)
    {

//        if(self.dic[url]){
//            block(self.dic[url]);
//        }else{
//            GroupRes *groupRes=[[GroupRes alloc]init];
//        [groupRes load:url  Block:^(NSString* value) {
//                self.dic[url]=groupRes;
//                block(self.dic[url]);
//            }];
//        }

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



}
