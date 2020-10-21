package scene;

import android.content.Intent;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import com.e.sceneworld001.R;


import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import scene.dis.TwoTextureSprite;
import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.GroupItem;
import z3d.base.Scene_data;
import z3d.display.BuildDisplay3DSprite;
import z3d.display.basedis.DisplayTestSprite;
import z3d.display.line.GridLineSprite;
import z3d.display.particle.CombineParticle;
import z3d.display.role.Display3dMovie;
import z3d.filemodel.GroupDataManager;
import z3d.filemodel.ParticleManager;
import z3d.res.BaseRes;
import z3d.res.GroupRes;
import z3d.res.SceneRes;
import z3d.scene.Scene3D;
import z3d.units.LoaderThread;

public class SceneTestTwoTexture extends AppCompatActivity implements View.OnClickListener {
    private GLSurfaceView mGLView;
    private Scene3D scene3D;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.scene001_layout);
        mGLView =   findViewById(R.id.mGLView);
        mGLView.setEGLContextClientVersion(2);
        Scene_data.fileRoot = "https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/";
        LoaderThread.fileContext = getApplicationContext();
        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {
                loadSceneRes();
            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                scene3D.camera3D.fovw = width;
                scene3D.camera3D.fovh = height;
                scene3D.resizeScene();
            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                scene3D.upFrame();
            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
        this.addButs();
    }
    private void addButs()
    {
        LinearLayout layout = (LinearLayout) findViewById(R.id.container);
        Button bn = new Button(this);
        bn.setText("点击");
        bn.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));

        layout.addView(bn);
        bn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {
//                Intent in = new Intent(SceneTestTwoTexture.this, FirstActivity.class);
//                startActivity(in);
            }
        });
    }
    private void loadSceneRes()
    {

        this.scene3D=new Scene3D();
        this.scene3D.addDisplay(new  GridLineSprite( this.scene3D ));
        this.scene3D.addDisplay(new TwoTextureSprite(this.scene3D));

    }


    @Override
    public void onClick(View v) {

    }
}
