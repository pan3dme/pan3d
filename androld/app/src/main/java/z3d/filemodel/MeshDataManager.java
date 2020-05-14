package z3d.filemodel;

import android.widget.ListView;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.MeshData;
import z3d.base.ResGC;
import z3d.res.BaseRes;
import z3d.vo.BindParticle;
import z3d.vo.BoneSocketData;
import z3d.vo.Matrix3D;
import z3d.vo.Quaternion;
import z3d.vo.SkinMesh;
import z3d.vo.Vector2D;

public class MeshDataManager extends ResGC {

    private static MeshDataManager _instance;
    public static MeshDataManager getInstance()  {
        if (MeshDataManager._instance==null) {
            MeshDataManager._instance = new MeshDataManager();
        }
        return MeshDataManager._instance;
    }

    public void getMeshData(String $url, CallBackFun bfun, int batchNum)
    {


        /*
        if (this._dic[$url] && this._dic[$url].ready) {
            $fun(this._dic[$url]);
            this._dic[$url].useNum++;
            return;
        }

        if (this._loadDic[$url]) {
            this._loadDic[$url].push($fun);
            return;
        }

        this._loadDic[$url] = new Array;
        this._loadDic[$url].push($fun);


        ResManager.getInstance().loadRoleRes(Scene_data.fileRoot + $url, ($roleRes: RoleRes) => {
            this.roleResCom($roleRes, $fun);
        }, $batchNum);
        */


    }
    public SkinMesh readData(ByteArray _byte,int $batchNum,String $url,int $version)
    {
        SkinMesh $skinMesh = new SkinMesh();
        $skinMesh.fileScale = _byte.readFloat();
        if ($version >= 19) {
            $skinMesh.tittleHeight = _byte.readFloat();
        } else {
            $skinMesh.tittleHeight = 50;
        }
        $skinMesh.hitBox = new Vector2D(20, 20);
        if ($version >= 23) {
            $skinMesh.hitBox.x = _byte.readFloat();
            $skinMesh.hitBox.y = _byte.readFloat();
        }
        $skinMesh.makeHitBoxItem();

        int meshNum = _byte.readInt();
       HashMap allParticleDic = new HashMap();
        for (int i = 0; i < meshNum; i++) {
            MeshData meshData = new MeshData();

            if ($version >= 21) {
                this.readMesh2OneBuffer(_byte, meshData);
            }
            meshData.treNum = meshData.indexs.size();
            meshData.materialUrl = _byte.readUTF();
            meshData.materialParamData = BaseRes.readMaterialParamData(_byte);
            int particleNum = _byte.readInt();
            for ( int j = 0; j < particleNum; j++) {
                BindParticle bindParticle = new BindParticle(_byte.readUTF(), _byte.readUTF());
                meshData.particleAry.add(bindParticle);
                allParticleDic.put(bindParticle.url,true);
            }

            $skinMesh.addMesh(meshData);

        }

/*
        for (String key in allParticleDic) {
            ParticleManager.getInstance().registerUrl(key);
        }
        */

        $skinMesh.allParticleDic = allParticleDic;

        int bindPosLength = _byte.readInt();

        List<List<Float>> bindPosAry  = new ArrayList<>();
        for (int j = 0; j < bindPosLength; j++) {
            List<Float> ary =   new ArrayList<Float>(Arrays.asList(_byte.readFloat(), _byte.readFloat(), _byte.readFloat(),
                    _byte.readFloat(), _byte.readFloat(), _byte.readFloat()));

            bindPosAry.add(ary);
        }

        this.getBindPosMatrix(bindPosAry, $skinMesh);

        int sokcetLenght    = _byte.readInt();

        $skinMesh.boneSocketDic = new HashMap();

        for (int j = 0; j < sokcetLenght; j++) {
            BoneSocketData boneData = new BoneSocketData();
            boneData.name = _byte.readUTF();
            boneData.boneName = _byte.readUTF();
            boneData.index = _byte.readInt();
            boneData.x = _byte.readFloat();
            boneData.y = _byte.readFloat();
            boneData.z = _byte.readFloat();
            boneData.rotationX = _byte.readFloat();
            boneData.rotationY = _byte.readFloat();
            boneData.rotationZ = _byte.readFloat();

            $skinMesh.boneSocketDic.put(boneData.name, boneData);
        }

        this.dic.put($url,$skinMesh);


        return $skinMesh;
    }

