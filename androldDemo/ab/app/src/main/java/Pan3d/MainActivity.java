package Pan3d;

import java.io.InputStream;
import java.util.ArrayList;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import Pan3d.obj.ObjLoadActivity;
import edu.wuwang.opengl.R;
import z3d.base.CallBackFun;
import z3d.res.SceneRes;

public class MainActivity extends BaseActivity   {

    private RecyclerView mList;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        startActivity(new Intent(this,ObjLoadActivity.class));


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
