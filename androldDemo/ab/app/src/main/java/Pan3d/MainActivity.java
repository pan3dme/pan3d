package Pan3d;


import android.content.Intent;
import android.os.Bundle;


import java.io.InputStream;

import Pan3d.obj.ObjLoadActivity;
import edu.wuwang.opengl.R;
import z3d.base.CallBackFun;
import z3d.res.SceneRes;


public class MainActivity extends BaseActivity   {




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        //startActivity(new Intent(this,ObjLoadActivity.class));


        this.loadSceneRes();


    }

    private void loadSceneRes()
    {

        SceneRes sceneRes = new SceneRes();

        try {


            InputStream in = getResources().openRawResource(R.raw.file2012);
            //获取文件的字节数
            int lenght = in.available();
            //创建byte数组byte[]  buffer = new byte[lenght];
            byte[] buffer = new byte[lenght];
            //将文件中的数据读到byte数组中
            in.read(buffer);
            sceneRes.loadComplete(buffer ,new CallBackFun() {
                @Override
                public void StateChange(boolean State) {


                }
            });


        } catch (Exception e) {
            e.printStackTrace();
        }
    }




}
