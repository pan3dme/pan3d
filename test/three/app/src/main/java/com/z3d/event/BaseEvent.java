package com.z3d.event;



public class BaseEvent {
    public String type;
    public EventDispatcher target ;

    public BaseEvent(String val ) {
        this.type = val;
    }

    public static String COMPLETE = "complete";
}
