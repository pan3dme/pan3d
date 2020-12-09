package com.z3d.material;

import java.util.ArrayList;
import java.util.List;

public class DynamicBaseConstItem {
    private static final String TAG ="DynamicBaseConstItem" ;
    public ConstItem target;
    public String paramName ;
    public List<Float> currentValue;
    public int targetOffset;
    protected int _type;
    public void setTargetInfo(ConstItem $target, String $paramName, int $type) {
        this.target = $target;
        this.paramName = $paramName;
        this.settype($type);
        if( this.target!=null){
            this.target.setDynamicOffset(this);
        }

        this.currentValue = new ArrayList<>($type);

    }
    public void settype(int value) {
        this._type = value;
    }
    public void setCurrentVal(List args ) {
        for (int i = 0; i < args.size(); i++) {
            this.currentValue.add(i,(float)args.get(i));
        }
    }

    public void update() {
        if (this.target!=null) {

            this.target.setDynamic(this);
        }
    }
}
