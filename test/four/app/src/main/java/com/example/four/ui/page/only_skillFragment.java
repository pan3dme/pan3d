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
import com.z3d.display.role.SceneChar;
import com.z3d.scene.ConstrainSceneView;
import com.z3d.skill.Skill;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link only_skillFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class only_skillFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public only_skillFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment only_skillFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static only_skillFragment newInstance(String param1, String param2) {
        only_skillFragment fragment = new only_skillFragment();
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
        return inflater.inflate(R.layout.fragment_only_skill, container, false);
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        addConstrainSceneViewOne();
        addEvents();

    }
    ConstrainSceneView constrainSceneViewOne;
    private void addConstrainSceneViewOne()
    {

        final ConstraintLayout constraintlayout = getView().findViewById(R.id.only_skill_gl_view);
        constrainSceneViewOne =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                sceneChar= constrainSceneViewOne.addMovieDisplay("50011");
            }
        });
        constraintlayout.addView(constrainSceneViewOne);
    }
    private void addEvents()
    {
        getView().findViewById(R.id.skillPanelLoadBut).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                constrainSceneViewOne.mainScene3D.skillManager.preLoadSkill("skill/jichu_1_byte.txt");
            }
        });

        getView().findViewById(R.id.skillPanelPlayBut).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {


                Skill skill=  constrainSceneViewOne.mainScene3D.skillManager.getSkill("skill/jichu_1_byte.txt","m_skill_01",null);
                if(sceneChar!=null){
                    skill.reset();
                    skill.configFixEffect(sceneChar,null,null);
                    sceneChar.playSkill(skill);


                }
            }
        });




    }
   private SceneChar sceneChar;

}