package z3d.material;

import java.util.ArrayList;
import java.util.List;

public class DynamicBaseConstItem {
    public ConstItem target;
    public String paramName ;
    public List<Float> currentValue;
    public int targetOffset;
    public int type;

    public void setTargetInfo(ConstItem $target,String $paramName,int $type) {
        this.target = $target;
        this.paramName = $paramName;
        this.type = $type;
        this.target.setDynamicOffset(this);
        this.currentValue = new ArrayList<>($type);

    }
    public void setCurrentVal(List args ) {
        for (int i = 0; i < args.size(); i++) {
            this.currentValue.add(i,(float)args.get(i));
        }
    }
}
