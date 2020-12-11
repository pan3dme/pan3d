package com.example.four.ui.home;

import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.solver.widgets.Rectangle;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

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
        addConstrainSceneViewOne();
        addConstrainSceneViewTwo();


    }
    ConstrainSceneView constrainSceneViewOne;
    private void addConstrainSceneViewOne()
    {
        final ConstraintLayout constraintlayout = rootView.findViewById(R.id.glContent);
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
    ConstrainSceneView constrainSceneViewTwo;
    private void addConstrainSceneViewTwo()
    {
        final ConstraintLayout constraintlayout = rootView.findViewById(R.id.glContentTwo);
        constrainSceneViewTwo =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {

                constrainSceneViewTwo.loadSceneByUrl(  "10002");
            }
        });
        constraintlayout.addView(constrainSceneViewTwo);

        Rectangle rectangle=new Rectangle();
        rectangle.setBounds(0,0,700,700);
        constrainSceneViewTwo.setRect(rectangle);
    }





}