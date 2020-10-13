package scene.dis;

import java.util.ArrayList;

import z3d.base.ObjData;
import z3d.base.TexTuresBackFun;
import z3d.core.Context3D;
import z3d.display.Display3D;
import z3d.filemodel.TextureManager;
import z3d.material.TextureRes;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.scene.Scene3D;
import z3d.vo.Matrix3D;


public class TwoTextureSprite extends Display3D {
    private static final String TAG="Filter";

    public Shader3D shader3D;
    public ObjData objData;
    public Matrix3D modeMatrix;


    public TwoTextureSprite(Scene3D val){
        super(val);
        this.modeMatrix=new Matrix3D();
        this.registetProgame();
        this.initData();
    }


    protected void  makeTempObjData()
    {
        this.objData =new ObjData();

        ObjData od=this.objData;

        od.verticeslist=new ArrayList<Float>();//结果顶点坐标列表
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);

        od.verticeslist.add(1f);
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);

        od.verticeslist.add(1f);
        od.verticeslist.add(1f);
        od.verticeslist.add(0f);

        od.verticeslist.add(0f);
        od.verticeslist.add(1f);
        od.verticeslist.add(0f);

        od.uvlist=new ArrayList<Float>();//结果顶点坐标列表
        od.uvlist.add(0.0f);
        od.uvlist.add(0.0f);

        od.uvlist.add(1.0f);
        od.uvlist.add(0.0f);

        od.uvlist.add(1.0f);
        od.uvlist.add(1.0f);

        od.uvlist.add(0.0f);
        od.uvlist.add(1.0f);



        od.indexs=new ArrayList<Short>();
        od.indexs.add((short)0);
        od.indexs.add((short)1);
        od.indexs.add((short)2);

        od.indexs.add((short)0);
        od.indexs.add((short)2);
        od.indexs.add((short)3);



        od.upToGup();


    }

    protected void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(TwoTextureShader.shaderNameStr,new TwoTextureShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(TwoTextureShader.shaderNameStr);
        this.modeMatrix.appendScale(100,100,100);
    }

    protected void  initData()
    {
        this.makeTempObjData();
        TextureManager.getInstance().getTexture("https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/xiezi.jpg", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                oneTextureRes =value;
            }
        });
        TextureManager.getInstance().getTexture("https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/brdf_ltu.jpg", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                twoTextureRes =value;
            }
        });

    }
    TextureRes oneTextureRes;
    TextureRes twoTextureRes;



    public void upData(){
        if(this.scene3d!=null&&this.shader3D!=null&&this.oneTextureRes !=null&&this.twoTextureRes !=null){
            Context3D ctx=this.scene3d.context3D;
            ctx.setProgame(this.shader3D.program);

            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);
            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
            ctx.setVa(this.shader3D,"vTextCoord",2,this.objData.uvBuffer);
            ctx. setRenderTexture(this.shader3D,"fs0",  this.twoTextureRes.textTureInt,0);
            ctx. setRenderTexture(this.shader3D,"fs1",  this.oneTextureRes.textTureInt,1);

            ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);
        }
    }




}
