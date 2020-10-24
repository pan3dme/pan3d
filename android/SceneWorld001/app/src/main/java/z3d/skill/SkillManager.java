package z3d.skill;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import scene.CallBack;
import z3d.base.ResGC;
import z3d.base.Scene_data;
import z3d.filemodel.ResManager;
import z3d.program.ProgrmaManager;
public class SkillManager extends ResGC {

    public HashMap<String, List<Skill>> _skillDic;
    public HashMap<String,List<SkillLoadInfo>> _loadDic;
    public Map _preLoadDic;
    public List<Skill> _skillAry ;

    public SkillManager( ){
        super();
        _skillDic=new HashMap<>();
        _loadDic=new HashMap<>();


    }

    private static final String TAG = "SkillManager";
    private static SkillManager _instance;
    public static SkillManager getInstance() {
        if (SkillManager._instance==null) {
            SkillManager._instance = new SkillManager();
        }
        return SkillManager._instance;
    }

    public Skill getSkill(String $url, String $name, CallBack $callback) {
        Skill skill  ;
        String key  = $url + $name;
        List<Skill> ary = this._skillDic.get(key);
        if (ary!=null &&ary.size()>0) {
            for (int i = 0; i < ary.size(); i++) {
                skill = ary.get(i);
                if (skill.isDeath && skill.useNum == 0) {
                    skill.reset();
                    skill.isDeath = false;
                    return skill;
                }
            }
        }
        skill = new Skill();
        skill.name = $name;
        skill.isDeath = false;
        if (!this._skillDic.containsKey(key)) {
            this._skillDic.put(key,new ArrayList<>());
        }
        this._skillDic.get(key).add(skill);
        if (this.dic.containsKey($url)) {
//            skill.setData(this._dic[$url].data[skill.name], this._dic[$url]);
//            skill.key = key;
//            this._dic[$url].useNum++;
//            return skill;
        }

        if (this._loadDic.containsKey($url)) {
//            var obj: any = new Object;
//            obj.name = $name;
//            obj.skill = skill;
//            obj.callback = $callback;
//            this._loadDic[$url].push(obj);
//            return skill;
        }

        this._loadDic.put($url,new ArrayList<>());
        SkillLoadInfo obj = new SkillLoadInfo();
        obj.name = $name;
        obj.skill = skill;
        obj.callback = $callback;
        this._loadDic.get($url).add(obj);

        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot+ $url, new CallBack() {
            @Override
            public void StateChange(Object val) {

            }

        });
        return skill;

    }
}
