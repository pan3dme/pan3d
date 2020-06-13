package z3d.filemodel;

import android.content.res.Resources;
import android.util.Log;

import androidx.appcompat.widget.VectorEnabledTintResources;


import java.io.InputStream;

import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.ResGC;
import z3d.base.Scene_data;
import z3d.res.GroupRes;

public class GroupDataManager extends ResGC {

    private static GroupDataManager _instance;
    public static GroupDataManager getInstance()  {
        if (GroupDataManager._instance==null) {
            GroupDataManager._instance = new GroupDataManager();
        }
        return GroupDataManager._instance;
    }

    public void getGroupData(final String url,final GroupBackFun bfun)
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
            final GroupRes groupRes=new GroupRes();
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
