package com.one;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.IntBuffer;

import javax.microedition.khronos.opengles.GL10;

public class BoxSprite3D {
    private IntBuffer vertices;
    private int vertexBytes;
    private int vertexNum;

    private float[] arrVertices;
    private int[] tmpBuffer;

    public BoxSprite3D()
    {
        super();

        this.loadData();
        this.updateData(100,100);

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
        gl.glClearColor(0, 1, 0, 1);
        gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
        gl.glMatrixMode(GL10.GL_MODELVIEW);
        gl.glLoadIdentity();

      //      gl.glScalef(1f, -1f, 1f);

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
