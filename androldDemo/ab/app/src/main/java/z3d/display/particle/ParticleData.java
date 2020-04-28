package z3d.display.particle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.ObjData;
import z3d.base.Scene_data;
import z3d.display.particle.ctrl.TimeLineData;
import z3d.material.MaterialParam;
import z3d.vo.CurveItemVo;
import z3d.vo.CurveVo;
import z3d.vo.Matrix3D;
import z3d.vo.ParamDataConVo;
import z3d.vo.ParamDataVo;
import z3d.vo.Vector2D;
import z3d.vo.Vector3D;

public class ParticleData {
    public int version;
    public float _beginTime;
    public float _delayedTime;
    public float _width;
    public float _height;
    public boolean _widthFixed;
    public boolean _heightFixed;
    public boolean _tileMode;
    public float _originWidthScale;
    public float _originHeightScale;
    public float _eyeDistance;
    public float _alphaMode;
    public float _uSpeed;
    public float _vSpeed;
    public float _animLine;
    public float _animRow;
    public float _animInterval;
    public float _renderPriority;
    public boolean _distortion;
    public boolean  _isUV;
    public boolean _isU;
    public boolean _isV;
    public float _life;
    public boolean  _watchEye;
    public Vector3D _ziZhuanAngly;
    public boolean  _isZiZhuan;
    public Vector3D _center ;
    public float  overAllScale;
    public String  _materialUrl;
    public MaterialParam materialParam;
    public HashMap materialParamData;
    public ObjData objData;
    public TimeLineData timelineData;
    public Vector3D rotationV3d;
    public Vector3D center;
    public void setAllByteInfo(ByteArray $byte){

        this.timelineData = new TimeLineData();
        this.timelineData.setByteData($byte);
        this._beginTime = this.timelineData.beginTime;
        this._delayedTime = $byte.readFloat();
        this._width = $byte.readFloat();
        this._height = $byte.readFloat();
        this._widthFixed = $byte.readBoolean();
        this._heightFixed = $byte.readBoolean();
        this._originWidthScale = $byte.readFloat();
        this._originHeightScale = $byte.readFloat();
        this._eyeDistance = $byte.readFloat();
        this._alphaMode = $byte.readFloat();
        this._uSpeed = $byte.readFloat();
        this._vSpeed = $byte.readFloat();
        this._animLine = $byte.readFloat();
        this._animRow = $byte.readFloat();
        this._animInterval = $byte.readFloat();
        this._renderPriority = $byte.readFloat();
        this._distortion = $byte.readBoolean();
        this._isUV = $byte.readBoolean();
        this._isU = $byte.readBoolean();
        this._isV = $byte.readBoolean();
        this._life = $byte.readFloat();
        this._life = this._life > 10000 ? Scene_data.MAX_NUMBER : this._life;
        this._watchEye = $byte.readBoolean();
        this._ziZhuanAngly = new Vector3D();
        this._ziZhuanAngly.x = $byte.readFloat();
        this._ziZhuanAngly.y = $byte.readFloat();
        this._ziZhuanAngly.z = $byte.readFloat();
        this._ziZhuanAngly.w = $byte.readFloat();
        this.rotationV3d = new Vector3D();
        this.rotationV3d.x = $byte.readFloat();
        this.rotationV3d.y = $byte.readFloat();
        this.rotationV3d.z = $byte.readFloat();
        this.center = new Vector3D();
        this.center.x = $byte.readFloat();
        this.center.y = $byte.readFloat();
        this.center.z = $byte.readFloat();
        this.center.w = $byte.readFloat();
        this.overAllScale = $byte.readFloat();
        if ( (this._ziZhuanAngly.x != 0 || this._ziZhuanAngly.y != 0 || this._ziZhuanAngly.z != 0)) {
            this._isZiZhuan = true;
        }
        this.readMaterialPara($byte);
        String strMaterialUrl = $byte.readUTF();
        strMaterialUrl = strMaterialUrl.replace("_byte.txt", ".txt");
        strMaterialUrl = strMaterialUrl.replace(".txt", "_byte.txt");
        this.set_materialUrl(strMaterialUrl);

    }

    public void set_materialUrl(String _materialUrl) {
        this._materialUrl = _materialUrl;
    }

    private void readMaterialPara(ByteArray $byte) {
        this.materialParamData = new HashMap();
        String materialUrl = $byte.readUTF();
        this.materialParamData.put("materialUrl",materialUrl);
        int texAryLen = $byte.readInt();
        List texAry=new ArrayList();
        for (int i = 0; i < texAryLen; i++) {
            ParamDataVo temp = new ParamDataVo();
            temp. isParticleColor=$byte.readBoolean();
            temp. paramName=$byte.readUTF();
            temp. url=$byte.readUTF();
            if (temp. isParticleColor) {
                temp.curve=new CurveVo();
                this.readTempCurve($byte, temp.curve);
            }
            texAry.add(temp);
        }
        this.materialParamData.put("texAry",texAry);
        this.readMaterialParaConAry($byte);


    }

