package com.pan3d.display.line;

import com.pan3d.base.ObjData;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.Vector3D;

public class GridLineSprite  extends LineDisplaySprite {
    public GridLineSprite(Scene3D val){
        super(val);
    }

    protected void  initData()
    {
        baseColor=new Vector3D(128.f / 255.f, 128.f / 255.f, 128.f / 255.f, 1);
        changeColor(baseColor);
    }
    public void changeColor(Vector3D val){
        baseColor=val;
        this.objData =new ObjData(scene3D);

        this.clearLine();

        float w = 1000;
        float n = 10;
        float skeep = w / n;

        Vector3D a ;
        Vector3D b;
        a = new Vector3D(0, 0, +w);
        b = new Vector3D(0, 0, -w);
        this.makeLineMode(a, b, new Vector3D(0, 0, 1, 1));
        a = new Vector3D(+w, 0, 0);
        b = new Vector3D(-w, 0, 0);
        this.makeLineMode(a, b, new Vector3D(1, 0, 0, 1));


        for (int i = 1; i <= n; i++) {
            a = new Vector3D(+i * skeep, 0, +w);
            b = new Vector3D(+i * skeep, 0, -w);
            this.makeLineMode(a, b);
            a = new Vector3D(-i * skeep, 0, +w);
            b = new Vector3D(-i * skeep, 0, -w);
            this.makeLineMode(a, b);

            a = new Vector3D(+w, 0, +i * skeep);
            b = new Vector3D(-w, 0, +i * skeep);
            this.makeLineMode(a, b);
            a = new Vector3D(+w, 0, -i * skeep);
            b = new Vector3D(-w, 0, -i * skeep);
            this.makeLineMode(a, b);
        }


        this.upLineDataToGpu();
    }
}
