package z3d.frame3d;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import scene.CallBack;
import z3d.display.Display3D;
import z3d.scene.Scene3D;

public class Frame3dSprite extends Display3D {
    private static final String TAG ="Frame3dSprite" ;

    public Frame3dSprite(Scene3D val) {
        super(val);
        this.addLoadFrame3dRes();
    }
    private void addLoadFrame3dRes()
    {
        //https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/frame3dres/huowumatou_frame.txt
        Frame3dRes frame3dRes=new Frame3dRes();
        frame3dRes.load("pan/frame3dres/huowumatou_frame.txt", new CallBack() {
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
            FrameFileNode $base = new FrameFileNode(this.scene3d);
            $base.setFrameNodeVo(frame3dRes.frameItem.get(i));
            this.frameImodelItem.add($base);
        }

        Log.d(TAG, "loadFrame3DFinish: ");
    }
    public void upData()
    {
        for (int i = 0;this.frameImodelItem!=null&& i < this.frameImodelItem.size(); i++) {
            this.frameImodelItem.get(i).upData();
        }
    }
}
