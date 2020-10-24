package z3d.vo;

import z3d.base.ByteArray;

public class Vector3D {

    public static Vector3D X_AXIS = new Vector3D(1, 0, 0);
    public static Vector3D Y_AXIS = new Vector3D(0, 1, 0);
    public static Vector3D Z_AXIS = new Vector3D(0, 0, 1);


    public float x;
    public float y;
    public float z;
    public float w ;


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

    public Vector3D cross(Vector3D value) {
        return new Vector3D(this.y * value.z - this.z * value.y,
                this.z * value.x - this.x * value.z,
                this.x * value.y - this.y * value.x);
    }

    public void normalize() {
        float le = this.length();
        if (le == 0) {
            return;
        }
        this.scaleBy(1 / le);
    }

    public float length() {
        return (float) Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public void scaleBy(float value) {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        this.w *= value;
    }
    public void divideScalar(float value) {
        if (value != 0) {
            this.x = this.x / value;
            this.y = this.y / value;
            this.z = this.z / value;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }


    }
    public float distanceToSquared(Vector3D v) {
        return Vector3D.distance(this, v);

    }
    public void scaleByW() {
        this.x *= this.w;
        this.y *= this.w;
        this.z *= this.w;
    }

    public Vector3D add(Vector3D value) {
        return new Vector3D(this.x + value.x, this.y + value.y, this.z + value.z);
    }

    public Vector3D subtract(Vector3D value) {
        return new Vector3D(this.x - value.x, this.y - value.y, this.z - value.z);
    }

    public void addByNum(float $x,float $y,float $z,float $w ) {
        this.x += $x;
        this.y += $y;
        this.z += $z;
        this.w += $w;
    }

    public void setTo(float $x, float $y,float $z) {
        this.x = $x;
        this.y = $y;
        this.z = $z;
    }

    public void setByte(ByteArray _byte) {
        this.x = _byte.readFloat();
        this.y = _byte.readFloat();
        this.z = _byte.readFloat();
    }


    public float dot(Vector3D value ) {
        return this.x * value.x + this.y * value.y + this.z * value.z;
    }

    public Vector3D clone() {
        return new Vector3D(this.x, this.y, this.z);
    }

    public static float distance(Vector3D v1 ,Vector3D v2) {
        float x1 = v1.x - v2.x;
        float y1 = v1.y - v2.y;
        float z1 = v1.z - v2.z;
        return (float) Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
    }

    public String toString() {
        return "Vector3D(" + (this.x) + "," + (this.y) + "," + (this.z) + "," + (this.w) + ")";
    }
}
