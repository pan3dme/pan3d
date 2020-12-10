package com.example.four.ui.notifications;

import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.four.R;
import com.example.four.ui.home.GLTriangle;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class NotificationsFragment extends Fragment {

    private NotificationsViewModel notificationsViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        notificationsViewModel =
                new ViewModelProvider(this).get(NotificationsViewModel.class);
        View root = inflater.inflate(R.layout.fragment_notifications, container, false);
        final TextView textView = root.findViewById(R.id.text_notifications);
        notificationsViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
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
        addGlViewTwo();
    }

    private View rootView;
    private    GLTriangle glTriangle;
    private GLSurfaceView _mGLViewNotifica;
    private void addGlViewTwo()
    {
        _mGLViewNotifica =new GLSurfaceView(this.getContext());
        final ConstraintLayout constraintlayout = rootView.findViewById(R.id.glContentNotifications);
        constraintlayout.addView(_mGLViewNotifica);
        ViewGroup.LayoutParams layoutParams= _mGLViewNotifica.getLayoutParams();

        layoutParams.width=600;
        layoutParams.height=600;
        _mGLViewNotifica.setLayoutParams(layoutParams);
        _mGLViewNotifica.setEGLContextClientVersion(2);

        _mGLViewNotifica.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {

                glTriangle=new GLTriangle();

            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {

            }
            @Override
            public void onDrawFrame(GL10 gl) {

                GLES20.glClearColor(0.0f, 0.0f, 0.0f, 0.2f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);

                if(glTriangle!=null){
                    glTriangle.draw();
                }



            }
        });
        _mGLViewNotifica.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }
}