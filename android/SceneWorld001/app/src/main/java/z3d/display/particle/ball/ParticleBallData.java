package z3d.display.particle.ball;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.ObjData;
import z3d.display.particle.Display3DParticle;
import z3d.display.particle.ParticleData;
import z3d.display.particle.ctrl.TimeLine;
import z3d.vo.Matrix3D;
import z3d.vo.ParicleRandomColorVo;
import z3d.vo.Vector3D;

public class ParticleBallData extends ParticleData {

    public int _totalNum;
    public float _acceleration;
    public  float  _toscale;
    public Vector3D _shootAngly;
    public  float  _shootSpeed;
    public  boolean _isRandom;
    public  boolean _isSendRandom;
    public  boolean _isSendAngleRandom;
    public float  _paticleMaxScale;
    public  float _paticleMinScale;
    public Vector3D  _addforce;
    public Vector3D  _lixinForce;
    public  Vector3D _waveform;
    public Vector3D  _round;
    public boolean _is3Dlizi;
    public float  _speed;
    public boolean _isLoop;
    public  boolean _closeSurface;
    public  boolean _halfCircle;
    public  boolean _isEven;
    public Vector3D _basePositon;
    public  float _baseRandomAngle;
    public float  _shapeType;
    public boolean _lockX;
    public boolean  _lockY;

    public ParicleRandomColorVo _textureRandomColorInfo;
    public  boolean _islixinAngly;
    public Vector3D  _particleRandomScale;
    public float  _playSpeed;
    public float _beginScale;
    public boolean facez;

    public boolean  _needSelfRotation;

    public  boolean _needRandomColor;

    public boolean  _needScale;

    public boolean  _needAddSpeed;

    public  float _uvType;

    public Vector3D _timeVec;
    public Vector3D  _addSpeedVec;
    public Vector3D _wordPosVec;
    public Vector3D _caramPosVec;

    public Vector3D _scaleVec;
    public Vector3D  _scaleCtrlVec;

    public Vector3D  _animCtrlVec;
    public Vector3D _uvCtrlVec;

    public Matrix3D _allRotationMatrix;

    public ParticleBallData( ){
        super();
        this._round=new Vector3D();
        this._shootAngly=new Vector3D();
        this._waveform=new Vector3D();
        this._basePositon=new Vector3D();
        this._addforce=new Vector3D();
        this._lixinForce=new Vector3D();
        this._particleRandomScale=new Vector3D();

    }


    @Override
    public Display3DParticle getParticle() {
        return  new Display3DBallPartilce();
    }

    public void setAllByteInfo(ByteArray $byte) {



        this._totalNum =(int) $byte.readFloat();
        this._acceleration = $byte.readFloat();
        this._toscale = $byte.readFloat();
        this._shootSpeed = $byte.readFloat();
        this._isRandom = $byte.readBoolean();
        this._isSendRandom = $byte.readBoolean();
        this._round.x = $byte.readFloat();
        this._round.y = $byte.readFloat();
        this._round.z = $byte.readFloat();
        this._round.w = $byte.readFloat();

        this._is3Dlizi = $byte.readBoolean();
        this._halfCircle = $byte.readBoolean();
        this._shootAngly.x = $byte.readFloat();
        this._shootAngly.y = $byte.readFloat();
        this._shootAngly.z = $byte.readFloat();
        this._shootAngly.w = $byte.readFloat();

        this._speed = $byte.readFloat();

        this._isLoop = $byte.readBoolean();

        this._isSendAngleRandom = $byte.readBoolean();


        this._waveform.x = $byte.readFloat();
        this._waveform.y = $byte.readFloat();
        this._waveform.z = $byte.readFloat();
        this._waveform.w = $byte.readFloat();


        this._closeSurface = $byte.readBoolean();
        this._isEven = $byte.readBoolean();
        this._paticleMaxScale = $byte.readFloat();
        this._paticleMinScale = $byte.readFloat();
        this._basePositon.x = $byte.readFloat();
        this._basePositon.y = $byte.readFloat();
        this._basePositon.z = $byte.readFloat();
        this._basePositon.w = $byte.readFloat();

        this._baseRandomAngle = $byte.readFloat();
        this._shapeType = $byte.readFloat();

        this._lockX = $byte.readBoolean();
        this._lockY = $byte.readBoolean();


        this._addforce.x = $byte.readFloat();
        this._addforce.y = $byte.readFloat();
        this._addforce.z = $byte.readFloat();
        this._addforce.w = $byte.readFloat();
        this._addforce.scaleByW();

        this._lixinForce.x = $byte.readFloat();
        this._lixinForce.y = $byte.readFloat();
        this._lixinForce.z = $byte.readFloat();
        this._lixinForce.w = $byte.readFloat();


        this._islixinAngly = $byte.readBoolean();

        this._particleRandomScale = new Vector3D();
        this._particleRandomScale.x = $byte.readFloat();
        this._particleRandomScale.y = $byte.readFloat();
        this._particleRandomScale.z = $byte.readFloat();
        this._particleRandomScale.w = $byte.readFloat();

        this._playSpeed = $byte.readFloat();
        this.facez = $byte.readBoolean();
        this._beginScale = $byte.readFloat();

        this._widthFixed = $byte.readBoolean();
        this._heightFixed = $byte.readBoolean();
        this.readRandomColor($byte);



        if (this._acceleration != 0 || this._addforce.x != 0 || this._addforce.y != 0 || this._addforce.z != 0) {
            this._needAddSpeed = true;
            this._addSpeedVec = new Vector3D(this._addforce.x, this._addforce.y, this._addforce.z);
        } else {
            this._needAddSpeed = false;
        }


        if (this._toscale != 0 || this._waveform.x != 0 || this._waveform.y != 0) {
            this._needScale = true;
            this._scaleVec = new Vector3D(this._toscale, this._waveform.x, this._waveform.y, this._beginScale);

            this._scaleCtrlVec = new Vector3D(this._widthFixed ? 0 : 1, this._heightFixed ? 0 : 1, this._paticleMaxScale - 1, this._paticleMinScale - 1);
        } else {
            this._needScale = false;
        }
        super.setAllByteInfo($byte);
        this._timeVec = new Vector3D(0, this._acceleration, this._life, this._isLoop ? 1 : -1);
        if (this._is3Dlizi) {
            this._wordPosVec = new Vector3D(0, 0, 0);
            this._caramPosVec = new Vector3D(0, 0, 0);

            this._allRotationMatrix = new Matrix3D();
        }

        this.uploadGpu();

    }
    private void uploadGpu() {
        this.objData =new ParticleBallGpuData() ;
        this.initBaseData();
        this. initUV ();
        this.initBasePos();
        this. initSpeed();

    }

