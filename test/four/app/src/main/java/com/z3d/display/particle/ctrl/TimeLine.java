package com.z3d.display.particle.ctrl;

import com.z3d.base.Scene_data;
import com.z3d.display.particle.Display3DParticle;
import com.z3d.vo.Matrix3D;
import com.z3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.List;

public class TimeLine {

    private static final String TAG ="TimeLine" ;
    private List<KeyFrame> keyFrameAry;
    public float maxFrameNum;
    private KeyFrame currentKeyFrame;//当前操作的关键帧
    private float _currentFrameNum;//当前帧数
    public float time;//播放时间
    private  float targetFlag;
    public boolean visible;
    public  float beginTime;
    private boolean isByteData ;
    private SelfRotation _selfRotaion;
    private AxisRotaion _axisRotaion;
    private AxisMove _axisMove;
    private ScaleChange _scaleChange;
    private ScaleAnim _scaleAnim;
    private ScaleNoise _scaleNosie;

    public  TimeLine()
    {
        this.keyFrameAry=new ArrayList<>();
        this.targetFlag = -1;
        this.visible = false;
        this.maxFrameNum = 0;
        this.time = 0;
    }
    public void setAllDataInfo(TimeLineData $data)
    {
        this.isByteData = true;
        int len = $data.dataAry.size();
        for (int i = 0; i < len; i++) {
            KeyFrame key  = this.addKeyFrame($data.dataAry.get(i).frameNum);
            key.baseValue = $data.dataAry.get(i).baseValue;
            key.animData = $data.dataAry.get(i).animData;
        }

        this.maxFrameNum = $data.maxFrameNum;
        this.beginTime = $data.beginTime;
        this.currentKeyFrame = this.keyFrameAry.get(0);

    }
    public KeyFrame addKeyFrame(float num)
    {
        KeyFrame keyframe = new KeyFrame();
        keyframe.frameNum = num;
        this.keyFrameAry.add(keyframe);
        return keyframe;
    }


