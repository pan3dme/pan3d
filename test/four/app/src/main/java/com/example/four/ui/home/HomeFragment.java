package com.example.four.ui.home;

import android.opengl.GLSurfaceView;
import android.os.Bundle;
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
import com.z3d.scene.ConstrainSceneView;
import com.z3d.vo.Vector3D;

public class HomeFragment extends Fragment {

    private HomeViewModel homeViewModel;
    private View rootView;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);
        View root = inflater.inflate(R.layout.fragment_home, container, false);
        final TextView textView = root.findViewById(R.id.text_home);
        homeViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
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

        addEvents();

    }
    private void  addEvents()
    {

        getView().findViewById(R.id.button_frame3d).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Bundle bundle=new Bundle();
                bundle.putString("frameName","10002");
                NavController controller= Navigation.findNavController(v);
                controller.navigate(R.id.action_navigation_home_to_only_frame3dFragment,bundle);
            }
        });
        getView().findViewById(R.id.button_char).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Bundle bundle=new Bundle();
                bundle.putString("roloName","10002");
                NavController controller= Navigation.findNavController(v);
                controller.navigate(R.id.action_navigation_home_to_only_charFragment,bundle);
            }
        });
        getView().findViewById(R.id.button_scene).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Bundle bundle=new Bundle();
                bundle.putString("sceneurl","10002");
                NavController controller= Navigation.findNavController(v);
                controller.navigate(R.id.action_navigation_home_to_only_sceneFragment,bundle);
            }
        });
        getView().findViewById(R.id.button_particle).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Bundle bundle=new Bundle();
                bundle.putString("particleName","10018");
                NavController controller= Navigation.findNavController(v);
                controller.navigate(R.id.action_navigation_home_to_only_particleFragment,bundle);
            }
        });

        getView().findViewById(R.id.button_skill).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Bundle bundle=new Bundle();
                bundle.putString("skillName","10018");
                NavController controller= Navigation.findNavController(v);
                controller.navigate(R.id.action_navigation_home_to_only_skillFragment,bundle);
            }
        });
        getView().findViewById(R.id.button_md5).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Bundle bundle=new Bundle();
                bundle.putString("md5Name","10018");
                NavController controller= Navigation.findNavController(v);
                controller.navigate(R.id.action_navigation_home_to_only_md5Fragment,bundle);
            }
        });
    }




}