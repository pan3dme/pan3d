package z3d.filemodel;

import android.widget.ListView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.MeshData;
import z3d.base.ResGC;
import z3d.res.BaseRes;
import z3d.vo.BindParticle;
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
            } else {

            }

            meshData.treNum = meshData.indexs.size();



            meshData.materialUrl = _byte.readUTF();
            meshData.materialParamData = BaseRes.readMaterialParamData(_byte);

            int particleNum = _byte.readInt();
            for ( int j = 0; j < particleNum; j++) {

                BindParticle bindParticle = new BindParticle(_byte.readUTF(), _byte.readUTF());
                meshData.particleAry.add(bindParticle);


                allParticleDic.put(allParticleDic,true);
            }

            $skinMesh.addMesh(meshData);


        }

        /*
        for (String key in allParticleDic) {
            ParticleManager.getInstance().registerUrl(key);
        }

        $skinMesh.allParticleDic = allParticleDic;

        var bindPosLength: number = byte.readInt();

        var bindPosAry: Array<Array<number>> = new Array;
        for (var j: number = 0; j < bindPosLength; j++) {
            var ary: Array<number> = new Array(byte.readFloat(), byte.readFloat(), byte.readFloat(),
                    byte.readFloat(), byte.readFloat(), byte.readFloat());
            bindPosAry.push(ary);
        }

        this.getBindPosMatrix(bindPosAry, $skinMesh);

        var sokcetLenght: number = byte.readInt();

        $skinMesh.boneSocketDic = new Object();

        for (var j: number = 0; j < sokcetLenght; j++) {
            var boneData: BoneSocketData = new BoneSocketData();
            boneData.name = byte.readUTF();
            boneData.boneName = byte.readUTF();
            boneData.index = byte.readInt();
            boneData.x = byte.readFloat();
            boneData.y = byte.readFloat();
            boneData.z = byte.readFloat();
            boneData.rotationX = byte.readFloat();
            boneData.rotationY = byte.readFloat();
            boneData.rotationZ = byte.readFloat();

            $skinMesh.boneSocketDic[boneData.name] = boneData;
        }

        this._dic[$url] = $skinMesh;
        */

        return $skinMesh;
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

        /*
        var arybuff: ArrayBuffer = new ArrayBuffer(len);
        var data: DataView = new DataView(arybuff);

        BaseRes.readBytes2ArrayBuffer(_byte, data, 3, 0, dataWidth);//vertices
        BaseRes.readBytes2ArrayBuffer(_byte, data, 2, uvsOffsets, dataWidth);//uvs
        BaseRes.readBytes2ArrayBuffer(_byte, data, 3, normalsOffsets, dataWidth);//normals
        BaseRes.readBytes2ArrayBuffer(_byte, data, 3, tangentsOffsets, dataWidth);//tangents
        BaseRes.readBytes2ArrayBuffer(_byte, data, 3, bitangentsOffsets, dataWidth);//bitangents

        BaseRes.readBytes2ArrayBuffer(_byte, data, 4, boneIDOffsets, dataWidth, 2);//boneIDAry
        BaseRes.readBytes2ArrayBuffer(_byte, data, 4, boneWeightOffsets, dataWidth, 1);//boneWeightAry

*/

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

        /*
        meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
        meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(meshData.indexs);
        */

    }


}
