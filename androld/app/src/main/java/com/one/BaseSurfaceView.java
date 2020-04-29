package com.one;

import android.content.Context;
import android.opengl.EGL14;
import android.opengl.GLDebugHelper;
import android.opengl.GLES20;
import android.opengl.GLES30;
import android.opengl.GLU;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

import javax.microedition.khronos.egl.EGL10;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.egl.EGLContext;
import javax.microedition.khronos.egl.EGLDisplay;
import javax.microedition.khronos.egl.EGLSurface;
import javax.microedition.khronos.opengles.GL10;

import z3d.program.Shader3D;

public class BaseSurfaceView extends SurfaceView implements
        SurfaceHolder.Callback
{
    SurfaceHolder mAndroidHolder;

    BaseSurfaceView(Context context) {
        super(context);

        mAndroidHolder = getHolder();
        mAndroidHolder.addCallback(this);



    }

    public void surfaceChanged(SurfaceHolder holder, int format, int width,
                               int height) {
    }
    public void surfaceCreated(SurfaceHolder holder) {
        mGLThread = new BasicGLThread(this);

        mGLThread.start();
    }

    public void surfaceDestroyed(SurfaceHolder holder) {
        if (mGLThread != null) {
            mGLThread.requestStop();
        }
    }
    BasicGLThread mGLThread;
    private class BasicGLThread extends Thread {
        private static final String DEBUG_TAG = "BasicGLThread";
        private int skipNum;
        SurfaceView sv;
        BasicGLThread(SurfaceView view) {
            sv = view;
        }

        private boolean mDone = false;
        public void run() {
            try {
                initEGL();
                initGL();

                mGL.glMatrixMode(GL10.GL_MODELVIEW);
                mGL.glClearColor(1, 1, 1, 1);
                while (!mDone) {

                    this.skipNum++;
                  //  Log.d("dddd",   " "+this.skipNum);

                    mGL.glClear(GL10.GL_COLOR_BUFFER_BIT| GL10.GL_DEPTH_BUFFER_BIT);


                   // mGL.glClearColor((float) Math.random(), 1, 0, 1);


                    if(this.skipNum%2==1){

                        GLES20.glClearColor(1.0f, 0.0f, 1.0f, 1.0f);

                        Log.d("this.1111","skipNum->"+this.skipNum);
                    }else{

                        GLES20.glClearColor(1.0f, 1.0f, 0.0f, 1.0f);

                        Log.d("this.2222","skipNum->"+this.skipNum);
                    }

                    mEGL.eglSwapBuffers(mGLDisplay, mGLSurface);






                }


            } catch (Exception e) {
                Log.e(DEBUG_TAG, "GL Failure", e);
            } finally  {
                cleanupGL();
            }
        }

        public void requestStop() {
            mDone = true;
            try {
                join();
            } catch (InterruptedException e) {
                Log.e(DEBUG_TAG, "failed to stop gl thread", e);
            }

            cleanupGL();
        }

        private void cleanupGL() {
            mEGL.eglMakeCurrent(mGLDisplay, EGL10.EGL_NO_SURFACE,
                    EGL10.EGL_NO_SURFACE, EGL10.EGL_NO_CONTEXT);
            mEGL.eglDestroySurface(mGLDisplay, mGLSurface);
            mEGL.eglDestroyContext(mGLDisplay, mGLContext);
            mEGL.eglTerminate(mGLDisplay);

            Log.i(DEBUG_TAG, "GL Cleaned up");
        }

        public void initGL( ) {
            int width = sv.getWidth();
            int height = sv.getHeight();
            mGL.glViewport(0, 0, width, height);
            mGL.glMatrixMode(GL10.GL_PROJECTION);
            mGL.glLoadIdentity();
            float aspect = (float) width/height;
            GLU.gluPerspective(mGL, 45.0f, aspect, 1.0f, 30.0f);
            mGL.glClearColor(0.5f,0.5f,0.5f,1);

            // the only way to draw primitives with OpenGL ES
            mGL.glEnableClientState(GL10.GL_VERTEX_ARRAY);

            Log.i(DEBUG_TAG, "GL initialized");
        }

        public void initEGL() throws Exception {
            mEGL = (EGL10) GLDebugHelper.wrap(EGLContext.getEGL(),
                    GLDebugHelper.CONFIG_CHECK_GL_ERROR
                            | GLDebugHelper.CONFIG_CHECK_THREAD,  null);

            if (mEGL == null) {
                throw new Exception("Couldn't get EGL");
            }

            mGLDisplay = mEGL.eglGetDisplay(EGL10.EGL_DEFAULT_DISPLAY);

            if (mGLDisplay == null) {
                throw new Exception("Couldn't get display for GL");
            }

            int[] curGLVersion = new int[2];
            mEGL.eglInitialize(mGLDisplay, curGLVersion);

            Log.i(DEBUG_TAG, "GL version = " + curGLVersion[0] + "."
                    + curGLVersion[1]);

            EGLConfig[] configs = new EGLConfig[1];
            int[] num_config = new int[1];
            mEGL.eglChooseConfig(mGLDisplay, mConfigSpec, configs, 1,
                    num_config);
            mGLConfig = configs[0];

            mGLSurface = mEGL.eglCreateWindowSurface(mGLDisplay, mGLConfig, sv
                    .getHolder(), null);

            if (mGLSurface == null) {
                throw new Exception("Couldn't create new surface");
            }

            mGLContext = mEGL.eglCreateContext(mGLDisplay, mGLConfig,
                    EGL10.EGL_NO_CONTEXT, null);

            if (mGLContext == null) {
                throw new Exception("Couldn't create new context");
            }


            if (!mEGL.eglMakeCurrent(mGLDisplay, mGLSurface, mGLSurface, mGLContext)) {
                throw new Exception("Failed to eglMakeCurrent");
            }

            mGL = (GL10) GLDebugHelper.wrap(mGLContext.getGL(),
                    GLDebugHelper.CONFIG_CHECK_GL_ERROR
                            | GLDebugHelper.CONFIG_CHECK_THREAD
                            | GLDebugHelper.CONFIG_LOG_ARGUMENT_NAMES, null);

            if (mGL == null) {
                throw new Exception("Failed to get GL");
            }



        }

        // main OpenGL variables
        GL10 mGL;
        EGL10 mEGL;
        EGLDisplay mGLDisplay;
        EGLConfig mGLConfig;
        EGLSurface mGLSurface;
        EGLContext mGLContext;
        int[] mConfigSpec = { EGL10.EGL_RED_SIZE, 5,
                EGL10.EGL_GREEN_SIZE, 6, EGL10.EGL_BLUE_SIZE, 5,
                EGL10.EGL_DEPTH_SIZE, 16, EGL10.EGL_NONE };
    }
}
