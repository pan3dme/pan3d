package com.one;

import android.app.ActivityManager;
import android.content.Context;
import android.content.pm.ConfigurationInfo;
import android.opengl.GLES20;
import android.os.Build;
import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.IntBuffer;

import javax.microedition.khronos.opengles.GL10;

import z3d.program.Shader3D;

public class BoxSprite3D {
    private IntBuffer vertices;
    private int vertexBytes;
    private int vertexNum;

    private float[] arrVertices;
    private int[] tmpBuffer;

    private Shader3D shader3d;

    public BoxSprite3D()
    {
        super();

        this.loadData();
        this.updateData(100,100);
        this.shader3d=new Shader3D();
        this.shader3d.encode();

        this.shader3d=new Shader3D();
        this.shader3d.encode();


    }
    private void loadData() {
        final float factor = 200f / 320f * 100;
        this.arrVertices = new float[] {
                0f * factor, 0f * factor, 0, 0, 0, 1, 1,
                1f * factor, 0f * factor,   0, 0, 0, 1, 1,
                1f * factor, 1f * factor, 0, 0, 0, 1, 1,
                0f * factor,  1f * factor,  0, 0, 0, 1, 1,
        };
        this.vertexBytes = (3 + 4) * (Integer.SIZE / 8);
        this.vertexNum = arrVertices.length / (this.vertexBytes / (Integer.SIZE / 8));
        this.tmpBuffer = new int[vertexNum * vertexBytes / (Integer.SIZE / 8)];
        ByteBuffer buffer = ByteBuffer.allocateDirect(vertexNum * vertexBytes);
        buffer.order(ByteOrder.nativeOrder());
        vertices = buffer.asIntBuffer();
        this.vertices.clear();
        for (int i = 0, j = 0; i < arrVertices.length; i++, j++) {
            tmpBuffer[j] = Float.floatToRawIntBits(arrVertices[i]);
        }
        this.vertices.put(tmpBuffer, 0, tmpBuffer.length);
        this.vertices.flip();
    }

    public void onDrawFrame(GL10 gl) {
        gl.glClearColor((float) Math.random(),  (float) Math.random(), 0, 1);
        gl.glClearColor(1,  0, 0, 1);
        gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
        gl.glMatrixMode(GL10.GL_MODELVIEW);
        gl.glLoadIdentity();



        int a=this.shader3d.program;

      //  GLES20.glUseProgram(this.shader3d.program);

        gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);

        vertices.position(0);
        gl.glVertexPointer(3, GL10.GL_FLOAT, vertexBytes, vertices);
        gl.glEnableClientState(GL10.GL_COLOR_ARRAY);
        vertices.position(3);
        gl.glColorPointer(4, GL10.GL_FLOAT, vertexBytes, vertices);
        gl.glDrawArrays(GL10.GL_TRIANGLE_FAN, 0, vertexNum);

        gl.glDisableClientState(GL10.GL_COLOR_ARRAY);
        gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);


        Log.d("画图", "onDrawFrame: ");


    }

    private void updateData(int width, int height) {
        arrVertices[0] = 100f;
        arrVertices[1] = 100f;
        arrVertices[0 + 7] = width - 10;
        arrVertices[1 + 7] = 0;
        arrVertices[0 + 14] = width - 10;
        arrVertices[1 + 14] = height - 10;
        arrVertices[0 + 21] = 0;
        arrVertices[1 + 21] = height - 10;
        this.vertices.clear();
        for (int i = 0, j = 0; i < arrVertices.length; i++, j++) {
            tmpBuffer[j] = Float.floatToRawIntBits(arrVertices[i]);
        }
        this.vertices.put(tmpBuffer, 0, tmpBuffer.length);
        this.vertices.flip();
    }
    public static boolean isSupportEs2(Context context) {
        //检查是否支持2.0
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        if (activityManager != null) {
            ConfigurationInfo deviceConfigurationInfo = activityManager.getDeviceConfigurationInfo();
            int reqGlEsVersion = deviceConfigurationInfo.reqGlEsVersion;
            return reqGlEsVersion >= 2 || (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH_MR1
                    && (Build.FINGERPRINT.startsWith("generic")
                    || Build.FINGERPRINT.startsWith("unknown")
                    || Build.MODEL.contains("google_sdk")
                    || Build.MODEL.contains("Emulator")
                    || Build.MODEL.contains("Android SDK build for x86")));
        } else {
            return false;
        }

    }
}
