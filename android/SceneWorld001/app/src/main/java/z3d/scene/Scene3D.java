package z3d.scene;

import android.opengl.GLES20;

import java.util.ArrayList;
import java.util.List;

import z3d.base.Camera3D;
import z3d.base.ResGC;
import z3d.core.Context3D;
import z3d.display.Display3D;
import z3d.display.role.Display3dMovie;
import z3d.filemodel.ParticleManager;
import z3d.filemodel.TextureManager;
import z3d.program.Shader3D;
import z3d.res.RoleRes;
import z3d.units.TimeUtil;

public class Scene3D extends ResGC {
    public Context3D context3D;
    public Camera3D camera3D;
    public List<Display3D> displayList;
    public List<Display3dMovie> displayRoleList;
    public ParticleManager particleManager;
    private float time;

    public Scene3D( ){
        this.time=TimeUtil.getTimer();
        this.context3D=new Context3D();
        this.camera3D=new Camera3D();
        this.displayList=new ArrayList<>();
        this.displayRoleList=new ArrayList<>();
        this.particleManager=new ParticleManager();
        this.camera3D.rotationX =-30;
        this.camera3D.rotationY=45;
    }
    public  void  clearAll()
    {
        this.displayRoleList=new ArrayList<>();
        this.displayList=new ArrayList<>();
        particleManager.clearAll();
    }
    private void  upToGpu(){
        //纹理和着色
        RoleRes.upDataRoleResWaitIng();
        Shader3D.upDataProgramWaitIng();
        TextureManager.getInstance().upDataGenTextUserItem();
    }
    public  void  upFrame()
    {

        upToGpu();

        Context3D ctx=this.context3D;
        ctx.setBlendParticleFactors(0);

        this.camera3D.upFrame();
        updateFrameRole();
        ctx.setFrontFace(true);
        ctx.setDepthTest(true);
        ctx.setWriteDepth(true);
        for(int i=0;  i< displayList.size();i++){
             displayList.get(i).upData();
        }
        for(int i=0; i< displayRoleList.size();i++){
            displayRoleList.get(i).upData();
        }
        this.particleManager.scene3d=this;
        ctx.setFrontFace(true);
        ctx.setDepthTest(false);
        ctx.setWriteDepth(false);
        this.particleManager.upFrame();


    }
    private void  updateFrameRole(){
        float _tempTime= TimeUtil.getTimer();
        float delay =  _tempTime - this.time;
        this.time=_tempTime;
        for(int i=0; i< displayRoleList.size();i++){
            displayRoleList.get(i).updateFrame(delay);
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
    public  void  addMovieDisplay(Display3dMovie sc)
    {
        displayRoleList.add(sc);
    }


}
