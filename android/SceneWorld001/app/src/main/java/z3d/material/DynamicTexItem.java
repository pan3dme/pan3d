package z3d.material;

import java.util.ArrayList;
import java.util.List;

public class DynamicTexItem extends DynamicBaseTexItem {


    public  String url;
    public  int textureDynamic;
    public  boolean isParticleColor;
    public  Curve curve;
    public  float life;


    public void initCurve(int i) {
        this.curve = new Curve();
        this.curve.type = i;
    }

    public void creatTextureByCurve() {
        int endVecIndex   = this.curve.valueVec.size() - 1;
        List<Float> imgNumVec  = new ArrayList();
        for (int i = 0; i < this.life; i++) {

            if (i < this.curve.begintFrame) {
                imgNumVec.add(this.curve.valueVec.get(0).get(0) * 0xff);
                imgNumVec.add(this.curve.valueVec.get(0).get(1) * 0xff);
                imgNumVec.add(this.curve.valueVec.get(0).get(2) * 0xff);
                imgNumVec.add(this.curve.valueVec.get(0).get(3) * 0xff);
            } else if (i > this.curve.maxFrame) {
                if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
                    imgNumVec.add(0xff*1.f);
                    imgNumVec.add(0xff*1.f);
                    imgNumVec.add(0xff*1.f);
                    imgNumVec.add(0xff*1.f);
                }else{
                    imgNumVec.add(this.curve.valueVec.get(endVecIndex).get(0) * 0xff);
                    imgNumVec.add(this.curve.valueVec.get(endVecIndex).get(1) * 0xff);
                    imgNumVec.add(this.curve.valueVec.get(endVecIndex).get(2) * 0xff);
                    imgNumVec.add(this.curve.valueVec.get(endVecIndex).get(3) * 0xff);
                }

            } else {
                if (this.curve.begintFrame < 0) {
                    imgNumVec.add(0xff*1.f);
                    imgNumVec.add(0xff*1.f);
                    imgNumVec.add(0xff*1.f);
                    imgNumVec.add(0xff*1.f);
                } else {
                    int index = i - this.curve.begintFrame;
                    imgNumVec.add(this.curve.valueVec.get(index).get(0) * 0xff);
                    imgNumVec.add(this.curve.valueVec.get(index).get(1) * 0xff);
                    imgNumVec.add(this.curve.valueVec.get(index).get(2) * 0xff);
                    imgNumVec.add(this.curve.valueVec.get(index).get(3) * 0xff);     }
            }
        }


//        var img: ImageData = ColorTransition.getInstance().getImageDataByVec(imgNumVec, this.life);
//        this._textureDynamic = Scene_data.context3D.getTexture(img);


    }
}
