package z3d.frame3d;

import z3d.display.Display3D;
import z3d.display.particle.CombineParticle;
import z3d.frame3d.dis.FrameBuildSprite;
import z3d.frame3d.dis.FrameSceneChar;
import z3d.frame3d.dis.LightDisplay3DSprite;
import z3d.frame3d.dis.ShadowDisplay3DSprite;
import z3d.scene.Scene3D;
import z3d.vo.Matrix3D;
import z3d.vo.Quaternion;
import z3d.vo.Vector3D;

public class FrameFileNode extends Display3D {
    public FrameNodeVo frameNodeVo;
    private CombineParticle _particle;
    private FrameSceneChar _sceneChar;
    private LightDisplay3DSprite _lightSprite;
    private FrameBuildSprite _frameBuildSprite;
    private ShadowDisplay3DSprite _shadowDisplay3DSprite;
    public Display3D sprite ;

    public FrameFileNode(Scene3D val) {
        super(val);
    }

    public  void setFrameNodeVo(FrameNodeVo $vo) {
        this.frameNodeVo = $vo;
        if (this.frameNodeVo.type == 1) {

            if (this.frameNodeVo.directLight) {  //有法线的对象
                this._frameBuildSprite = new FrameBuildSprite(this.scene3d);
                this._frameBuildSprite.setFrameNodeUrl(this.frameNodeVo);
                this.scene3d.addDisplay(this._frameBuildSprite);
                this.sprite = this._frameBuildSprite;
            } else {
                if (this.frameNodeVo.receiveShadow) {
                    this._shadowDisplay3DSprite = new ShadowDisplay3DSprite(this.scene3d);
                    this._shadowDisplay3DSprite.setFrameNodeUrl(this.frameNodeVo);
                    this.scene3d.addDisplay(this._shadowDisplay3DSprite);
                    this.sprite = this._shadowDisplay3DSprite;
                } else {
                    this._lightSprite = new LightDisplay3DSprite(this.scene3d);
                    this._lightSprite.setFrameNodeUrl(this.frameNodeVo);
                    this.scene3d.addDisplay(this._lightSprite);
                    this.sprite = this._lightSprite;
                }
            }
        }
        if (this.frameNodeVo.type == 2) {
//            this._particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + $vo.resurl);
//            this._particle.dynamic = true;
//            this._particle.sceneVisible = false
//            ParticleManager.getInstance().addParticle(this._particle);
//            this.sprite = this._particle

        }
        if (this.frameNodeVo.type == 3) {
//            this._sceneChar = new FrameSceneChar()
//            this._sceneChar.shadow = false
//            this._sceneChar.setRoleUrl(this.frameNodeVo.resurl);
//            SceneManager.getInstance().addMovieDisplay(this._sceneChar);
//            this.sprite = this._sceneChar
        }
    }
    public boolean sceneVisible;
    @Override
    public void upData() {

        this.sceneVisible = this.isVisible(frameNodeVo.curTime);
        if (this.sceneVisible) {
            this.setModelSprite(this.playFrameVoByTime(frameNodeVo.curTime));
        }
        if (this._particle!=null) {
            this._particle.sceneVisible = this.sceneVisible;
        }
        if (this._frameBuildSprite!=null) {
            this._frameBuildSprite.sceneVisible = this.sceneVisible;
        }
        if (this._lightSprite!=null) {
            this._lightSprite.sceneVisible = this.sceneVisible;
        }
    }
    public FrameLinePointVo playFrameVoByTime(float $time) {
        FrameLinePointVo $keyC=null;
        FrameLinePointVo $a = this.getPreFrameLinePointVoByTime($time);
        FrameLinePointVo $b = this.getNextFrameLinePointVoByTime($time);
        for (int i = 0; i < this.frameNodeVo.pointitem.size(); i++) {
            if (this.frameNodeVo.pointitem.get(i).time == $time) {
                $keyC = this.frameNodeVo.pointitem.get(i);
            }
        }
        if ($keyC!=null) {
            if ($keyC.iskeyFrame) {
                return $keyC;
            }
        } else {
            if ($a!=null && !$a.isAnimation) {
                return $a;
            } else if ($a!=null && $b!=null) {
                return this.setModelData($a, $b, $time);
            }
        }
        return null;
    }

