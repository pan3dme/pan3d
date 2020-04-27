package z3d.vo;

public class Vector3D {
    public float x;
    public float y;
    public float z;
    public float w ;

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getZ() {
        return z;
    }

    public void setZ(float z) {
        this.z = z;
    }

    public float getW() {
        return w;
    }

    public void setW(float w) {
        this.w = w;
    }

    public Vector3D(){
        this.x=0;
        this.y=0;
        this.z=0;
        this.w=1;
    }
    public Vector3D(float x,float y,float z){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=1;
    }
    public Vector3D(float x,float y,float z,float w){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w;
    }
}
