package com.z3d.material;

public class DynamicConstItem  extends DynamicBaseConstItem {

    public Curve curve ;


    public void update(float t ) {
        this.currentValue = this.curve.getValue(t);
        this.target.setDynamic(this);

    }
    public void update() {
        if (this.target!=null) {
            this.target.setDynamic(this);
        }
    }

    public void settype(int value) {
        this._type = value;
        this.curve = new Curve();
        this.curve.type = value;
    }

}
