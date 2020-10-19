package z3d.display.particle.facet;

import z3d.base.ByteArray;
import z3d.base.ObjData;
import z3d.display.particle.Display3DParticle;
import z3d.display.particle.ParticleData;

public class ParticleFacetData extends ParticleData {

    public float _maxAnimTime;
    public boolean _lockx;
    public boolean _locky;
    public boolean _isCycle;

    public void setAllByteInfo(ByteArray _byte){

        this._maxAnimTime = _byte.readFloat();
        this._isCycle = _byte.readBoolean();
        this._lockx = _byte.readBoolean();
        this._locky = _byte.readBoolean();
        super.setAllByteInfo(_byte);

        this.uploadGpu();

    }

    @Override
    public Display3DParticle getParticle() {
        return new Display3DFacetParticle();
    }

    private void uploadGpu() {
   // [self makeRectangleData:self._width height:self._height offsetX:self._originWidthScale offsetY:self._originHeightScale isUV:self._isUV isU:self._isUV isV:self._isV animLine:self._animLine animRow:self._animRow];

        this.makeRectangleData(this._width,this._height,this._originWidthScale,this._originHeightScale,this._isUV,this._isV,this._animLine,this._animRow);

    }
    private void makeRectangleData(float width, float height, float offsetX, float offsetY, boolean isUV, boolean isV, float animLine, float animRow) {



        this.objData=new ObjData();


        Float[] attrArr=new Float[12];

        attrArr[0]=-offsetX * width;
        attrArr[1]=height - offsetY * height;
        attrArr[2]=0.0f;

        attrArr[3]=width - offsetX * width;
        attrArr[4]=height - offsetY * height;
        attrArr[5]=10.0f;

        attrArr[6]=width - offsetX * width;
        attrArr[7]=-offsetY * height;
        attrArr[8]=10.0f;

        attrArr[9]=-offsetX * width;
        attrArr[10]=-offsetY * height;
        attrArr[11]=0.0f;



        Float[] uvArr=new Float[8];
        uvArr[0]=0.0f;
        uvArr[1]=0.0f;

        uvArr[2]=1.0f;
        uvArr[3]=0.0f;

        uvArr[4]=1.0f;
        uvArr[5]=1.0f;

        uvArr[6]=0.0f;
        uvArr[7]=1.0f;
        int[] Indices=new int[6];

        Indices[0]=0;
        Indices[1]=1;
        Indices[2]=2;
        Indices[3]=0;
        Indices[4]=2;
        Indices[5]=3;


        this.objData.vertexBuffer= this.objData.upGpuvertexBuffer( ObjData.getListFoatByArr(attrArr));
        this.objData.uvBuffer= this.objData.upGpuvertexBuffer( ObjData.getListFoatByArr(uvArr));
        this.objData.indexBuffer= this.objData.upGpuIndexBuffer( ObjData.getListShortByArr(Indices));
        this.objData.treNum=Indices.length;



    }
}
