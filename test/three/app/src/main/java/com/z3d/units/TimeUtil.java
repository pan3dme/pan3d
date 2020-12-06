package com.z3d.units;

public class TimeUtil {


    private  static  long _beginTm;
    public  static float getTimer() {
        long totalMilliSeconds = System.currentTimeMillis();
        if("0".equals(String.valueOf(_beginTm)) || "null".equals(String.valueOf(_beginTm)) || _beginTm <= 0){
            _beginTm= totalMilliSeconds;
        }
       return (float)(totalMilliSeconds-_beginTm);
    }
}
