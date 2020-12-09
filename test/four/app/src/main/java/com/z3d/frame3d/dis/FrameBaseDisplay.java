package com.z3d.frame3d.dis;

import com.z3d.display.Display3DSprite;
import com.z3d.frame3d.FrameNodeVo;
import com.z3d.scene.Scene3D;

import java.util.List;

public class FrameBaseDisplay extends Display3DSprite {
    public boolean sceneVisible=false;
    protected FrameNodeVo frameNodeVo;
    public List<Display3DSprite> groupItem;
    public FrameBaseDisplay(Scene3D val) {
        super(val);
    }
    public void setFrameNodeUrl(FrameNodeVo $vo ) {
        this.frameNodeVo=$vo;

    }

    @Override
    public void upData() {
        super.upData();
    }
}
