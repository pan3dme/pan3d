package com.z3d.display.interfaces;

import com.z3d.vo.Matrix3D;

public interface IBind {
    public  void getSocket(String socketName, Matrix3D resultMatrix);
    public int getSunType();
}