    private void readMaterialParaConAry(ByteArray $byte) {
        List<ParamDataConVo> arr  = new ArrayList<ParamDataConVo>();
        int conAryLen = $byte.readInt();
        for (int i = 0; i < conAryLen; i++) {
            ParamDataConVo obj = new ParamDataConVo();
            obj.type =(int) $byte.readFloat();
            obj.indexID = (int) $byte.readFloat();
            obj.paramName = $byte.readUTF();
            obj.curve =new CurveVo();
            this.readTempCurve($byte, obj.curve);

            arr.add(obj);
        }

        this.materialParamData.put("conAry",arr);

    }
    private void readTempCurve(ByteArray $byte, CurveVo curve)
    {
        curve.values = new ArrayList<>();
        boolean has = false;

        int valuesLen = $byte.readInt();
        float scaleNum =0;
        if (valuesLen > 0) {
            scaleNum = $byte.readFloat();
        }
        for (int j = 0; j < valuesLen; j++) {
            int rgbLen = $byte.readInt();
            ArrayList valuesArr = new ArrayList<>();
            for (int k = 0; k < rgbLen; k++) {
                valuesArr.add($byte.readByte() / 127 * scaleNum);
            }
            curve.values.add(valuesArr);
        }
        has = true;

        curve.type = $byte.readFloat();
        curve.maxFrame = $byte.readFloat();
        curve.sideType = $byte.readBoolean();
        curve.speedType = $byte.readBoolean();
        curve.useColorType = $byte.readBoolean();
        curve.items = this.readItems($byte);
        if (!has) {
            this.makeCurveData(curve);
        }

    }
    private void makeCurveData(CurveVo $curve) {

        List arr  = $curve.items;
        List r  = new ArrayList();
        List g = new ArrayList();
        List b  = new ArrayList();
        List a  = new ArrayList();

        for (int i = 0; i < arr.size(); i++) {
            if (i == (arr.size() - 1)) { //最后一个
                CurveItemVo vec3= (CurveItemVo)arr.get(i);
                r.add(vec3.vec3.x);
                g.add(vec3.vec3.y);
                b.add(vec3.vec3.z);
                a.add(vec3.vec3.w);
            } else {
                CurveItemVo Vi_i_0=(CurveItemVo)  arr.get(i);
                CurveItemVo Vi_i_1=(CurveItemVo)  arr.get(i+1);
                float $speedNum    = Vi_i_1.frame - Vi_i_0.frame;
                Vector3D $A =Vi_i_0.vec3;
                Vector3D $B = Vi_i_1.vec3;
                Vector3D $a = Vi_i_0.rotation;
                Vector3D $b = Vi_i_1.rotationLeft;

                r.contains(this.getBzData($A.x, $B.x, $a.x, $b.x, $speedNum));
                g.contains(this.getBzData($A.y, $B.y, $a.y, $b.y, $speedNum));
                b.contains(this.getBzData($A.z, $B.z, $a.z, $b.z, $speedNum));
                a.contains(this.getBzData($A.w, $B.w, $a.w, $b.w, $speedNum));



            }


        }

        $curve.values = new ArrayList<>(4);
        $curve.values.set(0,r);
        $curve.values.set(1,g);
        $curve.values.set(2,b);
        $curve.values.set(3,a);


    }
    private List getBzData(float $ax,float  $bx,float  ar,float  br,float  $speedNum) {
        int num80 = 10;
        Vector2D a  = new Vector2D(0, $ax * num80);
        Vector2D d = new Vector2D($speedNum, $bx * num80);

        Matrix3D m = new Matrix3D();
        Vector3D p  = new Vector3D();

        m.identity();
        m.appendRotation(-ar, Vector3D.Z_AXIS);
        p = m.transformVector(new Vector3D($speedNum / 2, 0, 0));

        Vector2D b = new Vector2D($speedNum / 2, a.y + p.y);

        m.identity();
        m.appendRotation(-br, Vector3D.Z_AXIS);
        p = m.transformVector(new Vector3D(-$speedNum / 2, 0, 0));

        Vector2D c = new Vector2D($speedNum / 2, d.y + p.y);


        ArrayList <Vector2D> ary  =new ArrayList<Vector2D>();
        ary.add(a);
        ary.add(b);
        ary.add(c);
        ary.add(d);



        List<Vector2D> posAry  = new ArrayList<>();
        float baseW = 3;
        for (int i = 1; i < $speedNum * 3; i++) {

            posAry.add(this.drawbezier(ary, i / ($speedNum * 3)));
        }
        List<Float> _valueVec = new ArrayList<>();
        for (int i = 0; i < $speedNum; i++) {
            for (int j = 0; j < posAry.size(); j++) {
                if (posAry.get(j).x >= i) {
                    _valueVec.add(posAry.get(j).y / num80);
                    break;
                }
            }
        }

        return _valueVec;





    }
    private  Vector2D drawbezier(List<Vector2D>   _array   ,float _time) {
        List<Vector2D> _newarray  = new ArrayList<>();
        if (_array.size() == 0) {
            return new Vector2D();
        }
        for (int i=0;i<_array.size();i++) {
            _newarray.add(new Vector2D(_array.get(i).x, _array.get(i).y));
        }
        while (_newarray.size() > 1) {
            for (int j = 0; j < _newarray.size() - 1; j++) {
                this.mathmidpoint(_newarray.get(j), _newarray.get(j + 1), _time);
            }
            _newarray.remove(_newarray.get(_newarray.size()-1));
        }

        return _newarray.get(0);

    }
    private void mathmidpoint(Vector2D a, Vector2D b,float t) {
        float _nx, _ny;
        _nx = a.x + (b.x - a.x) * t;
        _ny = a.y + (b.y - a.y) * t;

        a.x = _nx;
        a.y = _ny;

    }
    private List readItems(ByteArray $byte) {
        List items = new ArrayList();
        int itemsLen = $byte.readInt();
        for (int u = 0; u < itemsLen; u++) {
            CurveItemVo $obj = new CurveItemVo();
            $obj.frame = $byte.readInt();
            $obj.vec3 = $byte.readVector3D(true);
            $obj.rotation = $byte.readVector3D(true);
            $obj.rotationLeft = $byte.readVector3D(true);
            items.add($obj);
        }
        return items;

    }
}
