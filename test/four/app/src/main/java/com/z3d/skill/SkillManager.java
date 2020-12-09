package com.z3d.skill;

import com.z3d.base.CallBack;
import com.z3d.base.ResGC;
import com.z3d.base.Scene_data;
import com.z3d.filemodel.ResManager;
import com.z3d.res.SkillRes;
import com.z3d.scene.Scene3D;
import com.z3d.units.TimeUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SkillManager extends ResGC {

    public HashMap<String, List<Skill>> _skillDic;
    public HashMap<String,List<SkillLoadInfo>> _loadDic;
    public HashMap<String,String> _preLoadDic;
    public List<Skill> _skillAry ;
    private float _time;

    public Scene3D scene3D;

    public SkillManager( ){
        super();
        _skillDic=new HashMap<>();
        _loadDic=new HashMap<>();
        _preLoadDic=new HashMap<>();
        _skillAry=new ArrayList<>();

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
        skill = new Skill(this.scene3D);
        skill.name = $name;
        skill.isDeath = false;
        if (!this._skillDic.containsKey(key)) {
            this._skillDic.put(key,new ArrayList<>());
        }
        this._skillDic.get(key).add(skill);
        if (this.dic.containsKey($url)) {
            SkillData skillData=  (SkillData)this.dic.get($url);
            skill.setData(skillData.data.get(skill.name),skillData);
            skill.key=key;
            skillData.useNum++;
            return skill;
        }

        SkillLoadInfo obj = new SkillLoadInfo();
        obj.name = $name;
        obj.skill = skill;
        obj.callback = $callback;
        if (this._loadDic.containsKey($url)) {
            this._loadDic.get($url).add(obj);
            return skill;
        }
        this._loadDic.put($url,new ArrayList<>());
        this._loadDic.get($url).add(obj);
        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot+ $url, new CallBack() {
            @Override
            public void StateChange(Object val) {
                SkillRes $skillRes=(SkillRes)val;
                loadSkillCom($url, $skillRes);
            }
        });
        return skill;
    }
    private void loadSkillCom(String $url, SkillRes $skillRes) {
        SkillData skillData  = new SkillData();
        skillData.data = $skillRes.data;
        List<SkillLoadInfo> arrInfo= this._loadDic.get($url);
        for (int i = 0;arrInfo!=null&& i <arrInfo.size(); i++) {
            SkillLoadInfo obj = arrInfo.get(i);
            if (!obj.skill.hasDestory) {
                obj.skill.setData(skillData.data.get(obj.name), skillData);
                obj.skill.key = $url + obj.name;
                skillData.useNum++;
            }
        }
        this.dic.put($url,skillData);
        this.addSrc($url, skillData);

        for (int i = 0;arrInfo!=null&& i <arrInfo.size(); i++) {
            SkillLoadInfo obj = arrInfo.get(i);
            if (obj.callback!=null) {
                obj.callback.StateChange(true);
            }
        }
        this._loadDic.put($url,null);
    }
    private void addSrc(String $url, SkillData skillData) {

        for (String key : skillData.data.keySet()) {
            Skill skill = new Skill(this.scene3D);
            skill.name = key;
            skill.isDeath = true;
            skill.src = true;
            skill.setData(skillData.data.get(key), skillData);
            skillData.addSrcSkill(skill);
            skillData.useNum++;
            String dkey  = $url + key;
            if (!this._skillDic.containsKey(dkey)) {
                this._skillDic.put(dkey,new ArrayList<>());
            }
            this._skillDic.get(dkey).add(skill);

        }
    }

    public void removeSkill(Skill $skill) {
        int index = this._skillAry.indexOf($skill);
        if (index != -1) {
            this._skillAry.remove(index);
        }
    }

    public void preLoadSkill(String url) {
        if (this.dic.containsKey(url) || this._preLoadDic.containsKey(url)){
            return;
        }
        this._preLoadDic.put(url,url);
        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot+ url, new CallBack() {
            @Override
            public void StateChange(Object val) {
                SkillRes $skillRes=(SkillRes)val;
                loadSkillCom(url, $skillRes);
            }
        });
    }
    public void playSkill(Skill skill) {
        this._skillAry.add(skill);
        skill.play();
    }
    public  void upData()
    {
        float _tempTime = TimeUtil.getTimer();
        float t  = _tempTime - this._time;
        for (int i = 0; i < this._skillAry.size(); i++) {
            this._skillAry.get(i).update(t);
        }
        this._time=_tempTime;

    }
}
