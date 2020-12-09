package com.z3d.skill.vo;

import com.z3d.vo.DataObjTempVo;
import com.z3d.vo.Vector3D;

public class SkillTrajectoryTargetKeyVo  extends SkillKeyVo {

    public float beginType;
    public String beginSocket;
    public Vector3D beginPos;
    public String hitSocket;
    public String endParticleUrl;
    public float speed;
    public int multype;

    public void setData(DataObjTempVo $data)  {
        super.setData($data);
        this.beginType = $data.beginType;
        if (this.beginType == 0) {
            this.beginPos = new Vector3D($data.beginPos.x, $data.beginPos.y, $data.beginPos.z);
        } else if (this.beginType == 1) {
            this.beginSocket = $data.beginSocket;
        }
        this.speed = $data.speed;
        if ($data.hitSocket!=null) {
            this.hitSocket = $data.hitSocket;
        }
        if ($data.endParticle!=null) {
            this.endParticleUrl = $data.endParticle;
        }
        this.multype = $data.multype;
    }
}
