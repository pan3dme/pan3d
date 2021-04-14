package com.pan3d.display.interfaces;

import com.pan3d.vo.Matrix3D;

public interface IBind {
    public  void getSocket(String socketName, Matrix3D resultMatrix);
    public int getSunType();
}
