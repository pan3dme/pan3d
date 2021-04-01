package com.example.four.ui.page;

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
 * Use the {@link only_frame3dFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class only_frame3dFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public only_frame3dFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment only_frame3dFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static only_frame3dFragment newInstance(String param1, String param2) {
        only_frame3dFragment fragment = new only_frame3dFragment();
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
        return inflater.inflate(R.layout.fragment_only_frame3d, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        addConstrainSceneViewOne();
    }
    ConstrainSceneView constrainSceneViewOne;
    private void addConstrainSceneViewOne()
    {

        final ConstraintLayout constraintlayout = getView().findViewById(R.id.only_frame3d_gl_view);
        constrainSceneViewOne =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                constrainSceneViewOne.addLoadFrame3dRes();
            }
        });
        constraintlayout.addView(constrainSceneViewOne);
    }
}