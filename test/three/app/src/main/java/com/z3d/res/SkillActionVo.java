package com.z3d.res;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.z3d.vo.DataObjTempVo;
import com.z3d.vo.ShockAryVo;

public class SkillActionVo {

    public String skillname;
    public HashMap<String,Object> sound;
    public String action;
    public int type;
    public int blood;
    public List<ShockAryVo>  shock;
    public ArrayList<DataObjTempVo> data;
}