    private FrameLinePointVo setModelData(FrameLinePointVo $a, FrameLinePointVo $b,float $time) {
        float $num = ($time - $a.time) / ($b.time - $a.time);

        FrameLinePointVo $obj = new FrameLinePointVo();
        $obj.x = $a.x + ($b.x - $a.x) * $num;
        $obj.y = $a.y + ($b.y - $a.y) * $num;
        $obj.z = $a.z + ($b.z - $a.z) * $num;

        $obj.scaleX = $a.scaleX + ($b.scaleX - $a.scaleX) * $num;
        $obj.scaleY = $a.scaleY + ($b.scaleY - $a.scaleY) * $num;
        $obj.scaleZ = $a.scaleZ + ($b.scaleZ - $a.scaleZ) * $num;

        Vector3D $eulerAngle = this.qtoq($a, $b, $num);
        $obj.rotationX = $eulerAngle.x;
        $obj.rotationY = $eulerAngle.y;
        $obj.rotationZ = $eulerAngle.z;
        $obj.data = $a.data; //存前面一个的数所有

        if (!$b.iskeyFrame) {
            return $a;
        } else {
            return $obj;
        }

    }
    private void setModelSprite(FrameLinePointVo $obj) {

        if (this.sprite!=null) {
            this.sprite.x = $obj.x;
            this.sprite.y = $obj.y;
            this.sprite.z = $obj.z;
            this.sprite.scaleX = $obj.scaleX;
            this.sprite.scaleY = $obj.scaleY;
            this.sprite.scaleZ = $obj.scaleZ;
            this.sprite.rotationX = $obj.rotationX;
            this.sprite.rotationY = $obj.rotationY;
            this.sprite.rotationZ = $obj.rotationZ;
        }
        if (this._sceneChar!=null) {
//            if ($obj.data && $obj.data.action) {
//                if (this._sceneChar.curentAction != $obj.data.action) {
//                    this._sceneChar.play($obj.data.action)
//                }
//            }

        }

    }
    private Vector3D qtoq(FrameLinePointVo $a, FrameLinePointVo $b,float $time) {

        Matrix3D $m0 = new Matrix3D();
        $m0.appendRotation($a.rotationX, Vector3D.X_AXIS);
        $m0.appendRotation($a.rotationY, Vector3D.Y_AXIS);
        $m0.appendRotation($a.rotationZ, Vector3D.Z_AXIS);
        Quaternion q0 = new Quaternion();

        q0.fromMatrix($m0);


        Matrix3D $m1 = new Matrix3D();
        $m1.appendRotation($b.rotationX, Vector3D.X_AXIS);
        $m1.appendRotation($b.rotationY, Vector3D.Y_AXIS);
        $m1.appendRotation($b.rotationZ, Vector3D.Z_AXIS);
        Quaternion q1 = new Quaternion();
        q1.fromMatrix($m1);

        Quaternion resultQ = new Quaternion();
        resultQ.slerp(q0, q1, $time);
        Vector3D $ve = resultQ.toEulerAngles(null);
        $ve.scaleBy((float)(180 / Math.PI));

        if (isNaN($ve.x) || isNaN($ve.y) || isNaN($ve.z)) {
            $ve.x = $a.rotationX;
            $ve.y = $a.rotationY;
            $ve.z = $a.rotationZ;
        }

        return $ve;
    }

    private boolean isNaN(float a) {
        if(a-0.0<1e-6) return true;else return false;
    }

    public FrameLinePointVo getNextFrameLinePointVoByTime(float $time)  //包含当前
    {
        FrameLinePointVo $next = null;
        for (int i = 0; i < this.frameNodeVo.pointitem.size(); i++) {
        if (this.frameNodeVo.pointitem.get(i).time >= $time) {
            if ($next==null || $next.time > this.frameNodeVo.pointitem.get(i).time) {
                $next = this.frameNodeVo.pointitem.get(i);
            }
        }
    }
        return $next;
    }
    public boolean isVisible(float $num) {
        float $min = this.frameNodeVo.pointitem.get(0).time;
        float $max = this.frameNodeVo.pointitem.get(this.frameNodeVo.pointitem.size() - 1).time;
        FrameLinePointVo dd = this.getPreFrameLinePointVoByTime($num);
        if ($num >= $min && $num <= $max && dd!=null) {
            return dd.iskeyFrame;
        } else {
            return false;
        }
    }
    public FrameLinePointVo getPreFrameLinePointVoByTime(float $time)  //包含当前
    {
        FrameLinePointVo $pre = null;
        for (int  i = 0; i < this.frameNodeVo.pointitem.size(); i++) {
        if (this.frameNodeVo.pointitem.get(i).time <= $time) {
            if ($pre==null || $pre.time < this.frameNodeVo.pointitem.get(i).time) {
                $pre = this.frameNodeVo.pointitem.get(i);
            }
        }
    }
        return $pre;
    }
}
