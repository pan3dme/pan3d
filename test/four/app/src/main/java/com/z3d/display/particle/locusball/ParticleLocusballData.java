package com.z3d.display.particle.locusball;


import android.util.Log;

import com.z3d.base.ByteArray;
import com.z3d.display.particle.ball.ParticleBallData;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Vector3D;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

public class ParticleLocusballData extends ParticleBallData {
    protected List<Float>  _posAry;
    protected List<Float>  _angleAry ;
    protected List<Float> _tangentAry ;
    protected float _tangentSpeed ;
    public  ParticleLocusballData(Scene3D val  ){
        super(val);
    }
    public void setAllByteInfo(ByteArray $byte) {

        Log.d("length "+ $byte.byteBuffer.length(), "position "+ $byte.byteBuffer.position);

        this._tangentSpeed = $byte.readFloat();

        this._posAry =  this.paresArray($byte.readUTFCopy());
        this._angleAry = this.paresArray($byte.readUTFCopy());
        this._tangentAry = this.paresArray($byte.readUTFCopy());

        super.setAllByteInfo($byte);


    }
    private List<Float> paresArray(String value)
    {

        if(value.equals("null")){
            return null;
        }
        List<Float> arr=new ArrayList<>();
        if(value!="" ){
            try {
                JSONArray jsonarr = new JSONArray(value);
                for(int i=0;i<jsonarr.length();i++)
                {
                    Number A=   (Number)  jsonarr.get(i);
                    arr.add( A.floatValue());
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return  arr;
    }


    public void initBasePos() {
        List<Float> basePos  = new ArrayList<>();
        for (int i = 0; i < this._totalNum; i++) {
            Vector3D v3d;
            int index = i * 3;
            if (this._isRandom) {
                Vector3D roundv3d = new Vector3D(this._round.x * this._round.w, this._round.y * this._round.w, this._round.z * this._round.w);
                v3d = new Vector3D(this._posAry.get(index) + (float)Math.random() * roundv3d.x,
                        this._posAry.get(index + 1) +(float) Math.random() * roundv3d.y,
                        this._posAry.get(index + 2) +(float) Math.random() * roundv3d.z);
            } else {
                v3d = new Vector3D(this._posAry.get(index), this._posAry.get(index+1), this._posAry.get(index+2));
            }


            v3d = v3d.add(this._basePositon);

            for (int j = 0; j < 4; j++) {
                basePos.add(v3d.x );
                basePos.add(v3d.y);
                basePos.add(v3d.z);
                basePos.add(i * this._shootSpeed);

            }
        }

       // this.objBallData.basePos = basePos;
    }
    public void initSpeed() {
        List<Float> beMove = new ArrayList<>();
        for (int i = 0; i < this._totalNum; i++) {

            Vector3D resultv3d = new Vector3D();

            if (this._tangentSpeed == 0) {
                resultv3d.addByNum(this._angleAry.get(i * 3), this._angleAry.get(i * 3 + 1),this._angleAry.get(i * 3 + 2),1);
            } else if (this._tangentSpeed == 2) {
                resultv3d.setTo((float) Math.random() * 2 - 1, (float)Math.random() * 2 - 1, (float)Math.random() * 2 - 1);
            } else {
                Vector3D v3d = new Vector3D(this._tangentAry.get(i * 3), this._tangentAry.get(i * 3 + 1), this._tangentAry.get(i * 3 + 2));
                v3d.scaleBy(this._tangentSpeed);
                resultv3d = resultv3d.add(v3d);
            }


            resultv3d.normalize();

            if (this._isSendRandom) {
                resultv3d.scaleBy(this._speed * (float) Math.random());
            } else {
                resultv3d.scaleBy(this._speed);
            }

            //var ranAngle: Number = this._baseRandomAngle * Math.random() * Math.PI / 180;

            for (int j = 0; j < 4; j++) {
                beMove.add(resultv3d.x );
                beMove.add(resultv3d.y);
                beMove.add(resultv3d.z);
            }
        }

      //  this.objBallData.beMove = beMove;

    }



}
