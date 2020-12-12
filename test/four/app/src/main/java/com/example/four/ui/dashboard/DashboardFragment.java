package com.example.four.ui.dashboard;

import android.graphics.Color;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.solver.widgets.Rectangle;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import com.example.four.R;
import com.z3d.base.CallBackFun;
import com.z3d.base.GroupBackFun;
import com.z3d.base.GroupItem;
import com.z3d.base.Object3D;
import com.z3d.display.BuildDisplay3DSprite;
import com.z3d.display.line.GridLineSprite;
import com.z3d.display.particle.CombineParticle;
import com.z3d.display.role.Display3dMovie;
import com.z3d.filemodel.ParticleManager;
import com.z3d.res.BaseRes;
import com.z3d.res.GroupRes;
import com.z3d.res.SceneRes;
import com.z3d.scene.ConstrainSceneView;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Vector2D;
import com.z3d.vo.Vector3D;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class DashboardFragment extends Fragment {

    private DashboardViewModel dashboardViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        dashboardViewModel =
                new ViewModelProvider(this).get(DashboardViewModel.class);
        View root = inflater.inflate(R.layout.fragment_dashboard, container, false);
        final TextView textView = root.findViewById(R.id.text_dashboard);
        dashboardViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                textView.setText(s);
            }
        });
        rootView=root;
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        addConstrainSceneViewOne();

    }

    private View rootView;
    ConstrainSceneView constrainSceneViewOne;
    private void addConstrainSceneViewOne()
    {
        final ConstraintLayout constraintlayout = rootView.findViewById(R.id.glContentDashBoard);
        constrainSceneViewOne =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {

                constrainSceneViewOne.addRoleToSceneByUrl( "yezhuz.txt",new Vector3D(0,0,0));
            }
        });
        constraintlayout.addView(constrainSceneViewOne);

        Rectangle rectangle=new Rectangle();
        rectangle.setBounds(0,0,300,300);
        constrainSceneViewOne.setRect(rectangle);




    }
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        Button button;
        button=  getView().findViewById(R.id.button_jump_scene);
        button.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Bundle bundle=new Bundle();
                bundle.putString("sceneurl","10002");
                bundle.putString("sceneurl","10002");
                bundle.putString("sceneurl","10002");
                bundle.putString("sceneurl","10002");
                bundle.putString("sceneurl","10002");
                bundle.putString("sceneurl","10002");

                NavController controller= Navigation.findNavController(v);
//                controller.navigate(R.id.action_navigation_dashboard_to_only_sceneFragment,bundle);
                controller.navigate(R.id.action_navigation_dashboard_to_only_charFragment,bundle);
            }
        });

    }


}