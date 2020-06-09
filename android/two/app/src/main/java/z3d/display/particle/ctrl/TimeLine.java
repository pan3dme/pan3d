package z3d.display.particle.ctrl;

import java.util.List;

public class TimeLine {

     private List<KeyFrame> keyFrameAry;
    public float maxFrameNum;
    private KeyFrame _currentKeyFrame;//当前操作的关键帧
    private float _currentFrameNum;//当前帧数
    private float _time;//播放时间
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
        this._currentKeyFrame = this.keyFrameAry.get(0);

    }
    public KeyFrame addKeyFrame(float num)
    {
        KeyFrame keyframe = new KeyFrame();
        keyframe.frameNum = num;
        this.keyFrameAry.add(keyframe);
        return keyframe;
    }


}
