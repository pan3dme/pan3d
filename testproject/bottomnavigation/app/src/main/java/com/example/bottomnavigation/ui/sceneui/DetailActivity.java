package com.example.bottomnavigation.ui.sceneui;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.example.bottomnavigation.R;
import com.pan3d.base.CallBackFun;
import com.pan3d.display.role.SceneChar;
import com.pan3d.scene.ConstrainSceneView;

import org.json.JSONArray;
import org.json.JSONObject;

public class DetailActivity extends AppCompatActivity {
    ConstrainSceneView constrainSceneViewOne;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_detail_activity);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(getString(R.string.app_name));

        String sceneinfo = getIntent().getStringExtra("sceneinfo");


        final ConstraintLayout constraintlayout =  findViewById(R.id.base_scene_gl_view);
        Context context=  getApplicationContext();
        constrainSceneViewOne =new ConstrainSceneView(context, new CallBackFun() {
            @Override
            public void StateChange(boolean State) {

                initSceneDataByBunld(sceneinfo);
            }
        });
        constraintlayout.addView(constrainSceneViewOne);

    }
    private void initSceneDataByBunld(String val)
    {

        try {
            JSONArray jsonArray=new JSONArray(val);
            for(int i=0;i< jsonArray.length();i++){
                meshDataInfo(jsonArray.getJSONObject(i));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void  meshDataInfo(JSONObject val)
    {


        try {
            int type=val.getInt("type");

            if( type==1){ //场景
                String textStr=val.getString("text").replace("<<<","/");
                constrainSceneViewOne.loadSceneByUrl(  val.getString("text"));
            }
            if( type==2){//特效
                String textStr=val.getString("text").replace("<<<","/");
                constrainSceneViewOne.playParticle(textStr);
            }
            if( type==3){//角色
                String textStr=val.getString("text").replace("<<<","/");
                SceneChar sc= constrainSceneViewOne.addMovieDisplay(textStr);

                JSONObject info=  val.getJSONObject("info");
                if( info!=null )
                {
                    if(  info.has("addPart")){
                        String  addPart=  info.getString("addPart");
                        String  bindSocket=  info.getString("bindSocket");
                        String  model=  "model/"+info.getString("model")+".txt";
                        sc.addPart(addPart,bindSocket,model);
                    }
                    if(  info.has("mount")){
                        String  mount=  info.getString("mount");
                        if(mount!=null){
                            sc.setMountById(mount);
                        }
                    }
                    if(  info.has("action")){
                        String  action=  info.getString("action");
                        Log.d(action, "meshDataInfo: ");
                        sc.play(action);
                    }
                }

            }
            if(type==4){//动画
                constrainSceneViewOne.addLoadFrame3dRes();
            }

            if( type==5){//md5
                constrainSceneViewOne.addLocaMd5();
            }

        }catch (Exception e){
            e.printStackTrace();
        }


    }



    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
        }
        return super.onOptionsItemSelected(item);
    }
}