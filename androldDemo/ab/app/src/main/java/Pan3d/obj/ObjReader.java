package Pan3d.obj;

import android.content.Context;
import android.util.Log;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wuwang on 2017/1/7
 */

public class ObjReader {

    public static void read(InputStream stream,Obj3D obj3D){
        ArrayList<Float> alv=new ArrayList<Float>();//原始顶点坐标列表
        ArrayList<Float> alvResult=new ArrayList<Float>();//结果顶点坐标列表
        float[] ab=new float[3],bc=new float[3],norl=new float[3];
        try{
            InputStreamReader isr=new InputStreamReader(stream);
            BufferedReader br=new BufferedReader(isr);
            String temps=null;
            while((temps=br.readLine())!=null)
            {
                String[] tempsa=temps.split("[ ]+");
                if(tempsa[0].trim().equals("v")) {//此行为顶点坐标
                    alv.add(Float.parseFloat(tempsa[1])*1);
                    alv.add(Float.parseFloat(tempsa[2])*1);
                    alv.add(Float.parseFloat(tempsa[3])*1);
                }  else if(tempsa[0].trim().equals("f")) {//此行为三角形面
                    int a=Integer.parseInt(tempsa[1])-1;
                    int b=Integer.parseInt(tempsa[2])-1;
                    int c=Integer.parseInt(tempsa[3])-1;
                    int d=Integer.parseInt(tempsa[4])-1;
                    //abc和acd两个三角形组成的四边形

                    alvResult.add(alv.get(a*3));
                    alvResult.add(alv.get(a*3+1));
                    alvResult.add(alv.get(a*3+2));
                    alvResult.add(alv.get(b*3));
                    alvResult.add(alv.get(b*3+1));
                    alvResult.add(alv.get(b*3+2));
                    alvResult.add(alv.get(c*3));
                    alvResult.add(alv.get(c*3+1));
                    alvResult.add(alv.get(c*3+2));

                    alvResult.add(alv.get(a*3));
                    alvResult.add(alv.get(a*3+1));
                    alvResult.add(alv.get(a*3+2));
                    alvResult.add(alv.get(c*3));
                    alvResult.add(alv.get(c*3+1));
                    alvResult.add(alv.get(c*3+2));
                    alvResult.add(alv.get(d*3));
                    alvResult.add(alv.get(d*3+1));
                    alvResult.add(alv.get(d*3+2));

                }
            }
            alvResult=new ArrayList<Float>();//结果顶点坐标列表
            alvResult.add(0f);
            alvResult.add(0f);
            alvResult.add(0f);

            alvResult.add(10f);
            alvResult.add(0f);
            alvResult.add(0f);

            alvResult.add(0f);
            alvResult.add(0f);
            alvResult.add(10f);


            alvResult.add(0f);
            alvResult.add(0f);
            alvResult.add(0f);

            alvResult.add(10f);
            alvResult.add(10f);
            alvResult.add(0f);

            alvResult.add(0f);
            alvResult.add(10f);
            alvResult.add(10f);

           obj3D.setVert(alvResult);

        }catch(Exception e){
            e.printStackTrace();
        }
    }




}
