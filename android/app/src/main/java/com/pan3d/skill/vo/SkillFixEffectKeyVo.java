package com.pan3d.skill.vo;

import com.pan3d.vo.DataObjTempVo;
import com.pan3d.vo.Vector3D;

public class SkillFixEffectKeyVo extends SkillKeyVo {

    public Vector3D pos  ;
    public Vector3D rotation  ;
    public boolean hasSocket  ;
    public String socket;

    public void setData(DataObjTempVo $data) {
        super.setData($data);
        this.hasSocket = $data.hasSocket;
        if (this.hasSocket) {
            this.socket = $data.socket;
        } else {
            this.pos = new Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
            this.rotation = new Vector3D($data.rotation.x, $data.rotation.y, $data.rotation.z);
        }

    }
}