    public void updateMatrix(Matrix3D posMatrix, Display3DParticle $particle) {

        if (this._axisMove!=null) {
            posMatrix.prependTranslation(this._axisMove.axis.x * this._axisMove.num, this._axisMove.axis.y * this._axisMove.num, this._axisMove.axis.z * this._axisMove.num);
        }
        if (this._axisRotaion!=null) {
            posMatrix.prependRotation(this._axisRotaion.num, this._axisRotaion.axis);
        }

        posMatrix.prependTranslation($particle.data.center.x, $particle.data.center.y, $particle.data.center.z);


        if (this._scaleChange!=null) {
            //processScale();
            posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleChange.num, $particle.data._heightFixed ? 1 : this._scaleChange.num,
                    $particle.data._widthFixed ? 1 : this._scaleChange.num);
        } else if (this._scaleNosie!=null) {
            //processNosie();
            posMatrix.prependScale($particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num), $particle.data._heightFixed ? 1 : (1 + this._scaleNosie.num),
                    $particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num));
        } else if (this._scaleAnim!=null) {
            //processScaleAnim();
            posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleAnim.num, $particle.data._heightFixed ? 1 : this._scaleAnim.num,
                    $particle.data._widthFixed ? 1 : this._scaleAnim.num);
            ////console.log(this._scaleAnim.num);
        }
        posMatrix.prependRotation($particle.data.rotationV3d.z, Vector3D.Z_AXIS);
        posMatrix.prependRotation($particle.data.rotationV3d.y, Vector3D.Y_AXIS);
        posMatrix.prependRotation($particle.data.rotationV3d.x, Vector3D.X_AXIS);
    }


   private void getTarget()
    {
        int flag=-1;
        for (int i = 0; i < this.keyFrameAry.size(); i++) {
            if (this.keyFrameAry.get(i).frameNum * Scene_data.frameTime < this.time) {
                flag = i;
            } else {
                break;
            }
        }
        if (flag != this.targetFlag) {
            this.currentKeyFrame = this.keyFrameAry.get(flag);
            this.targetFlag = flag;

            if (flag == (this.keyFrameAry.size() - 1)) {
                this.visible = false;
                this.currentKeyFrame = null;
            } else {
                this.visible = true;

                this.enterKeyFrame(this.currentKeyFrame.animData ,this.currentKeyFrame.frameNum * Scene_data.frameTime,  this.currentKeyFrame.baseValue);
         }

        }

    }
    private void enterKeyFrame(List ary ,float baseTime ,List<Float> baseValueAry ) {

        if (baseValueAry == null) {
            return;
        }
        for (int i = 0; i < 10; i++) {
            if (baseValueAry.get(i)==0) {
                continue;
            }
            switch (i) {
                case 1:
                    if (this._selfRotaion!=null)
                    {
                        this._selfRotaion = new SelfRotation();
                    }
                    this._selfRotaion.num = this._selfRotaion.baseNum = baseValueAry.get(i);
                    break;
                case 2:
                    if (this._axisRotaion!=null)
                    {
                        this._axisRotaion = new AxisRotaion();
                    }
                    this._axisRotaion.num = this._axisRotaion.baseNum = baseValueAry.get(i);
                    break;
                case 6:
                    if (this._scaleChange!=null)
                    {
                        this._scaleChange = new ScaleChange();
                    }
                    this._scaleChange.num = this._scaleChange.baseNum = baseValueAry.get(i);
                    break;
                case 7:
                    if (this._scaleAnim!=null)
                    {
                        this._scaleAnim = new ScaleAnim();
                    }
                    this._scaleAnim.num = this._scaleAnim.baseNum =baseValueAry.get(i);
                    break;
                case 8:
                    if (this._scaleNosie!=null)
                    {
                        this._scaleNosie = new ScaleNoise();
                    }
                    this._scaleNosie.num = this._scaleNosie.baseNum = baseValueAry.get(i);
                    break;
                case 9:
                    if (this._axisMove!=null)
                    {
                        this._axisMove = new AxisMove();
                    }
                    this._axisMove.num = this._axisMove.baseNum = baseValueAry.get(i);
                    break;
            }

        }

        if (this._selfRotaion!=null)
        {
            this._selfRotaion.isDeath = true;
        }
        if (this._axisRotaion!=null)
        {
            this._axisRotaion.isDeath = true;
        }
        if (this._scaleChange!=null)
        {
            this._scaleChange.isDeath = true;
        }
        if (this._scaleAnim!=null)
        {
            this._scaleAnim.isDeath = true;
        }
        if (this._scaleNosie!=null)
        {
            this._scaleNosie.isDeath = true;
        }
        if (this._axisMove!=null)
        {
            this._axisMove.isDeath = true;
        }
        if (ary==null) {
            return;
        }
        this.setBaseTimeByte(ary, baseTime, baseValueAry);
    }

    private void setBaseTimeByte(List<TimeLineAnimDataVo> ary, float baseTime, List<Float> baseValueAry) {

        for (int i = 0; i < ary.size(); i++) {
            TimeLineAnimDataVo arrIdx= ary.get(i);
            if (arrIdx.type == 1) {
                if (this._selfRotaion==null) {
                    this._selfRotaion = new SelfRotation();
                } else {
                    this._selfRotaion.reset();
                }
                this._selfRotaion.dataByte(arrIdx.data, arrIdx.dataByte);
                this._selfRotaion.baseTime = baseTime;
            } else if (arrIdx.type == 2) {
                if (this._axisRotaion==null) {
                    this._axisRotaion = new AxisRotaion();
                } else {
                    this._axisRotaion.reset();
                }
                this._axisRotaion.baseTime = baseTime;
            } else if (arrIdx.type == 6) {
                if (this._scaleChange==null) {
                    this._scaleChange = new ScaleChange();
                } else {
                    this._scaleChange.reset();
                }
                this._scaleChange.dataByte(arrIdx.data, arrIdx.dataByte);
                this._scaleChange.baseTime = baseTime;
            } else if (arrIdx.type == 7) {
                if (this._scaleAnim==null) {
                    this._scaleAnim = new ScaleAnim();
                } else {
                    this._scaleAnim.reset();
                }
                this._scaleAnim.dataByte(arrIdx.data, arrIdx.dataByte);
                this._scaleAnim.baseTime = baseTime;
            } else if (arrIdx.type == 8) {
                if (this._scaleNosie==null) {
                    this._scaleNosie = new ScaleNoise();
                } else {
                    this._scaleNosie.reset();
                }
                this._scaleNosie.dataByte(arrIdx.data, arrIdx.dataByte);
                this._scaleNosie.baseTime = baseTime;
            } else if (arrIdx.type == 9) {
                if (this._axisMove==null) {
                    this._axisMove = new AxisMove();
                } else {
                    this._axisMove.reset();
                }
                this._axisMove.dataByte(arrIdx.data, arrIdx.dataByte);
                this._axisMove.baseTime = baseTime;
            }
        }


    }

    public void updateTime(float t) {

        if (this.currentKeyFrame ==null) {
            return;
        }
        this.time = t;
        this.getTarget();
        if (this._axisRotaion!=null) {
            this._axisRotaion.updata(this.time);
        }
        if (this._selfRotaion!=null) {
            this._selfRotaion.updata(this.time);
        }
        if (this._axisMove!=null) {
            this._axisMove.updata(this.time);
        }
        if (this._scaleChange!=null)
        {
            this._scaleChange.updata(this.time);
        } else if (this._scaleNosie!=null)
        { this._scaleNosie.updata(this.time);
        } else if (this._scaleAnim!=null) {
            this._scaleAnim.updata(this.time);
        }
    }

    public void applySelfRotation(Matrix3D $targetMatrix, Vector3D $axis) {

        if (this._selfRotaion!=null) {
            $targetMatrix.prependRotation(this._selfRotaion.num, $axis);
        }
    }

    public void reset() {
        this.time = 0;
        this.currentKeyFrame = this.keyFrameAry.get(0);
        this.visible = false;
        this.targetFlag = -1;
    }
}
