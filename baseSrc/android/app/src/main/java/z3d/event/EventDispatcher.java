package z3d.event;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.function.Function;

public class EventDispatcher {
    protected HashMap<String, List<EventBindVo>>  _eventsMap ;

    public void addEventListener(String types   , EventCallBack listener, Object thisObject) {
        if (this._eventsMap==null) {
            this._eventsMap = new HashMap();
        }
        List<EventBindVo> list  = this._eventsMap.get(types);
        if (list==null) {
            this._eventsMap.put(types,new ArrayList());
            list  = this._eventsMap.get(types);
        }
        EventBindVo eventBin=new EventBindVo(listener,thisObject);
        for (int i= 0; i < list.size(); i++) {
            EventBindVo bin = list.get(i);
            if (bin.listener == listener && bin.thisObject == thisObject) {
                return;
            }
        }
        list.add(eventBin);

    }
    public void removeEventListener( String type,EventCallBack listener,Object thisObject) {
        if (this._eventsMap == null) {
            return;
        }
        List<EventBindVo> list = this._eventsMap.get(type);
        for (int i = 0; list!=null && i < list.size(); i++) {
            EventBindVo bin = list.get(i);
            if (bin.listener == listener && bin.thisObject == thisObject) {
//                list.splice(i, 1);
                list.remove(i);
                return;
            }
        }
    }
    public void dispatchEvent(BaseEvent event) {
        HashMap<String, List<EventBindVo>> eventMap = this._eventsMap;
        if (eventMap == null) {
            return  ;
        }
        List<EventBindVo> list = eventMap.get(event.type);

        if (list == null || list.size() == 0) {
            return  ;
        }
        event.target = this;
        for (int i = 0; i < list.size(); i++) {
            EventBindVo eventBin = list.get(i);
            eventBin.listener.call(eventBin.thisObject, event);
        }

    }


}
