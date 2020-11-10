package z3d.md5;

import android.text.TextUtils;
import android.util.Log;

import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.ObjData;
import z3d.base.Scene_data;
import z3d.base.TexTuresBackFun;
import z3d.display.Display3DSprite;
import z3d.filemodel.TextureManager;
import z3d.material.TextureRes;
import z3d.md5.vo.Md5MeshData;
import z3d.res.RoleRes;
import z3d.scene.Scene3D;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;
import z3d.vo.Matrix3D;

public class Md5MoveSprite extends Display3DSprite {
    private String bodyUrl;
    private String animUrl;
    private TextureRes uvTextureRes;
    public Md5MoveSprite(Scene3D val) {
        super(val);
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
    public ObjData md5objData;
    private void loadBodyMesh() {


        LoadManager.getInstance().loadUrl(Scene_data.fileRoot + this.bodyUrl,LoadManager.XML_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    String txt=  dic.get("txt").toString();
                    md5MeshData = new Md5Analysis().addMesh(txt);
                    new MeshImportSort().processMesh(md5MeshData);
                    md5objData = new MeshToObjUtils().getObj( md5MeshData);
                    loadAnimFrame();
                }else{

                }
            }
        },null);
    }

    private void loadAnimFrame() {

        LoadManager.getInstance().loadUrl(Scene_data.fileRoot + this.animUrl,LoadManager.XML_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    String txt=  dic.get("txt").toString();

                    List<List<Matrix3D>> $matrixAry = new Md5animAnalysis().addAnim(txt);
//                    this.frameQuestArr = new Array;
//                    for (var i: number = 0; i < $matrixAry.length; i++) {
//                        var $frameAry: Array<Matrix3D> = $matrixAry[i];
//                        for (var j: number = 0; j < $frameAry.length; j++) {
//                            $frameAry[j].prepend(this.md5objData.invertAry[j]);
//                        }
//                        this.frameQuestArr.push(this.makeDualQuatFloat32Array($matrixAry[i]));
//                    }

                }else{

                }
            }
        },null);


    }
}
