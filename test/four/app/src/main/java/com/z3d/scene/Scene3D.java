package com.z3d.scene;

import android.opengl.GLES20;

import com.z3d.base.Camera3D;
import com.z3d.base.ObjData;
import com.z3d.base.ObjDataManager;
import com.z3d.base.TexTuresBackFun;
import com.z3d.core.Context3D;
import com.z3d.display.Display3D;
import com.z3d.display.Display3DSprite;
import com.z3d.display.line.LineDisplayShader;
import com.z3d.display.role.Display3dMovie;
import com.z3d.filemodel.GroupDataManager;
import com.z3d.filemodel.MeshDataManager;
import com.z3d.filemodel.ParticleManager;
import com.z3d.filemodel.ResManager;
import com.z3d.filemodel.TextureManager;
import com.z3d.material.MaterialManager;
import com.z3d.material.TextureRes;
import com.z3d.program.ProgrmaManager;
import com.z3d.res.RoleRes;
import com.z3d.skill.SkillManager;
import com.z3d.units.AnimManager;
import com.z3d.units.LoadManager;
import com.z3d.units.TimeUtil;
import com.z3d.vo.Vector2D;
import com.z3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.List;

public class Scene3D  {
    public ProgrmaManager progrmaManager;
    public Context3D context3D;
    public Camera3D camera3D;
    public Vector2D fogData;
    public Vector3D fogColor;
    public List<Display3D> displayList;
    public List<Display3dMovie> displayRoleList;
    public ParticleManager particleManager;
    public MeshDataManager meshDataManager;
    public TextureManager textureManager;
    public MaterialManager materialManager;
    public ObjDataManager objDataManager;
    public GroupDataManager groupDataManager;
    public LoadManager loadManager;
    public SkillManager skillManager;
    public AnimManager animManager;
    public ResManager resManager;
    public TextureRes pubLut;
    private float time;

    public Scene3D( ){
        this.time= TimeUtil.getTimer();
        this.context3D=new Context3D();
        this.camera3D=new Camera3D();
        this.displayList=new ArrayList<>();
        this.displayRoleList=new ArrayList<>();

        this.camera3D.rotationX =-30;
        this.camera3D.rotationY=45;
        this.loadManager=new LoadManager(this);
        this.particleManager=new ParticleManager(this);
        this.progrmaManager=new ProgrmaManager(this);
        this.meshDataManager=new MeshDataManager(this);
        this.textureManager=new TextureManager(this);
        this.groupDataManager=new GroupDataManager(this);
        this.skillManager=new SkillManager(this);
        this.materialManager=new MaterialManager(this);
        this.objDataManager=new ObjDataManager(this);
        this.animManager=new AnimManager(this);
        this.resManager=new ResManager(this);


    }
    public void  initData(){

        this.textureManager.getTexture( "base/brdf_ltu.jpg", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
               pubLut =value;
            }
        });

        this.textureManager.getTexture( "base/brdf_ltu.jpg", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                 pubLut =value;
            }
        });
    }
    public  void  clearAll()
    {
        this.displayRoleList=new ArrayList<>();
        this.displayList=new ArrayList<>();
        particleManager.clearAll();
    }

    private void  upToGpu(){
        //纹理和着色

        this.progrmaManager.upDataProgramWaitIng();
        this.textureManager.upDataGenTextUserItem();
        this.objDataManager.upDataObjDataToGpu();
        this.resManager.upDataRoleResWaitIng();

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
       
        ctx.setFrontFace(true);
        ctx.setDepthTest(false);
        ctx.setWriteDepth(false);
        this.skillManager.upData();
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


    public void addSpriteDisplay(Display3DSprite display) {
        addDisplay(display);
    }
}
