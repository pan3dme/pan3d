package com.pan3d.frame3d;

import android.util.Log;

import com.pan3d.base.CallBack;
import com.pan3d.display.Display3D;
import com.pan3d.scene.Scene3D;
import com.pan3d.units.TimeUtil;

import java.util.ArrayList;
import java.util.List;

public class Frame3dSprite extends Display3D {
    private static final String TAG ="Frame3dSprite" ;

    public Frame3dSprite(Scene3D val) {
        super(val);
        this.addLoadFrame3dRes();
    }
    Frame3dRes frame3dRes;
    private void addLoadFrame3dRes()
    {
        scene3D.clearAll();
        this.frame3dRes=new Frame3dRes( scene3D);
        this.frame3dRes.load("pan/frame3dres/huowumatou_frame.txt", new CallBack() {
            @Override
            public void StateChange(Object val) {
                loadFrame3DFinish(frame3dRes);
            }
        });

    }
    private List<FrameFileNode> frameImodelItem;
    public void loadFrame3DFinish(Frame3dRes frame3dRes){
        this.frameImodelItem = new ArrayList<>();
        for (int i = 0; i <frame3dRes.frameItem.size(); i++) {
            FrameFileNode $base = new FrameFileNode( scene3D);
            $base.setFrameNodeVo(frame3dRes.frameItem.get(i));
            this.frameImodelItem.add($base);
        }
        Log.d(TAG, "loadFrame3DFinish: ");
    }
    private void mathTimeFrame()
    {
        float dt = TimeUtil.getTimer() - this.lastTime;
        this.frameNum += dt / (1000 / this.frame3dRes.frameSpeedNum);
        this.frameNum = this.frameNum % (this.frame3dRes.maxTime-1);
        this.lastTime = TimeUtil.getTimer();
        for (int i = 0;this.frameImodelItem!=null&& i < this.frameImodelItem.size(); i++) {
            this.frameImodelItem.get(i).frameNodeVo.curTime=this.frameNum;
        }
    }
    private float frameNum=1;
    private float lastTime=0;
    public void upData()
    {
        if(this.frame3dRes.isReady){
            this.mathTimeFrame();
            for (int i = 0;this.frameImodelItem!=null&& i < this.frameImodelItem.size(); i++) {
                this.frameImodelItem.get(i).upData();
            }
        }

    }
}
