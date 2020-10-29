package z3d.display.particle.ctrl;

import java.util.List;

import z3d.base.Scene_data;

public class BaseAnim {
    public float baseNum;
    public float  num;
    public float  time;
    public  float speed;
    public float  aSpeed;
    public float  beginTime;
    public  float lastTime;
    public  float baseTime;
    public boolean isDeath;
    protected boolean _isActiva;
    protected boolean _isDeath;
    public void updata(float t) {
        if (this._isDeath) {
            return;
        }
        this.time = t - this.baseTime;
        if (this._isActiva) {
            this.time = this.time - this.beginTime;
            if (this.time > this.lastTime) {
                this.time = this.lastTime - this.beginTime;
                this._isDeath = true;
            }
            this.coreCalculate();
        } else {
            if (this.time >= this.beginTime) {
                if (this.time >= this.lastTime) {
                    this.time = this.lastTime - this.beginTime;
                    this.coreCalculate();
                    this._isDeath = true;
                } else {
                    this.time = this.time - this.beginTime;
                    this.coreCalculate();
                }
                this._isActiva = true;
            }
        }
    }
    private void coreCalculate() {
        this.num = this.speed * this.time + this.aSpeed * this.time * this.time + this.baseNum;
    }

    public void reset() {
        this._isActiva = false;
        this._isDeath = false;
        this.time = 0;
        this.num = 0;
    }
    public void dataByte(List va, List arr) {
        this.beginTime =(float) arr.get(0);
        float indx001=(float)  arr.get(1);
        if (indx001== -1) {
            this.lastTime = Scene_data.MAX_NUMBER;
        } else {
            this.lastTime =indx001;
        }
    }
}
