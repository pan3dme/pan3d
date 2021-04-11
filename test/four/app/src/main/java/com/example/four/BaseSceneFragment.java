package com.example.four;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.four.ui.page.only_charFragment;
import com.pan3d.base.CallBackFun;
import com.pan3d.display.role.SceneChar;
import com.pan3d.scene.ConstrainSceneView;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * A simple {@link Fragment} subclass.

 * create an instance of this fragment.
 */
public class BaseSceneFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public BaseSceneFragment() {
        // Required empty public constructor
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_base_scene, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        final ConstraintLayout constraintlayout = getView().findViewById(R.id.base_scene_gl_view);
        constrainSceneViewOne =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                initSceneDataByBunld();
            }
        });
        constraintlayout.addView(constrainSceneViewOne);
    }

    ConstrainSceneView constrainSceneViewOne;

    private void initSceneDataByBunld()
    {

        try {
            JSONObject jsonObject =new JSONObject(getArguments().getString("data") );
            Fruit fruit=new Fruit(jsonObject);
            for(int i=0;i<fruit.sceneinfo.length();i++){
                meshDataInfo(fruit.sceneinfo.getJSONObject(i));
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
                      String  model=  info.getString("model");

                      sc.addPart(addPart,bindSocket,model);

 
                  }
                    if(  info.has("mount")){
                        String  mount=  info.getString("mount");
                        if(mount!=null){
                            sc.setMountById(mount);
                        }
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
}