package com.pan3d.filemodel;

import com.pan3d.base.ByteArray;
import com.pan3d.base.MeshData;
import com.pan3d.base.ResGC;
import com.pan3d.base.RoleBackFun;
import com.pan3d.base.Scene_data;
import com.pan3d.base.SkinMeshBackFun;
import com.pan3d.res.BaseRes;
import com.pan3d.res.RoleRes;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.BindParticle;
import com.pan3d.vo.BoneSocketData;
import com.pan3d.vo.Matrix3D;
import com.pan3d.vo.Quaternion;
import com.pan3d.vo.SkinMesh;
import com.pan3d.vo.Vector2D;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class MeshDataManager extends ResGC {

    private static MeshDataManager _instance;
    public HashMap loadDic;

    public MeshDataManager(Scene3D val)
    {
        super(val);
        this.loadDic=new HashMap();
    }
    //预备加载
    public void reloadRoleRes(String url){
        getMeshData(url, new SkinMeshBackFun() {
            @Override
            public void Bfun(SkinMesh value) {
            }
        },1);
    }
    public void getMeshData(String url, final SkinMeshBackFun bfun, int batchNum)
    {

        if(this.dic.containsKey(url)){
            bfun.Bfun((SkinMesh)this.dic.get(url));
            return;
        }
        if(this.loadDic.containsKey(url)){
            ( (List) this.loadDic.get(url)).add(bfun);
            return;
        }
        this.loadDic.put(url,new ArrayList<>());
        ( (List) this.loadDic.get(url)).add(bfun);
       scene3D.resManager.loadRoleRes(Scene_data.fileRoot+ url, new RoleBackFun() {
            @Override
            public void Bfun(RoleRes value) {
                roleResCom(value,bfun);
            }
        },batchNum);


    }

    final   private void roleResCom(RoleRes roleRes , SkinMeshBackFun bfun )
    {
        String url= roleRes.roleUrl;
        SkinMesh skinMesh=(SkinMesh)this.dic.get(url);
        skinMesh.loadMaterial();
        skinMesh.setAction(roleRes.actionAry,url);
        List<SkinMeshBackFun>  arr= (List<SkinMeshBackFun>) (this.loadDic.get(url));
        for (int i = 0; i <arr.size() ; i++) {
            arr.get(i).Bfun(skinMesh);
        }
        skinMesh.ready=true;
        this.loadDic.remove(url);
    }

    public SkinMesh readData(ByteArray _byte, int $batchNum, String $url, int $version)
    {
        SkinMesh $skinMesh = new SkinMesh(scene3D);
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
            MeshData meshData = new MeshData(scene3D);
            if ($version >= 21) {
                this.readMesh2OneBuffer(_byte, meshData);
            }
            meshData.treNum = meshData.indexs.size();
            meshData.materialUrl = _byte.readUTF();
            meshData.materialParamData =  BaseRes.readMaterialParamData(_byte);
            int particleNum = _byte.readInt();
            for ( int j = 0; j < particleNum; j++) {
                BindParticle bindParticle = new BindParticle(_byte.readUTF(), _byte.readUTF());
                meshData.particleAry.add(bindParticle);
                allParticleDic.put(bindParticle.url,true);
            }

            $skinMesh.addMesh(meshData);

        }


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

        meshData.upToGup();


    }


}
