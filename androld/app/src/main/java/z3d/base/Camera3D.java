package z3d.base;

import z3d.vo.Matrix3D;

public class Camera3D extends Object3D {



    public Matrix3D camMatrix3D;
    public Matrix3D viewMatrix;
    public Matrix3D modelMatrix;
    public float distance;
    public float sceneViewHW;
    public float fovw;
    public float fovh;
}
