package z3d.scene;

import android.opengl.GLES20;

import java.util.ArrayList;
import java.util.List;

import z3d.base.Camera3D;
import z3d.base.ResGC;
import z3d.core.Context3D;
import z3d.display.Display3D;

public class Scene3D extends ResGC {
    public Context3D context3D;
    public Camera3D camera3D;
    public List<Display3D> displayList;

    public Scene3D( ){
        this.context3D=new Context3D();
        this.camera3D=new Camera3D();
        this.displayList=new ArrayList<>();
    }
    public  void  clearAll()
    {

    }
    public  void  upFrame()
    {
        this.camera3D._rotationY++;
        this.camera3D._rotationX=-30;
        this.camera3D.upFrame();
        for(int i=0;displayList!=null&&i< displayList.size();i++){
            displayList.get(i).upFrame();
        }
    }
    public  void resizeScene()
    {
        GLES20.glViewport(0,0,this.camera3D.fovw,this.camera3D.fovh);
    }
    public  void  addDisplay(Display3D dis)
    {
        displayList.add(dis);
    }


}
