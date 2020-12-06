package com.z3d.units;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import com.z3d.base.ByteArray;
import com.z3d.base.ResGC;
import com.z3d.vo.AnimData;
import com.z3d.vo.Matrix3D;
import com.z3d.vo.ObjectBaseBone;
import com.z3d.vo.ObjectBone;
import com.z3d.vo.Quaternion;
import com.z3d.vo.Vector3D;

public class AnimManager extends ResGC {

    private static AnimManager _instance;
    public static AnimManager getInstance()  {
        if (AnimManager._instance==null) {
            AnimManager._instance = new AnimManager();
        }
        return AnimManager._instance;
    }

    public AnimData readData(ByteArray _byte, String $url)
    {
        List<ObjectBone> hierarchyList  = new ArrayList<>();
        List<List<Float>> frameAry  = new ArrayList<>();

        AnimData animData  = new AnimData();

        animData.inLoop = _byte.readInt();

        int numLength = _byte.readInt();
        for (int i = 0; i < numLength; i++) {
            animData.inter.add(_byte.readInt());
        }

        numLength = _byte.readInt();
        for (int i = 0; i < numLength; i++) {
            animData.bounds.add(_byte.readVector3D());
        }

        animData.nameHeight = _byte.readInt();

        numLength = _byte.readInt();

        for (int i = 0; i < numLength; i++) {
            ObjectBone objBone = new ObjectBone();
            objBone.father = _byte.readInt();
            objBone.changtype = _byte.readInt();
            objBone.startIndex = _byte.readInt();

            objBone.tx = _byte.readFloat();
            objBone.ty = _byte.readFloat();
            objBone.tz = _byte.readFloat();

            objBone.qx = _byte.readFloat();
            objBone.qy = _byte.readFloat();
            objBone.qz = _byte.readFloat();

            hierarchyList.add(objBone);
        }

        this.readFrameData(_byte, frameAry);

        numLength = _byte.readInt();
        for (int i = 0; i < numLength; i++) {
            animData.posAry.add(_byte.readVector3D());
        }

        animData.matrixAry = this.processFrame(frameAry, hierarchyList);


        this.dic.put($url,animData);
        return animData;
    }
     public AnimData getAnimDataImmediate( String url)
    {
        return (AnimData)this.dic.get(url);
    }
    private List<List<Matrix3D>> processFrame(List<List<Float>> frameAry,  List<ObjectBone> hierarchyList)
    {
        List<List<ObjectBaseBone>> newFrameAry  = new ArrayList<>();
        for (int i = 0; i < frameAry.size(); i++) {
            newFrameAry.add(this.frameToBone(frameAry.get(i), hierarchyList));
        }

        return this.setFrameToMatrix(newFrameAry);
    }
    private List<List<Matrix3D>> setFrameToMatrix(List<List<ObjectBaseBone>> frameAry) {

        List<List<Matrix3D>>  matrixAry= new ArrayList<>();

        for (int j = 0; j < frameAry.size(); j++) {
            List<ObjectBaseBone> boneAry = frameAry.get(j);

            Quaternion Q0 = new Quaternion();
            Matrix3D newM = new Matrix3D();

            List<Matrix3D> frameMatrixAry = new ArrayList<>();
            matrixAry.add(frameMatrixAry);

            for (int i = 0; i < boneAry.size(); i++) {

                ObjectBaseBone xyzfarme0  = boneAry.get(i);
                Q0 = new Quaternion(xyzfarme0.qx, xyzfarme0.qy, xyzfarme0.qz);
                Q0.w = this.getW(Q0.x, Q0.y, Q0.z);

                if (xyzfarme0.father == -1) {
                    newM = Q0.toMatrix3D();
                    newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                    newM.appendRotation(-90, Vector3D.X_AXIS);
                    //xyzfarme0.matrix = newM;
                    frameMatrixAry.add(newM);
                } else {
                    ObjectBaseBone fatherBone   = boneAry.get(xyzfarme0.father);

                    newM = Q0.toMatrix3D();
                    newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                    //newM.append(fatherBone.matrix);
                    newM.append(frameMatrixAry.get(xyzfarme0.father));
                    frameMatrixAry.add(newM);
                    //xyzfarme0.matrix = newM;

                }
            }
            for (int i = 0; i < frameMatrixAry.size(); i++) {
                frameMatrixAry.get(i).appendScale(-1, 1, 1);  //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
                //xyzfarme0.matrix.appendScale(-1, 1, 1);
            }

        }

        return matrixAry;
    }

