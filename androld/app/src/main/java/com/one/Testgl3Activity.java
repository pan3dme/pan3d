package com.one;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.IntBuffer;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import android.app.Activity;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

public class Testgl3Activity extends Activity implements GLSurfaceView.Renderer {
    private boolean USE_ORIGIN_TOPLEFT = true;

    private IntBuffer vertices;
    private int vertexBytes;
    private int vertexNum;

    private float[] arrVertices;
    private int[] tmpBuffer;

    private GLSurfaceView contentView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        contentView = new GLSurfaceView(this);
        contentView.setRenderer(this);
        setContentView(contentView);
    }

    @Override
    protected void onPause() {
        super.onPause();
        contentView.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        contentView.onResume();
    }

    @Override
    public void onSurfaceCreated(GL10 gl, EGLConfig config) {
        loadData();
        gl.glDisable(GL10.GL_DITHER);
        gl.glHint(GL10.GL_PERSPECTIVE_CORRECTION_HINT, GL10.GL_FASTEST);
        gl.glClearColor(1, 1, 1, 1);
        gl.glDisable(GL10.GL_CULL_FACE);
        gl.glShadeModel(GL10.GL_SMOOTH);
        gl.glEnable(GL10.GL_DEPTH_TEST);
    }

    @Override
    public void onSurfaceChanged(GL10 gl, int width, int height) {
        gl.glMatrixMode(GL10.GL_PROJECTION);
        gl.glLoadIdentity();
        gl.glViewport(0, 0, width, height);
        //gl.glViewport(0, height, width, height);
        if (USE_ORIGIN_TOPLEFT) {
            gl.glOrthof(0, width, -height, 0, 0, 1);
        } else {
            gl.glOrthof(0, width, 0, height, 0, 1);
        }
        updateData(width, height);
    }

    @Override
    public void onDrawFrame(GL10 gl) {
        gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
        gl.glMatrixMode(GL10.GL_MODELVIEW);
        gl.glLoadIdentity();
        if (USE_ORIGIN_TOPLEFT) {
            gl.glScalef(1f, -1f, 1f);
        }
        gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);

        vertices.position(0);
        gl.glVertexPointer(3, GL10.GL_FLOAT, vertexBytes, vertices);
        gl.glEnableClientState(GL10.GL_COLOR_ARRAY);
        vertices.position(3);
        gl.glColorPointer(4, GL10.GL_FLOAT, vertexBytes, vertices);
        gl.glDrawArrays(GL10.GL_TRIANGLE_FAN, 0, vertexNum);

        gl.glDisableClientState(GL10.GL_COLOR_ARRAY);
        gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);
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
}