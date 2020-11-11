package z3d.md5;

import android.text.TextUtils;
import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.MeshData;
import z3d.base.ObjData;
import z3d.base.Scene_data;
import z3d.base.TexTuresBackFun;
import z3d.core.Context3D;
import z3d.display.Display3DSprite;
import z3d.display.line.LineDisplayShader;
import z3d.filemodel.TextureManager;
import z3d.material.TextureRes;
import z3d.md5.vo.Md5MeshData;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.res.RoleRes;
import z3d.scene.Scene3D;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;
import z3d.units.TimeUtil;
import z3d.vo.DualQuatFloat32Array;
import z3d.vo.Float32Array;
import z3d.vo.Matrix3D;
import z3d.vo.Quaternion;
import z3d.vo.Vector3D;

public class Md5MoveSprite extends Display3DSprite {
    private static final String TAG ="Md5MoveSprite" ;
    private String bodyUrl;
    private String animUrl;
    private TextureRes uvTextureRes;
    public Md5MoveSprite(Scene3D val) {
        super(val);



        ProgrmaManager.getInstance().registe(Md5MoveShader.Md5MoveShader,new Md5MoveShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(Md5MoveShader.Md5MoveShader);

    }


    public void setMd5url(String $bodyurl, String $animurl, String $picurl) {

        this.bodyUrl = $bodyurl;
        this.animUrl = $animurl;
        if ($picurl!=null) {
            TextureManager.getInstance().getTexture($picurl, new TexTuresBackFun() {
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


        LoadManager.getInstance().loadUrl(Scene_data.fileRoot + this.bodyUrl,LoadManager.XML_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    String txt=  dic.get("txt").toString();
                    md5MeshData = new Md5Analysis().addMesh(txt);
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
        LoadManager.getInstance().loadUrl(Scene_data.fileRoot + this.animUrl,LoadManager.XML_TYPE, new LoadBackFun() {
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
        DualQuatFloat32Array $tempDq = new DualQuatFloat32Array();
        $tempDq.quat = new Float32Array(newIDBoneArr.size() * 4);
        $tempDq.pos = new Float32Array(newIDBoneArr.size() * 3);

        for (int k = 0; k < newIDBoneArr.size(); k++) {
            Matrix3D $m = baseBone.get(newIDBoneArr.get(k)).clone();
            $m.appendScale(-1, 1, 1);  //特别标记，因为四元数和矩阵运算结果不一
            Quaternion $q = new Quaternion();
            $q.fromMatrix($m);
            Vector3D $p = $m.position();


            $tempDq.quat.put(k * 4 + 0,$q.x);
            $tempDq.quat.put(k * 4 + 1,$q.y);
            $tempDq.quat.put(k * 4 + 2,$q.z);
            $tempDq.quat.put(k * 4 + 3,$q.w);


            $tempDq.quat.put(k * 3 + 0,$p.x);
            $tempDq.quat.put(k * 3 + 1,$p.y);
            $tempDq.quat.put(k * 3 + 2,$p.z);



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
        Context3D ctx=this.scene3d.context3D;
        ctx.setVcMatrix4fv(this.shader3D, Shader3D.vpMatrix3D,this.scene3d.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix3D",this.posMatrix3d.m);

    }
    private void updateMaterialMeshCopy() {
        Context3D ctx=this.scene3d.context3D;
        ctx.setProgame(this.shader3D.program);
        this.setVc();
        if(md5MeshData.vertexBuffer==null){

            md5MeshData.upToGup();
            md5MeshData.boneIdBuffer=ObjData.upGpuvertexBuffer(md5MeshData.boneIDAry);
            md5MeshData.boneWeightBuffer=ObjData.upGpuvertexBuffer(md5MeshData.boneWeightAry);
            return;
        }
        ctx.setVa(this.shader3D,"pos",3,md5MeshData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2Uv",2,md5MeshData.uvBuffer);
//        ctx.setVa(this.shader3D,"boneID",4,md5MeshData.boneIdBuffer);
//        ctx.setVa(this.shader3D,"boneWeight",4,md5MeshData.boneWeightBuffer);
        ctx.setRenderTexture(this.shader3D,"fs0",uvTextureRes.textTureInt,0);
        ctx.drawCall(md5MeshData.indexBuffer,md5MeshData.treNum);

        /*

            Scene_data.context3D.setVpMatrix(this.baseShder, Scene_data.vpMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
            Scene_data.context3D.setRenderTexture(this.baseShder, "fc0", this.uvTextureRes.texture, 0);
            Scene_data.context3D.setVa(0, 3, this.md5objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.md5MeshData.uvBuffer);
            Scene_data.context3D.setVa(2, 4, this.md5MeshData.boneIdBuffer);
            Scene_data.context3D.setVa(3, 4, this.md5MeshData.boneWeightBuffer);


            var t: number = Pan3d.TimeUtil.getTimer() - this.lastTm;
            this.lastTm = Pan3d.TimeUtil.getTimer()
            this._actionTime += t;


            var _curentFrame: number = float2int(this._actionTime / (Scene_data.frameTime * 2));

            var $len: number = this.frameQuestArr.length;
            var $dualQuatFloat32Array: DualQuatFloat32Array = this.frameQuestArr[_curentFrame % $len]

            Scene_data.context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
            Scene_data.context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos);  //所有的位移

            Scene_data.context3D.drawCall(this.md5MeshData.indexBuffer, this.md5MeshData.treNum);
         */
    }
}
