package com.z3d.display.particle.facet;

import com.z3d.base.ByteArray;
import com.z3d.base.ObjData;
import com.z3d.display.particle.Display3DParticle;
import com.z3d.display.particle.ParticleData;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Vector2D;

import java.util.ArrayList;
import java.util.List;

public class ParticleFacetData extends ParticleData {

    public int maxAnimTime;
    public boolean lockx;
    public boolean locky;
    public boolean isCycle;
    public  ParticleFacetData(Scene3D val  ){
       super(val);
    }
    public void setAllByteInfo(ByteArray _byte){

        this.maxAnimTime =(int) _byte.readFloat();
        this.isCycle = _byte.readBoolean();
        this.lockx = _byte.readBoolean();
        this.locky = _byte.readBoolean();
        super.setAllByteInfo(_byte);

        this.uploadGpu();

    }

    @Override
    protected void regShader() {
        super.regShader();
        if (this.materialParam==null) {
            return;
        }

        this.scene3D.progrmaManager.registe(Display3DFacetShader.shaderNameStr,new Display3DFacetShader(scene3D));
        this.materialParam.shader3D=this.scene3D.progrmaManager.getProgram(Display3DFacetShader.shaderNameStr);

    }

    @Override
    public Display3DParticle getParticle() {
        return new Display3DFacetParticle();
    }

    private void uploadGpu() {
   // [self makeRectangleData:self._width height:self._height offsetX:self._originWidthScale offsetY:self._originHeightScale isUV:self._isUV isU:self._isUV isV:self._isV animLine:self._animLine animRow:self._animRow];

        this.makeRectangleData(this._width,this._height,this._originWidthScale,this._originHeightScale,this._isUV,this._isU, this._isV,this._animLine,this._animRow);

    }
    private void makeRectangleData(float width, float height, float offsetX, float offsetY, boolean isUV, boolean isU, boolean isV, float animLine, float animRow) {



        this.objData=new ObjData(scene3D);


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


        List<Vector2D> ary = new ArrayList<>();
        ary.add(new Vector2D(0, 0));
        ary.add(new Vector2D(0, 1 / animRow));
        ary.add(new Vector2D(1 / animLine, 1 / animRow));
        ary.add(new Vector2D(1 / animLine, 0));

        if (isU) {
            for (int i = 0; i < ary.size(); i++) {
                ary.get(i).x = - ary.get(i).x;
            }
        }

        if (isV) {
            for (int i = 0; i < ary.size(); i++) {
                ary.get(i).y = - ary.get(i).y;
            }
        }
        if (isUV) {
            ary.add(    ary.remove(0));
        }


        Float[] uvArr=new Float[8];
        uvArr[0]=ary.get(0).x;
        uvArr[1]=ary.get(0).y;

        uvArr[2]=ary.get(1).x;
        uvArr[3]=ary.get(1).y;

        uvArr[4]=ary.get(2).x;
        uvArr[5]=ary.get(2).y;

        uvArr[6]=ary.get(3).x;
        uvArr[7]=ary.get(3).y;


        int[] Indices=new int[6];

        Indices[0]=0;
        Indices[1]=1;
        Indices[2]=2;
        Indices[3]=0;
        Indices[4]=2;
        Indices[5]=3;

        objData.verticeslist=ObjData.getListFoatByArr(attrArr);
        objData.uvlist=ObjData.getListFoatByArr(uvArr);
        objData.indexs=ObjData.getListShortByArr(Indices);
        this.objData.vertexBuffer= this.objData.upGpuvertexBuffer( objData.verticeslist);
        this.objData.uvBuffer= this.objData.upGpuvertexBuffer(    objData.uvlist);
        this.objData.indexBuffer= this.objData.upGpuIndexBuffer(objData.indexs);
        this.objData.treNum=objData.indexs.size();



    }
}