    private void getBindPosMatrix(List<List<Float>> bindPosAry, SkinMesh $skinMesh) {
        List<Matrix3D> ary  = new ArrayList<>();
        List<Matrix3D>  invertAry  =  new ArrayList<>();

        for (int i = 0; i < bindPosAry.size(); i++) {
            List<Float>  objbone = bindPosAry.get(i);

            Quaternion OldQ   = new Quaternion(objbone.get(0), objbone.get(1), objbone.get(2));
            OldQ.setMd5W();
            Matrix3D newM  = OldQ.toMatrix3D();

            newM.appendTranslation(objbone.get(3), objbone.get(4), objbone.get(5));
            invertAry.add(newM.clone());
            newM.invert();

            ary.add(newM);
        }

        $skinMesh.bindPosMatrixAry = ary;
        $skinMesh.bindPosInvertMatrixAry = invertAry;

    }

    public void readMesh2OneBuffer(ByteArray _byte, MeshData meshData) {
        int len = _byte.readInt();

        List<Boolean> typeItem  = new ArrayList<>();
        int dataWidth    = 0;
        for (int i = 0; i < 5; i++) {
            boolean tf = _byte.readBoolean();
            typeItem.add(tf);
            if (tf) {
                if (i == 1) {
                    dataWidth += 2;
                } else {
                    dataWidth += 3;
                }
            }
        }

        dataWidth += 8;

        len *= dataWidth * 4;

        int uvsOffsets = 3; // 1
        int normalsOffsets = uvsOffsets + 2; // 2
        int tangentsOffsets = normalsOffsets + 3; //3
        int bitangentsOffsets = tangentsOffsets + 3; //4
        int boneIDOffsets;
        if (typeItem.get(2)) {//normal
            if (typeItem.get(4)) {
                boneIDOffsets = bitangentsOffsets + 3;
            } else {
                boneIDOffsets = normalsOffsets + 3;
            }
        } else {
            boneIDOffsets = uvsOffsets + 2;
        }
        int boneWeightOffsets = boneIDOffsets + 4;


        byte[] arybuff = new byte[(int)len];
        ByteBuffer data=ByteBuffer.wrap(arybuff);

        meshData.verticeslist= BaseRes.readBytes2ArrayBuffer(_byte, data, 3, 0, dataWidth,0);//vertices
        meshData.uvlist= BaseRes.readBytes2ArrayBuffer(_byte, data, 2, uvsOffsets, dataWidth,0);//uvs
        meshData.normals=  BaseRes.readBytes2ArrayBuffer(_byte, data, 3, normalsOffsets, dataWidth,0);//normals
        meshData.tangents=  BaseRes.readBytes2ArrayBuffer(_byte, data, 3, tangentsOffsets, dataWidth,0);//tangents
        meshData.bitangents=   BaseRes.readBytes2ArrayBuffer(_byte, data, 3, bitangentsOffsets, dataWidth,0);//bitangents
        meshData.boneIDAry=  BaseRes.readBytes2ArrayBuffer(_byte, data, 4, boneIDOffsets, dataWidth, 2);//boneIDAry
        meshData.boneWeightAry=   BaseRes.readBytes2ArrayBuffer(_byte, data, 4, boneWeightOffsets, dataWidth, 1);//boneWeightAry



        meshData.indexs=new ArrayList<>();
        meshData.boneNewIDAry=new ArrayList<>();
        BaseRes.readIntForTwoByte(_byte, meshData.indexs);
        BaseRes.readIntForTwoByte(_byte, meshData.boneNewIDAry);

        meshData.compressBuffer = true;
        meshData.uvsOffsets = uvsOffsets * 4;
        meshData.normalsOffsets = normalsOffsets * 4;
        meshData.tangentsOffsets = tangentsOffsets * 4;
        meshData.bitangentsOffsets = bitangentsOffsets * 4;

        meshData.boneIDOffsets = boneIDOffsets * 4;
        meshData.boneWeightOffsets = boneWeightOffsets * 4;

        meshData.stride = dataWidth * 4;


    }


}
