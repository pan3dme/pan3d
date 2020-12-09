package com.example.three.ui.home;

import android.graphics.Bitmap;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;

import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import android.view.LayoutInflater;

import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.three.R;
import com.urlhttp.CallBackUtil;
import com.urlhttp.UrlHttpUtil;
import com.z3d.base.CallBackFun;
import com.z3d.base.GroupBackFun;
import com.z3d.base.GroupItem;
import com.z3d.base.Object3D;
import com.z3d.base.Scene_data;
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

public class HomeFragment extends Fragment {


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_home, container, false);

        return root;
    }

}