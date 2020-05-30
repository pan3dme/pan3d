package z3d.vo;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import z3d.material.Material;

public class AnimData {

    public int inLoop ;
    public List<Integer> inter ;
    public List<Vector3D>  bounds ;
    public float nameHeight ;
    public List<Vector3D>  posAry ;
    public List<List<Matrix3D>>  matrixAry ;
    public List<List<DualQuatFloat32Array>>  boneQPAry ;
    public boolean hasProcess ;


    public  void  processMesh(SkinMesh skinMesh)
    {
        if (this.hasProcess){
            Log.d("has process logic error", "processMesh: ");
            return;
        }
        for (int i = 0; i < this.matrixAry.size(); i++) {
            List<Matrix3D> frameAry = this.matrixAry.get(i);
            for (int j = 0; j < frameAry.size(); j++) {
                frameAry.get(j).prepend(skinMesh.bindPosMatrixAry.get(j));

            }
        }
        this.makeFrameDualQuatFloatArray(skinMesh);
        this.hasProcess = true;
    }
    private   void  makeFrameDualQuatFloatArray(SkinMesh skinMesh)
    {

        this.boneQPAry=new ArrayList<>();
        Matrix3D tempMatrix  = new  Matrix3D();
        for (int i  =0; i < skinMesh.meshAry.size(); i++)
        {
            List<DualQuatFloat32Array> frameDualQuat = new ArrayList<>();
            List<Short> newIDBoneArr = skinMesh.meshAry.get(i).boneNewIDAry;
            for (int j = 0; j < this.matrixAry.size(); j++) {
                List<Matrix3D> baseBone  = this.matrixAry.get(j);
                DualQuatFloat32Array dualQuatFloat32Array = new DualQuatFloat32Array();

                float[] quat=new  float[newIDBoneArr.size()*4];
                float[] pos=new  float[newIDBoneArr.size()*3];

                for (int k = 0; k < newIDBoneArr.size(); k++)
                {

                    Matrix3D m=   baseBone.get( newIDBoneArr.get(k)).clone();

                    m.appendScale(-1,1,1);
                    Quaternion q=new Quaternion();
                    q.fromMatrix(m);
                    Vector3D p=m.position();

                    quat[k * 4 + 0] = q.x;
                    quat[k * 4 + 1] = q.y;
                    quat[k * 4 + 2] = q.z;
                    quat[k * 4 + 3] = q.w;
                    pos[k * 3 + 0] = p.x;
                    pos[k * 3 + 1] = p.y;
                    pos[k * 3 + 2] = p.z;
                }
                List<Float> quatArr=new ArrayList<>();
                for(int m=0;m<newIDBoneArr.size() * 4;m++){
                    quatArr.add(quat[m]);
                }
                dualQuatFloat32Array.quatArr=quatArr;

                List<Float> posArr=new ArrayList<>();
                for(int n=0;n<newIDBoneArr.size() * 3;n++){

                    posArr.add(pos[n]);
                }
                dualQuatFloat32Array.posArr=posArr;
                frameDualQuat.add(dualQuatFloat32Array);

            }
            this.boneQPAry.add(frameDualQuat);

        }
    }

}
