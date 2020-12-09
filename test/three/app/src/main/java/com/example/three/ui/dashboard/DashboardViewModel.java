package com.example.three.ui.dashboard;

import android.opengl.GLSurfaceView;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.z3d.res.SceneRes;
import com.z3d.scene.Scene3D;

public class DashboardViewModel extends ViewModel {

    private MutableLiveData<String> mText;
    private GLSurfaceView _mGLView;
    private Scene3D _scene3d;
    private SceneRes _sceneRes;
    public DashboardViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is dashboard fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}