    private void initBaseData() {

        float ranScale = (float) Math.random() * (this._particleRandomScale.x - this._particleRandomScale.y) + this._particleRandomScale.y;
        float width=this._width;
        float height=this._height;
        float offsetX=this._originWidthScale;
        float offsetY=this._originHeightScale;

        int lznum=this._totalNum;
        Float[] attrArr=new Float[lznum*16];
        int[] Indices  =new int[lznum*6];
        for(int i=0;i<lznum;i++){
            int skipAtt=i*16;
            attrArr[skipAtt+0]=(-offsetX * width) * ranScale;
            attrArr[skipAtt+1]=(height - offsetY * height) * ranScale;
            attrArr[skipAtt+2]=0.0f;
            attrArr[skipAtt+3]=(float)i;

            attrArr[skipAtt+4]=(width - offsetX * width) * ranScale;
            attrArr[skipAtt+5]=(height - offsetY * height) * ranScale;
            attrArr[skipAtt+6]=0.0f;
            attrArr[skipAtt+7]=(float)i;

            attrArr[skipAtt+8]=(width - offsetX * width) * ranScale;
            attrArr[skipAtt+9]=(-offsetY * height) * ranScale;
            attrArr[skipAtt+10]=0.0f;
            attrArr[skipAtt+11]=(float)i;

            attrArr[skipAtt+12]=(-offsetX * width) * ranScale;
            attrArr[skipAtt+13]=(-offsetY * height) * ranScale;
            attrArr[skipAtt+14]=0.0f;
            attrArr[skipAtt+15]=(float)i;

            int skipTri=i*4;
            int skipInd=i*6;
            Indices[skipInd+0]=0+skipTri;
            Indices[skipInd+1]=1+skipTri;
            Indices[skipInd+2]=2+skipTri;
            Indices[skipInd+3]=0+skipTri;
            Indices[skipInd+4]=2+skipTri;
            Indices[skipInd+5]=3+skipTri;
        }


        this.objData.vertexBuffer= this.objData.upGpuvertexBuffer( ObjData.getListFoatByArr(attrArr));
        this.objData.indexBuffer= this.objData.upGpuIndexBuffer( ObjData.getListShortByArr(Indices));

   
    }
    private void initUV() {
    }
    private void initBasePos() {

    }
    private void initSpeed() {
    }


    private void readRandomColor(ByteArray $byte) {
        int randomColorLen = $byte.readInt();
        ParicleRandomColorVo obj = new ParicleRandomColorVo();
        obj.alpha = new ArrayList<>();
        obj.color =  new ArrayList<>();
        obj.pos =  new ArrayList<>();

        for (int i = 0; i < randomColorLen; i++) {
            obj.alpha.add($byte.readFloat());
            obj.color.add($byte.readFloat());
            obj.pos.add($byte.readFloat());
        }
        this._textureRandomColorInfo = obj;
    }
}
