package com.example.three.jump;

import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.three.R;
import com.z3d.base.CallBackFun;
import com.z3d.base.GroupBackFun;
import com.z3d.base.GroupItem;
import com.z3d.base.Object3D;
import com.z3d.display.BuildDisplay3DSprite;
import com.z3d.display.line.GridLineSprite;
import com.z3d.display.particle.CombineParticle;
import com.z3d.display.role.Display3dMovie;
import com.z3d.filemodel.GroupDataManager;
import com.z3d.filemodel.ParticleManager;
import com.z3d.res.BaseRes;
import com.z3d.res.GroupRes;
import com.z3d.res.SceneRes;
import com.z3d.scene.Scene3D;
import com.z3d.skill.SkillManager;
import com.z3d.vo.Vector2D;
import com.z3d.vo.Vector3D;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link SceneBaseFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SceneBaseFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public SceneBaseFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment SceneBaseFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static SceneBaseFragment newInstance(String param1, String param2) {
        SceneBaseFragment fragment = new SceneBaseFragment();
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


        View root = inflater.inflate(R.layout.fragment_scene_base, container, false);

//        _mGLView =  root. findViewById(R.id.scenebaseGlView);
//        _mGLView.setEGLContextClientVersion(2);
//        this.initScene();
        return root;
    }

}