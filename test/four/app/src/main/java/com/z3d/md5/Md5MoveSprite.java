package com.z3d.md5;

import com.z3d.base.Scene_data;
import com.z3d.base.TexTuresBackFun;
import com.z3d.core.Context3D;
import com.z3d.display.Display3DSprite;
import com.z3d.material.TextureRes;
import com.z3d.md5.vo.Md5MeshData;
import com.z3d.program.Shader3D;
import com.z3d.scene.Scene3D;
import com.z3d.units.LoadBackFun;
import com.z3d.units.LoadManager;
import com.z3d.units.TimeUtil;
import com.z3d.vo.DualQuatFloat32Array;
import com.z3d.vo.Matrix3D;
import com.z3d.vo.Quaternion;
import com.z3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Md5MoveSprite extends Display3DSprite {
    private static final String TAG ="Md5MoveSprite" ;
    private String bodyUrl;
    private String animUrl;
    private TextureRes uvTextureRes;
    public Md5MoveSprite(Scene3D val) {
        super(val);


         scene3D.progrmaManager.registe(Md5MoveShader.Md5MoveShader,new Md5MoveShader(scene3D));
        this.shader3D= scene3D.progrmaManager.getProgram(Md5MoveShader.Md5MoveShader);

    }


    public void setMd5url(String $bodyurl, String $animurl, String $picurl) {

        this.bodyUrl = $bodyurl;
        this.animUrl = $animurl;
        if ($picurl!=null) {
            scene3D.textureManager.getTexture($picurl, new TexTuresBackFun() {
                @Override
                public void Bfun(TextureRes value) {
                    uvTextureRes=value;
                }
            });
        }

        this.loadBodyMesh();
    }
    public Md5MeshData md5MeshData;

    private void loadBodyMesh() {


        scene3D.loadManager.loadUrl(Scene_data.fileRoot + this.bodyUrl, LoadManager.XML_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    String txt=  dic.get("txt").toString();
                    md5MeshData = new Md5Analysis(scene3D).addMesh(txt);
                    new MeshImportSort().processMesh(md5MeshData);
                    new MeshToObjUtils().getObj( md5MeshData);


                    loadAnimFrame();
                }else{

                }
            }
        },null);
    }
    public List<DualQuatFloat32Array> frameQuestArr;
    private void loadAnimFrame() {
        scene3D.loadManager.loadUrl(Scene_data.fileRoot + this.animUrl, LoadManager.XML_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    String txt=  dic.get("txt").toString();
                    List<List<Matrix3D>> $matrixAry = new Md5animAnalysis().addAnim(txt);
                    frameQuestArr = new ArrayList<>();
                    for (int i = 0; i < $matrixAry.size(); i++) {
                        List<Matrix3D> $frameAry = $matrixAry.get(i);
                        for (int j = 0; j < $frameAry.size(); j++) {
                            $frameAry.get(j).prepend(md5MeshData.invertAry.get(j));
                        }
                        frameQuestArr.add(makeDualQuatFloat32Array($matrixAry.get(i)));
                    }
                }else{
                }
            }
        },null);


    }

    private DualQuatFloat32Array makeDualQuatFloat32Array(List<Matrix3D> $frameAry) {
        List<Short> newIDBoneArr = this.md5MeshData.boneNewIDAry;
        List<Matrix3D> baseBone  = $frameAry;

//        float quat[]=new float[newIDBoneArr.size() * 4];
//        float pos[]=new float[newIDBoneArr.size() * 3];//
        float quat[]=new float[54 * 4];
        float pos[]=new float[54* 3];

        for (int k = 0; k < newIDBoneArr.size(); k++) {
            Matrix3D $m = baseBone.get(newIDBoneArr.get(k)).clone();
            $m.appendScale(-1, 1, 1);  //特别标记，因为四元数和矩阵运算结果不一
            Quaternion $q = new Quaternion();
            $q.fromMatrix($m);
            Vector3D $p = $m.position();

            quat[k * 4 + 0] = $q.x;
            quat[k * 4 + 1] = $q.y;
            quat[k * 4 + 2] = $q.z;
            quat[k * 4 + 3] = $q.w;

            pos[k * 3 + 0] = $p.x;
            pos[k * 3 + 1] = $p.y;
            pos[k * 3 + 2] = $p.z;

        }
        DualQuatFloat32Array $tempDq = new DualQuatFloat32Array();
        $tempDq.quatArr=new ArrayList<>();
        $tempDq.posArr=new ArrayList<>();
        for(int i=0;i<quat.length;i++){
            $tempDq.quatArr.add(quat[i]);
        }
        for(int i=0;i<pos.length;i++){
            $tempDq.posArr.add(pos[i]);
        }
        return $tempDq;

    }

    @Override
    public void upData() {
        if (this.md5MeshData!=null && this.frameQuestArr!=null&&uvTextureRes!=null) {
            this.updateMaterialMeshCopy();
        }
    }
    protected void setVc()
    {
        Context3D ctx= scene3D.context3D;
        ctx.setVcMatrix4fv(this.shader3D, Shader3D.vpMatrix3D, scene3D.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix3D",this.posMatrix3d.m);

    }
    private float lastTm=0;
    private float _actionTime=0;
    private void updateMaterialMeshCopy() {
        Context3D ctx= scene3D.context3D;
        ctx.setProgame(this.shader3D.program);
        this.setVc();
        if(md5MeshData.vertexBuffer==null){
            md5MeshData.upToGup();
            return;
        }
        ctx.setVa(this.shader3D,"pos",3,md5MeshData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2Uv",2,md5MeshData.uvBuffer);
        ctx.setVa(this.shader3D,"boneID",4,md5MeshData.boneIdBuffer);
        ctx.setVa(this.shader3D,"boneWeight",4,md5MeshData.boneWeightBuffer);

        ctx.setRenderTexture(this.shader3D,"fs0",uvTextureRes.textTureInt,0);
        int _curentFrame=getPlayFrameIdx();

        DualQuatFloat32Array dualQuatFrame = this.frameQuestArr.get(_curentFrame);
        dualQuatFrame.upToGpu();

        ctx.setVc4fv(this.shader3D,"boneQ",54, dualQuatFrame.boneQarrrBuff);
        ctx.setVc3fv(this.shader3D,"boneD",54, dualQuatFrame.boneDarrBuff);
        ctx.drawCall(md5MeshData.indexBuffer,md5MeshData.treNum);

//        Log.d(TAG, _curentFrame+"");


    }
    private int getPlayFrameIdx(){
        float t =  TimeUtil.getTimer() - this.lastTm;
        this.lastTm = TimeUtil.getTimer();
        this._actionTime += t;
        int _curentFrame = (int) (this._actionTime / (Scene_data.frameTime * 1));
        int $len = this.frameQuestArr.size();
        return  _curentFrame % $len;
    }

}
