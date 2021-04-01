package com.pan3d.material;

import com.pan3d.scene.Scene3D;

public class DynamicBaseTexItem {

    public String paramName;
    public TexItem target;
    public TextureRes textureRes;
    public Scene3D scene3D;
    public DynamicBaseTexItem(Scene3D val){
        scene3D=val;
    }

}
