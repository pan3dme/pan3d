package com.pan3d.event;

public class EventBindVo {
    public EventCallBack listener;
    public  Object thisObject;
    public EventBindVo(EventCallBack a, Object b){
        this.listener=a;
        this.thisObject=b;
    }
}
