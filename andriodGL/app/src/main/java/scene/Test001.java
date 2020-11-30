package scene;

import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.LinearLayout;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.databinding.DataBindingUtil;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelProviders;

import com.e.sceneworld001.R;
import com.e.sceneworld001.databinding.FragmentFirstBinding;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import scene.dis.MyViewModel;
import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.GroupItem;
import z3d.base.Object3D;
import z3d.base.Scene_data;
import z3d.display.BuildDisplay3DSprite;
import z3d.display.line.GridLineSprite;
import z3d.display.particle.CombineParticle;
import z3d.display.role.Display3dMovie;
import z3d.display.role.SceneChar;
import z3d.filemodel.GroupDataManager;
import z3d.filemodel.ParticleManager;
import z3d.frame3d.Frame3dSprite;
import z3d.md5.Md5MoveSprite;
import z3d.res.BaseRes;
import z3d.res.GroupRes;
import z3d.res.SceneRes;
import z3d.scene.Scene3D;
import z3d.skill.Skill;
import z3d.skill.SkillManager;
import z3d.units.LoaderThread;
import z3d.vo.Vector2D;
import z3d.vo.Vector3D;


public class Test001 extends AppCompatActivity   {


    private static final String TAG ="SceneLyfBase" ;
    FragmentFirstBinding binding;
    private MyViewModel myViewModel;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_first);
        Log.d(TAG, "onCreate: ");
        binding= DataBindingUtil.setContentView(this,R.layout.fragment_first);
        myViewModel=  ViewModelProviders.of(this).get(MyViewModel.class);
        binding.setData(myViewModel);
        binding.setLifecycleOwner(this);

    }


}
