package z3d.vo;

import java.util.List;

public class AnimData {

    public int inLoop ;
    public List<Integer> inter ;
    public List<Vector3D>  bounds ;
    public float nameHeight ;
    public List<Vector3D>  posAry ;
    public List<List<Matrix3D>>  matrixAry ;
    public List<List<DualQuatFloat32Array>>  boneQPAry ;
    public boolean hasProcess ;
}