    private float getW(float x,float y,float z) {
        float t = 1 - (x * x + y * y + z * z);
        if (t < 0) {
            t = 0;
        } else {

            t = -(float) Math.sqrt(t);
        }
        return t;
    }
    public  List<ObjectBaseBone>  frameToBone(List<Float> frameData, List<ObjectBone> hierarchyList)
    {
        List<ObjectBaseBone> _arr = new ArrayList<>();

        for (int i = 0; i < hierarchyList.size(); i++) {
            ObjectBaseBone _temp = new ObjectBaseBone();
            _temp.father = hierarchyList.get(i).father;

            int k = 0;
            ObjectBone objectBone=hierarchyList.get(i);
            int changtype=objectBone.changtype;

            if ( (byte)(changtype & 1)>0  ) {
                _temp.tx = frameData.get(objectBone.startIndex + k);
                ++k;
            } else {
                _temp.tx = hierarchyList.get(i).tx;
            }

            if ( (byte)(changtype & 2)>0 ) {
                _temp.ty = frameData.get(objectBone.startIndex + k);
                ++k;
            } else {
                _temp.ty = hierarchyList.get(i).ty;
            }

            if ( (byte)(changtype & 4)>0 ) {
                _temp.tz = frameData.get(objectBone.startIndex + k);
                ++k;
            } else {
                _temp.tz = hierarchyList.get(i).tz;
            }

            if ( (byte)(changtype & 8)>0 ) {
                _temp.qx = frameData.get(objectBone.startIndex + k);
                ++k;
            } else {
                _temp.qx = hierarchyList.get(i).qx;
            }

            if ( (byte)(changtype & 16)>0 ) {
                _temp.qy = frameData.get(objectBone.startIndex + k);
                ++k;
            } else {
                _temp.qy = hierarchyList.get(i).qy;
            }

            if ( (byte)(changtype & 32)>0 ) {
                _temp.qz = frameData.get(objectBone.startIndex + k);
                ++k;
            } else {
                _temp.qz = hierarchyList.get(i).qz;
            }

            _arr.add(_temp);
        }
        return _arr;
    }

    private void readFrameData(ByteArray _byte,List<List<Float>> frameAry) {
        List<Boolean> $frameTyeArr = this.readFrameTypeData(_byte);
        boolean $isStand = _byte.readBoolean() ;//是否为站立，这里特殊给站立的旋转设置其权重值不压缩
        Log.d("position"+_byte.byteBuffer.length(), "readFrameData: "+_byte.byteBuffer.position);
        if($isStand){
            Log.d("position", "readFrameData: "+_byte.byteBuffer.position);
        }
        float $scaleNum = _byte.readFloat();
        int numLength = _byte.readInt();
        for (int i = 0; i < numLength; i++) {
            int frameItemAryLength = _byte.readInt();
            List<Float> frameItemAry = new ArrayList<>();
            frameAry.add(frameItemAry);
            for (int j = 0; j < frameItemAryLength; j++) {
                if ($frameTyeArr.get(j)) {
                    frameItemAry.add(_byte.readFloatTwoByte($scaleNum));
                } else {
                    if ($isStand) {  //注意这里的特殊，针对站立时的旋转精度用浮点
                        frameItemAry.add(_byte.readFloat());
                    } else {
                        frameItemAry.add(_byte.readShort() / 32767.f);
                    }

                }

            }
        }

    }
    private List<Boolean> readFrameTypeData(ByteArray _byte)
    {
        List<Boolean> $arr  = new ArrayList<>();
        int numLength = _byte.readInt();
        for (int i = 0; i < numLength; i++) {
            $arr.add(_byte.readBoolean());
        }
        return $arr;
    }

}
