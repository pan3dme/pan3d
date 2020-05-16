package z3d.base;



import android.util.Log;

import java.io.InputStream;
import java.io.UTFDataFormatException;
import java.nio.ByteBuffer;

import z3d.vo.Vector3D;

public class ByteArray {

    public ByteArrayJava byteBuffer;
    public ByteBuffer buffer;
    /*
   Constructor
    */
    public ByteArray(byte[] buff) {
        this.byteBuffer = new ByteArrayJava(buff.length);
        this.byteBuffer.clear(buff,0);
        this. buffer=ByteBuffer.wrap(this.byteBuffer.data);
    }

    public int readInt() {
//        ByteBuffer buffer=ByteBuffer.wrap(this.byteBuffer.data);
        this. buffer.position(this.byteBuffer.position);
        int a= buffer.getInt();
        int b= this.byteBuffer.readInt32();
        return  a;
    }

    public int readInt16() {
//        ByteBuffer buffer=ByteBuffer.wrap(this.byteBuffer.data);
        this. buffer.position(this.byteBuffer.position);
        int a= this. buffer.getShort();
        int b= this.byteBuffer.readInt16();
        return  b;
    }
    //自己添加的读无符号短整行2个字节 Pan
    public float readFloatTwoByte(float scaleNum) {

        return this.readShort() / scaleNum;

    }

    public Vector3D readVector3D() {
        return  this.readVector3D(false);
    }
    public Vector3D readVector3D(boolean hasW) {

        Vector3D v3d=new Vector3D();
        v3d.x = this.readFloat();
        v3d.y = this.readFloat();
        v3d.z = this.readFloat();
        if (hasW) {
            v3d.w = this.readFloat();
        }
        return v3d;
    }

    //
    public float readFloatOneByte() {
        float a=this.byteBuffer.readInt8();
        a=(a+128.0f)/256.0f;
        return a;

    }

    public int readUnsignedInt() {

        return this.byteBuffer.readUInt32();
    }
    public int readByte() {

        return this.byteBuffer.readInt8();
    }
    public short readShort() {
        this. buffer.position(this.byteBuffer.position);
        short a=  this. buffer.getShort();
        int b= this.byteBuffer.readInt16();
        return  a;
    }
    public int readInt8() {

        return this.byteBuffer.readInt8();
    }
    public int getInt() {
        this. buffer.position(this.byteBuffer.position);
        int a=  this. buffer.getInt();
        return a;
    }
    public String readUTF()  {
        try {
            return this.byteBuffer.readUTF();
        } catch (Exception e) {

        }
        return "";
    }
    public String readUTFCopy()  {
        try {
            int utfLength = this.byteBuffer.readUInt16();
            return readUTFBytes(utfLength);
        } catch (Exception e) {

        }
        return "";
    }
    public String readUTFBytes(int strlen)  {
        try {
            return this.byteBuffer.readUTFlen(strlen);
        } catch (Exception e) {

        }
        return "";
    }


    public void   tracePostion(String value){

        Log.d("", "tracePostion: "+this.byteBuffer.position);
    }
    public byte[] readBytes(int lenght){
        return  this.byteBuffer.readBytes(lenght);
    }

    public boolean readBoolean() {
        return  this.byteBuffer.readBoolean();
    }
    public float readFloat() {
//        ByteBuffer buffer=ByteBuffer.wrap(this.byteBuffer.data);
        this. buffer.position(this.byteBuffer.position);
        float a= this. buffer.getFloat();
        float b= this.byteBuffer.readFloat();
        return a;
    }

}
