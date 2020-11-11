package z3d.md5;

import java.util.ArrayList;
import java.util.List;

import z3d.base.MeshData;
import z3d.base.ObjData;
import z3d.md5.vo.Md5MeshData;
import z3d.md5.vo.MeshItem;
import z3d.md5.vo.ObjectBone;
import z3d.md5.vo.ObjectUv;
import z3d.md5.vo.ObjectWeight;
import z3d.vo.Matrix3D;
import z3d.vo.Quaternion;
import z3d.vo.Vector3D;

public class MeshToObjUtils {
    public static List<ObjectBone> getStorNewTargerArr(List<ObjectBone> targetAry) {
        List<ObjectBone> newTargetAry = new ArrayList<>();
        for (int i = 0; i < targetAry.size(); i++) {
            if (newTargetAry.indexOf(targetAry.get(i)) == -1) {
                newTargetAry.add(targetAry.get(i));
            }
        }
        return newTargetAry;
    }

    public MeshData getObj(Md5MeshData mesh) {
        MeshData objData = new MeshData();
        objData.verticeslist = new ArrayList<>();
        objData.uvlist = new ArrayList<>();
        objData.normals = new ArrayList<>();
        objData.indexs = new ArrayList<>();

        List<Matrix3D> bindPosAry  = new ArrayList<>();
        List<Matrix3D>  invertAry = new ArrayList<>();

        List<MeshItem> meshItemAry = new ArrayList<>();
        List<ObjectBone> boneItemAry = this.processBoneNew(mesh.boneItem);

        for (int i = 0; i < boneItemAry.size(); i++) {
            ObjectBone objbone = boneItemAry.get(i);
            Quaternion OldQ = new Quaternion(objbone.qx, objbone.qy, objbone.qz);
            OldQ.w = this.getW(OldQ.x, OldQ.y, OldQ.z);
            Matrix3D newM = OldQ.toMatrix3D();
            newM.appendTranslation(objbone.tx, objbone.ty, objbone.tz);
            objbone.matrix = newM;
            bindPosAry.add(newM);
            Matrix3D inverMatrix = newM.clone();
            inverMatrix.invert();
            invertAry.add(inverMatrix);
        }

        for (int i = 0; i < mesh.uvItem.size(); i++) {
            ObjectUv objuv = mesh.uvItem.get(i);
            Vector3D v3d  = new Vector3D();

            List<Float> wAry = new ArrayList<>();

            for (int j = 0; j < objuv.b; j++) {
                int weightID = objuv.a + j;
                ObjectWeight objWeight = mesh.weightItem.get(weightID);
                Matrix3D ma = boneItemAry.get(objWeight.boneId).matrix;

                Vector3D tempV3d = new Vector3D(objWeight.x, objWeight.y, objWeight.z);
                tempV3d = ma.transformVector(tempV3d);
                tempV3d.scaleBy(objWeight.w);
                v3d = v3d.add(tempV3d);
                wAry.add(objWeight.w);
            }
            objData.verticeslist.add(v3d.x);
            objData.verticeslist.add(v3d.y);
            objData.verticeslist.add(v3d.z);
            objData.uvlist.add(objuv.x);
            objData.uvlist.add(objuv.y);
            MeshItem meshitem = new MeshItem();
            meshitem.verts = new Vector3D(v3d.x, v3d.y, v3d.z);
            meshitem.uvInfo = objuv;

            meshItemAry.add(meshitem);
        }

        for (int i = 0; i < mesh.triItem.size(); i++) {
            objData.indexs.add((short)mesh.triItem.get(i).t0);
            objData.indexs.add((short)mesh.triItem.get(i).t1);
            objData.indexs.add((short)mesh.triItem.get(i).t2);
        }

        objData.vertexBuffer = ObjData.upGpuvertexBuffer(objData.verticeslist);
        objData.uvBuffer = ObjData.upGpuvertexBuffer(objData.uvlist);
        objData.indexBuffer = ObjData.upGpuIndexBuffer(objData.indexs);
        objData.bindPosAry = bindPosAry;
        objData.invertAry = invertAry;



        return objData;
    }

    private float getW(float x, float y, float z) {
        double t = 1 - (x * x + y * y + z * z);
        if (t < 0) {
            t = 0;
        } else {
           t = -Math.sqrt(t);
        }
        return (float) t;
    }

    private List<ObjectBone> processBoneNew(List<ObjectBone> targetAry) {
        List<ObjectBone> newTargetAry = MeshToObjUtils.getStorNewTargerArr(targetAry);
        //添加bip骨骼到新数组
        int index;
        List<Integer> mapkeyAry  = new ArrayList();//新旧ID映射关系
        for (int i = 0; i < targetAry.size(); i++) {
              index = newTargetAry.indexOf(targetAry.get(i));
            mapkeyAry.add(index);
        }
        List<ObjectBone> resultAry = new ArrayList<>();//最终更新的数据
        for (int i = 0; i < newTargetAry.size(); i++) {//数据复制
            ObjectBone $kkkk = newTargetAry.get(i);
            resultAry.add($kkkk.clone());
        }

        for (int i = 0; i < resultAry.size(); i++) {//从映射关系更新父级id
            index = resultAry.get(i).father;
            if (index != -1) {
                resultAry.get(i).father = mapkeyAry.get(i);
            }
        }

        return resultAry;
    }
}
