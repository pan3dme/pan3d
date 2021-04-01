package com.example.four.ui.scenelist;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.four.R;
import com.pan3d.base.CallBackFun;
import com.pan3d.scene.ConstrainSceneView;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link tempSceneFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class tempSceneFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private static final String TAG ="tempSceneFragment" ;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private String sceneurl;
    public tempSceneFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment tempSceneFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static tempSceneFragment newInstance(String param1, String param2) {
        tempSceneFragment fragment = new tempSceneFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
           sceneurl=   getArguments().getString("sceneurl");

        }
    }
    ConstrainSceneView constrainSceneViewOne;
    private void addConstrainSceneViewOne()
    {

        final ConstraintLayout constraintlayout = getView().findViewById(R.id.gl_scene_temp_view);
        constrainSceneViewOne =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {


                constrainSceneViewOne.loadSceneByUrl(  sceneurl);
                constrainSceneViewOne.addLoadFrame3dRes();
                constrainSceneViewOne.addLocaMd5();
            }
        });
        constraintlayout.addView(constrainSceneViewOne);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        addConstrainSceneViewOne();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_temp_scene, container, false);
    }
}