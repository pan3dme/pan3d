package com.example.four.ui.page;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.four.R;
import com.z3d.base.CallBackFun;
import com.z3d.scene.ConstrainSceneView;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link only_particleFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class only_particleFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public only_particleFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment only_particleFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static only_particleFragment newInstance(String param1, String param2) {
        only_particleFragment fragment = new only_particleFragment();
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
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_only_particle, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        addConstrainSceneViewOne();
        addEvents();

    }
    private void addEvents()
    {
        getView().findViewById(R.id.only_particle_selectbut).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                constrainSceneViewOne.playParticle("levelup");
//                constrainSceneViewOne.playParticle("10018");
//                constrainSceneViewOne.playParticle("10017");
            }
        });
    }
    ConstrainSceneView constrainSceneViewOne;
    private void addConstrainSceneViewOne()
    {

        final ConstraintLayout constraintlayout = getView().findViewById(R.id.only_particle_gl_view);
        constrainSceneViewOne =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {

                constrainSceneViewOne.mainScene3D.camera3D.distance=200;
            }
        });
        constraintlayout.addView(constrainSceneViewOne);
    }
}