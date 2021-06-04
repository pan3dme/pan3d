package com.example.android.ui.scene;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.solver.widgets.Rectangle;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;

import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.GestureDetector;
import android.view.MenuItem;
import android.view.MotionEvent;

import com.example.android.R;
import com.pan3d.base.CallBackFun;
import com.pan3d.display.Display3D;
import com.pan3d.display.role.SceneChar;
import com.pan3d.scene.ConstrainSceneView;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class SceneShowView extends AppCompatActivity   {
    private static final String TAG ="SceneShowView" ;
    ConstrainSceneView constrainSceneViewOne;


    /**
     * 初始化状态常量
     */
    public static final int STATUS_INIT = 1;

    /**
     * 图片放大状态常量
     */
    public static final int STATUS_ZOOM_OUT = 2;

    /**
     * 图片缩小状态常量
     */
    public static final int STATUS_ZOOM_IN = 3;

    /**
     * 图片拖动状态常量
     */
    public static final int STATUS_MOVE = 4;

    /**
     * 用于对图片进行移动和缩放变换的矩阵
     */
    private Matrix matrix = new Matrix();

    /**
     * 待展示的Bitmap对象
     */
//    private Bitmap sourceBitmap;

    /**
     * 记录当前操作的状态，可选值为STATUS_INIT、STATUS_ZOOM_OUT、STATUS_ZOOM_IN和STATUS_MOVE
     */
    private int currentStatus;

    /**
     * ZoomImageView控件的宽度
     */
    private int width;

    /**
     * ZoomImageView控件的高度
     */
    private int height;

    /**
     * 记录两指同时放在屏幕上时，中心点的横坐标值
     */
    private float centerPointX;

    /**
     * 记录两指同时放在屏幕上时，中心点的纵坐标值
     */
    private float centerPointY;



    /**
     * 记录上次手指移动时的横坐标
     */
    private float lastXMove = -1;

    /**
     * 记录上次手指移动时的纵坐标
     */
    private float lastYMove = -1;

    /**
     * 记录手指在横坐标方向上的移动距离
     */
    private float movedDistanceX;

    /**
     * 记录手指在纵坐标方向上的移动距离
     */
    private float movedDistanceY;

    /**
     * 记录图片在矩阵上的横向偏移值
     */
    private float totalTranslateX;

    /**
     * 记录图片在矩阵上的纵向偏移值
     */
    private float totalTranslateY;

    /**
     * 记录图片在矩阵上的总缩放比例
     */
    private float totalRatio;




    /**
     * 记录上次两指之间的距离
     */
    private double lastFingerDis;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_scene_show_view);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(getString(R.string.app_name));
        String sceneinfo = getIntent().getStringExtra("sceneinfo");
        Context context=  getApplicationContext();
        final ConstraintLayout constraintlayout =  findViewById(R.id.base_scene_gl_view);


        constrainSceneViewOne =new ConstrainSceneView(context, new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                initSceneDataByBunld(sceneinfo);

                totalTranslateY= -   constrainSceneViewOne.mainScene3D.camera3D.rotationX*4;
                totalTranslateX=-  constrainSceneViewOne.mainScene3D.camera3D.rotationY;

            }
        });
        constraintlayout.addView(constrainSceneViewOne);

        DisplayMetrics displayMetrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        Rectangle rectangle=new Rectangle();
        rectangle.setBounds(0,0,displayMetrics.widthPixels,displayMetrics.heightPixels);
        constrainSceneViewOne.setRect(rectangle);







    }

    /**
     * 计算两个手指之间的距离。
     *
     * @param event
     * @return 两个手指之间的距离
     */
    private double distanceBetweenFingers(MotionEvent event) {
        float disX = Math.abs(event.getX(0) - event.getX(1));
        float disY = Math.abs(event.getY(0) - event.getY(1));
        return Math.sqrt(disX * disX + disY * disY);
    }


    private void move( ) {
        matrix.reset();
        // 根据手指移动的距离计算出总偏移值
        float translateX = totalTranslateX + movedDistanceX;
        float translateY = totalTranslateY + movedDistanceY;
        // 先按照已有的缩放比例对图片进行缩放
        matrix.postScale(totalRatio, totalRatio);
        // 再根据移动距离进行偏移
        matrix.postTranslate(translateX, translateY);
        totalTranslateX = translateX;
        totalTranslateY = translateY;

        this.constrainSceneViewOne.mainScene3D.camera3D.rotationX=-totalTranslateY/4;
        this.constrainSceneViewOne.mainScene3D.camera3D.rotationY=-totalTranslateX;


    }
    //下面实现的这些接口负责处理所有在该Activity上发生的触碰屏幕相关的事件
    @Override
    public boolean onTouchEvent(MotionEvent event)
    {
        switch (event.getActionMasked()) {
            case MotionEvent.ACTION_POINTER_DOWN:
                if (event.getPointerCount() == 2) {
                    // 当有两个手指按在屏幕上时，计算两指之间的距离
                    lastFingerDis = distanceBetweenFingers(event);
                }
                break;
            case MotionEvent.ACTION_MOVE:
                if (event.getPointerCount() == 1) {
                    // 只有单指按在屏幕上移动时，为拖动状态
                    float xMove = event.getX();
                    float yMove = event.getY();
                    if (lastXMove == -1 && lastYMove == -1) {
                        lastXMove = xMove;
                        lastYMove = yMove;
                    }
                    currentStatus = STATUS_MOVE;
                    movedDistanceX = xMove - lastXMove;
                    movedDistanceY = yMove - lastYMove;

                    move( );

                    lastXMove = xMove;
                    lastYMove = yMove;
                } else if (event.getPointerCount() == 2) {
                    // 有两个手指按在屏幕上移动时，为缩放状态
                    centerPointBetweenFingers(event);
                    double fingerDis = distanceBetweenFingers(event);
                    this.constrainSceneViewOne.mainScene3D.camera3D.distance+=(float)lastFingerDis-(float) fingerDis;

                    lastFingerDis = fingerDis;
                }
                break;
            case MotionEvent.ACTION_POINTER_UP:
                if (event.getPointerCount() == 2) {
                    lastXMove = -1;
                    lastYMove = -1;
                }
                break;
            case MotionEvent.ACTION_UP:
                // 手指离开屏幕时将临时值还原
                lastXMove = -1;
                lastYMove = -1;
                break;
            default:
                break;
        }
        return true;
    }
    /**
     * 计算两个手指之间中心点的坐标。
     *
     * @param event
     */
    private void centerPointBetweenFingers(MotionEvent event) {
        float xPoint0 = event.getX(0);
        float yPoint0 = event.getY(0);
        float xPoint1 = event.getX(1);
        float yPoint1 = event.getY(1);
        centerPointX = (xPoint0 + xPoint1) / 2;
        centerPointY = (yPoint0 + yPoint1) / 2;
    }

    private void initSceneDataByBunld(String val)
    {

        try {
            JSONArray jsonArray=new JSONArray(val);
            for(int i=0;i< jsonArray.length();i++){
                meshDataInfo(jsonArray.getJSONObject(i));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void  meshDataInfo(JSONObject val)
    {


        try {
            int type=val.getInt("type");

            if( type==1){ //场景
                String textStr=val.getString("text").replace("<<<","/");
                constrainSceneViewOne.loadSceneByUrl(  val.getString("text"));
            }
            if( type==2){//特效
                String textStr=val.getString("text").replace("<<<","/");
                constrainSceneViewOne.playParticle(textStr);
            }
            if( type==3){//角色
                String textStr=val.getString("text").replace("<<<","/");
                SceneChar sc= constrainSceneViewOne.addMovieDisplay(textStr);


                this.setParamInfo(sc,val);

                if(   val.has("info") )
                {
                    JSONObject info=  val.getJSONObject("info");
                    if(  info.has("addPart")){
                        String  addPart=  info.getString("addPart");
                        String  bindSocket=  info.getString("bindSocket");
                        String  model=  "model/"+info.getString("model")+".txt";
                        sc.addPart(addPart,bindSocket,model);
                    }
                    if(  info.has("mount")){
                        String  mount=  info.getString("mount");
                        if(mount!=null){
                            sc.setMountById(mount);
                        }
                    }
                    if(  info.has("action")){
                        String  action=  info.getString("action");
                        Log.d(action, "meshDataInfo: ");
                        sc.play(action);
                    }
                }

            }
            if(type==4){//动画
                constrainSceneViewOne.addLoadFrame3dRes();
            }

            if( type==5){//md5
                constrainSceneViewOne.addLocaMd5();
            }

        }catch (Exception e){
            e.printStackTrace();
        }


    }
//   private setParamInfo:(Display3D*)dis vo:(SceneInfoVo*)vo;
    private  void setParamInfo(Display3D dis,JSONObject val)
    {  try {
        if(   val.has("param") ){
            JSONObject param=  val.getJSONObject("param");
            if(   param.has("x") ){
                dis.x=param.getInt("x");
            }
            if(   param.has("y") ){
                dis.y=param.getInt("y");
            }
            if(   param.has("z") ){
                dis.z=param.getInt("z");
            }
            if(   param.has("rotationY") ){
                dis.rotationY=param.getInt("rotationY");
            }

        }
    }catch (Exception e){
        e.printStackTrace();
    }


    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
        }
        return super.onOptionsItemSelected(item);
    }


}